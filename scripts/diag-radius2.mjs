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
await sleep(2500);

const res = await evalJs(`(() => {
  const out = [];
  for (const el of document.querySelectorAll('*')) {
    const cs = getComputedStyle(el);
    const vals = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomLeftRadius, cs.borderBottomRightRadius];
    const bad = vals.some(v => {
      if (!v || v.includes('%') || v.includes('calc')) return false;
      const n = parseFloat(v);
      return n > 2 && n < 900;
    });
    if (!bad) continue;
    const chain = [];
    let p = el;
    for (let i = 0; i < 5 && p; i++) {
      chain.push(p.tagName + '.' + ((p.className || '').toString().slice(0, 50) || '(none)'));
      p = p.parentElement;
    }
    const r = el.getBoundingClientRect();
    out.push({
      cls: (el.className || '').toString(),
      inlineStyle: el.getAttribute('style'),
      radius: cs.borderTopLeftRadius,
      rect: [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)],
      chain,
      visible: cs.display !== 'none' && cs.visibility !== 'hidden' && r.width > 0 && r.height > 0,
    });
  }
  return out;
})()`);
console.log(JSON.stringify(res, null, 1));
process.exit(0);
