/**
 * 主题面板左对齐 + 越界翻转验证
 */
import http from 'node:http';

const CDP_PORT = process.env.CDP_PORT || 9223;
const url = process.argv[2] || 'http://localhost:8080/app/app_17c9k0cjz33/';

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
  if (r.exceptionDetails) throw new Error('eval failed: ' + JSON.stringify(r.exceptionDetails));
  return r.result.value;
}

async function realClick(send, x, y) {
  await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y, button: 'none' });
  await sleep(30);
  await send('Input.dispatchMouseEvent', { type: 'mousePressed', x, y, button: 'left', buttons: 1, clickCount: 1 });
  await sleep(50);
  await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x, y, button: 'left', buttons: 0, clickCount: 1 });
  await sleep(300);
}

async function setViewport(send, w, h, mobile) {
  await send('Emulation.setDeviceMetricsOverride', { width: w, height: h, deviceScaleFactor: 1, mobile: !!mobile });
  await sleep(400);
}

const GET_GEOMETRY = `(() => {
  const btn = document.querySelector('[aria-haspopup="menu"]');
  const panel = document.getElementById('theme-switcher-menu');
  if (!btn || !panel) return null;
  const br = btn.getBoundingClientRect();
  const pr = panel.getBoundingClientRect();
  const vw = window.innerWidth;
  return {
    btn: { left: Math.round(br.left), right: Math.round(br.right), top: Math.round(br.top), bottom: Math.round(br.bottom), w: Math.round(br.width), h: Math.round(br.height) },
    panel: { left: Math.round(pr.left), right: Math.round(pr.right), top: Math.round(pr.top), bottom: Math.round(pr.bottom), w: Math.round(pr.width), h: Math.round(pr.height) },
    viewport: { width: vw, height: window.innerHeight },
    leftDiff: Math.round(pr.left - br.left),         // 左边缘差（0=左对齐）
    rightDiff: Math.round(pr.right - br.right),      // 右边缘差（0=右对齐）
    rightGap: Math.round(vw - pr.right),             // 面板右缘距视口右缘
    leftGap: Math.round(pr.left),                    // 面板左缘距视口左缘
  };
})()`;

const DETAIL_DETECT_FN = `(() => {
  const dialog = document.querySelector('[role="dialog"][aria-label="节点详情"]');
  if (dialog) {
    const r = dialog.getBoundingClientRect();
    return { open: r.width > 50 && r.height > 100, label: 'bottom-sheet' };
  }
  const panels = [...document.querySelectorAll('div, aside')].filter((el) => {
    const cs = getComputedStyle(el);
    if (cs.position !== 'fixed') return false;
    if (cs.top !== '0px') return false;
    const r = el.getBoundingClientRect();
    if (r.width < 200) return false;
    if (Math.abs(r.right - innerWidth) > 2) return false;
    if (el.id === 'theme-switcher-menu') return false;
    if (el.querySelector('[aria-label="节点详情"]')) return true;
    return r.width >= 400 && r.width <= 600;
  });
  if (!panels.length) return { open: false, label: 'none' };
  return { open: true, label: 'sidebar' };
})`;

const FILTER_BTN = `(() => {
  const b = document.querySelector('[aria-label="筛选"], button[aria-label="筛选"]');
  if (!b) return null;
  const r = b.getBoundingClientRect();
  return { left: Math.round(r.left), right: Math.round(r.right), w: Math.round(r.width) };
})()`;

const HIT_5 = `(() => {
  const items = document.querySelectorAll('#theme-switcher-menu [role="menuitemradio"]');
  return [...items].map(b => {
    const r = b.getBoundingClientRect();
    const cx = r.left + r.width/2, cy = r.top + r.height/2;
    const stack = document.elementsFromPoint(cx, cy);
    return {
      name: (b.querySelector('div > div')?.textContent || b.textContent || '').trim().slice(0,4),
      hitSelf: stack.some(el => el === b || b.contains(el)),
    };
  });
})()`;

async function openDetail(send) {
  // 切时间轴
  const tl = await evalJs(send, `(() => { const b = document.querySelector('[aria-label="切换到时间轴视图"]'); if (!b) return null; const r = b.getBoundingClientRect(); return { x: r.left + r.width/2, y: r.top + r.height/2 }; })()`);
  if (!tl) return false;
  await realClick(send, tl.x, tl.y);
  await sleep(800);
  const card = await evalJs(send, `(() => { const c = document.querySelector('.timeline-node'); if (!c) return null; const r = c.getBoundingClientRect(); return { x: r.left + Math.min(40, r.width/2), y: r.top + r.height/2 }; })()`);
  if (!card) return false;
  await realClick(send, card.x, card.y);
  await sleep(600);
  const ds = await evalJs(send, `(${DETAIL_DETECT_FN})()`);
  return ds.open;
}

async function openThemePanel(send) {
  const btn = await evalJs(send, `(() => { const b = document.querySelector('[aria-haspopup="menu"]'); if (!b) return null; const r = b.getBoundingClientRect(); return { x: r.left + r.width/2, y: r.top + r.height/2 }; })()`);
  if (!btn) return false;
  await realClick(send, btn.x, btn.y);
  return await evalJs(send, `!!document.getElementById('theme-switcher-menu')`);
}

function printGeometry(g, label) {
  log(`  ${label}:`);
  log(`    按钮: x=${g.btn.left}..${g.btn.right} (w=${g.btn.w} h=${g.btn.h})`);
  log(`    面板: x=${g.panel.left}..${g.panel.right} (w=${g.panel.w} h=${g.panel.h})`);
  log(`    左边缘差=${g.leftDiff}  右边缘差=${g.rightDiff}`);
  log(`    面板左距视口左=${g.leftGap}px  面板右距视口右=${g.rightGap}px`);
  const leftAligned = g.leftDiff === 0;
  const rightAligned = g.rightDiff === 0;
  log(`    对齐方式: ${leftAligned ? '左对齐 ✓' : rightAligned ? '右对齐（翻转）' : '其他'}`);
  const inViewport = g.panel.left >= 0 && g.panel.right <= g.viewport.width;
  log(`    完全在视口内: ${inViewport ? '✓' : '✗ 溢出'}`);
}

async function main() {
  const send = await connect();
  await send('Runtime.enable');
  await send('Page.enable');

  await send('Page.navigate', { url });
  await sleep(2000);
  for (let i = 0; i < 40; i++) {
    if (await evalJs(send, `!!document.querySelector('[aria-haspopup="menu"]')`)) break;
    await sleep(500);
  }
  await sleep(2500);

  // ========== 1280 ==========
  log('===== 1280×900 桌面端 =====');
  await setViewport(send, 1280, 900, false);
  const panelOpened1280 = await openThemePanel(send);
  log(`  面板打开: ${panelOpened1280 ? '✓' : '✗'}`);
  if (panelOpened1280) {
    const g = await evalJs(send, GET_GEOMETRY);
    printGeometry(g, '详情关闭时');
    log(`    左对齐正确: ${g.leftDiff === 0 ? '✓' : '✗（应为0）'}`);

    // 是否压住筛选按钮
    const fb = await evalJs(send, FILTER_BTN);
    if (fb) {
      const overlap = g.panel.left < fb.right && g.panel.right > fb.left;
      log(`    筛选按钮: x=${fb.left}..${fb.right}`);
      log(`    面板是否压住筛选按钮: ${overlap ? '✗ 是' : '✓ 否'}`);
    }

    // 五选项命中
    const hits = await evalJs(send, HIT_5);
    const allHit = hits.every(h => h.hitSelf);
    log(`    五选项命中: ${allHit ? '5/5 ✓' : hits.map(h => h.name + ':' + (h.hitSelf?'✓':'✗')).join(' ')}`);
  }

  // ========== 1280 + 详情打开 ==========
  log('');
  log('--- 详情面板打开状态 ---');
  const detailOpened = await openDetail(send);
  log(`  详情打开: ${detailOpened ? '✓' : '✗'}`);
  if (detailOpened) {
    const panelOpen = await openThemePanel(send);
    log(`  主题面板打开: ${panelOpen ? '✓' : '✗'}`);
    if (panelOpen) {
      const g = await evalJs(send, GET_GEOMETRY);
      printGeometry(g, '详情打开时');
      const fb = await evalJs(send, FILTER_BTN);
      if (fb) {
        const overlap = g.panel.left < fb.right && g.panel.right > fb.left;
        log(`    面板是否压住筛选按钮: ${overlap ? '✗ 是' : '✓ 否'}`);
      }
      const hits = await evalJs(send, HIT_5);
      log(`    五选项命中: ${hits.filter(h => h.hitSelf).length}/5`);

      // 切换一个主题验证功能正常
      const before = await evalJs(send, `document.documentElement.getAttribute('data-theme')`);
      const ink = await evalJs(send, `(() => {
        const b = [...document.querySelectorAll('#theme-switcher-menu [role="menuitemradio"]')].find(x => x.textContent.includes('墨夜'));
        if (!b) return null;
        const r = b.getBoundingClientRect();
        return { x: r.left + r.width/2, y: r.top + r.height/2 };
      })()`);
      if (ink) {
        await realClick(send, ink.x, ink.y);
        const after = await evalJs(send, `({ theme: document.documentElement.getAttribute('data-theme'), bg: getComputedStyle(document.body).backgroundColor, detailOpen: (${DETAIL_DETECT_FN})().open })`);
        log(`    切换「墨夜」: theme ${before}→${after.theme}  bg=${after.bg}  详情仍开=${after.detailOpen}`);
      }
    }
  }

  // ========== 1024 中间宽度 ==========
  log('');
  log('===== 1024×800 中间宽度 =====');
  await setViewport(send, 1024, 800, false);
  // 重新打开面板（resize 会触发重新定位，但面板可能仍开着，确保开着）
  const panel1024 = await openThemePanel(send);
  if (!panel1024) {
    // 可能还开着，再点一次
    await openThemePanel(send);
  }
  await sleep(100); // 等 resize 触发的重定位完成
  const g1024 = await evalJs(send, GET_GEOMETRY);
  if (g1024) {
    printGeometry(g1024, '1024 宽');
    const inVP = g1024.panel.left >= 0 && g1024.panel.right <= 1024;
    log(`    完整在视口内: ${inVP ? '✓' : '✗'}`);
  }

  // ========== 768 中间宽度 ==========
  log('');
  log('===== 768×700 中间宽度 =====');
  await setViewport(send, 768, 700, false);
  await openThemePanel(send);
  await sleep(100);
  const g768 = await evalJs(send, GET_GEOMETRY);
  if (g768) {
    printGeometry(g768, '768 宽');
    const inVP = g768.panel.left >= 0 && g768.panel.right <= 768;
    log(`    完整在视口内: ${inVP ? '✓' : '✗'}`);
  }

  // ========== 390 移动端 ==========
  log('');
  log('===== 390×844 移动端 =====');
  await setViewport(send, 390, 844, true);
  await sleep(300);
  // 移动端先确保有可点击的主题按钮
  const btnInfo = await evalJs(send, `(() => { const b = document.querySelector('[aria-haspopup="menu"]'); if (!b) return null; const r = b.getBoundingClientRect(); return { x: r.left + r.width/2, y: r.top + r.height/2, w: Math.round(r.width), visible: r.width > 0 }; })()`);
  log(`  主题按钮: visible=${btnInfo?.visible}  w=${btnInfo?.w}`);

  const panel390 = await openThemePanel(send);
  log(`  面板打开: ${panel390 ? '✓' : '✗'}`);
  if (panel390) {
    const g = await evalJs(send, GET_GEOMETRY);
    printGeometry(g, '390 宽');
    log(`    右对齐（翻转）正确: ${g.rightDiff === 0 ? '✓' : '✗（右边缘差应为0，实际=' + g.rightDiff + '）'}`);
    log(`    面板左缘≥0: ${g.panel.left >= 0 ? '✓' : '✗（left=' + g.panel.left + '）'}`);
    const hits = await evalJs(send, HIT_5);
    log(`    五选项命中: ${hits.filter(h => h.hitSelf).length}/5`);
  }

  // ========== resize 响应：1280→390，面板跟着重定位 ==========
  log('');
  log('--- resize 响应：保持面板打开，从 1280 缩到 390 ---');
  await setViewport(send, 1280, 900, false);
  await openThemePanel(send); // 确保面板开着
  await sleep(100);
  const gBefore = await evalJs(send, GET_GEOMETRY);
  log(`  1280 时: panel left=${gBefore?.panel.left} right=${gBefore?.panel.right}  左对齐=${gBefore?.leftDiff === 0}`);

  await setViewport(send, 390, 844, true);
  await sleep(400); // 等 resize handler
  const gAfter = await evalJs(send, GET_GEOMETRY);
  if (gAfter) {
    log(`  缩到 390 后: panel left=${gAfter.panel.left} right=${gAfter.panel.right}`);
    log(`  右对齐翻转: ${gAfter.rightDiff === 0 ? '✓' : '✗'}`);
    const inVP = gAfter.panel.left >= 0 && gAfter.panel.right <= 390;
    log(`  完整在视口内: ${inVP ? '✓' : '✗'}`);
  }

  // ========== 回归检查 ==========
  log('');
  log('--- 回归检查 ---');
  await setViewport(send, 1280, 900, false);
  const nodeCount = await evalJs(send, `(() => { const m = document.body.innerText.match(/(\\d+)\\s*个历史节点/); return m ? Number(m[1]) : null; })()`);
  log(`  历史节点数: ${nodeCount}`);
  const tlCards = await evalJs(send, `document.querySelectorAll('.timeline-node').length`);
  log(`  时间轴卡片数: ${tlCards}`);
  const ov = await evalJs(send, `({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth })`);
  log(`  横向溢出差值: ${ov.sw - ov.cw}`);
  const radiusBad = await evalJs(send, `(() => {
    let count = 0;
    for (const el of document.querySelectorAll('*')) {
      const cs = getComputedStyle(el);
      if (cs.visibility === 'hidden' || cs.display === 'none') continue;
      const r = el.getBoundingClientRect();
      if (r.width < 1 || r.height < 1) continue;
      const vals = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomLeftRadius, cs.borderBottomRightRadius];
      for (const v of vals) {
        if (!v || v.includes('%')) continue;
        const n = parseFloat(v);
        if (n > 2 && n < 900) { count++; break; }
      }
    }
    return count;
  })()`);
  log(`  非圆形圆角(>2px)数: ${radiusBad}`);

  // 390 溢出
  await setViewport(send, 390, 844, true);
  const ov390 = await evalJs(send, `({ sw: document.documentElement.scrollWidth, cw: document.documentElement.clientWidth })`);
  log(`  390 横向溢出差值: ${ov390.sw - ov390.cw}`);

  log(`  控制台错误: 见运行时`);

  console.log(out.join('\n'));
  process.exit(0);
}

main().catch((e) => {
  console.log('ERROR: ' + (e && e.stack ? e.stack : e));
  console.log(out.join('\n'));
  process.exit(1);
});
