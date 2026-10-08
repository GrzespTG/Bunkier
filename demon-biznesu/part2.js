'use strict';
/* ================= NARZĘDZIA ================= */
const $=s=>document.querySelector(s);
const clamp=(v,a,b)=>v<a?a:v>b?b:v;
function mulberry(a){return function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}}
let RND=Math.random;
const rr=(a,b)=>a+RND()*(b-a), ri=(a,b)=>Math.floor(rr(a,b+1)), pick=a=>a[Math.floor(RND()*a.length)];
const nf=new Intl.NumberFormat('pl-PL');
const fmt=n=>nf.format(Math.round(n))+' zł';
const fnum=n=>nf.format(Math.round(n));
const LS={get(k,d){try{const v=localStorage.getItem(k);return v?JSON.parse(v):d}catch(e){return d}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};

/* ================= DANE ================= */
const GOODS=[
 {id:'coal',depth:150,n:'Węgiel',base:55,vol:.10,u:'t'},
 {id:'sugar',depth:120,n:'Cukier',base:85,vol:.10},
 {id:'flour',depth:130,n:'Mąka',base:65,vol:.10},
 {id:'vodka',depth:90,n:'Wódka',base:150,vol:.12},
 {id:'clothes',depth:70,n:'Odzież',base:190,vol:.12},
 {id:'parts',depth:45,n:'Części samochodowe',base:330,vol:.13},
 {id:'elec',depth:30,n:'Elektronika',base:680,vol:.15},
 {id:'cigs',depth:40,n:'Papierosy bez akcyzy',base:270,vol:.20,c:1,risk:.15},
 {id:'fake',depth:25,n:'Podróbki znanych marek',base:440,vol:.22,c:1,risk:.25},
 {id:'money',depth:15,n:'Fałszywe banknoty',base:950,vol:.26,c:1,risk:.35},
 {id:'drugs',depth:10,n:'Narkotyki',base:1900,vol:.30,c:1,risk:.5},
 {id:'guns',depth:6,n:'Broń z przemytu',base:4800,vol:.34,c:1,risk:1.1}
];
const GI={};GOODS.forEach((g,i)=>GI[g.id]=i);
const CITIES=[
 {id:'war',n:'Warszawa',lon:21.01,lat:52.23,pol:1.0,prod:[],dem:['elec','clothes','vodka'],cb:{guns:'d',money:'d',drugs:'d',fake:'d'},a:'e'},
 {id:'kra',n:'Kraków',lon:19.94,lat:50.06,pol:.85,prod:['clothes'],dem:['vodka','parts'],cb:{guns:'d',drugs:'d',fake:'d',cigs:'d'},a:'e',dy:14},
 {id:'lod',n:'Łódź',lon:19.46,lat:51.76,pol:.7,prod:['clothes','flour'],dem:['elec'],cb:{guns:'d',fake:'c',cigs:'d'},a:'w'},
 {id:'wro',n:'Wrocław',lon:17.04,lat:51.11,pol:.8,prod:['parts'],dem:['coal','sugar'],cb:{guns:'d',drugs:'c',money:'d'},a:'w'},
 {id:'poz',n:'Poznań',lon:16.93,lat:52.41,pol:.75,prod:['sugar','flour'],dem:['parts','elec'],cb:{guns:'d',money:'c',cigs:'d'},a:'w'},
 {id:'gda',n:'Gdańsk',lon:18.65,lat:54.35,pol:.8,prod:['elec'],dem:['coal','flour'],cb:{guns:'c',drugs:'c',fake:'c'},a:'w'},
 {id:'szc',n:'Szczecin',lon:14.55,lat:53.43,pol:.65,prod:['parts'],dem:['sugar','vodka'],cb:{guns:'c',cigs:'c',drugs:'c',money:'d'},a:'e'},
 {id:'kat',n:'Katowice',lon:19.02,lat:50.26,pol:.9,prod:['coal'],dem:['clothes','sugar','flour'],cb:{guns:'d',money:'c',cigs:'d',drugs:'d'},a:'w',dy:-6},
 {id:'lub',n:'Lublin',lon:22.57,lat:51.25,pol:.6,prod:['flour','sugar'],dem:['parts','elec'],cb:{guns:'c',cigs:'c',fake:'d'},a:'w'},
 {id:'bia',n:'Białystok',lon:23.16,lat:53.13,pol:.55,prod:['flour','vodka'],dem:['elec','parts'],cb:{guns:'c',cigs:'c',fake:'c',money:'d'},a:'w'},
 {id:'rze',n:'Rzeszów',lon:22.0,lat:50.04,pol:.55,prod:['parts'],dem:['coal','clothes'],cb:{guns:'c',cigs:'c',drugs:'d'},a:'w'},
 {id:'byd',n:'Bydgoszcz',lon:18.0,lat:53.12,pol:.6,prod:['sugar'],dem:['vodka','elec'],cb:{fake:'d',money:'d'},a:'e'},
 {id:'ols',n:'Olsztyn',lon:20.48,lat:53.78,pol:.5,prod:['flour'],dem:['clothes','parts'],cb:{cigs:'d',drugs:'d'},a:'e'},
 {id:'kie',n:'Kielce',lon:20.63,lat:50.87,pol:.6,prod:['vodka'],dem:['flour','coal'],cb:{fake:'c',drugs:'d'},a:'e'},
 {id:'opo',n:'Opole',lon:17.92,lat:50.67,pol:.6,prod:['sugar','vodka'],dem:['elec','clothes'],cb:{cigs:'c',money:'d'},a:'w',dy:6},
 {id:'zie',n:'Zielona Góra',lon:15.51,lat:51.94,pol:.5,prod:['vodka'],dem:['parts','sugar'],cb:{drugs:'c',money:'c'},a:'w'}
];
const VEH=[
 {id:'bus',n:'Plecak i autobus',cap:25,fuel:.18,speed:260,price:0,esc:.15,d:'Tanio w podróży, ale zabierzesz niewiele.'},
 {id:'opel',n:'Używany Opel',cap:70,fuel:.5,speed:380,price:14000,esc:.4,d:'Pierwszy prawdziwy transport. Zawsze coś w nim stuka.'},
 {id:'van',n:'Dostawczak',cap:160,fuel:.85,speed:380,price:48000,esc:.3,d:'Duża ładownia i spokojny wygląd firmowego auta.'},
 {id:'sport',n:'Sportowe coupé',cap:55,fuel:1.1,speed:520,price:90000,esc:.8,d:'Mało miejsca, ale ucieczka przed policją bywa skuteczna.'},
 {id:'truck',n:'Ciężarówka',cap:420,fuel:1.7,speed:330,price:170000,esc:.15,d:'Gigantyczny ładunek. Wolna i trudna do ukrycia.'}
];
const COP=1.0; // mnożnik globalny ryzyka
const RANKS=[[-1e12,'Bankrut'],[1,'Handlarz z bazaru'],[25000,'Obwoźny kupiec'],[100000,'Hurtownik'],[200000,'Przedsiębiorca'],[500000,'Biznesmen'],[1000000,'Magnat'],[2000000,'Demon Biznesu']];
const rankOf=s=>{let r=RANKS[0][1];for(const[t,n]of RANKS)if(s>=t)r=n;return r;};

/* ================= STAN GRY ================= */
let S=null;
let OPT=LS.get('db_opt',{sound:true,days:100,name:'Gracz'});
const km=(a,b)=>{const A=CITIES[a],B=CITIES[b];return Math.hypot((A.lon-B.lon)*68.4,(A.lat-B.lat)*111.2);};
const DIST=CITIES.map((_,i)=>CITIES.map((_,j)=>km(i,j)));
const tripDays=(a,b,v)=>Math.max(1,Math.ceil(DIST[a][b]/VEH[v??S.veh].speed));
const tripCost=(a,b,v)=>Math.round(DIST[a][b]*VEH[v??S.veh].fuel);
const used=()=>GOODS.reduce((s,g)=>s+(S.inv[g.id]?S.inv[g.id].q:0),0);
const cap=()=>VEH[S.veh].cap;
const score=()=>S.cash+S.bank-S.debt;

function newGame(days,seed){
  if(seed!=null)RND=mulberry(seed);else RND=Math.random;
  const nC=CITIES.length,nG=GOODS.length;
  S={day:1,maxDays:days||100,name:OPT.name||'Gracz',cash:5000,bank:0,debt:4000,city:ri(0,nC-1),veh:0,inv:{},
    m:CITIES.map(()=>GOODS.map(g=>1+rr(-.25,.25))),prev:null,mods:[],heat:CITIES.map(()=>ri(5,35)),
    visited:{},seen:CITIES.map(()=>GOODS.map(()=>null)),log:[],news:null,
    stats:{trades:0,profit:0,raids:0,bribes:0,busts:0,maxScore:0,kmDone:0,best:0},ended:false,debtLimit:40000};
  S.prev=CITIES.map((_,c)=>GOODS.map((_,g)=>mid(c,g)));
  S.visited[S.city]=1;recordSeen(S.city);
  addLog('Zaczynasz w mieście '+CITIES[S.city].n+'. Masz '+fmt(S.cash)+' i dług '+fmt(S.debt)+' u lichwiarza.','info');
  return S;
}
function cmod(c,g){const C=CITIES[c],G=GOODS[g];
  if(G.c){const t=C.cb[G.id];if(!t)return null;return t==='c'?.57:1.62;}
  if(C.prod.includes(G.id))return .72;if(C.dem.includes(G.id))return 1.32;return 1;}
function mid(c,g){const cm=cmod(c,g);if(cm==null)return null;let p=GOODS[g].base*cm*S.m[c][g];
  for(const x of S.mods)if(x.c===c&&x.g===g&&x.until>=S.day)p*=x.mult;return Math.max(5,p);}
const impact=(g,q)=>q/GOODS[g].depth*.10;
/** cena pierwszej sztuki (bez wpływu partii) */
const buyP=(c,g)=>{const m=mid(c,g);return m==null?null:Math.ceil(m*1.05);};
const sellP=(c,g)=>{const m=mid(c,g);return m==null?null:Math.floor(m*.95);};
/** łączny koszt kupna q sztuk i wpływ zakupu na cenę */
const buyTotal=(c,g,q)=>{const m=mid(c,g);return m==null?null:Math.ceil(m*1.05*(1+impact(g,q)/2))*q;};
const sellTotal=(c,g,q)=>{const m=mid(c,g);return m==null?null:Math.floor(m*.95*Math.max(.35,1-impact(g,q)/2))*q;};
const maxBuy=(c,g)=>{const m=mid(c,g);if(m==null)return 0;let lo=0,hi=Math.max(0,cap()-used());while(lo<hi){const x=Math.ceil((lo+hi)/2);if(buyTotal(c,g,x)<=S.cash)lo=x;else hi=x-1;}return lo;};
function migrate(s){const nG=GOODS.length;s.m.forEach(r=>{while(r.length<nG)r.push(1);});s.prev=s.prev||[];s.prev.forEach(r=>{while(r.length<nG)r.push(null);});s.seen.forEach(r=>{while(r.length<nG)r.push(null);});return s;}
function recordSeen(c){S.seen[c]=GOODS.map((_,g)=>{const m=mid(c,g);return m==null?null:Math.ceil(m*1.05);});(S.seenDay||(S.seenDay={}))[c]=S.day;}
function addLog(t,k){S.log.unshift({d:S.day,t,k:k||''});if(S.log.length>60)S.log.pop();}
function dayTick(){
  S.prev=CITIES.map((_,c)=>GOODS.map((_,g)=>mid(c,g)));
  for(let c=0;c<CITIES.length;c++)for(let g=0;g<GOODS.length;g++){
    const v=GOODS[g].vol;let m=S.m[c][g];m+=(1-m)*.17+(RND()-.5)*v*2;S.m[c][g]=clamp(m,.55,1.9);}
  S.day++;
  S.debt=Math.ceil(S.debt*1.02);S.bank=Math.floor(S.bank*1.0015);
  for(let c=0;c<S.heat.length;c++)S.heat[c]=Math.max(0,S.heat[c]-1.6);
  S.mods=S.mods.filter(x=>x.until>=S.day);
}
function totalCbCost(){let s=0;for(const g of GOODS)if(g.c&&S.inv[g.id])s+=S.inv[g.id].q*S.inv[g.id].avg;return s;}
function cbLoad(){let l=0;for(const g of GOODS)if(g.c&&S.inv[g.id])l+=S.inv[g.id].q*g.risk;return l;}
function raidChance(c){const l=cbLoad();if(!l)return 0;
  return clamp((.02+CITIES[c].pol*.06+S.heat[c]/100*.10+l*.0035)*COP,0,.5);}

/* ---------- handel ---------- */
function buy(g,q){
  const p=buyP(S.city,g);if(p==null)return 'Tu nikt tego nie sprzedaje.';
  q=Math.floor(q);if(q<1)return 'Podaj ilość.';
  if(used()+q>cap())return 'Brak miejsca w ładowni (wolne: '+(cap()-used())+').';
  const tot=buyTotal(S.city,g,q);if(tot>S.cash)return 'Za mało gotówki.';
  const id=GOODS[g].id,it=S.inv[id]||(S.inv[id]={q:0,avg:0});
  it.avg=(it.avg*it.q+tot)/(it.q+q);it.q+=q;S.cash-=tot;S.stats.trades++;
  S.m[S.city][g]=Math.min(2.4,S.m[S.city][g]*(1+impact(g,q)));
  return null;
}
function sell(g,q){
  const p=sellP(S.city,g);if(p==null)return 'Tu nikt tego nie kupuje.';
  const id=GOODS[g].id,it=S.inv[id];if(!it||!it.q)return 'Nie masz tego towaru.';
  q=Math.min(Math.floor(q),it.q);if(q<1)return 'Podaj ilość.';
  const gain=sellTotal(S.city,g,q);S.cash+=gain;const prof=gain-it.avg*q;S.stats.profit+=prof;S.stats.best=Math.max(S.stats.best,prof);S.stats.trades++;
  it.q-=q;if(it.q<=0)delete S.inv[id];
  S.m[S.city][g]=Math.max(.4,S.m[S.city][g]*Math.max(.35,1-impact(g,q)));
  if(GOODS[g].c)S.heat[S.city]=Math.min(100,S.heat[S.city]+q*GOODS[g].risk*.8);
  return null;
}
/* ---------- bank ---------- */
function bankDo(act,n){
  n=Math.floor(n);if(!(n>0))return 'Podaj kwotę.';
  if(act==='dep'){if(n>S.cash)return 'Masz za mało gotówki.';S.cash-=n;S.bank+=n;}
  else if(act==='wd'){if(n>S.bank)return 'Na koncie jest mniej.';S.bank-=n;S.cash+=n;}
  else if(act==='loan'){if(S.debt+n>S.debtLimit)return 'Lichwiarz da Ci najwyżej '+fmt(Math.max(0,S.debtLimit-S.debt))+' więcej.';S.debt+=n;S.cash+=n;}
  else if(act==='pay'){n=Math.min(n,S.debt);if(n>S.cash)return 'Masz za mało gotówki.';S.cash-=n;S.debt-=n;}
  return null;
}
function buyVeh(i){
  const v=VEH[i],cur=VEH[S.veh];if(i===S.veh)return 'Już nim jeździsz.';
  const net=v.price-Math.floor(cur.price*.5);
  if(used()>v.cap)return 'Ładunek nie zmieści się w tym pojeździe. Sprzedaj część towaru.';
  if(net>S.cash)return 'Brakuje '+fmt(net-S.cash)+'.';
  S.cash-=net;S.veh=i;addLog('Nowy pojazd: '+v.n+'.','good');return null;
}

/* ---------- podróż i zdarzenia ---------- */
let PQ=[];            // kolejka okien
function modal(o){PQ.push(o);}
function travelPlan(to){
  if(to===S.city)return {err:'Jesteś już w tym mieście.'};
  const d=tripDays(S.city,to),c=tripCost(S.city,to);
  if(c>S.cash)return {err:'Brakuje Ci '+fmt(c-S.cash)+' na paliwo albo bilet.'};
  return {days:d,cost:c};
}
function travelNow(to){          // logika podróży bez animacji
  const pl=travelPlan(to);if(pl.err)return pl.err;
  recordSeen(S.city);
  S.cash-=pl.cost;S.stats.kmDone+=Math.round(DIST[S.city][to]);
  for(let i=0;i<pl.days;i++)dayTick();
  S.city=to;S.visited[to]=1;
  if(S.day>S.maxDays){endGame('time');return null;}
  recordSeen(to);
  addLog('Dotarłeś do miasta '+CITIES[to].n+' (dzień '+S.day+').');
  policeCheck(to);
  randomEvent(to);
  return null;
}
function policeCheck(c){
  const p=raidChance(c);if(!(RND()<p))return;
  S.stats.raids++;S.heat[c]=Math.min(100,S.heat[c]+15);
  const cost=totalCbCost(),bribe=Math.round(cost*.22+300),v=VEH[S.veh];
  const pEsc=clamp(v.esc*(1-CITIES[c].pol*.25),.05,.9),pBr=.75;
  const fine=Math.max(200,Math.round(S.cash*.08));
  modal({scene:'police',title:'Kontrola policji!',
    text:'Funkcjonariusze zatrzymali Twój pojazd na wjeździe do miasta '+CITIES[c].n+' i przeszukują ładunek. Masz przy sobie kontrabandę o wartości zakupu '+fmt(cost)+'.',
    opts:[
     {t:'Daj łapówkę — '+fmt(bribe),s:'Szansa powodzenia '+Math.round(pBr*100)+'%. Jeśli odmówią, trafiasz do aresztu.',cls:'go',
      fn:()=>{if(bribe>S.cash)return '__nomoney';S.cash-=bribe;S.stats.bribes++;
        if(RND()<pBr){addLog('Łapówka przyjęta. Jedziesz dalej, kontrabanda bezpieczna.','good');return 'Policjant „nic nie widział”. Zapłacono '+fmt(bribe)+'.';}
        return bust(c,true);}},
     {t:'Uciekaj',s:'Szansa ucieczki '+Math.round(pEsc*100)+'% ('+v.n+'). Pościg kończy się aresztem.',cls:'risk',
      fn:()=>{if(RND()<pEsc){S.heat[c]=Math.min(100,S.heat[c]+20);addLog('Ucieczka przed policją udana.','good');return 'Zgubiłeś radiowóz na bocznych drogach. Ładunek jest cały, ale policja w mieście jest teraz czujniejsza.';}
        return bust(c,true);}},
     {t:'Poddaj się',s:'Tracisz całą kontrabandę i płacisz mandat '+fmt(fine)+'.',
      fn:()=>{const lost=cbLoss();S.cash=Math.max(0,S.cash-fine);S.stats.busts++;addLog('Konfiskata kontrabandy. Mandat '+fmt(fine)+'.','bad');return 'Skonfiskowano towar o wartości zakupu '+fmt(lost)+'. Mandat: '+fmt(fine)+'.';}}
    ]});
}
function cbLoss(){let l=0;for(const g of GOODS)if(g.c&&S.inv[g.id]){l+=S.inv[g.id].q*S.inv[g.id].avg;delete S.inv[g.id];}return l;}
function bust(c,hard){
  const lost=cbLoss(),cashLost=Math.round(S.cash*.6);S.cash-=cashLost;S.stats.busts++;
  addLog('Areszt! Tracisz kontrabandę i '+fmt(cashLost)+' gotówki.','bad');
  for(let i=0;i<3&&S.day<=S.maxDays;i++)dayTick();
  if(S.day>S.maxDays){endGame('time');}
  return 'Areszt. Policja zabrała towar (wartość zakupu '+fmt(lost)+') oraz '+fmt(cashLost)+' gotówki, którą miałeś przy sobie. Trzy dni w areszcie. Pieniądze w banku są bezpieczne.';
}
const EV=[
 {w:9,f:(c)=>{ // napad
   const lose=Math.round(S.cash*.22);if(S.cash<500)return false;
   modal({scene:'rob',title:'Napad na parkingu',text:'Dwóch zakapturzonych typów blokuje drogę i żąda gotówki. Masz przy sobie '+fmt(S.cash)+'.',
    opts:[{t:'Oddaj pieniądze — '+fmt(lose),s:'Bezpiecznie, ale boli.',fn:()=>{S.cash-=lose;addLog('Napad: oddałeś '+fmt(lose)+'.','bad');return 'Straciłeś '+fmt(lose)+'. Nic Ci się nie stało.';}},
          {t:'Walcz',s:'45% szans, że ich odpędzisz. Przegrana: tracisz 35% gotówki i dzień w szpitalu.',cls:'risk',
           fn:()=>{if(RND()<.45){addLog('Odparłeś napad.','good');return 'Odpędziłeś napastników. Odzyskałeś spokój i szacunek na parkingu.';}
             const l=Math.round(S.cash*.35);S.cash-=l;dayTick();addLog('Napad: pobity, strata '+fmt(l)+'.','bad');return 'Pobili Cię. Strata: '+fmt(l)+' i dzień w szpitalu.';}}]});return true;}},
 {w:9,f:(c)=>{ // awaria
   const cost=Math.round(250+VEH[S.veh].price*.03+rr(0,400));if(S.cash<cost)return false;
   modal({scene:'broken',title:'Awaria po drodze',text:'Z maski buchnął dym. Mechanik z pobliskiego warsztatu podjął się naprawy.',
    opts:[{t:'Zapłać mechanikowi — '+fmt(cost),s:'Tracisz jeden dzień.',cls:'go',fn:()=>{S.cash-=cost;dayTick();addLog('Awaria: naprawa '+fmt(cost)+' i dzień przerwy.','bad');return 'Naprawione. Koszt '+fmt(cost)+', a kalendarz poszedł o dzień do przodu.';}}]});return true;}},
 {w:12,f:(c)=>{ // plotka
   const g=ri(0,6),city=ri(0,CITIES.length-1);if(city===c)return false;const real=RND()<.8;
   const up=RND()<.6;
   if(real)S.mods.push({c:city,g,mult:up?1.65:.55,until:S.day+5});
   const msg='Plotka na stacji: w mieście '+CITIES[city].n+' '+(up?'brakuje towaru „':'zalega towar „')+GOODS[g].n.toLowerCase()+'”, ceny '+(up?'poszły w górę.':'lecą w dół.')+(real?'':' (Okaże się fałszywa.)');
   S.news=msg.replace(' (Okaże się fałszywa.)','');addLog(S.news,'info');return true;}},
 {w:8,f:(c)=>{ // okazja
   const g=ri(0,6);S.mods.push({c,g,mult:.6,until:S.day+1});
   modal({scene:'deal',title:'Okazja u hurtownika',text:'Likwidacja magazynu w mieście '+CITIES[c].n+': '+GOODS[g].n.toLowerCase()+' z rabatem 40% przez najbliższy dzień. Sprawdź rynek.',opts:[{t:'Zobacz ceny',cls:'go',fn:()=>{addLog('Okazja na '+GOODS[g].n.toLowerCase()+' w '+CITIES[c].n+'.','good');return null;}}]});return true;}},
 {w:6,f:(c)=>{ // strajk
   const g=ri(0,6);S.mods.push({c,g,mult:1.6,until:S.day+4});
   S.news='Strajk w mieście '+CITIES[c].n+': brakuje towaru „'+GOODS[g].n.toLowerCase()+'”.';addLog(S.news,'info');return true;}},
 {w:5,f:(c)=>{ // demon
   const g=ri(0,GOODS.length-1),c2=ri(0,CITIES.length-1);S.mods.push({c,g,mult:1.8,until:S.day+3});
   if(c2!==c)S.mods.push({c:c2,g,mult:.5,until:S.day+3});
   modal({scene:'demon',title:'Demon Biznesu znowu w grze',text:'Tajemniczy konkurent wykupił cały zapas towaru „'+GOODS[g].n.toLowerCase()+'” w mieście '+CITIES[c].n+'. Ceny tam poszły w górę, a w '+CITIES[c2].n+' zalał rynek tańszymi dostawami.',opts:[{t:'Zapamiętam',fn:()=>{addLog('Demon Biznesu zakłócił rynek: '+GOODS[g].n.toLowerCase()+'.','info');return null;}}]});return true;}},
 {w:4,f:(c)=>{const n=ri(500,3000);
   modal({scene:'cash',title:'Znalezisko',text:'Na tylnym siedzeniu znalazłeś zapomnianą kopertę z pieniędzmi: '+fmt(n)+'.',opts:[{t:'Schowaj do kieszeni',cls:'go',fn:()=>{S.cash+=n;addLog('Znalazłeś '+fmt(n)+'.','good');return null;}}]});return true;}},
 {w:4,f:(c)=>{if(S.bank<20000)return false;const t=Math.round(S.bank*.03);
   modal({scene:'tax',title:'Kontrola skarbowa',text:'Urząd skarbowy zainteresował się Twoim kontem. Płacisz podatek od oszczędności.',opts:[{t:'Zapłać '+fmt(t),fn:()=>{S.bank-=t;addLog('Podatek z konta: '+fmt(t)+'.','bad');return null;}}]});return true;}}
];
function randomEvent(c){
  if(RND()>.42)return;
  const tot=EV.reduce((x,e)=>x+e.w,0);
  for(let k=0;k<5;k++){let r=RND()*tot,ev=EV[0];for(const e of EV){r-=e.w;if(r<=0){ev=e;break;}}
    if(ev.f(c))return;}
}
function endGame(why){
  S.ended=why||'quit';const sc=score();
  const list=LS.get('db_scores',[]);list.push({name:S.name,score:sc,days:Math.min(S.day,S.maxDays),rank:rankOf(sc),date:new Date().toISOString().slice(0,10)});
  list.sort((a,b)=>b.score-a.score);LS.set('db_scores',list.slice(0,10));LS.set('db_save',null);
}
function save(){if(S&&!S.ended)LS.set('db_save',S);}
