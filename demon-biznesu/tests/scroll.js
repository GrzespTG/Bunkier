const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:390,height:780},deviceScaleFactor:2});
 const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto('file://'+process.cwd()+'/index.html');await p.waitForTimeout(500);
 await p.click('[data-act="new"]');await p.waitForTimeout(400);
 const info=()=>p.evaluate(()=>{const m=document.querySelector('#main');const q=document.querySelector('#qty');const r=m.getBoundingClientRect();const qr=q&&q.getBoundingClientRect();return{st:Math.round(m.scrollTop),max:m.scrollHeight-m.clientHeight,qtyVisible:qr?(qr.top>=r.top&&qr.bottom<=r.bottom):null}});
 console.log('start',await info());
 const heads=p.locator('.gh:not([disabled])');const n=await heads.count();console.log('towarow',n);
 // przewiń trochę i kliknij 5. towar
 await p.evaluate(()=>{document.querySelector('#main').scrollTop=250});
 await heads.nth(Math.min(5,n-1)).click();await p.waitForTimeout(300);console.log('po wyborze',await info());
 await p.screenshot({path:'shots/sel.png'});
 await p.locator('[data-act="qd"][data-v="1"]').first().click();await p.waitForTimeout(200);console.log('po +',await info());
 await heads.nth(n-1).click();await p.waitForTimeout(300);console.log('ostatni towar',await info());
 await p.screenshot({path:'shots/sel2.png'});console.log(errs);await b.close();})();
