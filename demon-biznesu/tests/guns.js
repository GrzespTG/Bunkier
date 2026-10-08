const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:780}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/index.html');
const r=await p.evaluate(()=>{
 // stary zapis z 11 towarami
 newGame(100,3);const old=JSON.parse(JSON.stringify(S));old.m.forEach(r=>r.length=11);old.prev.forEach(r=>r.length=11);old.seen.forEach(r=>r.length=11);
 S=migrate(old);const okMig=S.m.every(r=>r.length===GOODS.length&&r.every(Number.isFinite));
 const g=GOODS.findIndex(x=>x.id==='guns');
 // zysk: najtansze vs najdrozsze miasto
 newGame(100,3);const ps=CITIES.map((_,c)=>mid(c,g)).filter(x=>x!=null);
 const minP=Math.min(...ps),maxP=Math.max(...ps);
 // kupno i sprzedaz
 S.cash=1e6;S.veh=VEH.length-1;const c=CITIES.findIndex(C=>C.cb.guns==='c');S.city=c;const e1=buy(g,5);const have=S.inv.guns&&S.inv.guns.q;
 const d=CITIES.findIndex(C=>C.cb.guns==='d');S.city=d;const cash0=S.cash;const e2=sell(g,5);
 UI.screen='game';UI.tab='market';render();const rows=document.querySelectorAll('.g').length;
 return {okMig,minP:Math.round(minP),maxP:Math.round(maxP),e1,e2,have,zysk:S.cash-cash0,rows,miast:CITIES.filter(C=>C.cb.guns).length};});
console.log(JSON.stringify(r),errs);await b.close();})();
