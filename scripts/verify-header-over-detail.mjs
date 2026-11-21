/**
 * 顶栏被详情面板遮挡验证：详情打开/关闭 × 1280/390 四种组合
 * 用法: node scripts/verify-header-over-detail.mjs [url] [width] [height]
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
  await sleep(250);
}

const ALL_BTN_SEL = `(() => {
  const btns = [...document.querySelectorAll('header button[aria-label]')].map(b => {
    const r = b.getBoundingClientRect();
    return {
      label: b.getAttribute('aria-label') || b.textContent?.trim().slice(0,8) || '',
      cx: Math.round(r.left + r.width/2),
      cy: Math.round(r.top + r.height/2),
      w: Math.round(r.width),
      h: Math.round(r.height),
      visible: r.width > 0 && r.height > 0,
    };
  });
  return btns;
})()`;

const HIT_TEST_ALL = `(() => {
  const results = [];
  for (const b of document.querySelectorAll('header button[aria-label]')) {
    const r = b.getBoundingClientRect();
    if (r.width < 1 || r.height < 1) continue;
    const cx = r.left + r.width/2, cy = r.top + r.height/2;
    const stack = document.elementsFromPoint(cx, cy);
    const hitIsSelf = stack.some(el => el === b || b.contains(el));
    results.push({
      label: b.getAttribute('aria-label') || b.textContent?.trim().slice(0,10) || '',
      cx: Math.round(cx),
      cy: Math.round(cy),
      w: Math.round(r.width),
      h: Math.round(r.height),
      hitSelf: hitIsSelf,
      topOfStack: stack.slice(0, 3).map(el => el.tagName + '.' + (el.className||'').toString().slice(0,40)),
    });
  }
  return results;
})()`;

const DETAIL_DETECT_FN = `(() => {
  // 1. 移动端 bottom sheet：有 role=dialog aria-label="节点详情"
  const dialog = document.querySelector('[role="dialog"][aria-label="节点详情"]');
  if (dialog) {
    const r = dialog.getBoundingClientRect();
    const visible = r.width > 50 && r.height > 100;
    return { open: visible, left: Math.round(r.left), width: Math.round(r.width), height: Math.round(r.height), zIndex: getComputedStyle(dialog).zIndex, label: 'bottom-sheet' };
  }
  // 2. 桌面端侧边栏：找 fixed + 靠右 + 满屏高的面板
  const panels = [...document.querySelectorAll('div, aside')].filter((el) => {
    const cs = getComputedStyle(el);
    if (cs.position !== 'fixed') return false;
    if (cs.top !== '0px') return false;
    if (cs.bottom !== '0px' && Math.abs(parseFloat(cs.height) - innerHeight) > 2) return false;
    const r = el.getBoundingClientRect();
    if (r.width < 200) return false;
    if (Math.abs(r.right - innerWidth) > 2) return false;
    // 排除顶栏、主题面板等明显不是详情的
    if (el.getAttribute('role') === 'menubar' || el.id === 'theme-switcher-menu') return false;
    if (el.querySelector('[aria-label="节点详情"], [data-detail-content]')) return true;
    if (el.querySelector('.detail-panel, [class*="DetailPanel"]')) return true;
    // 启发式：宽度 400-600 的右侧固定面板一般是详情
    return r.width >= 400 && r.width <= 600;
  });
  if (!panels.length) return { open: false, left: 0, width: 0, height: 0, zIndex: 0, label: 'none' };
  const p = panels[0];
  const r = p.getBoundingClientRect();
  return {
    open: r.width > 200,
    left: Math.round(r.left),
    width: Math.round(r.width),
    height: Math.round(r.height),
    zIndex: getComputedStyle(p).zIndex,
      label: 'sidebar',
    };
  })`;

async function openDetail(send) {
  // 切到时间轴
  const tl = await evalJs(send, `(() => { const b = document.querySelector('[aria-label="切换到时间轴视图"]'); if (!b) return null; const r = b.getBoundingClientRect(); return { x: r.left + r.width/2, y: r.top + r.height/2, exists: true }; })()`);
  if (!tl) return false;
  await realClick(send, tl.x, tl.y);
  await sleep(800);
  // 点第一张卡片
  const card = await evalJs(send, `(() => {
    const card = document.querySelector('.timeline-node');
    if (!card) return null;
    const r = card.getBoundingClientRect();
    return { x: r.left + Math.min(40, r.width/2), y: r.top + r.height/2, w: Math.round(r.width), h: Math.round(r.height), top: Math.round(r.top) };
  })()`);
  if (!card) return false;
  await realClick(send, card.x, card.y);
  await sleep(500);
  const ds = await evalJs(send, `(${DETAIL_DETECT_FN})()`);
  return ds.open;
}

async function pressKey(send, key, code, vk) {
  const textMap = { Enter: '\r', ' ': ' ' };
  const text = textMap[key];
  await send('Input.dispatchKeyEvent', {
    type: 'keyDown',
    key, code,
    windowsVirtualKeyCode: vk, nativeVirtualKeyCode: vk,
    ...(text ? { text, unmodifiedText: text } : {}),
  });
  await sleep(40);
  await send('Input.dispatchKeyEvent', { type: 'keyUp', key, code, windowsVirtualKeyCode: vk, nativeVirtualKeyCode: vk });
  await sleep(200);
}

async function main() {
  const send = await connect();
  await send('Runtime.enable');
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: 1, mobile: width < 500 });

  await send('Page.navigate', { url });
  await sleep(2000);

  // 等页面就绪
  for (let i = 0; i < 40; i++) {
    if (await evalJs(send, `!!document.querySelector('[aria-haspopup="menu"]')`)) break;
    await sleep(500);
  }
  await sleep(3000); // 等加载遮罩卸载

  log(`===== 视口 ${width}x${height} =====`);
  log('');

  // ---- 1. 详情关闭时命中 ----
  log('--- 【详情关闭】顶栏按钮 elementFromPoint 命中 ---');
  const hitsClosed = await evalJs(send, HIT_TEST_ALL);
  let rightOkClosed = 0, rightTotalClosed = 0;
  for (const b of hitsClosed) {
    const isRight = b.cx > width * 0.6;
    if (isRight) { rightTotalClosed++; if (b.hitSelf) rightOkClosed++; }
    log(`  ${String(b.label).padEnd(16)} 中心=(${b.cx},${b.cy}) 尺寸=${b.w}x${b.h}  命中自身=${b.hitSelf ? '✓' : '✗'}${b.hitSelf ? '' : '  遮挡栈顶=' + b.topOfStack[0]}`);
  }
  log(`  右侧按钮命中: ${rightOkClosed}/${rightTotalClosed}`);
  log('');

  // ---- 2. 打开详情 ----
  const opened = await openDetail(send);
  const ds = await evalJs(send, `(${DETAIL_DETECT_FN})()`);
  log(`详情面板: open=${ds.open} left=${ds.left} width=${ds.width} height=${ds.height} z-index=${ds.zIndex}`);
  if (!ds.open) {
    log('FAIL: 无法打开详情面板');
    console.log(out.join('\n'));
    process.exit(1);
  }
  log('');

  // ---- 3. 详情打开时命中 ----
  log('--- 【详情打开】顶栏按钮 elementFromPoint 命中 ---');
  const hitsOpen = await evalJs(send, HIT_TEST_ALL);
  let rightOkOpen = 0, rightTotalOpen = 0;
  for (const b of hitsOpen) {
    const isRight = b.cx > width * 0.6;
    if (isRight) { rightTotalOpen++; if (b.hitSelf) rightOkOpen++; }
    log(`  ${String(b.label).padEnd(16)} 中心=(${b.cx},${b.cy}) 尺寸=${b.w}x${b.h}  命中自身=${b.hitSelf ? '✓' : '✗'}${b.hitSelf ? '' : '  遮挡栈顶=' + b.topOfStack[0]}`);
  }
  log(`  右侧按钮命中: ${rightOkOpen}/${rightTotalOpen}`);
  log('');

  // ---- 4. 详情开着时点主题面板 ----
  log('--- 【详情打开】主题面板开合 + 选项命中 ---');
  const themeBtn = await evalJs(send, `(() => { const b = document.querySelector('[aria-haspopup="menu"]'); if (!b) return null; const r = b.getBoundingClientRect(); return { x: r.left + r.width/2, y: r.top + r.height/2, w: Math.round(r.width), label: b.textContent.trim() }; })()`);
  if (!themeBtn) { log('FAIL: 未找到主题按钮'); console.log(out.join('\n')); process.exit(1); }

  // 连点 5 次
  const seq = [];
  for (let i = 1; i <= 5; i++) {
    await realClick(send, themeBtn.x, themeBtn.y);
    const open = await evalJs(send, `!!document.getElementById('theme-switcher-menu')`);
    const exp = await evalJs(send, `document.querySelector('[aria-haspopup="menu"]').getAttribute('aria-expanded')`);
    seq.push(`第${i}次: 面板=${open?'开':'关'} aria-expanded=${exp}`);
  }
  log('  连点 5 次:');
  for (const s of seq) log('    ' + s);

  // 打开面板
  if (!(await evalJs(send, `!!document.getElementById('theme-switcher-menu')`))) {
    await realClick(send, themeBtn.x, themeBtn.y);
  }

  // 五选项命中
  const panelHit = await evalJs(send, `(() => {
    const menu = document.getElementById('theme-switcher-menu');
    if (!menu) return null;
    return [...menu.querySelectorAll('[role="menuitemradio"]')].map(b => {
      const r = b.getBoundingClientRect();
      const cx = r.left + r.width/2, cy = r.top + r.height/2;
      const stack = document.elementsFromPoint(cx, cy);
      const hitSelf = stack.some(el => el === b || b.contains(el));
      return {
        name: (b.querySelector('div > div')?.textContent || b.textContent || '').trim().slice(0,4),
        cx: Math.round(cx), cy: Math.round(cy),
        hitSelf,
        topOfStack: stack.slice(0,2).map(el => el.tagName + '.' + (el.className||'').toString().slice(0,40)),
      };
    });
  })()`);
  log('  五选项命中:');
  let allHit = true;
  for (const it of panelHit) {
    if (!it.hitSelf) allHit = false;
    log(`    ${String(it.name).padEnd(4)} (${it.cx},${it.cy})  hitSelf=${it.hitSelf?'✓':'✗'}${it.hitSelf?'':'  遮挡='+it.topOfStack[0]}`);
  }
  log(`  全部命中: ${allHit ? '✓' : '✗'}`);
  log('');

  // ---- 5. 详情开着时切换主题 ----
  log('--- 【详情打开】真实指针切换「墨夜」→「羊皮纸」 ---');
  const beforeInk = await evalJs(send, `({ theme: document.documentElement.getAttribute('data-theme'), bg: getComputedStyle(document.body).backgroundColor, btn: (document.querySelector('[aria-haspopup="menu"]')||{}).textContent?.trim() })`);

  const inkPos = await evalJs(send, `(() => {
    const b = [...document.querySelectorAll('#theme-switcher-menu [role="menuitemradio"]')].find(x => x.textContent.includes('墨夜'));
    if (!b) return null;
    const r = b.getBoundingClientRect();
    return { x: r.left + r.width/2, y: r.top + r.height/2 };
  })()`);
  if (inkPos) await realClick(send, inkPos.x, inkPos.y);
  const afterInk = await evalJs(send, `({ theme: document.documentElement.getAttribute('data-theme'), bg: getComputedStyle(document.body).backgroundColor, btn: (document.querySelector('[aria-haspopup="menu"]')||{}).textContent?.trim(), detailOpen: (${DETAIL_DETECT_FN})().open })`);
  log(`  点墨夜: theme ${beforeInk.theme}→${afterInk.theme}  bg ${beforeInk.bg}→${afterInk.bg}  按钮「${beforeInk.btn}」→「${afterInk.btn}」  详情仍开=${afterInk.detailOpen}`);

  // 再打开面板，点羊皮纸
  await realClick(send, themeBtn.x, themeBtn.y);
  const parchPos = await evalJs(send, `(() => {
    const b = [...document.querySelectorAll('#theme-switcher-menu [role="menuitemradio"]')].find(x => x.textContent.includes('羊皮纸'));
    if (!b) return null;
    const r = b.getBoundingClientRect();
    return { x: r.left + r.width/2, y: r.top + r.height/2 };
  })()`);
  if (parchPos) await realClick(send, parchPos.x, parchPos.y);
  const afterParch = await evalJs(send, `({ theme: document.documentElement.getAttribute('data-theme'), bg: getComputedStyle(document.body).backgroundColor, btn: (document.querySelector('[aria-haspopup="menu"]')||{}).textContent?.trim(), detailOpen: (${DETAIL_DETECT_FN})().open })`);
  log(`  点羊皮纸: theme ${afterInk.theme}→${afterParch.theme}  bg ${afterInk.bg}→${afterParch.bg}  按钮「${afterInk.btn}」→「${afterParch.btn}」  详情仍开=${afterParch.detailOpen}`);
  log('');

  // ---- 6. 详情开着时键盘路径 ----
  log('--- 【详情打开】键盘路径 ---');
  // 打开面板
  await evalJs(send, `document.querySelector('[aria-haspopup="menu"]').focus()`);
  await pressKey(send, 'Enter', 'Enter', 13);
  let st = await evalJs(send, `({ panelOpen: !!document.getElementById('theme-switcher-menu'), focusRole: document.activeElement.getAttribute('role'), focusName: document.activeElement.textContent.trim().replace(/\\s+/g,' ').slice(0,10) })`);
  log(`  Enter 打开 → 面板=${st.panelOpen?'开':'关'} 焦点 role=${st.focusRole} 「${st.focusName}」`);

  await pressKey(send, 'ArrowDown', 'ArrowDown', 40);
  st = await evalJs(send, `({ focusRole: document.activeElement.getAttribute('role'), focusName: document.activeElement.textContent.trim().replace(/\\s+/g,' ').slice(0,10) })`);
  log(`  ↓ ArrowDown → 焦点 role=${st.focusRole} 「${st.focusName}」`);

  await pressKey(send, 'ArrowDown', 'ArrowDown', 40);
  st = await evalJs(send, `({ focusRole: document.activeElement.getAttribute('role'), focusName: document.activeElement.textContent.trim().replace(/\\s+/g,' ').slice(0,10) })`);
  log(`  ↓ ArrowDown → 焦点 role=${st.focusRole} 「${st.focusName}」`);

  const beforeKb = await evalJs(send, `({ theme: document.documentElement.getAttribute('data-theme'), btn: (document.querySelector('[aria-haspopup="menu"]')||{}).textContent?.trim() })`);
  await pressKey(send, 'Enter', 'Enter', 13);
  const afterKb = await evalJs(send, `({ theme: document.documentElement.getAttribute('data-theme'), btn: (document.querySelector('[aria-haspopup="menu"]')||{}).textContent?.trim(), panelOpen: !!document.getElementById('theme-switcher-menu'), focusBack: document.activeElement.getAttribute('aria-haspopup')==='menu', detailOpen: (${DETAIL_DETECT_FN})().open })`);
  log(`  Enter 选中 → 面板关闭=${!afterKb.panelOpen}  theme ${beforeKb.theme}→${afterKb.theme}  焦点回按钮=${afterKb.focusBack}  详情仍开=${afterKb.detailOpen}`);

  // 重新打开面板，测 Escape
  await realClick(send, themeBtn.x, themeBtn.y);
  await pressKey(send, 'Escape', 'Escape', 27);
  st = await evalJs(send, `({ panelOpen: !!document.getElementById('theme-switcher-menu'), detailOpen: (${DETAIL_DETECT_FN})().open, focusBack: document.activeElement.getAttribute('aria-haspopup')==='menu' })`);
  log(`  Escape → 面板=${st.panelOpen?'开':'关'}  详情=${st.detailOpen?'开':'关'}  焦点回按钮=${st.focusBack}`);
  log('  ⚠️ 一次 Escape 是否同时关掉了面板和详情: ' + (!st.panelOpen && !st.detailOpen ? '是（需修）' : st.panelOpen === false && st.detailOpen === true ? '否（只关了面板，详情还在，正确）' : '异常'));
  log('');

  // ---- 7. 放映机按钮（只查不修） ----
  log('--- 【详情打开】历史放映机按钮实测（只查不修） ---');
  const projBtn = await evalJs(send, `(() => { const b = document.querySelector('[aria-label="历史放映机"]'); if (!b) return null; const r = b.getBoundingClientRect(); return { x: r.left + r.width/2, y: r.top + r.height/2, label: b.getAttribute('aria-label'), w: Math.round(r.width), h: Math.round(r.height) }; })()`);
  if (projBtn) {
    const stack = await evalJs(send, `(() => { const b = document.querySelector('[aria-label="历史放映机"]'); const r = b.getBoundingClientRect(); const cx = r.left + r.width/2, cy = r.top + r.height/2; const s = document.elementsFromPoint(cx, cy); return { hitSelf: s.some(el=>el===b||b.contains(el)), top3: s.slice(0,3).map(el=>el.tagName+'.'+(el.className||'').toString().slice(0,50)) }; })()`);
    log(`  按钮: label="${projBtn.label}" 中心=(${projBtn.x},${projBtn.y}) 尺寸=${projBtn.w}x${projBtn.h}`);
    log(`  命中自身: ${stack.hitSelf?'✓':'✗'}`);
    if (!stack.hitSelf) log(`    遮挡栈顶: ${stack.top3.join(' | ')}`);

    await realClick(send, projBtn.x, projBtn.y);
    await sleep(500);
    const popupState = await evalJs(send, `(() => {
      // 找放映机弹层：找任何在放映机按钮下方、含文字的弹层
      const btn = document.querySelector('[aria-label="历史放映机"]');
      const btnR = btn.getBoundingClientRect();
      // 找所有可能的弹层（position: absolute/fixed，高>50，在按钮下方）
      const candidates = [...document.querySelectorAll('div')].filter(el => {
        const cs = getComputedStyle(el);
        if (cs.position !== 'absolute' && cs.position !== 'fixed') return false;
        const r = el.getBoundingClientRect();
        if (r.height < 60 || r.width < 200) return false;
        if (r.top < btnR.bottom - 10) return false;
        if (r.top > btnR.bottom + 400) return false;
        return true;
      }).sort((a,b)=>a.getBoundingClientRect().top - b.getBoundingClientRect().top);

      const text = candidates.map(el => el.innerText?.slice(0, 200)).filter(Boolean);
      return {
        popupCount: candidates.length,
        popups: candidates.slice(0,3).map((el,i) => ({
          idx: i,
          text: el.innerText?.slice(0, 150) || '',
          rect: el.getBoundingClientRect(),
          pos: getComputedStyle(el).position,
          z: getComputedStyle(el).zIndex,
        })),
      };
    })()`);
    log(`  点击后弹层数: ${popupState.popupCount}`);
    for (const p of popupState.popups) {
      log(`    弹层${p.idx}: pos=${p.pos} z=${p.z} rect=(${Math.round(p.rect.left)},${Math.round(p.rect.top)})~(${Math.round(p.rect.left+p.rect.width)},${Math.round(p.rect.top+p.rect.height)})`);
      if (p.text) log(`      文本: "${p.text.replace(/\\s+/g,' ').slice(0,120)}"`);
    }
  } else {
    log('  未找到放映机按钮');
  }
  log('');

  // ---- 8. 回归 ----
  const ov = await evalJs(send, `({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth })`);
  log(`--- 横向溢出: scrollWidth=${ov.sw} clientWidth=${ov.cw} 差值=${ov.sw - ov.cw}`);

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
        if (n > 2 && n < 900) { bad.push({ tag: el.tagName, cls: (el.className||'').toString().slice(0,50), r: v }); break; }
      }
      if (bad.length >= 5) break;
    }
    return { count: bad.length, sample: bad.slice(0,3) };
  })()`);
  log(`--- 可见元素非圆形圆角(>2px)数=${radiusBad.count}`);

  const nodeCount = await evalJs(send, `(() => { const m = document.body.innerText.match(/(\\d+)\\s*个历史节点/); return m ? Number(m[1]) : null; })()`);
  log(`--- 历史节点数=${nodeCount}`);

  // 时间轴卡片
  const tlCards = await evalJs(send, `(() => {
    const main = document.querySelector('main');
    if (!main) return null;
    return {
      timelineNodes: main.querySelectorAll('.timeline-node').length,
      stickyEras: main.querySelectorAll('div.sticky.top-0').length,
    };
  })()`);
  log(`--- 时间轴 timeline-node 数=${tlCards?.timelineNode ?? tlCards?.timelineNodes}  时代 sticky 数=${tlCards?.stickyEras}`);

  const errs = await evalJs(send, `window.__errs || []`).catch(() => []);
  log(`--- 控制台错误=${(errs||[]).length}`);

  console.log(out.join('\n'));
  process.exit(0);
}

main().catch((e) => {
  console.log('ERROR: ' + (e && e.stack ? e.stack : e));
  console.log(out.join('\n'));
  process.exit(1);
});
