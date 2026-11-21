import http from 'node:http';
const CDP_PORT = 9223;
const getJson = (p) => new Promise((res,rej)=>{const r=http.get({host:'127.0.0.1',port:CDP_PORT,path:p},(s)=>{let d='';s.on('data',c=>d+=c);s.on('end',()=>{try{res(JSON.parse(d))}catch(e){rej(e)}})});r.on('error',rej)});
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const targets=await getJson('/json/list');
const page=targets.find(t=>t.type==='page');
const ws=new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j});
let id=0;const pending=new Map();
ws.onmessage=ev=>{const m=JSON.parse(ev.data);if(m.id&&pending.has(m.id)){const {resolve,reject}=pending.get(m.id);pending.delete(m.id);m.error?reject(new Error(JSON.stringify(m.error))):resolve(m.result);}};
const send=(method,params={})=>new Promise((resolve,reject)=>{const myId=++id;pending.set(myId,{resolve,reject});ws.send(JSON.stringify({id:myId,method,params}))});
const evalJs=async expr=>{const r=await send('Runtime.evaluate',{expression:expr,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
await send('Page.navigate',{url:'http://localhost:8080/app/app_17c9k0cjz33/'});
for(let i=0;i<40;i++){if(await evalJs(`!!document.querySelector('[aria-haspopup="menu"]')`))break;await sleep(500);}
await sleep(3000);

// 切时间轴，打开详情
const tl = await evalJs(`(()=>{const b=document.querySelector('[aria-label="切换到时间轴视图"]');if(!b)return null;const r=b.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2}})()`);
await send('Input.dispatchMouseEvent',{type:'mousePressed',x:tl.x,y:tl.y,button:'left',buttons:1,clickCount:1});
await sleep(50);
await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:tl.x,y:tl.y,button:'left',buttons:0,clickCount:1});
await sleep(800);
const card = await evalJs(`(()=>{const c=document.querySelector('.timeline-node');if(!c)return null;const r=c.getBoundingClientRect();return{x:r.left+20,y:r.top+r.height/2}})()`);
await send('Input.dispatchMouseEvent',{type:'mousePressed',x:card.x,y:card.y,button:'left',buttons:1,clickCount:1});
await sleep(50);
await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:card.x,y:card.y,button:'left',buttons:0,clickCount:1});
await sleep(600);

const isOpen1 = await evalJs(`!!document.querySelector('[role="dialog"][aria-label="节点详情"]')`);
console.log('详情初始打开:', isOpen1);

// 给遮罩加日志
await evalJs(`
  const overlay = document.querySelector('.fixed.inset-0.z-40');
  if (overlay) {
    overlay.addEventListener('click', () => { window.__overlayClick = (window.__overlayClick||0)+1; }, true);
  }
  window.__overlayClick = 0;
  window.__bodyClick = 0;
  document.body.addEventListener('click', () => { window.__bodyClick++; }, true);
`);

// 点主题按钮打开面板
const tb = await evalJs(`(()=>{const b=document.querySelector('[aria-haspopup="menu"]');const r=b.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2}})()`);
await send('Input.dispatchMouseEvent',{type:'mousePressed',x:tb.x,y:tb.y,button:'left',buttons:1,clickCount:1});
await sleep(50);
await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:tb.x,y:tb.y,button:'left',buttons:0,clickCount:1});
await sleep(300);

const panelOpen = await evalJs(`!!document.getElementById('theme-switcher-menu')`);
console.log('主题面板打开:', panelOpen);

// 点第一个选项
const opt = await evalJs(`(()=>{const b=document.querySelector('#theme-switcher-menu [role="menuitemradio"]');const r=b.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2,name:b.textContent.trim().slice(0,4)}})()`);
console.log('点选项:', opt.name, '坐标:', opt.x, opt.y);

await send('Input.dispatchMouseEvent',{type:'mousePressed',x:opt.x,y:opt.y,button:'left',buttons:1,clickCount:1});
await sleep(50);
await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:opt.x,y:opt.y,button:'left',buttons:0,clickCount:1});
await sleep(300);

const state = await evalJs(`({
  detailOpen: !!document.querySelector('[role="dialog"][aria-label="节点详情"]'),
  panelOpen: !!document.getElementById('theme-switcher-menu'),
  overlayClicks: window.__overlayClick,
  bodyClicks: window.__bodyClick,
  theme: document.documentElement.getAttribute('data-theme'),
})`);
console.log(JSON.stringify(state, null, 2));
process.exit(0);
