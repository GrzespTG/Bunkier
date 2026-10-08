/* ================= DŹWIĘK I MUZYKA ================= */
OPT=Object.assign({vm:60,vs:80},OPT);
let AC=null,sfxG=null,musG=null,BUF={},MT={},curMus=null,sirenSrc=null,audioOn=false;
const SFXKEYS={tap:'tap',buy:'buy',sell:'sell',bad:'bad',go:'depart',siren:'police',escape:'escape',arrest:'arrest',bribe:'bribe',rob:'rob',shots:'shots',demon:'demon',win:'win',lose:'lose'};
const b64buf=s=>{const b=atob(s),u=new Uint8Array(b.length);for(let i=0;i<b.length;i++)u[i]=b.charCodeAt(i);return u;};
function applyVol(){if(!AC)return;const t=AC.currentTime;sfxG.gain.setTargetAtTime(OPT.sound?Math.pow(OPT.vs/100,1.6):0,t,.03);musG.gain.setTargetAtTime(OPT.sound?Math.pow(OPT.vm/100,1.6):0,t,.03);}
function initAudio(){
  if(audioOn){if(AC&&AC.state==='suspended')AC.resume();return;}
  try{AC=new(window.AudioContext||window.webkitAudioContext)();}catch(e){return;}
  audioOn=true;sfxG=AC.createGain();sfxG.connect(AC.destination);musG=AC.createGain();musG.connect(AC.destination);applyVol();
  if(AC.state==='suspended')AC.resume();
  for(const k of Object.keys(AUD)){
    if(k==='m_menu'||k==='m_end'){ // długie utwory: element audio
      try{const url=URL.createObjectURL(new Blob([b64buf(AUD[k])],{type:'audio/mpeg'}));const el=new Audio(url);el.loop=k==='m_menu';el.preload='auto';
        const src=AC.createMediaElementSource(el),g=AC.createGain();g.gain.value=0;src.connect(g);g.connect(musG);MT[k]={el,g};}catch(e){}
    }else{
      const u=b64buf(AUD[k]);const done=b=>{BUF[k]=b;if(k.startsWith('m_'))syncMusic();};
      try{const p=AC.decodeAudioData(u.buffer,done,()=>{});if(p&&p.catch)p.catch(()=>{});}catch(e){}
    }
  }
  syncMusic();
}
function wantMusic(){
  if(!OPT.sound)return null;
  if(UI.screen==='end')return 'm_end';
  if(UI.screen==='game'){const m=$('#modal');return m&&m._o&&m._o.scene==='police'?'m_danger':'m_game';}
  return 'm_menu';
}
function stopTrack(k){const t=MT[k];if(!t)return;const now=AC.currentTime;t.g.gain.cancelScheduledValues(now);t.g.gain.setValueAtTime(t.g.gain.value,now);t.g.gain.linearRampToValueAtTime(0,now+.9);
  setTimeout(()=>{if(curMus!==k){try{t.src?t.src.stop():t.el.pause();}catch(e){}if(t.src)delete t.src;}},1000);}
function startTrack(k){
  let t=MT[k];
  if(!t){const b=BUF[k];if(!b)return false;const g=AC.createGain();g.gain.value=0;g.connect(musG);t=MT[k]={g};}
  if(t.el){try{t.el.currentTime=0;t.el.play();}catch(e){}}
  else if(!t.src){const b=BUF[k];if(!b)return false;const s=AC.createBufferSource();s.buffer=b;s.loop=true;s.connect(t.g);s.start();t.src=s;}
  const now=AC.currentTime;t.g.gain.cancelScheduledValues(now);t.g.gain.setValueAtTime(t.g.gain.value,now);t.g.gain.linearRampToValueAtTime(1,now+.9);return true;
}
function syncMusic(){
  if(!audioOn||!AC)return;const w=wantMusic();
  if(w===curMus){if(w&&MT[w]&&MT[w].g.gain.value<.05)startTrack(w);return;}
  const old=curMus;curMus=w;if(old)stopTrack(old);if(w&&!startTrack(w))curMus=null;
}
function sirenLoop(on){
  if(!audioOn||!AC)return;
  if(on&&!sirenSrc&&BUF.siren_loop){const g=AC.createGain();g.gain.value=.35;g.connect(sfxG);const s=AC.createBufferSource();s.buffer=BUF.siren_loop;s.loop=true;s.connect(g);s.start();sirenSrc={s,g};}
  else if(!on&&sirenSrc){const o=sirenSrc;sirenSrc=null;try{o.g.gain.setTargetAtTime(0,AC.currentTime,.15);setTimeout(()=>{try{o.s.stop();}catch(e){}},700);}catch(e){}}
}
function snd(k,delay){
  if(!OPT.sound)return;initAudio();if(!AC)return;
  const key=SFXKEYS[k],b=key&&BUF[key];
  if(b){const s=AC.createBufferSource();s.buffer=b;s.connect(sfxG);s.start(AC.currentTime+(delay||0));return;}
  // zapasowy dźwięk syntezowany, gdy plik jeszcze się dekoduje
  try{const t0=AC.currentTime;const o=AC.createOscillator(),g=AC.createGain();o.frequency.value=k==='bad'?150:k==='sell'?900:500;o.type='triangle';g.gain.setValueAtTime(.05,t0);g.gain.exponentialRampToValueAtTime(.0001,t0+.12);o.connect(g);g.connect(sfxG);o.start(t0);o.stop(t0+.14);}catch(e){}
}
function volHTML(){
  return `<div class="vols"><label>Muzyka <b id="vmv">${OPT.vm}%</b><input type="range" id="vm" min="0" max="100" step="5" value="${OPT.vm}"></label>
  <label>Efekty dźwiękowe <b id="vsv">${OPT.vs}%</b><input type="range" id="vs" min="0" max="100" step="5" value="${OPT.vs}"></label>
  <button class="btn sec sm" data-act="sound" id="snbtn" style="margin-top:6px">Dźwięk ${OPT.sound?'wł.':'wył.'}</button></div>`;
}
['pointerdown','touchstart','click','keydown'].forEach(ev=>document.addEventListener(ev,()=>{if(OPT.sound)initAudio();},{capture:true,passive:true}));
document.addEventListener('input',e=>{
  if(e.target.id==='vm'||e.target.id==='vs'){OPT[e.target.id]=+e.target.value;LS.set('db_opt',OPT);const l=$('#'+e.target.id+'v');if(l)l.textContent=OPT[e.target.id]+'%';applyVol();}
});
document.addEventListener('change',e=>{if(e.target.id==='vs')snd('sell');});
document.addEventListener('visibilitychange',()=>{if(!AC)return;if(document.hidden){AC.suspend();for(const k in MT)if(MT[k].el)try{MT[k].el.pause();}catch(e){}}else{AC.resume();const t=MT[curMus];if(t&&t.el)try{t.el.play();}catch(e){}}});
