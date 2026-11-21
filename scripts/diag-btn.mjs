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

// 开详情
const tl = await evalJs(`(()=>{const b=document.querySelector('[aria-label="切换到时间轴视图"]');const r=b.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2}})()`);
await send('Input.dispatchMouseEvent',{type:'mousePressed',x:tl.x,y:tl.y,button:'left',buttons:1});
await sleep(50);await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:tl.x,y:tl.y,button:'left',buttons:0});
await sleep(800);
const card = await evalJs(`(()=>{const c=document.querySelector('.timeline-node');const r=c.getBoundingClientRect();return{x:r.left+20,y:r.top+r.height/2}})()`);
await send('Input.dispatchMouseEvent',{type:'mousePressed',x:card.x,y:card.y,button:'left',buttons:1});
await sleep(50);await send('Input.dispatchMouseEvent',{type:'mouseReleased',x:card.x,y:card.y,button:'left',buttons:0});
await sleep(600);

const btn = await evalJs(`(() => {
  const b = document.querySelector('[aria-haspopup="menu"]');
  const r = b.getBoundingClientRect();
  const cx = r.left + r.width/2, cy = r.top + r.height/2;
  const stack = document.elementsFromPoint(cx, cy);
  return {
    w: Math.round(r.width), h: Math.round(r.height),
    cx: Math.round(cx), cy: Math.round(cy),
    hitSelf: stack.some(el => el===b || b.contains(el)),
    top3: stack.slice(0,4).map(el => el.tagName + '.' + (el.className||'').toString().slice(0,60)),
    expanded: b.getAttribute('aria-expanded'),
  };
})()`);
console.log('按钮状态:', JSON.stringify(btn));

// 直接调用 .click() 看面板能不能开
await evalJs(`document.querySelector('[aria-haspopup="menu"]').click()`);
await sleep(300);
console.log('合成 .click() 后 面板:', await evalJs(`!!document.getElementById('theme-switcher-menu')`));
console.log('详情:', await evalJs(`!!document.querySelector('[role="dialog"][aria-label="节点详情"]')`));

process.exit(0);
