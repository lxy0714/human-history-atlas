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

const detailOpen = () => evalJs(`!!document.querySelector('[role="dialog"][aria-label="节点详情"]')`);
const panelOpen = () => evalJs(`!!document.getElementById('theme-switcher-menu')`);

async function click(x, y) {
  await send('Input.dispatchMouseEvent',{type:'mouseMoved',x,y,button:'none'});
  await sleep(30);
  await send('Input.dispatchMouseEvent',{type:'mousePressed',x,y,button:'left',buttons:1});
  await sleep(50);
  await send('Input.dispatchMouseEvent',{type:'mouseReleased',x,y,button:'left',buttons:0});
  await sleep(250);
}

const steps = [];
steps.push(`初始: 详情=${await detailOpen()} 面板=${await panelOpen()}`);

// 点主题按钮
const tb = await evalJs(`(()=>{const b=document.querySelector('[aria-haspopup="menu"]');const r=b.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2}})()`);
await click(tb.x, tb.y);
steps.push(`点主题按钮后: 详情=${await detailOpen()} 面板=${await panelOpen()}`);

// 点第一个选项（博物馆）
const opt1 = await evalJs(`(()=>{const b=document.querySelector('#theme-switcher-menu [role="menuitemradio"]:first-child');if(!b)return null;const r=b.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2,name:b.textContent.trim().slice(0,4)}})()`);
if (opt1) { await click(opt1.x, opt1.y); steps.push(`点「${opt1.name}」后: 详情=${await detailOpen()} 面板=${await panelOpen()}`); }

// 再点主题按钮
await click(tb.x, tb.y);
steps.push(`再点主题按钮: 详情=${await detailOpen()} 面板=${await panelOpen()}`);

// 点第二个选项（墨夜）
const opt2 = await evalJs(`(()=>{const bs=document.querySelectorAll('#theme-switcher-menu [role="menuitemradio"]');if(bs.length<2)return null;const b=bs[1];const r=b.getBoundingClientRect();return{x:r.left+r.width/2,y:r.top+r.height/2,name:b.textContent.trim().slice(0,4)}})()`);
if (opt2) { await click(opt2.x, opt2.y); steps.push(`点「${opt2.name}」后: 详情=${await detailOpen()} 面板=${await panelOpen()}`); }

console.log(steps.join('\n'));
process.exit(0);
