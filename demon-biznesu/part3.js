
/* ================= GRAFIKA (SVG) ================= */
const ICON={
 coal:'<path d="M7 31 13 17l11-4 11 4 6 14-9 7H16z" fill="#2c3345"/><path d="m13 17 11 8 11-8M24 25v13" stroke="#56627f" stroke-width="2" fill="none"/><path d="m16 20 5-2" stroke="#8ea0c8" stroke-width="2" stroke-linecap="round"/>',
 sugar:'<rect x="6" y="24" width="17" height="17" rx="3.5" fill="#f4f7fc"/><rect x="24" y="17" width="17" height="17" rx="3.5" fill="#d9e3f2"/><path d="m30 6 1.6 3.4L35 11l-3.4 1.6L30 16l-1.6-3.4L25 11l3.4-1.6z" fill="#f4c152"/>',
 flour:'<path d="M14 11h20l5 9-2.5 20h-25L9 20z" fill="#e9d4a8"/><path d="m14 11 4.5 5h11L34 11" fill="#c9ae78"/><rect x="16" y="24" width="16" height="9" rx="2.5" fill="#fff" opacity=".8"/>',
 vodka:'<rect x="19" y="4" width="10" height="7" rx="2.5" fill="#9fb0cc"/><path d="M19 11h10l3.5 8v22a3.5 3.5 0 0 1-3.5 3.5H19A3.5 3.5 0 0 1 15.5 41V19z" fill="#7fd0ff" opacity=".9"/><rect x="17.5" y="25" width="13" height="10" rx="2.5" fill="#fff"/>',
 clothes:'<path d="m17 7-11 7 5 8 6-3v22h14V19l6 3 5-8-11-7a7 5 0 0 1-14 0z" fill="#ff7a8a"/>',
 parts:'<circle cx="24" cy="24" r="14" fill="none" stroke="#f4c152" stroke-width="8" stroke-dasharray="6.2 4.4"/><circle cx="24" cy="24" r="11" fill="#d39a20"/><circle cx="24" cy="24" r="4.5" fill="#14281f"/>',
 elec:'<rect x="13" y="4" width="22" height="40" rx="6" fill="#2d3658"/><rect x="16.5" y="9" width="15" height="28" rx="2.5" fill="#5ac8fa"/><path d="m16.5 30 15-12v-3" stroke="#fff" stroke-opacity=".35" stroke-width="3"/><circle cx="24" cy="40.5" r="1.8" fill="#93a0c4"/>',
 cigs:'<rect x="5" y="29" width="31" height="8" rx="2.5" fill="#f4f7fc"/><rect x="27" y="29" width="9" height="8" fill="#e59b3d"/><path d="M40 28c3-4-3-6 0-10M44 31c3-3-2-5 0-9" stroke="#9fb0cc" fill="none" stroke-width="2" stroke-linecap="round"/><path d="M11 26l-4-6" stroke="#ff5468" stroke-width="2.5" stroke-linecap="round"/>',
 fake:'<path d="M5 24 24 5h18v18L23 42z" fill="#b794f6"/><circle cx="35" cy="12" r="3.2" fill="#14281f"/><text x="22" y="29" font-size="15" font-weight="800" fill="#fff" transform="rotate(-45 22 25)" text-anchor="middle">™</text>',
 money:'<rect x="3" y="12" width="42" height="25" rx="3.5" fill="#3ecf8e"/><circle cx="24" cy="24.5" r="8" fill="#1c8f5c"/><text x="24" y="28.4" text-anchor="middle" font-size="10" font-weight="800" fill="#e8fff4">zł</text><path d="M7 16h6M35 33h6" stroke="#e8fff4" stroke-width="2" stroke-linecap="round"/><path d="m36 10 9 6" stroke="#ff5468" stroke-width="3" stroke-linecap="round"/>',
 guns:'<path d="M5 18h13l3-3v-4H11l-2-3H5z" fill="#8a97a3"/><path d="M18 15l-2 5h-4l1-5z" fill="#5a6672"/><rect x="6" y="8" width="12" height="3" rx="1" fill="#c9d3dc"/><circle cx="39" cy="10" r="2.5" fill="#a78bfa"/>',
 drugs:'<g transform="rotate(-38 24 24)"><rect x="5" y="15" width="38" height="18" rx="9" fill="#fff"/><path d="M24 15h10a9 9 0 0 1 0 18H24z" fill="#ff5468"/></g><circle cx="12" cy="38" r="2" fill="#a78bfa"/><circle cx="40" cy="10" r="2.5" fill="#a78bfa"/>'
};
const icon=(id,sz)=>`<svg viewBox="0 0 48 48"${sz?` width="${sz}" height="${sz}"`:''} aria-hidden="true">${ICON[id]}</svg>`;
const SHORT={coal:'Węgiel',sugar:'Cukier',flour:'Mąka',vodka:'Wódka',clothes:'Odzież',parts:'Części',elec:'Elektronika',cigs:'Papierosy',fake:'Podróbki',money:'Banknoty',drugs:'Narkotyki',guns:'Broń'};

function guil(){
  let s='<svg viewBox="-200 -200 400 400" aria-hidden="true"><defs><linearGradient id="gg" x1="0" x2="1"><stop offset="0" stop-color="#5be3a0"/><stop offset="1" stop-color="#a78bfa"/></linearGradient></defs><g fill="none" stroke="url(#gg)" stroke-width=".8">';
  for(let i=0;i<72;i++)s+=`<ellipse rx="190" ry="${34+(i%6)*5}" transform="rotate(${i*2.5})" opacity="${i%2?.38:.6}"/>`;
  for(let i=1;i<=16;i++)s+=`<circle r="${i*11.5}" opacity="${.12+(i%3)*.08}"/>`;
  return s+'</g></svg>';
}
const LOGO='<svg viewBox="0 0 64 64"><defs><linearGradient id="lg" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#a78bfa"/><stop offset="1" stop-color="#5be3a0"/></linearGradient></defs><path d="M10 6c4 10 6 12 12 14M54 6c-4 10-6 12-12 14" stroke="#a78bfa" stroke-width="5" stroke-linecap="round" fill="none"/><circle cx="32" cy="38" r="22" fill="url(#lg)"/><circle cx="32" cy="38" r="17" fill="#0c1a17"/><text x="32" y="48" text-anchor="middle" font-size="27" font-weight="900" fill="#f4c152">zł</text></svg>';

function vehSVG(id){
  const w='<circle cx="X" cy="40" r="6.5" fill="#101a18"/><circle cx="X" cy="40" r="2.6" fill="#9fb0cc"/>';
  const wh=(...xs)=>xs.map(x=>w.replace(/X/g,x)).join('');
  const B={
   bus:'<rect x="30" y="8" width="42" height="34" rx="9" fill="#f4c152"/><rect x="38" y="4" width="26" height="8" rx="4" fill="#d39a20"/><rect x="36" y="22" width="30" height="15" rx="4" fill="#e0902e"/><path d="M30 20c-8 0-10 8-10 16" stroke="#9fb0cc" stroke-width="4" fill="none" stroke-linecap="round"/><path d="M72 20c8 0 10 8 10 16" stroke="#9fb0cc" stroke-width="4" fill="none" stroke-linecap="round"/>',
   opel:'<path d="M8 36v-8l10-3 10-11h30l12 12 12 3v7z" fill="#6cc4ff"/><path d="m30 15-8 10h17V15zm13 0v10h20L52 15z" fill="#0f2c3d" opacity=".75"/>'+wh(26,76),
   van:'<path d="M6 38V12h50v8h22l10 10v8z" fill="#eaf2ec"/><rect x="60" y="22" width="14" height="8" rx="2" fill="#0f2c3d" opacity=".8"/><rect x="6" y="28" width="50" height="6" fill="#5be3a0"/>'+wh(24,76),
   sport:'<path d="M4 36v-6l16-4 12-9h24l14 11 18 3v5z" fill="#ff5468"/><path d="m34 19-6 7h16v-7zm14 0v7h14l-8-7z" fill="#2a0d12" opacity=".75"/>'+wh(26,78),
   truck:'<rect x="2" y="6" width="58" height="32" rx="3" fill="#a78bfa"/><path d="M62 14h20l12 12v12H62z" fill="#eaf2ec"/><rect x="70" y="18" width="12" height="8" rx="2" fill="#0f2c3d" opacity=".8"/>'+wh(16,34,76,88)
  };
  return `<svg viewBox="0 0 100 50" aria-hidden="true">${B[id]}</svg>`;
}
const SCENE={
 police:'<defs><linearGradient id="s1" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0b1330"/><stop offset="1" stop-color="#1d2a55"/></linearGradient></defs><rect width="400" height="150" fill="url(#s1)"/><rect y="112" width="400" height="38" fill="#10172e"/><path d="M0 131h400" stroke="#33406e" stroke-dasharray="26 18" stroke-width="3"/><g class="flash"><circle cx="150" cy="70" r="46" fill="#ff5468" opacity=".28"/></g><g class="flash" style="animation-delay:.25s"><circle cx="250" cy="70" r="46" fill="#4aa8ff" opacity=".28"/></g><path d="M120 118v-18l16-8 22-16h82l24 18 20 6v18z" fill="#eaf2ec"/><path d="M158 92l16-14h50l18 14z" fill="#16234a"/><rect x="180" y="62" width="40" height="9" rx="3" fill="#222c55"/><circle cx="192" cy="66" r="4.5" fill="#ff5468" class="flash"/><circle cx="208" cy="66" r="4.5" fill="#4aa8ff" class="flash" style="animation-delay:.25s"/><rect x="120" y="102" width="150" height="6" fill="#16234a"/><circle cx="152" cy="118" r="11" fill="#0a0f22"/><circle cx="248" cy="118" r="11" fill="#0a0f22"/>',
 rob:'<defs><linearGradient id="s2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0a1020"/><stop offset="1" stop-color="#1b2540"/></linearGradient></defs><rect width="400" height="150" fill="url(#s2)"/><circle cx="330" cy="30" r="16" fill="#f1f5ff" opacity=".85"/><rect y="118" width="400" height="32" fill="#0f1628"/><g><rect x="60" y="30" width="4" height="90" fill="#3a4673"/><path d="M40 30h44" stroke="#3a4673" stroke-width="4"/><ellipse cx="62" cy="40" rx="40" ry="14" fill="#f4c152" opacity=".16"/></g><g fill="#05080f"><circle cx="170" cy="62" r="13"/><path d="M148 122c0-30 10-46 22-46s22 16 22 46z"/><circle cx="250" cy="66" r="13"/><path d="M228 122c0-28 10-44 22-44s22 16 22 44z"/></g><rect x="160" y="58" width="22" height="5" rx="2" fill="#f4c152"/><rect x="240" y="62" width="22" height="5" rx="2" fill="#f4c152"/>',
 broken:'<defs><linearGradient id="s3" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#244a60"/><stop offset="1" stop-color="#6aa5b0"/></linearGradient></defs><rect width="400" height="150" fill="url(#s3)"/><rect y="112" width="400" height="38" fill="#34504f"/><path d="M0 131h400" stroke="#8cb0a8" stroke-dasharray="26 18" stroke-width="3"/><path d="M110 118v-18l16-8 22-16h82l24 18 20 6v18z" fill="#6cc4ff"/><path d="M148 92l16-14h50l18 14z" fill="#0f2c3d" opacity=".8"/><path d="m122 92 26-34 20 6" stroke="#4a8fb3" stroke-width="8" fill="none" stroke-linecap="round"/><circle cx="142" cy="118" r="11" fill="#0a1a18"/><circle cx="248" cy="118" r="11" fill="#0a1a18"/><g fill="#cfd8dc" opacity=".8"><circle cx="150" cy="44" r="12"/><circle cx="166" cy="30" r="15"/><circle cx="188" cy="20" r="12" opacity=".6"/></g>',
 deal:'<defs><linearGradient id="s4" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#173a30"/><stop offset="1" stop-color="#245a47"/></linearGradient></defs><rect width="400" height="150" fill="url(#s4)"/><rect y="118" width="400" height="32" fill="#10261f"/><g><rect x="70" y="76" width="60" height="42" rx="4" fill="#c99b58"/><rect x="140" y="58" width="70" height="60" rx="4" fill="#d9ad66"/><rect x="220" y="84" width="54" height="34" rx="4" fill="#c99b58"/><path d="M70 92h60M140 78h70M220 98h54" stroke="#8a6a35" stroke-width="3"/></g><g transform="rotate(-8 300 50)"><rect x="262" y="26" width="90" height="48" rx="12" fill="#f4c152"/><text x="307" y="60" text-anchor="middle" font-size="28" font-weight="900" fill="#2b2000">−40%</text></g>',
 demon:'<defs><radialGradient id="s5" cx=".5" cy=".5" r=".7"><stop offset="0" stop-color="#4a1d6a"/><stop offset="1" stop-color="#0d0714"/></radialGradient></defs><rect width="400" height="150" fill="url(#s5)"/><path d="M150 50c-6-22 4-34 18-40-2 14 2 24 14 32zM250 50c6-22-4-34-18-40 2 14-2 24-14 32z" fill="#a78bfa"/><path d="M150 50c10-12 30-18 50-18s40 6 50 18c8 30-2 66-50 90-48-24-58-60-50-90z" fill="#150a22" stroke="#a78bfa" stroke-width="2"/><path d="M168 68l24 8-24 6zM232 68l-24 8 24 6z" fill="#5be3a0"/><text x="200" y="118" text-anchor="middle" font-size="26" font-weight="900" fill="#f4c152">zł</text>',
 cash:'<rect width="400" height="150" fill="#14352c"/><g transform="rotate(-6 200 80)"><rect x="110" y="40" width="180" height="80" rx="10" fill="#e8d9b0"/><path d="M110 46l90 42 90-42" stroke="#b9a574" stroke-width="3" fill="none"/></g><g><rect x="150" y="26" width="100" height="46" rx="5" fill="#3ecf8e" transform="rotate(-6 200 49)"/><circle cx="200" cy="49" r="13" fill="#1c8f5c"/></g>',
 tax:'<rect width="400" height="150" fill="#1b2748"/><path d="M110 50h180l-90-30z" fill="#9fb0cc"/><rect x="118" y="54" width="164" height="8" fill="#cfd8ea"/><g fill="#dbe4f4"><rect x="130" y="66" width="18" height="50"/><rect x="166" y="66" width="18" height="50"/><rect x="216" y="66" width="18" height="50"/><rect x="252" y="66" width="18" height="50"/></g><rect x="110" y="116" width="180" height="10" fill="#9fb0cc"/><text x="200" y="145" text-anchor="middle" font-size="12" font-weight="800" fill="#f4c152">URZĄD SKARBOWY</text>'
};
const scene=k=>`<svg viewBox="0 0 400 150" preserveAspectRatio="xMidYMid slice" aria-hidden="true">${SCENE[k]||SCENE.cash}</svg>`;

/* mapa Polski */
const POL=[[14.15,53.93],[15.57,54.18],[16.85,54.58],[17.55,54.76],[18.8,54.62],[18.55,54.43],[19.45,54.38],[19.65,54.45],[21.0,54.4],[22.75,54.36],[23.5,54.15],[23.5,53.93],[23.9,52.7],[23.6,52.08],[23.55,51.55],[23.8,51.15],[24.1,50.85],[23.6,50.4],[23.0,49.95],[22.7,49.6],[22.55,49.08],[21.8,49.4],[20.5,49.4],[20.05,49.2],[19.4,49.6],[18.85,49.5],[18.55,49.9],[18.0,50.05],[17.7,50.3],[16.85,50.2],[16.2,50.4],[15.35,50.8],[14.82,50.87],[14.95,51.5],[14.7,52.1],[14.55,52.6],[14.15,52.85],[14.35,53.3],[14.2,53.6]];
const PX=lon=>+((lon-13.8)*49).toFixed(1),PY=lat=>+((55-lat)*80).toFixed(1);
const POLPATH='M'+POL.map(p=>PX(p[0])+' '+PY(p[1])).join('L')+'Z';
const cpos=i=>[PX(CITIES[i].lon),PY(CITIES[i].lat)];

/* ================= INTERFEJS ================= */
const esc=t=>String(t).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
let UI={screen:'menu',tab:'market',sel:null,qty:1,city:null,travel:null,anim:null};
const app=()=>$('#app');
let AC=null;
function snd(k){if(!OPT.sound)return;try{AC=AC||new(window.AudioContext||window.webkitAudioContext)();if(AC.state==='suspended')AC.resume();
  const t0=AC.currentTime;const tone=(f,d,type,v,w)=>{const o=AC.createOscillator(),g=AC.createGain();o.type=type||'sine';o.frequency.value=f;g.gain.setValueAtTime(v||.05,t0+(w||0));g.gain.exponentialRampToValueAtTime(.0001,t0+(w||0)+d);o.connect(g);g.connect(AC.destination);o.start(t0+(w||0));o.stop(t0+(w||0)+d+.02);};
  if(k==='buy'){tone(420,.09,'triangle');tone(560,.1,'triangle',.05,.07);}
  else if(k==='sell'){tone(740,.08,'sine',.06);tone(1100,.16,'sine',.06,.07);}
  else if(k==='bad'){tone(160,.3,'sawtooth',.05);tone(110,.35,'sawtooth',.05,.15);}
  else if(k==='siren'){for(let i=0;i<4;i++)tone(i%2?640:880,.18,'square',.03,i*.2);}
  else if(k==='go'){tone(220,.2,'triangle',.05);tone(330,.25,'triangle',.05,.15);}
  else if(k==='tap')tone(600,.04,'sine',.03);
}catch(e){}}
function toast(t){const d=document.createElement('div');d.className='toast';d.textContent=t;document.body.appendChild(d);setTimeout(()=>d.remove(),2200);}

let _scrollKey='',_scrollTop=0;
function render(){
  const a=app();
  const m0=$('#main'),key=UI.screen+'|'+UI.tab+'|'+(UI.city||'')+'|'+(UI.travel?1:0);
  const keep=m0&&key===_scrollKey?m0.scrollTop:0;
  if(UI.screen==='menu')a.innerHTML=menuHTML();
  else if(UI.screen==='how')a.innerHTML=howHTML();
  else if(UI.screen==='scores')a.innerHTML=scoresHTML();
  else if(UI.screen==='end')a.innerHTML=endHTML();
  else a.innerHTML=gameHTML();
  _scrollKey=key;
  const m1=$('#main');
  if(m1&&keep){m1.scrollTop=keep;}
  if(UI.screen==='game'&&UI.sel&&m1){const s=m1.querySelector('.g.sel');if(s){const mr=m1.getBoundingClientRect(),sr=s.getBoundingClientRect();
    if(sr.bottom>mr.bottom)m1.scrollTop+=Math.min(sr.bottom-mr.bottom+8,sr.top-mr.top-4);}}
  if(UI.screen==='game'&&UI.travel)startAnim();
}
function menuHTML(){
  const sv=LS.get('db_save',null);
  return `<div class="menu"><div class="guil">${guil()}</div><div class="shade"></div><div class="in">
   <div class="logo">${LOGO}</div>
   <h1 class="title">Demon<br>Biznesu<span>Polska</span></h1>
   <p class="tag">Kupuj tanio, sprzedawaj drożej i omijaj policję. Przejedź Polskę z walizką pieniędzy i zbij fortunę, zanim skończą Ci się dni.</p>
   <div class="mbtns">
    ${sv?`<button class="btn pri" data-act="cont">Kontynuuj grę · dzień ${sv.day}</button><button class="btn" data-act="new">Nowa gra</button>`:`<button class="btn pri" data-act="new">Nowa gra</button>`}
    <div class="row2"><button class="btn sec" data-act="how">Jak grać</button><button class="btn sec" data-act="scores">Rekordy</button></div>
    <div class="lbl">Długość gry</div>
    <div class="seg">${[60,100,150].map(d=>`<button data-act="days" data-v="${d}" class="${OPT.days===d?'on':''}">${d} dni</button>`).join('')}</div>
    <div class="row2" style="margin-top:10px"><button class="btn sec sm" data-act="sound">Dźwięk ${OPT.sound?'wł.':'wył.'}</button>
     <input id="pname" class="btn sec sm" style="color:var(--txt);text-align:center;font-weight:700" maxlength="14" value="${esc(OPT.name)}" aria-label="Twoje imię"></div>
   </div></div></div>`;
}
function howHTML(){
  return `<div class="page"><h2>Jak grać</h2>
  <p>Masz ograniczoną liczbę dni, żeby zarobić jak najwięcej. Wynik to gotówka plus konto w banku minus dług.</p>
  <ul><li><b>Rynek.</b> W każdym mieście towary mają inne ceny. Zielona etykieta „Tanio” oznacza dobrą okazję do kupna, a czerwona „Drogo” dobry moment na sprzedaż.</li>
  <li><b>Mapa.</b> Wybierz miasto i jedź. Podróż zajmuje dni i kosztuje paliwo. Po odwiedzeniu miasta zapamiętasz jego ceny, więc planuj trasy.</li>
  <li><b>Kontrabanda.</b> Papierosy bez akcyzy, podróbki, fałszywe banknoty i narkotyki, a przede wszystkim przemyt broni dają wielkie zyski (broń to najdroższy towar, ale i najwyższe ryzyko), ale przy wjeździe do miasta grozi kontrola policji. Im więcej kontrabandy, im czujniejsza policja i im większy poziom alarmu w mieście, tym większe ryzyko.</li>
  <li><b>Gdy zatrzyma Cię policja.</b> Możesz dać łapówkę, uciekać albo się poddać. Areszt oznacza utratę całej kontrabandy, 60% gotówki z kieszeni i trzy dni. Pieniądze w banku są bezpieczne.</li>
  <li><b>Pojazdy.</b> Większy transport zabierze więcej towaru, ale spala więcej paliwa. Sportowe coupé ma małą ładownię, za to najłatwiej uciec nim policji.</li>
  <li><b>Bank i lichwiarz.</b> Konto daje niewielki procent. Dług u lichwiarza rośnie o 2% dziennie, więc spłacaj go przed końcem gry.</li>
  <li><b>Demon Biznesu.</b> Tajemniczy konkurent psuje czasem rynek. Zbij ponad 2 miliony zł, a sam zostaniesz demonem.</li></ul>
  <button class="btn pri" data-act="menu">Wróć do menu</button></div>`;
}
function scoresHTML(){
  const L=LS.get('db_scores',[]);
  return `<div class="page"><h2>Rekordy</h2>${L.length?L.map((s,i)=>`<div class="hs"><div class="pos">${i+1}</div><div class="n"><div>${esc(s.name)}</div><small>${esc(s.rank)} · ${s.days} dni · ${esc(s.date)}</small></div><b class="num">${fmt(s.score)}</b></div>`).join(''):'<p>Nie ma jeszcze żadnego wyniku. Zagraj pierwszą partię.</p>'}
  <button class="btn pri" data-act="menu" style="margin-top:12px;width:100%">Wróć do menu</button></div>`;
}
function endHTML(){
  const sc=score(),r=rankOf(sc),L=LS.get('db_scores',[]),pos=L.findIndex(x=>x.score===sc&&x.name===S.name)+1;
  return `<div class="page"><div class="card" style="text-align:center;padding:24px 16px;position:relative;overflow:hidden"><div style="position:absolute;inset:-40% -20% auto;opacity:.35">${guil()}</div>
   <div style="position:relative"><div style="color:var(--mut)">${S.ended==='time'?'Czas minął':'Koniec gry'}</div><div class="endn num" style="color:${sc>=0?'var(--gold)':'var(--red)'}">${fmt(sc)}</div><div class="rankt">${esc(r)}</div>
   ${pos&&pos<=10?`<div style="color:var(--mint);font-weight:800">Miejsce ${pos} na liście rekordów</div>`:''}</div></div>
   <div class="kv"><span>Gotówka</span><b class="num">${fmt(S.cash)}</b><span>Konto w banku</span><b class="num">${fmt(S.bank)}</b><span>Dług</span><b class="num">${fmt(-S.debt)}</b>
   <span>Zysk z handlu</span><b class="num">${fmt(S.stats.profit)}</b><span>Najlepsza transakcja</span><b class="num">${fmt(S.stats.best)}</b><span>Przejechane kilometry</span><b class="num">${fnum(S.stats.kmDone)} km</b>
   <span>Kontrole policji</span><b>${S.stats.raids}</b><span>Łapówki</span><b>${S.stats.bribes}</b><span>Areszty i konfiskaty</span><b>${S.stats.busts}</b></div>
   <div class="mbtns"><button class="btn pri" data-act="new">Zagraj jeszcze raz</button><button class="btn" data-act="menu">Menu główne</button></div></div>`;
}
const TABS=[['market','Rynek','<path d="M4 20V10l8-6 8 6v10H4zm5 0v-6h6v6" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>'],
 ['map','Mapa','<path d="M9 4 3 6v14l6-2 6 2 6-2V4l-6 2zm0 0v14m6-12v14" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>'],
 ['veh','Pojazd','<path d="M3 16v-4l3-5h10l4 5v4M3 16h18M7 19.5a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3zm10 0a1.5 1.5 0 1 0 0-3 1.5 1.5 0 0 0 0 3z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>'],
 ['bank','Bank','<path d="M3 9 12 4l9 5H3zm2 3v6m5-6v6m4-6v6m5-6v6M3 20h18" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>'],
 ['log','Wieści','<path d="M5 5h14v14H5zM8 9h8M8 12h8M8 15h5" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>']];
function gameHTML(){
  const C=CITIES[S.city],u=used(),cp=cap();
  const body={market:marketHTML,map:mapHTML,veh:vehHTML,bank:bankHTML,log:logHTML}[UI.tab]();
  return `<div class="hud"><div class="gl" style="width:220px">${guil()}</div>
   <div class="hrow"><div class="dayp num">Dzień ${S.day}/${S.maxDays}</div><div class="loc">${esc(C.n)}<small>${esc(VEH[S.veh].n)}</small></div>
   <button class="ico" data-act="gmenu" aria-label="Menu gry"><svg width="22" height="22" viewBox="0 0 24 24"><path d="M5 7h14M5 12h14M5 17h14" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/></svg></button></div>
   <div class="stats"><div class="st cash"><small>Gotówka</small><b class="num">${fmt(S.cash)}</b></div><div class="st bank"><small>Bank</small><b class="num">${fmt(S.bank)}</b></div><div class="st debt"><small>Dług</small><b class="num">${fmt(S.debt)}</b></div></div>
   <div class="cap ${u>=cp?'full':''}"><i style="width:${u/cp*100}%"></i><span class="num">Ładownia ${u} / ${cp}</span></div></div>
   <div class="main" id="main">${body}</div>
   <nav class="tabbar">${TABS.map(t=>`<button class="tab ${UI.tab===t[0]?'on':''}" data-act="tab" data-v="${t[0]}" ${UI.travel?'disabled':''}><svg viewBox="0 0 24 24">${t[2]}</svg>${t[1]}</button>`).join('')}</nav>`;
}
function trendHTML(c,g){const p=S.prev[c][g],m=mid(c,g);if(p==null||m==null)return '';const d=(m/p-1)*100;
  if(Math.abs(d)<.5)return '<small class="fl">bez zmian od wczoraj</small>';return `<small class="${d>0?'tu':'td'}">${d>0?'▲ drożeje':'▼ tanieje'} ${Math.abs(d).toFixed(0)}% <i>od wczoraj</i></small>`;}
function goodRow(g){
  const G=GOODS[g],id=G.id,bp=buyP(S.city,g),sp=sellP(S.city,g),it=S.inv[id],sel=UI.sel===id;
  const ratio=bp==null?1:mid(S.city,g)/G.base;
  const pc=Math.round(Math.abs(ratio-1)*100);
  const tag=bp==null?'':ratio<=.8?`<span class="pill cheap">Tanio −${pc}% </span>`:ratio>=1.3?`<span class="pill dear">Drogo +${pc}% </span>`:'';
  let owned='';
  if(it){const diff=sp==null?null:sp-it.avg;owned=`<span>Masz ${it.q} szt. · śr. ${fnum(it.avg)} zł</span>${diff==null?'':`<span class="${diff>=0?'up':'dn'}">${diff>=0?'+':''}${fnum(diff)} zł/szt.</span>`}`;}
  else owned=`<span>${bp==null?'Brak popytu i podaży w tym mieście':'Brak w ładowni'}</span>`;
  let h=`<div class="g ${G.c?'cbg':''} ${sel?'sel':''}"><button class="gh" data-act="sel" data-v="${id}" ${bp==null?'disabled style="opacity:.55"':''}>
   <div class="gi">${icon(id)}</div><div class="gn"><b>${esc(G.n)}</b><small>${tag}${owned}</small></div>
   <div class="gp ${bp==null?'na':''}">${bp==null?'<b>brak</b>':`<b class="num">${fnum(bp)} zł</b>${trendHTML(S.city,g)}`}</div></button>`;
  if(sel&&bp!=null){
    const q=UI.qty,maxB=maxBuy(S.city,g),sq=Math.min(q,it?it.q:q);
    h+=`<div class="trade"><div class="tr"><div class="stp"><button data-act="qd" data-v="-1" aria-label="Mniej">−</button><input id="qty" type="number" inputmode="numeric" min="1" value="${q}"><button data-act="qd" data-v="1" aria-label="Więcej">+</button></div></div>
    <div class="pre">${[1,5,10,25,100].map(n=>`<button data-act="qs" data-v="${n}">${n}</button>`).join('')}</div>
    <div class="tb"><button class="btn buy" data-act="buy"><span>Kup ${q} szt.</span><small class="num">${fmt(buyTotal(S.city,g,q))}</small></button>
     <button class="btn sell ${it?'':'dis'}" data-act="sell"><span>Sprzedaj ${sq} szt.</span><small class="num">${sp==null?'—':fmt(sellTotal(S.city,g,sq))}</small></button></div>
    <div class="lnk"><button data-act="buymax">Kup maksymalnie (${maxB})</button>${it?`<button data-act="sellall">Sprzedaj wszystko (${it.q})</button>`:''}</div></div>`;
  }
  return h+'</div>';
}
function marketHTML(){
  let h='';
  if(S.news)h+=`<div class="news"><svg viewBox="0 0 24 24"><path d="M5 5h14v14H5zM8 9h8M8 12h8M8 15h5" fill="none" stroke="currentColor" stroke-width="2"/></svg><div>${esc(S.news)}</div></div>`;
  h+='<div class="legend"><b>Jak czytać ceny:</b> <span class="pill cheap">Tanio</span>/<span class="pill dear">Drogo</span> = cena względem średniej krajowej (np. „Tanio −22%” to 22% poniżej średniej) (kupuj tanio, sprzedawaj drogo). <span class="tu">▲</span>/<span class="td">▼</span> = zmiana ceny od wczoraj. Towar może być tani, a mimo to drożeć.</div><div class="sect">Towary legalne</div>';
  GOODS.forEach((G,g)=>{if(!G.c)h+=goodRow(g);});
  h+=`<div class="sect cb">Kontrabanda · alarm policji w mieście ${Math.round(S.heat[S.city])}%</div>`;
  GOODS.forEach((G,g)=>{if(G.c)h+=goodRow(g);});
  return h;
}
function mapHTML(){
  const cur=S.city,sc=UI.city;
  let svg=`<svg viewBox="0 0 515 480" id="mapsvg"><defs><pattern id="gr" width="30" height="30" patternUnits="userSpaceOnUse"><path d="M30 0H0V30" fill="none" stroke="#2b4d44" stroke-width=".5" opacity=".6"/></pattern>
   <linearGradient id="pf" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#2a5a4c"/><stop offset="1" stop-color="#1c4137"/></linearGradient></defs>
   <rect width="515" height="480" fill="url(#gr)"/><path d="${POLPATH}" fill="url(#pf)" stroke="#5be3a0" stroke-opacity=".6" stroke-width="2" stroke-linejoin="round"/>`;
  if(sc!=null&&sc!==cur){const a=cpos(cur),b=cpos(sc);svg+=`<path d="M${a[0]} ${a[1]}L${b[0]} ${b[1]}" stroke="#f4c152" stroke-width="3" stroke-dasharray="6 6" stroke-linecap="round" opacity=".9"/>`;}
  CITIES.forEach((C,i)=>{const[x,y]=cpos(i),vis=S.visited[i],isC=i===cur,isS=i===sc;
    const lx=C.a==='w'?x-11:x+11,anc=C.a==='w'?'end':'start';
    svg+=`<g class="cdot" data-act="city" data-v="${i}">${isC?`<circle class="pulse" cx="${x}" cy="${y}" r="9" fill="#5be3a0"/>`:''}<circle cx="${x}" cy="${y}" r="18" fill="transparent"/>
    <circle cx="${x}" cy="${y}" r="${isC||isS?7.5:5.5}" fill="${isC?'#5be3a0':isS?'#f4c152':vis?'#eaf2ec':'#6b857b'}" stroke="#0c1a17" stroke-width="2"/>
    <text class="cname" x="${lx}" y="${y+4+(C.dy||0)}" text-anchor="${anc}">${esc(C.n)}</text></g>`;});
  svg+='<g id="vehg" style="display:none"><circle r="11" fill="#f4c152" stroke="#0c1a17" stroke-width="3"/><circle r="4" fill="#0c1a17"/></g></svg>';
  let info='';
  if(UI.travel)info=`<div class="card cinfo"><h3>W drodze do miasta ${esc(CITIES[UI.travel.to].n)}</h3><div class="sub">Podróż trwa ${UI.travel.days} ${UI.travel.days===1?'dzień':'dni'}…</div></div>`;
  else if(sc==null)info='<div class="card cinfo"><h3>Dokąd jedziesz?</h3><div class="sub">Stuknij miasto na mapie, żeby zobaczyć koszt podróży i ostatnie znane ceny.</div></div>';
  else {const C=CITIES[sc];const same=sc===cur;
    let chips='';
    if(S.visited[sc]){const ago=S.day-(S.seenDay&&S.seenDay[sc]||S.day);chips=`<div class="chips">${GOODS.map((G,g)=>{const p=S.seen[sc][g];if(p==null)return '';const r=p/(G.base*1.05);return `<div class="chip ${r<=.8?'c':r>=1.3?'d':''}"><small>${SHORT[G.id]}</small><b class="num">~${fnum(p)} zł</b></div>`;}).join('')}</div><div class="sub">Ostatnie znane ceny kupna z dnia ${S.seenDay&&S.seenDay[sc]||'?'} (${ago?ago+' dni temu':'dziś'}). Po podróży ceny zwykle się zmieniają, przeciętnie o kilka–kilkanaście procent, więc traktuj je jako orientacyjne.</div>`;}
    else chips='<div class="sub" style="margin:8px 0">Nie byłeś tu jeszcze. Ceny poznasz na miejscu.</div>';
    let go='';
    if(!same){const p=travelPlan(sc);const late=!p.err&&S.day+p.days>S.maxDays;
      go=p.err?`<div style="color:var(--red);font-weight:700;margin:6px 0">${p.err}</div>`:`<div class="sub" style="margin:8px 0">Dystans ${fnum(DIST[cur][sc])} km · ${p.days} ${p.days===1?'dzień':'dni'} · koszt ${fmt(p.cost)}${late?'<br><span style="color:var(--red)">Ta podróż przekroczy limit dni i zakończy grę.</span>':''}</div>
      <button class="btn pri" data-act="go" style="width:100%">Jedź do miasta ${esc(C.n)}</button>`;}
    info=`<div class="card cinfo"><h3>${esc(C.n)}${same?' (jesteś tu)':''}</h3>
     <div class="sub heat">Czujność policji: <span class="heatb"><i style="width:${clamp(C.pol*60+S.heat[sc]*.5,5,100)}%"></i></span> ${S.heat[sc]>=50?'wysoka':S.heat[sc]>=25?'podwyższona':'normalna'}</div>${chips}${go}</div>`;}
  return `<div class="mapw">${svg}</div>${info}`;
}
function vehHTML(){
  return VEH.map((v,i)=>{const cur=i===S.veh,net=v.price-Math.floor(VEH[S.veh].price*.5);
    return `<div class="card veh ${cur?'cur':''}"><div class="vi">${vehSVG(v.id)}</div><div class="vt"><b>${esc(v.n)}</b><small>${esc(v.d)}</small>
    <div class="vs"><span>${v.cap} miejsc</span><span>${v.fuel.toFixed(2).replace('.',',')} zł/km</span><span>${v.speed} km/dzień</span><span>ucieczka ${Math.round(v.esc*100)}%</span></div>
    ${cur?'<div style="color:var(--mint);font-weight:800;margin-top:8px">Twój pojazd</div>':`<button class="btn sm ${net<=S.cash?'pri':''}" data-act="bveh" data-v="${i}" style="margin-top:8px">${net<=0?'Zmień pojazd (dostajesz '+fmt(-net)+')':'Kup za '+fmt(net)}</button>`}</div></div>`;}).join('')+'<p style="color:var(--mut);font-size:13px;margin:4px 4px 0">Przy zakupie oddajesz obecny pojazd za połowę jego ceny.</p>';
}
function bankHTML(){
  return `<div class="card bank"><div class="big"><span>Gotówka w kieszeni</span><b class="num" style="color:var(--gold)">${fmt(S.cash)}</b></div>
   <div class="big"><span>Konto w banku (+0,15% dziennie)</span><b class="num" style="color:var(--sky)">${fmt(S.bank)}</b></div>
   <div class="big"><span>Dług u lichwiarza (+2% dziennie)</span><b class="num" style="color:var(--red)">${fmt(S.debt)}</b></div>
   <p style="color:var(--mut);font-size:13.5px;margin:10px 2px">Pieniądze z konta są bezpieczne przed napadem i aresztem. Gotówka nie.</p>
   <div class="stp" style="margin:6px 0"><button data-act="ad" data-v="-1000">−</button><input id="amt" type="number" inputmode="numeric" min="0" value="${UI.amt||1000}"><button data-act="ad" data-v="1000">+</button></div>
   <div class="pre"><button data-act="as" data-v="1000">1 tys.</button><button data-act="as" data-v="5000">5 tys.</button><button data-act="as" data-v="20000">20 tys.</button><button data-act="as" data-v="100000">100 tys.</button></div>
   <div class="row2" style="margin-top:12px"><button class="btn sm" data-act="bk" data-v="dep">Wpłać na konto</button><button class="btn sm" data-act="bk" data-v="wd">Wypłać z konta</button>
   <button class="btn sm" data-act="bk" data-v="loan">Pożycz od lichwiarza</button><button class="btn sm pri" data-act="bk" data-v="pay">Spłać dług</button></div>
   <div class="row2" style="margin-top:8px"><button class="btn sm sec" data-act="amax" data-v="cash">Cała gotówka</button><button class="btn sm sec" data-act="amax" data-v="bank">Całe konto</button></div></div>`;
}
function logHTML(){return `<div class="logl">${S.log.map(l=>`<div class="${l.k}"><small>Dzień ${l.d}</small>${esc(l.t)}</div>`).join('')}</div>`;}

/* --- okna --- */
function showModal(o){
  const m=$('#modal');
  m.innerHTML=`<div class="sheet" role="dialog" aria-modal="true"><div class="scene">${scene(o.scene)}</div><h3>${esc(o.title)}</h3><p>${esc(o.text)}</p><div class="opts">${o.opts.map((x,i)=>`<button class="opt ${x.cls||''}" data-act="opt" data-v="${i}"><b>${esc(x.t)}</b>${x.s?`<small>${esc(x.s)}</small>`:''}</button>`).join('')}</div></div>`;
  m.classList.add('on');m._o=o;
  if(o.scene==='police')snd('siren');else if(o.scene==='rob'||o.scene==='broken')snd('bad');
}
function closeModal(){const m=$('#modal');m.classList.remove('on');m.innerHTML='';m._o=null;}
function nextModal(){
  if(PQ.length){showModal(PQ.shift());return;}
  closeModal();save();
  if(S.ended){UI.screen='end';}
  render();
}
function pickOpt(i){
  const m=$('#modal'),o=m._o;if(!o)return;
  const r=o.opts[i].fn();
  if(r==='__nomoney'){toast('Nie stać Cię na to.');return;}
  if(r){showModal({scene:o.scene,title:'Co się stało',text:r,opts:[{t:'Dalej',cls:'go',fn:()=>null}]});return;}
  nextModal();
}

/* --- podróż z animacją --- */
function startAnim(){
  const g=$('#vehg'),T=UI.travel;if(!g||!T)return;
  const a=cpos(T.from),b=cpos(T.to);g.style.display='';
  const dur=700+T.days*600,t0=performance.now();
  const step=now=>{const k=Math.min(1,(now-t0)/dur),e=k<.5?2*k*k:1-Math.pow(-2*k+2,2)/2;
    const gg=$('#vehg');if(!gg||!UI.travel)return;gg.setAttribute('transform',`translate(${a[0]+(b[0]-a[0])*e} ${a[1]+(b[1]-a[1])*e})`);
    if(k<1)requestAnimationFrame(step);else finishTravel();};
  requestAnimationFrame(step);
}
function finishTravel(){
  const to=UI.travel.to;UI.travel=null;
  const err=travelNow(to);if(err)toast(err);
  UI.tab='market';UI.sel=null;UI.city=null;S.news=S.news&&PQ.length?S.news:S.news;
  if(S.ended&&!PQ.length){UI.screen='end';render();return;}
  snd('go');save();render();if(PQ.length)nextModal();
}
function doTravel(to){
  const p=travelPlan(to);if(p.err){toast(p.err);return;}
  S.news=null;UI.travel={from:S.city,to,days:p.days};UI.tab='map';snd('go');render();
}

/* --- obsługa kliknięć --- */
document.addEventListener('click',e=>{
  const el=e.target.closest('[data-act]');if(!el||el.disabled)return;
  const a=el.dataset.act,v=el.dataset.v;
  if(UI.travel&&a!=='opt')return;
  switch(a){
   case 'new':{UI.screen='game';newGame(OPT.days);UI.tab='market';UI.sel=null;UI.qty=1;UI.city=null;snd('go');save();render();break;}
   case 'cont':{const sv=LS.get('db_save',null);if(sv){S=migrate(sv);RND=Math.random;UI.screen='game';UI.tab='market';UI.sel=null;render();}break;}
   case 'how':UI.screen='how';render();break;
   case 'scores':UI.screen='scores';render();break;
   case 'menu':UI.screen='menu';render();break;
   case 'days':OPT.days=+v;LS.set('db_opt',OPT);render();break;
   case 'sound':OPT.sound=!OPT.sound;LS.set('db_opt',OPT);render();snd('tap');break;
   case 'gmenu':showModal({scene:'cash',title:'Menu gry',text:'Dzień '+S.day+' z '+S.maxDays+'. Wynik teraz: '+fmt(score())+'.',opts:[
      {t:'Wróć do gry',cls:'go',fn:()=>null},
      {t:'Zakończ grę i zapisz wynik',s:'Liczy się gotówka plus bank minus dług.',cls:'risk',fn:()=>{endGame('quit');return null;}},
      {t:'Wyjdź do menu',s:'Gra zostanie zapisana, możesz ją kontynuować.',fn:()=>{save();UI.screen='menu';return null;}}]});break;
   case 'opt':pickOpt(+v);break;
   case 'tab':UI.tab=v;render();break;
   case 'sel':UI.sel=UI.sel===v?null:v;UI.qty=1;snd('tap');render();break;
   case 'qd':UI.qty=clamp((+($('#qty')?.value)||UI.qty)+(+v),1,9999);render();break;
   case 'qs':UI.qty=+v;render();break;
   case 'buy':case 'sell':case 'buymax':case 'sellall':{
     const g=GI[UI.sel];if(g==null)break;let q=+($('#qty')?.value)||UI.qty;
     if(a==='buymax'){q=maxBuy(S.city,g);if(!q){toast(used()>=cap()?'Ładownia jest pełna.':'Za mało gotówki.');break;}}
     if(a==='sellall'){q=S.inv[UI.sel]?S.inv[UI.sel].q:0;}
     const err=(a==='buy'||a==='buymax')?buy(g,q):sell(g,q);
     if(err){toast(err);snd('bad');}else{snd(a==='buy'||a==='buymax'?'buy':'sell');UI.qty=Math.max(1,Math.min(UI.qty,9999));}
     save();render();break;}
   case 'city':UI.city=+v;render();snd('tap');break;
   case 'go':if(UI.city!=null)doTravel(UI.city);break;
   case 'bveh':{const err=buyVeh(+v);if(err)toast(err);else{snd('sell');save();}render();break;}
   case 'ad':UI.amt=Math.max(0,(+($('#amt')?.value)||UI.amt||0)+(+v));render();break;
   case 'as':UI.amt=+v;render();break;
   case 'amax':UI.amt=v==='cash'?S.cash:S.bank;render();break;
   case 'bk':{const err=bankDo(v,+($('#amt')?.value)||UI.amt||0);if(err){toast(err);snd('bad');}else{snd('sell');save();}render();break;}
  }
  if(a==='opt'&&UI.screen==='menu')render();
});
document.addEventListener('input',e=>{
  if(e.target.id==='qty'){UI.qty=clamp(+e.target.value||1,1,9999);const r=$('#main');const s=r?r.scrollTop:0;render();const m=$('#main');if(m)m.scrollTop=s;const q=$('#qty');if(q){q.focus();q.setSelectionRange(q.value.length,q.value.length);}}
  if(e.target.id==='amt')UI.amt=Math.max(0,+e.target.value||0);
  if(e.target.id==='pname'){OPT.name=e.target.value.slice(0,14)||'Gracz';LS.set('db_opt',OPT);}
});
window.addEventListener('DOMContentLoaded',render);
window.DBG={get S(){return S},UI,newGame,buy,sell,bankDo,buyVeh,travelNow,travelPlan,policeCheck,PQ,GOODS,CITIES,VEH,mid,buyP,sellP,buyTotal,sellTotal,maxBuy,impact,used,cap,score,raidChance,tripDays,tripCost,DIST,endGame,render,showModal,nextModal,pickOpt,rankOf,fmt,dayTick,addLog};
