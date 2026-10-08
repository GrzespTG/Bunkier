const { chromium } = require('playwright');
const path=require('path'),fs=require('fs');
(async()=>{
 const b=await chromium.launch();const p=await b.newPage();const errs=[];
 p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+path.resolve(__dirname,'..','index.html'));
 await p.addScriptTag({content:fs.readFileSync(path.join(__dirname,'bot.js'),'utf8')});
 const N=+process.argv[2]||40;
 for(const mode of ['legal','full']){
  const r=await p.evaluate(([m,n])=>{const out=[];for(let s=1;s<=n;s++)out.push(runBot(m,s,100,+(window.CBS||.9)));return out;},[mode,N]);
  const sc=r.map(x=>x.score).sort((a,b)=>a-b);const q=f=>sc[Math.floor(f*(sc.length-1))];
  const avg=k=>(r.reduce((a,x)=>a+x[k],0)/r.length).toFixed(1);
  console.log(mode.padEnd(6),'min',Math.round(q(0)),'p25',Math.round(q(.25)),'mediana',Math.round(q(.5)),'p75',Math.round(q(.75)),'max',Math.round(q(1)),'| kontrole',avg('raids'),'areszty',avg('busts'),'łapówki',avg('bribes'),'transakcje',avg('trades'));
 }
 console.log(errs.length?'BŁĘDY: '+errs.join(' | '):'brak błędów JS');await b.close();})();
