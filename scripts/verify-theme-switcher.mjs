/**
 * 主题切换器真实浏览器验证（CDP 真实指针 + 真实按键）
 * 用法: node scripts/verify-theme-switcher.mjs [url] [width] [height]
 */
import http from 'node:http';

const CDP_PORT = process.env.CDP_PORT || 9223;
const url = process.argv[2] || 'http://localhost:8080/app/app_17c9k0cjz33/';
const width = Number(process.argv[3] || 1280);
const height = Number(process.argv[4] || 900);

const out = [];
const log = (...a) => out.push(a.join(' '));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

function httpGetJson(path) {
  return new Promise((resolve, reject) => {
    const req = http.get({ host: '127.0.0.1', port: CDP_PORT, path }, (res) => {
      let d = '';
      res.on('data', (c) => (d += c));
      res.on('end', () => {
        try { resolve(JSON.parse(d)); } catch (e) { reject(e); }
      });
    });
    req.on('error', reject);
  });
}

async function connect() {
  const targets = await httpGetJson('/json/list');
  const page = targets.find((t) => t.type === 'page');
  if (!page) throw new Error('no page target');
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r, j) => { ws.onopen = r; ws.onerror = j; });
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
  return send;
}

async function evalJs(send, expression) {
  const r = await send('Runtime.evaluate', { expression, returnByValue: true, awaitPromise: true });
  if (r.exceptionDetails) throw new Error('eval failed: ' + JSON.stringify(r.exceptionDetails.text || r.exceptionDetails));
  return r.result.value;
}

async function realClick(send, x, y) {
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y, button: 'none' });
  await sleep(30);
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', buttons: 1, clickCount: 1 });
  await sleep(50);
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', buttons: 0, clickCount: 1 });
  await sleep(230);
}

async function pressKey(send, key, code, vk) {
  const textMap = { Enter: '\r', ' ': ' ' };
  const text = textMap[key];
  await send('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key,
    code,
    windowsVirtualKeyCode: vk,
    nativeVirtualKeyCode: vk,
    ...(text ? { text, unmodifiedText: text } : {}),
  });
  await sleep(40);
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key, code, windowsVirtualKeyCode: vk, nativeVirtualKeyCode: vk });
  await sleep(200);
}

const FIND_TRIGGER = `(() => {
  const btn = document.querySelector('[aria-haspopup="menu"][aria-label^="切换主题"]');
  if (!btn) return null;
  const r = btn.getBoundingClientRect();
  return { x: r.left + r.width/2, y: r.top + r.height/2, label: btn.textContent.trim(), expanded: btn.getAttribute('aria-expanded'), haspopup: btn.getAttribute('aria-haspopup'), controls: btn.getAttribute('aria-controls'), w: Math.round(r.width), h: Math.round(r.height) };
})()`;

const THEME_STATE = `({
  theme: document.documentElement.getAttribute('data-theme'),
  bodyBg: getComputedStyle(document.body).backgroundColor,
  btnText: (document.querySelector('[aria-haspopup="menu"][aria-label^="切换主题"]')||{}).textContent?.trim(),
})`;

const PANEL_STATE = `(() => {
  const menu = document.getElementById('theme-switcher-menu');
  if (!menu) return { exists: false };
  const cs = getComputedStyle(menu);
  const r = menu.getBoundingClientRect();
  return {
    exists: true,
    role: menu.getAttribute('role'),
    pos: cs.position,
    zIndex: cs.zIndex,
    rect: { top: Math.round(r.top), height: Math.round(r.height), left: Math.round(r.left), width: Math.round(r.width), bottom: Math.round(r.bottom) },
    viewport: { w: innerWidth, h: innerHeight },
    fullyVisible: r.top >= 0 && r.bottom <= innerHeight && r.left >= 0 && r.right <= innerWidth,
    items: [...menu.querySelectorAll('[role="menuitemradio"]')].map(b => {
      const br = b.getBoundingClientRect();
      const cx = br.left + br.width/2, cy = br.top + br.height/2;
      const hit = document.elementFromPoint(cx, cy);
      return {
        name: (b.querySelector('div > div')?.textContent || b.textContent || '').trim().slice(0,4),
        cx: Math.round(cx), cy: Math.round(cy), h: Math.round(br.height), w: Math.round(br.width),
        checked: b.getAttribute('aria-checked'),
        hitTag: hit ? hit.tagName : null,
        hitIsOpt: !!(hit && (b === hit || b.contains(hit))),
      };
    }),
  };
})()`;

const CONTRAST_PROBE = `(() => {
  const cv = document.createElement('canvas');
  cv.width = cv.height = 1;
  const ctx = cv.getContext('2d');
  function resolveVar(name) {
    const d = document.createElement('div');
    d.style.color = 'var(' + name + ')';
    d.style.position = 'absolute';
    d.style.visibility = 'hidden';
    document.body.appendChild(d);
    const c = getComputedStyle(d).color;
    d.remove();
    return c;
  }
  function pixel(fg, bg) {
    ctx.clearRect(0,0,1,1);
    ctx.fillStyle = bg;
    ctx.fillRect(0,0,1,1);
    ctx.fillStyle = fg;
    ctx.fillRect(0,0,1,1);
    const d = ctx.getImageData(0,0,1,1).data;
    return { r: d[0], g: d[1], b: d[2] };
  }
  function lum(c) {
    const f = (v) => { v/=255; return v<=0.03928 ? v/12.92 : Math.pow((v+0.055)/1.055, 2.4); };
    return 0.2126*f(c.r) + 0.7152*f(c.g) + 0.0722*f(c.b);
  }
  function ratio(fgCss, bgCss) {
    // fg 可能含 alpha，与 bg 混合后算对比度
    const fgPx = pixel(fgCss, 'transparent');
    const bgPx = pixel(bgCss, bgCss); // bg 一般不透明，自混不变
    // 更稳：fg 用 bg 做底混合一次，得到最终像素
    const mixedPx = pixel(fgCss, bgCss);
    const l1 = lum(mixedPx), l2 = lum(bgPx);
    const hi = Math.max(l1,l2), lo = Math.min(l1,l2);
    return Math.round(((hi+0.05)/(lo+0.05))*100)/100;
  }
  const bg = getComputedStyle(document.body).backgroundColor;
  const bodyColor = getComputedStyle(document.body).color;
  const header = document.querySelector('header');
  const headerBorderColor = header ? getComputedStyle(header).borderBottomColor : null;
  const headerBg = header ? getComputedStyle(header).backgroundColor : null;
  const headerBgFinal = (headerBg && headerBg !== 'rgba(0, 0, 0, 0)' && headerBg !== 'transparent') ? headerBg : bg;
  const underlineEl = document.querySelector('.border-b-2.border-primary, [class*="border-primary"][class*="border-b"]');
  const underlineColor = underlineEl ? getComputedStyle(underlineEl).borderBottomColor : null;
  return {
    theme: document.documentElement.getAttribute('data-theme'),
    textVsBg: ratio(bodyColor, bg),
    borderVsBg: ratio(resolveVar('--border'), bg),
    primaryVsBg: ratio(resolveVar('--primary'), bg),
    ringVsBg: ratio(resolveVar('--ring'), bg),
    headerBorderVsBg: headerBorderColor ? ratio(headerBorderColor, headerBgFinal) : null,
    underlineVsBg: underlineColor ? ratio(underlineColor, bg) : null,
    underlineSample: underlineEl ? underlineEl.className.slice(0,80) : null,
  };
})()`;

async function main() {
  const send = await connect();
  await send('Runtime.enable');
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 500 });

  await send('Page.navigate', { url });
  await sleep(2000);

  let trigger = null;
  for (let i = 0; i < 40; i++) {
    trigger = await evalJs(send, FIND_TRIGGER);
    if (trigger) break;
    await sleep(500);
  }
  if (!trigger) {
    log('FAIL: 未找到主题触发按钮');
    console.log(out.join('\n'));
    process.exit(1);
  }
  await sleep(3000); // 等加载遮罩完全卸载

  log(`===== 视口 ${width}x${height} =====`);
  log(`触发按钮: text="${trigger.label}" aria-haspopup=${trigger.haspopup} aria-expanded=${trigger.expanded} aria-controls=${trigger.controls} 尺寸=${trigger.w}x${trigger.h}`);
  log('');

  // ---- 1. 连点 5 次 ----
  log('--- 1) 连点触发按钮 5 次（真实指针） ---');
  const seq = [];
  for (let i = 1; i <= 5; i++) {
    const t = await evalJs(send, FIND_TRIGGER);
    await realClick(send, t.x, t.y);
    const p = await evalJs(send, `!!document.getElementById('theme-switcher-menu')`);
    const exp = await evalJs(send, `document.querySelector('[aria-haspopup="menu"]').getAttribute('aria-expanded')`);
    seq.push(`第${i}次: 面板=${p?'开':'关'} aria-expanded=${exp}`);
  }
  log(seq.join('\n'));
  log('');

  // 打开面板
  let isOpen = await evalJs(send, `!!document.getElementById('theme-switcher-menu')`);
  if (!isOpen) {
    const t = await evalJs(send, FIND_TRIGGER);
    await realClick(send, t.x, t.y);
  }

  // ---- 2. 命中测试 ----
  log('--- 2) 五选项 elementFromPoint 命中 ---');
  const panel = await evalJs(send, PANEL_STATE);
  log(`面板: role=${panel.role} position=${panel.pos} z-index=${panel.zIndex} rect=(${panel.rect.left},${panel.rect.top})~(${panel.rect.left+panel.rect.width},${panel.rect.top+panel.rect.height}) 完整可见=${panel.fullyVisible}`);
  let allHit = true;
  for (const it of panel.items || []) {
    if (!it.hitIsOpt) allHit = false;
    log(`  ${String(it.name).padEnd(4)} 中心=(${it.cx},${it.cy}) h=${it.h} aria-checked=${it.checked} hit=${it.hitTag} hitIsOpt=${it.hitIsOpt}`);
  }
  log(`全部命中: ${allHit ? '✓' : '✗'}`);
  log('');

  // 关闭
  if (await evalJs(send, `!!document.getElementById('theme-switcher-menu')`)) {
    const t = await evalJs(send, FIND_TRIGGER);
    await realClick(send, t.x, t.y);
  }

  // ---- 3. 逐套切换 ----
  log('--- 3) 真实指针逐套切换五套主题 ---');
  const themes = [
    { name: '博物馆', id: 'museum' },
    { name: '墨夜', id: 'ink' },
    { name: '羊皮纸', id: 'parchment' },
    { name: '宣纸', id: 'xuanzhi' },
    { name: '竹简', id: 'bamboo' },
  ];
  for (const th of themes) {
    if (!(await evalJs(send, `!!document.getElementById('theme-switcher-menu')`))) {
      const t = await evalJs(send, FIND_TRIGGER);
      await realClick(send, t.x, t.y);
    }
    const before = await evalJs(send, THEME_STATE);
    const pos = await evalJs(send, `(() => {
      const btn = [...document.querySelectorAll('#theme-switcher-menu [role="menuitemradio"]')].find(b => b.textContent.includes(${JSON.stringify(th.name)}));
      if (!btn) return null;
      const r = btn.getBoundingClientRect();
      return { x: r.left + r.width/2, y: r.top + r.height/2 };
    })()`);
    if (!pos) { log(`${th.name}: 未找到选项 ✗`); continue; }
    await realClick(send, pos.x, pos.y);
    const after = await evalJs(send, THEME_STATE);
    const closed = !(await evalJs(send, `!!document.getElementById('theme-switcher-menu')`));
    const ok = after.theme === th.id && (after.btnText||'').includes(th.name) && closed;
    log(`${th.name}: theme ${before.theme}→${after.theme}  bg ${before.bodyBg}→${after.bodyBg}  按钮「${before.btnText}」→「${after.btnText}」  关闭=${closed}  ${ok?'✓':'✗'}`);
  }
  log('');

  // ---- 4. 键盘路径 ----
  log('--- 4) 键盘路径（真实按键事件） ---');
  if (await evalJs(send, `!!document.getElementById('theme-switcher-menu')`)) {
    const t = await evalJs(send, FIND_TRIGGER);
    await realClick(send, t.x, t.y);
  }
  await evalJs(send, `document.querySelector('[aria-haspopup="menu"]').focus()`);
  log(`  初始焦点: aria-haspopup=${await evalJs(send, `document.activeElement.getAttribute('aria-haspopup')`)}`);

  await pressKey(send, 'Enter', 'Enter', 13);
  let st = await evalJs(send, `({ open: !!document.getElementById('theme-switcher-menu'), expanded: document.querySelector('[aria-haspopup="menu"]').getAttribute('aria-expanded'), focusRole: document.activeElement.getAttribute('role'), focusChecked: document.activeElement.getAttribute('aria-checked'), focusName: document.activeElement.textContent.trim().replace(/\\s+/g,' ').slice(0,10) })`);
  log(`  Enter 打开 → 面板=${st.open?'开':'关'} aria-expanded=${st.expanded} 焦点 role=${st.focusRole} aria-checked=${st.focusChecked} 「${st.focusName}」`);

  await pressKey(send, 'ArrowDown', 'ArrowDown', 40);
  st = await evalJs(send, `({ name: document.activeElement.textContent.trim().replace(/\\s+/g,' ').slice(0,10), role: document.activeElement.getAttribute('role'), checked: document.activeElement.getAttribute('aria-checked') })`);
  log(`  ↓ ArrowDown → 焦点 role=${st.role} aria-checked=${st.checked} 「${st.name}」`);

  await pressKey(send, 'ArrowDown', 'ArrowDown', 40);
  st = await evalJs(send, `({ name: document.activeElement.textContent.trim().replace(/\\s+/g,' ').slice(0,10), role: document.activeElement.getAttribute('role'), checked: document.activeElement.getAttribute('aria-checked') })`);
  log(`  ↓ ArrowDown → 焦点 role=${st.role} aria-checked=${st.checked} 「${st.name}」`);

  const beforePick = await evalJs(send, THEME_STATE);
  await pressKey(send, 'Enter', 'Enter', 13);
  const afterPick = await evalJs(send, THEME_STATE);
  const closed = !(await evalJs(send, `!!document.getElementById('theme-switcher-menu')`));
  const focusBack = await evalJs(send, `document.activeElement.getAttribute('aria-haspopup') === 'menu'`);
  log(`  Enter 选中 → 面板关闭=${closed} theme ${beforePick.theme}→${afterPick.theme}  按钮「${afterPick.btnText}」  焦点回按钮=${focusBack}`);

  // 重新打开测 Escape
  const t2 = await evalJs(send, FIND_TRIGGER);
  await realClick(send, t2.x, t2.y);
  await pressKey(send, 'Escape', 'Escape', 27);
  st = await evalJs(send, `({ open: !!document.getElementById('theme-switcher-menu'), focusBack: document.activeElement.getAttribute('aria-haspopup') === 'menu' })`);
  log(`  Escape → 面板=${st.open?'开':'关'} 焦点回按钮=${st.focusBack}`);
  log('');

  // ---- 5. 溢出 + 回归 ----
  const ov = await evalJs(send, `({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth })`);
  log(`--- 5) 横向溢出: scrollWidth=${ov.sw} clientWidth=${ov.cw} 差值=${ov.sw - ov.cw}`);

  const radiusBad = await evalJs(send, `(() => {
    const bad = [];
    for (const el of document.querySelectorAll('*')) {
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none') continue;
      const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) continue;
      const vals = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomLeftRadius, cs.borderBottomRightRadius];
      for (const v of vals) {
        if (!v || v.includes('%') || v.includes('calc')) continue;
        const n = parseFloat(v);
        if (n > 2 && n < 900) { bad.push({ tag: el.tagName, cls: (el.className||'').toString().slice(0,60), r: v }); break; }
      }
      if (bad.length >= 8) break;
    }
    return { count: bad.length, sample: bad.slice(0,5) };
  })()`);
  log(`--- 可见元素非圆形圆角(>2px)数=${radiusBad.count}`);
  if (radiusBad.count) log('    样本: ' + JSON.stringify(radiusBad.sample));

  const nodeCount = await evalJs(send, `(() => { const m = document.body.innerText.match(/(\\d+)\\s*个历史节点/); return m ? Number(m[1]) : null; })()`);
  log(`--- 历史节点数（页面文案）=${nodeCount}`);

  // ---- 6. 五套主题对比度 ----
  log('');
  log('--- 6) 五套主题可读性实测（WCAG 对比度，canvas 真实混色） ---');
  for (const th of themes) {
    if (!(await evalJs(send, `!!document.getElementById('theme-switcher-menu')`))) {
      const t = await evalJs(send, FIND_TRIGGER);
      await realClick(send, t.x, t.y);
    }
    const pos = await evalJs(send, `(() => {
      const btn = [...document.querySelectorAll('#theme-switcher-menu [role="menuitemradio"]')].find(b => b.textContent.includes(${JSON.stringify(th.name)}));
      if (!btn) return null;
      const r = btn.getBoundingClientRect();
      return { x: r.left + r.width/2, y: r.top + r.height/2 };
    })()`);
    if (pos) await realClick(send, pos.x, pos.y);
    await sleep(150);
    const c = await evalJs(send, CONTRAST_PROBE);
    const flags = [];
    if (c.textVsBg < 4.5) flags.push('正文<AA');
    if (c.borderVsBg < 1.5) flags.push('1px细线几乎不可见');
    if (c.primaryVsBg < 3) flags.push('主色/下划线偏低');
    if (c.ringVsBg < 3) flags.push('焦点环偏低');
    log(`  ${th.name}(${c.theme}): 正文/背景=${c.textVsBg}:1  1px细线(--border)/背景=${c.borderVsBg}:1  --primary/背景=${c.primaryVsBg}:1  焦点环(--ring)/背景=${c.ringVsBg}:1  header下边框/背景=${c.headerBorderVsBg ?? 'N/A'}:1  下划线/背景=${c.underlineVsBg ?? 'N/A'}:1${flags.length ? '  ⚠️ ' + flags.join(', ') : ''}`);
  }
  log('');

  // ---- 7. 时间轴视图卡片计数（仅桌面） ----
  if (width >= 900) {
    log('--- 7) 时间轴视图卡片计数 ---');
    const tlBtn = await evalJs(send, `(() => { const b = document.querySelector('[aria-label="切换到时间轴视图"]'); if (!b) return null; const r = b.getBoundingClientRect(); return { x: r.left + r.width/2, y: r.top + r.height/2, label: b.getAttribute('aria-label'), cls: b.className.slice(0,80) }; })()`);
    if (tlBtn) {
      await realClick(send, tlBtn.x, tlBtn.y);
      await sleep(800);
      const counts = await evalJs(send, `(() => {
        const main = document.querySelector('main');
        if (!main) return null;
        const all = {};
        for (const el of main.querySelectorAll('*')) {
          const c = (el.className||'').toString();
          if (!c || c.length < 6) continue;
          all[c] = (all[c]||0) + 1;
        }
        const entries = Object.entries(all).filter(([k,n]) => n >= 8 && n <= 120).sort((a,b)=>b[1]-a[1]).slice(0, 12);
        const clusterDots = main.querySelectorAll('[class*="size-3.5"][class*="rounded-full"]').length;
        const compactDots = main.querySelectorAll('[class*="size-2"][class*="rounded-full"]').length;
        const dashedBorderItems = main.querySelectorAll('[class*="border-dashed"]').length;
        const eraBlocks = main.querySelectorAll('div.relative.mb-10').length;
        const stickyEra = main.querySelectorAll('div.sticky.top-0').length;
        return { entries, clusterDots, compactDots, dashedBorderItems, eraBlocks, stickyEra };
      })()`);
      log(`  时代块(era)=${counts.stickyEra},  时代容器(relative mb-10)=${counts.eraBlocks}`);
      log(`  节点圆点(size-3.5)=${counts.clusterDots},  小圆点(size-2)=${counts.compactDots},  虚线节点项=${counts.dashedBorderItems}`);
      log(`  top 重复类 (12 组):`);
      for (const [cls, n] of counts.entries) log(`    ${String(n).padStart(3)}  ${cls.slice(0,90)}`);
    } else {
      log('  未找到时间轴视图按钮');
    }
  }

  const errs = await evalJs(send, `window.__errs || []`).catch(() => []);
  log(``);
  log(`控制台错误=${(errs||[]).length}`);

  console.log(out.join('\n'));
  process.exit(0);
}

main().catch((e) => {
  console.log('ERROR: ' + (e && e.stack ? e.stack : e));
  console.log(out.join('\n'));
  process.exit(1);
});
