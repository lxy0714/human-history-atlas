import http from 'node:http';

const CDP_PORT = 9223;
function httpGetJson(path) {
  return new Promise((resolve, reject) => {
    const req = http.get({ host: '127.0.0.1', port: CDP_PORT, path }, (res) => {
      let d = '';
      res.on('data', (c) => (d += c));
      res.on('end', () => {
        try {
          resolve(JSON.parse(d));
        } catch (e) {
          reject(e);
        }
      });
    });
    req.on('error', reject);
  });
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

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
await send('Emulation.setDeviceMetricsOverride', { width: 1280, height: 900, deviceScaleFactor: 1, mobile: false });
await send('Page.navigate', { url: 'http://localhost:8080/app/app_17c9k0cjz33/' });

for (let i = 0; i < 40; i++) {
  const ok = await evalJs(`!!document.querySelector('[aria-haspopup="menu"]')`);
  if (ok) break;
  await sleep(500);
}

const probe = `(() => {
  const b = document.querySelector('[aria-haspopup="menu"]');
  const r = b.getBoundingClientRect();
  const cx = r.left + r.width/2, cy = r.top + r.height/2;
  const hit = document.elementFromPoint(cx, cy);
  const chain = [];
  let el = hit;
  while (el && chain.length < 6) {
    const cs = getComputedStyle(el);
    chain.push({ tag: el.tagName, cls: (el.className || '').toString().slice(0, 70), pos: cs.position, z: cs.zIndex, pe: cs.pointerEvents, isBtn: el === b, containsBtn: el.contains(b) });
    el = el.parentElement;
  }
  return { cx: Math.round(cx), cy: Math.round(cy), hitTag: hit && hit.tagName, hitIsBtn: !!(hit && (b === hit || b.contains(hit))), chain };
})()`;

// 连续采样 6 次，间隔 700ms，观察命中是否变化
const out = [];
for (let i = 1; i <= 6; i++) {
  const p = await evalJs(probe);
  out.push(`采样${i} (${p.cx},${p.cy}): hit=${p.hitTag} hitIsBtn=${p.hitIsBtn}`);
  if (i === 1) {
    out.push('  祖先链: ' + p.chain.map((c) => `${c.tag}${c.isBtn ? '(按钮)' : c.containsBtn ? '(含按钮)' : ''}[pos=${c.pos} z=${c.z} pe=${c.pe}] cls=${c.cls}`).join('\n          '));
  }
  await sleep(700);
}
console.log(out.join('\n'));
process.exit(0);
