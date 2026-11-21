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
const evalJs=async expr=>{const r=await send('Runtime.evaluate',{expression:expr,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(r.exceptionDetails.exception?.description||JSON.stringify(r.exceptionDetails));return r.result.value;};
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride',{width:390,height:844,deviceScaleFactor:1,mobile:true});
await send('Page.navigate',{url:'http://localhost:8080/app/app_17c9k0cjz33/'});
for(let i=0;i<40;i++){if(await evalJs(`!!document.querySelector('[aria-haspopup="menu"]')`))break;await sleep(500);}
await sleep(2000);

// 直接试 DETECT_FN
import { readFileSync } from 'fs';
const script = readFileSync('scripts/verify-header-over-detail.mjs', 'utf8');
const match = script.match(/const DETAIL_DETECT_FN = `([\s\S]*?)`;\n\nasync function openDetail/);
if (!match) { console.log('no match'); process.exit(1); }
const fnBody = match[1];
console.log('fnBody length:', fnBody.length);
try {
  const result = await evalJs(`(${fnBody})()`);
  console.log('result:', JSON.stringify(result));
} catch(e) {
  console.log('eval error:', e.message);
}
process.exit(0);
