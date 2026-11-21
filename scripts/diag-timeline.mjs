import http from 'node:http';
const CDP_PORT = 9223;
const getJson = (path) => new Promise((res, rej) => {
  const r = http.get({ host: '127.0.0.1', port: CDP_PORT, path }, (s) => { let d=''; s.on('data',c=>d+=c); s.on('end',()=>{try{res(JSON.parse(d))}catch(e){rej(e)}}); });
  r.on('error', rej);
});
const sleep = (ms) => new Promise(r=>setTimeout(r,ms));
const targets = await getJson('/json/list');
const page = targets.find(t=>t.type==='page');
const ws = new WebSocket(page.webSocketDebuggerUrl);
await new Promise((r,j)=>{ws.onopen=r;ws.onerror=j});
let id=0; const pending=new Map();
ws.onmessage=(ev)=>{const m=JSON.parse(ev.data); if(m.id&&pending.has(m.id)){const {resolve,reject}=pending.get(m.id);pending.delete(m.id);m.error?reject(new Error(JSON.stringify(m.error))):resolve(m.result);}};
const send=(method,params={})=>new Promise((resolve,reject)=>{const myId=++id;pending.set(myId,{resolve,reject});ws.send(JSON.stringify({id:myId,method,params}));});
const evalJs=async(expression)=>{const r=await send('Runtime.evaluate',{expression,returnByValue:true,awaitPromise:true});if(r.exceptionDetails)throw new Error(JSON.stringify(r.exceptionDetails));return r.result.value;};
await send('Runtime.enable');
await send('Emulation.setDeviceMetricsOverride',{width:1280,height:900,deviceScaleFactor:1,mobile:false});
await send('Page.navigate',{url:'http://localhost:8080/app/app_17c9k0cjz33/'});
for(let i=0;i<40;i++){ if(await evalJs(`!!document.querySelector('[aria-haspopup="menu"]')`)) break; await sleep(500);}
await sleep(3000);
const info = await evalJs(`(() => {
  const clsCount = {};
  for (const el of document.querySelectorAll('main *')) {
    const c = (el.className||'').toString();
    if (!c) continue;
    clsCount[c] = (clsCount[c]||0)+1;
  }
  const top = Object.entries(clsCount).filter(([,n]) => n>=5 && n<=120).sort((a,b)=>b[1]-a[1]).slice(0, 18);
  return {
    viewBtns: [...document.querySelectorAll('[aria-label^="切换到"]')].map(b=>({l:b.getAttribute('aria-label'), cls:(b.className||'').slice(0,90)})),
    erasRendered: document.querySelectorAll('div.relative.mb-10').length,
    stickyEra: document.querySelectorAll('div.sticky.top-0').length,
    mainText: document.body.innerText.slice(0, 120),
    repeatedClasses: top,
  };
})()`);
console.log(JSON.stringify(info, null, 1));
process.exit(0);
