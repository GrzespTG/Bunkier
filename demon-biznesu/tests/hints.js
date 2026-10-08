const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:780}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+process.cwd()+'/index.html');
await p.evaluate(()=>{newGame(100,7);UI.screen='game';UI.tab='market';render();});
await p.screenshot({path:'/tmp/claude-0/m.png'});
// hint accuracy: seen vs price on arrival with 1-day trip
const r=await p.evaluate(()=>{let out=[];for(let t=0;t<20;t++){newGame(100,100+t);const to=(S.city+1)%CITIES.length;const near=CITIES.map((_,i)=>i).filter(i=>i!==S.city).sort((a,b)=>DIST[S.city][a]-DIST[S.city][b])[0];S.cash=1e6;const g=0;if(buyP(near,g)==null)continue;travelNow(near);}
 // run: record departure hint then compare
 let diffs=[];for(let t=0;t<30;t++){newGame(100,500+t);const c0=S.city;const near=CITIES.map((_,i)=>i).filter(i=>i!==c0).sort((a,b)=>DIST[c0][a]-DIST[c0][b])[0];S.cash=1e6;travelNow(near);recordSeen(near);const hint=S.seen[near].slice();S.cash=1e6;travelNow(c0);S.cash=1e6;travelNow(near);GOODS.forEach((_,g)=>{if(hint[g]!=null)diffs.push(Math.abs(buyP(near,g)/hint[g]-1));});}
 diffs.sort((a,b)=>a-b);return {med:diffs[diffs.length>>1],p90:diffs[Math.floor(diffs.length*.9)]};});
console.log(JSON.stringify(r),errs);await b.close();})();
