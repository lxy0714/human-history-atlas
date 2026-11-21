import http from 'node:http';

const CDP_PORT = 9223;

function httpGetJson(path) {
  return new Promise((resolve, reject) => {
    const req = http.get({ host: '127.0.0.1', port: CDP_PORT, path }, (res) => {
      let data = '';
      res.on('data', (c) => (data += c));
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
  });
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function main() {
  const targets = await httpGetJson('/json/list');
  const page = targets.find((t) => t.type === 'page');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r, j) => {
    ws.onopen = r;
    ws.onerror = j;
  });
  let id = 0;
  const pending = new Map();
  ws.onmessage = (ev) => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) {
      const { resolve, reject } = pending.get(m.id);
      pending.delete(m.id);
      m.error ? reject(new Error(JSON.stringify(m.error))) : resolve(m.result);
    }
  };
  const send = (method, params = {}) =>
    new Promise((resolve, reject) => {
      const myId = ++id;
      pending.set(myId, { resolve, reject });
      ws.send(JSON.stringify({ id: myId, method, params }));
    });
  const evalJs = async (expression) => {
    const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
    if (r.exceptionDetails) throw new Error(JSON.stringify(r.exceptionDetails));
    return r.result.value;
  };

  await send('Runtime.enable');
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
  await send('Page.navigate', { url: 'http://localhost:8080/app/app_17c9k0cjz33/' });
  await sleep(2500);

  // 等按钮
  for (let i = 0; i < 40; i++) {
    const ok = await evalJs(`!!document.querySelector('[aria-haspopup="menu"]')`);
    if (ok) break;
    await sleep(500);
  }

  // 挂事件探针（capture 阶段记录所有 pointer/mouse/click 事件）
  await evalJs(`
    window.__events = [];
    const push = (t) => (e) => {
      window.__events.push({
        t,
        tag: e.target && e.target.tagName,
        aria: e.target && e.target.getAttribute && e.target.getAttribute('aria-haspopup'),
        // 记录事件到达时 aria-expanded
        expanded: (document.querySelector('[aria-haspopup="menu"]')||{}).getAttribute?.('aria-expanded'),
        panelExists: !!document.getElementById('theme-switcher-menu'),
      });
    };
    ['pointerdown','mousedown','pointerup','mouseup','click'].forEach(t => document.addEventListener(t, push(t), true));
    true;
  `);

  const getBtn = () =>
    evalJs(`(() => {
      const b = document.querySelector('[aria-haspopup="menu"]');
      const r = b.getBoundingClientRect();
      const hit = document.elementFromPoint(r.left + r.width/2, r.top + r.height/2);
      return { x: r.left + r.width/2, y: r.top + r.height/2, label: b.textContent.trim(), expanded: b.getAttribute('aria-expanded'), hitTag: hit ? hit.tagName : null, hitIsBtn: !!(hit && (b === hit || b.contains(hit))) };
    })()`);

  async function realClick(x, y) {
    await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y, button: 'none' });
    await sleep(40);
    await send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', buttons: 1, clickCount: 1 });
    await sleep(60);
    await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', buttons: 0, clickCount: 1 });
    await sleep(260);
  }

  const lines = [];
  for (let i = 1; i <= 6; i++) {
    await evalJs('window.__events = []');
    const b = await getBtn();
    await realClick(b.x, b.y);
    const after = await evalJs(
      `({ expanded: document.querySelector('[aria-haspopup="menu"]').getAttribute('aria-expanded'), panel: !!document.getElementById('theme-switcher-menu'), events: window.__events })`,
    );
    lines.push(
      `点击${i}: 按钮(${Math.round(b.x)},${Math.round(b.y)}) 点前 expanded=${b.expanded} hit=${b.hitTag} hitIsBtn=${b.hitIsBtn}`,
    );
    lines.push(`  事件: ${after.events.map((e) => `${e.t}→expanded=${e.expanded}/panel=${e.panelExists ? 1 : 0}`).join(', ')}`);
    lines.push(`  点后: expanded=${after.expanded} panel=${after.panel ? '开' : '关'}`);
  }
  console.log(lines.join('\n'));
  process.exit(0);
}

main().catch((e) => {
  console.log('ERROR ' + (e.stack || e));
  process.exit(1);
});
