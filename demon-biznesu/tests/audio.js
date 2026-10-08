const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});const p=await b.newPage({viewport:{width:390,height:780}});
const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('file://'+process.cwd()+'/index.html');
await p.click('[data-act="new"]');await p.waitForTimeout(1500);
const r={};
r.buf=await p.evaluate(()=>Object.keys(BUF).sort().join(','));
r.mus1=await p.evaluate(()=>curMus);
// policja
await p.evaluate(()=>{S.cash=9999;S.inv.drugs={q:5,avg:1000};showModal({scene:'police',title:'T',text:'x',opts:[{t:'a',fn:()=>null}]});});
await p.waitForTimeout(300);
r.mus2=await p.evaluate(()=>({m:curMus,siren:!!sirenSrc}));
await p.evaluate(()=>closeModal());await p.waitForTimeout(100);
r.mus3=await p.evaluate(()=>({m:curMus,siren:!!sirenSrc}));
// głośność
await p.click('[data-act="gmenu"]');await p.click('[data-act="opt"][data-v="1"]');await p.waitForTimeout(200);
await p.evaluate(()=>{const e=document.getElementById('vm');e.value=20;e.dispatchEvent(new Event('input',{bubbles:true}));const s=document.getElementById('vs');s.value=40;s.dispatchEvent(new Event('input',{bubbles:true}));});
r.vol=await p.evaluate(()=>({vm:OPT.vm,vs:OPT.vs,mg:+musG.gain.value.toFixed(3),sg:+sfxG.gain.value.toFixed(3),lbl:document.getElementById('vmv').textContent}));
await p.waitForTimeout(400);r.mg2=await p.evaluate(()=>+musG.gain.value.toFixed(3));
await p.screenshot({path:'/tmp/claude-0/vol.png'});
// wyłączenie
await p.evaluate(()=>{OPT.sound=false;applyVol();syncMusic();});await p.waitForTimeout(1200);
r.off=await p.evaluate(()=>({m:curMus,mg:+musG.gain.value.toFixed(3)}));
await p.evaluate(()=>{OPT.sound=true;applyVol();closeModal();});await p.waitForTimeout(500);
// koniec gry
await p.evaluate(()=>{endGame('quit');UI.screen='end';render();});await p.waitForTimeout(300);
r.end=await p.evaluate(()=>curMus);
await p.evaluate(()=>{UI.screen='menu';render();});r.menu=await p.evaluate(()=>curMus);
console.log(JSON.stringify(r,null,1),errs);await b.close();})();
