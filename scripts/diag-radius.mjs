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
  const list = [];
  for (const el of document.querySelectorAll('*')) {
    const cs = getComputedStyle(el);
    const vals = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomLeftRadius, cs.borderBottomRightRadius];
    const offenders = vals.filter(v => {
      if (!v) return false;
      if (v.includes('%')) return false;           // 百分比圆（如 50%）= 圆形，排除
      if (v.includes('calc')) return false;
      const n = parseFloat(v);
      if (!n || n <= 2) return false;
      if (n >= 900) return false;                  // rounded-full ≈ 9999px，圆形排除
      return true;
    });
    if (offenders.length) {
      list.push({
        tag: el.tagName,
        cls: (el.className || '').toString().slice(0, 80),
        radius: offenders.join('/'),
        w: Math.round(el.getBoundingClientRect().width),
        h: Math.round(el.getBoundingClientRect().height),
      });
    }
  }
  return { count: list.length, sample: list.slice(0, 25) };
})()`);
console.log('违规数=' + res.count);
for (const s of res.sample) console.log(`  ${s.tag} radius=${s.radius} ${s.w}x${s.h} cls=${s.cls}`);
process.exit(0);
