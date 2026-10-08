// Bot do testów balansu: gra całą partię w przeglądarce (bez interfejsu).
window.runBot=function(mode,seed,days,cbShare){cbShare=cbShare==null?.5:cbShare;
  const D=DBG;D.newGame(days,seed);const S=D.S;
  const upg=mode!=='legal-noveh';
  const target=[['opel',1.25],['van',1.3],['truck',1.3]];
  function resolve(){while(D.PQ.length){const o=D.PQ.shift();
    let i=o.opts.findIndex(x=>x.cls==='go');if(i<0)i=0;
    let r=o.opts[i].fn();if(r==='__nomoney'){r=o.opts[o.opts.length-1].fn();}}}
  const allowC=mode==='full';
  let guard=0;
  while(!D.S.ended&&guard++<400){
    const S=D.S;
    // sprzedaj wszystko co się da
    for(const g of D.GOODS){const it=S.inv[g.id];if(it){const gi=D.GOODS.indexOf(g);if(D.sellP(S.city,gi)!=null)D.sell(gi,it.q);}}
    // dług
    if(S.debt>0&&S.cash+S.bank>S.debt+4000){if(S.bank>0)D.bankDo('wd',S.bank);D.bankDo('pay',S.debt);}
    // pojazd
    if(upg){for(let v=D.VEH.length-1;v>=0;v--){const veh=D.VEH[v];if(v===S.veh)break;if(veh.id==='sport')continue;
      if(veh.cap>D.VEH[S.veh].cap&&S.cash>veh.price*1.4&&S.day<S.maxDays-12){D.buyVeh(v);break;}}}
    // wypłać wszystko do zakupów
    if(S.bank>0)D.bankDo('wd',S.bank);
    // wybór miejsca i koszyka: dla każdego miasta zachłannie wypełnij ładownię towarami o najlepszym zysku na sztukę
    let best=null;
    for(let d=0;d<D.CITIES.length;d++){if(d===S.city)continue;
      const days=D.tripDays(S.city,d),cost=D.tripCost(S.city,d);if(S.day+days>S.maxDays||cost>=S.cash)continue;
      const lst=[];
      for(let g=0;g<D.GOODS.length;g++){if(D.GOODS[g].c&&!allowC)continue;const bp=D.buyP(S.city,g),sp0=D.mid(d,g);if(bp==null||sp0==null)continue;
        const sp=sp0*.96*(D.GOODS[g].c?.92:.97);lst.push({g,bp,sp,u:(sp-bp)/bp});}
      lst.sort((a,b)=>b.u-a.u);
      let free=D.cap()-D.used(),cash=S.cash-cost,prof=-cost,basket=[],cbSpend=0;
      const cbLimit=mode==='full'?cbShare*S.cash:0;
      for(const it of lst){if(it.u<.12||free<1||cash<it.bp)continue;const Gd=D.GOODS[it.g];
        const dep=Gd.depth;let q=Math.floor(dep*(it.sp-1.15*it.bp)/(.05*(it.sp+1.15*it.bp)));
        q=Math.max(0,Math.min(q,free,Math.floor(cash/it.bp)));
        if(Gd.c){q=Math.min(q,Math.floor((cbLimit-cbSpend)/it.bp));}
        if(q<1)continue;
        const bt=D.buyTotal(S.city,it.g,q);if(bt>cash)continue;
        basket.push({g:it.g,q});free-=q;cash-=bt;if(Gd.c)cbSpend+=bt;
        prof+=D.sellTotal(S.city,it.g,q)*0+ (it.sp*(1-q/dep*.05))*q-bt;}
      if(!basket.length)continue;
      const sc=prof/days;if(!best||sc>best.sc)best={d,basket,sc,prof};}
    if(!best||best.prof<=0){
      if(S.day>=S.maxDays-1)break;
      let d=-1,bd=1e9;for(let i=0;i<D.CITIES.length;i++){if(i===S.city)continue;const dd=D.DIST[S.city][i];if(dd<bd&&S.day+D.tripDays(S.city,i)<=S.maxDays&&D.tripCost(S.city,i)<=S.cash){bd=dd;d=i;}}
      if(d<0)break;D.travelNow(d);resolve();continue;}
    for(const it of best.basket)D.buy(it.g,it.q);
    const keep=D.tripCost(S.city,best.d)+Math.round(D.S.inv?Object.keys(D.S.inv).reduce((a,k)=>a+(D.GOODS[D.GOODS.findIndex(x=>x.id===k)].c?D.S.inv[k].q*D.S.inv[k].avg:0),0)*.3+500:0);if(S.cash>keep+50)D.bankDo('dep',S.cash-keep-50);
    D.travelNow(best.d);resolve();
  }
  if(!D.S.ended){for(const g of D.GOODS){const it=D.S.inv[g.id];if(it){const gi=D.GOODS.indexOf(g);if(D.sellP(D.S.city,gi)!=null)D.sell(gi,it.q);}}D.endGame('quit');}
  const S2=D.S;return {score:S2.cash+S2.bank-S2.debt,raids:S2.stats.raids,busts:S2.stats.busts,bribes:S2.stats.bribes,trades:S2.stats.trades,veh:D.VEH[S2.veh].id,day:S2.day};
};
