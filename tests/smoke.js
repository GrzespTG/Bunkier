// Test dymny: ładuje grę w Chromium bez interfejsu i sprawdza, czy nic się nie sypie.
const { chromium } = require('playwright');
const path = require('path');
const FILE = 'file://' + path.resolve(__dirname, '..', 'index.html') + '#lowfx';
const fail = [];
const check = (ok, msg) => { console.log((ok ? 'OK   ' : 'BŁĄD ') + msg); if (!ok) fail.push(msg); };

(async () => {
  const browser = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  for (const side of ['blue', 'red', 'yellow']) {
    const page = await browser.newPage({ viewport: { width: 960, height: 600 } });
    const errs = [];
    page.on('pageerror', e => errs.push('pageerror: ' + e.message));
    page.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
    await page.goto(FILE);
    await page.waitForTimeout(1500);
    check(await page.evaluate(() => typeof G === 'object' && !NO_GL), `[${side}] gra i WebGL się ładują`);
    await page.evaluate(s => { ST.side = s; start(); }, side);
    await page.waitForTimeout(300);
    check(await page.evaluate(() => !!document.querySelector('#gfxSeg') && typeof adaptRes === 'function' && typeof R3.scale === 'number'), `[${side}] ustawienia grafiki i skalowanie rozdzielczości są dostępne`);
    // układ: mapa na cały ekran, menu rozwijane z przycisków
    const lay = await page.evaluate(() => ({ cw: cv.clientWidth, ch: cv.clientHeight, w: innerWidth, h: innerHeight }));
    check(lay.cw === lay.w && lay.ch === lay.h, `[${side}] mapa zajmuje cały ekran (${lay.cw}x${lay.ch})`);
    await page.click('#tBuild');
    check(await page.evaluate(() => !$('#popB').hidden && $('#popU').hidden), `[${side}] przycisk Budowa rozwija menu budynków`);
    await page.click('#tProd');
    check(await page.evaluate(() => $('#popB').hidden && !$('#popU').hidden), `[${side}] przycisk Produkcja rozwija menu jednostek`);
    await page.keyboard.press('Tab'); await page.keyboard.press('Tab');
    await page.keyboard.press('Tab'); await page.keyboard.press('Tab'); // cykl: Budowa → Produkcja → zwinięte
    check(await page.evaluate(() => $('#popB').hidden && $('#popU').hidden), `[${side}] Tab zwija menu po pełnym cyklu`);
    // sterowanie
    for (const k of ['q', 'f', 'h', 'z', 'Escape', 'b', 'Home', ' ', '1', 'x']) { await page.keyboard.press(k); await page.waitForTimeout(40); }
    await page.mouse.click(400, 300); await page.mouse.click(400, 300, { button: 'right' });
    // symulacja 4 minut + budynki, produkcja, super broń
    const r = await page.evaluate(() => {
      G.res[0].stal = 99999;
      const hq = G.buildings.find(b => b.team === 0 && b.type === 'hq'), built = [];
      for (const t of ['pow', 'ref', 'fac', 'bun', 'aat', 'rep', 'lab', 'air', 'bar', swTypeFor(0)]) {
        let ok = false;
        for (let r = 4; r < 14 && !ok; r++) for (let a = 0; a < 16 && !ok; a++) {
          const tx = Math.round(hq.tx + Math.cos(a / 16 * 6.283) * r), ty = Math.round(hq.ty + Math.sin(a / 16 * 6.283) * r);
          if (canPlace(0, t, tx, ty)) { const b = addB(0, t, tx, ty, true); b.built = true; b.needB = false; ok = true; built.push(t); }
        }
      }
      calcPower(); const pwOk = G.pw[0].p >= 130, pwUse = G.pw[0].u;
      // limit odległości budowy: daleko od budynków nie wolno
      const far = canPlace(0, 'tow', Math.min(MW - 3, hq.tx + 30), hq.ty);
      // deficyt prądu spowalnia
      const fac = G.buildings.find(b => b.team === 0 && b.type === 'fac'); const pw0 = G.buildings.find(b => b.team === 0 && b.type === 'pow');
      pw0.dead = true; calcPower(); const lowF = G.pw[0].f; pw0.dead = false; calcPower();
      for (let i = 0; i < 1200; i++) update(0.05);
      const sw = G.buildings.find(b => b.team === 0 && b.d.sw), e = G.buildings.find(b => b.team === 1 && b.type === 'hq');
      let fired = false, hp0 = e.hp;
      if (sw) { sw.ready = true; sw.charge = sw.d.charge; fired = fireSW(0, e.x, e.y); }
      for (let i = 0; i < 400; i++) update(0.05);
      return { pwOk, pwUse, far, lowF, built: built.length, fired, hpDrop: hp0 - e.hp, enemyUnits: G.units.filter(u => u.team === 1).length, time: G.time | 0 };
    });
    check(r.built === 10, `[${side}] zbudowano 10 budynków (jest ${r.built})`);
    check(r.pwOk && r.pwUse > 0, `[${side}] elektrownia daje energię (zużycie ${r.pwUse})`);
    check(!r.far, `[${side}] nie da się budować daleko od własnych budynków`);
    check(r.lowF < 1, `[${side}] deficyt prądu spowalnia (x${r.lowF.toFixed(2)})`);
    check(r.fired, `[${side}] super broń wystrzeliła`);
    check(r.hpDrop > 200, `[${side}] super broń zadała obrażenia (${Math.round(r.hpDrop)} HP)`);
    check(r.enemyUnits >= 5, `[${side}] AI buduje armię (${r.enemyUnits} jednostek)`);

    // --- trzy frakcje, sojusze, piechota ---
    const f = await page.evaluate(side => {
      const out = {};
      out.fac = G.fac.slice(); out.nT = G.nT;
      out.allyOk = G.nT === 3 && G.al[0][1] === false && G.al[0][2] === (G.fac[2] === G.fac[0]) && G.al[0][0] === true;
      out.sw = swTypeFor(0);
      const hq = G.buildings.find(b => b.team === 0 && b.type === 'hq');
      const bar = G.buildings.find(b => b.team === 0 && b.type === 'bar');
      // produkcja piechoty wg frakcji
      G.res[0].stal = 99999;
      const q = {}; for (const t of ['rif', 'baz', 'eng', 'snip', 'sab', 'dog']) q[t] = queueUnit(0, t);
      out.q = q;
      out.qOk = q.rif && q.baz && q.eng && q.snip === (side !== 'yellow') && q.sab === (side === 'yellow') && q.dog === (side === 'red');
      // piechota produkuje się z koszar
      for (let i = 0; i < 700; i++) update(0.05);
      out.made = G.units.filter(u => u.team === 0 && u.d.inf).length;
      // ukrycie i wykrywanie
      const mx = hq.x + 200, my = hq.y + 200;
      const hid = addU(0, side === 'yellow' ? 'sab' : 'snip', mx, my);
      const dog = addU(1, 'dog', mx + 300, my);
      dog.hp = 99999; hid.hp = 99999;
      detectTick();
      out.cloak = hid.cloaked === true && (hid.detBy & 2) === 0 && visible(hid) === true;
      dog.x = mx + 40; detectTick();
      out.detect = (hid.detBy & 2) !== 0;
      dog.dead = true; hid.dead = true;
      // garnizon w bunkrze
      const bun = G.buildings.find(b => b.team === 0 && b.type === 'bun');
      const sol = addU(0, 'rif', bun.x + 60, bun.y + 60);
      sol.enter = bun; let n = 0;
      while (!sol.inB && n++ < 600) update(0.05);
      out.garr = sol.inB === bun && bun.garr.length === 1 && !visible(sol);
      ungarrison(bun);
      out.ung = !sol.inB && bun.garr.length === 0;
      sol.dead = true;
      // inżynier naprawia
      const tgt = G.buildings.find(b => b.team === 0 && b.type === 'pow');
      tgt.hp = tgt.d.hp * 0.4; const h0 = tgt.hp;
      const eng = addU(0, 'eng', tgt.x + tgt.rad + 10, tgt.y);
      for (let i = 0; i < 160; i++) update(0.05);
      out.eng = tgt.hp - h0;
      eng.dead = true;
      // sabotażysta
      const eh = G.buildings.find(b => b.team === 1 && b.type === 'hq'); const et = addB(1, 'pow', eh.tx + 6, eh.ty + 6, true); et.built = true; et.needB = false; et.hp = et.d.hp = 5000;
      const sab = addU(0, 'sab', et.x - 80, et.y - 70);
      sab.hp = 99999; sab.plant = et; const e0 = et.hp;
      for (let i = 0; i < 300; i++) update(0.05);
      out.sab = e0 - et.hp; et.dead = true;
      sab.dead = true;
      // AI: koszary i piechota u przeciwnika
      for (let i = 0; i < 2400; i++) update(0.05);
      out.aiBar = G.buildings.some(b => b.team === 1 && b.type === 'bar' && !b.dead);
      out.aiInf = G.units.filter(u => u.team === 1 && u.d.inf).length;
      out.aiSw = G.buildings.some(b => b.team === 1 && b.d.sw);
      // panele budowy/produkcji i ikony nie wywalają się
      buildPanel(); out.icons = ['rif', 'baz', 'eng', 'snip', 'sab', 'dog'].every(t => typeof makeIcon(t, false) === 'string') && ['bar', 'swd', 'swb', 'swc'].every(t => typeof makeIcon(t, true) === 'string');
      return out;
    }, side);
    console.log(`[${side}] ${JSON.stringify(f)}`);
    check(f.fac[0] === side && f.nT === 3 && f.allyOk, `[${side}] 3 frakcje: ${f.fac.join('/')}, sojusze wg koloru`);
    check(f.qOk, `[${side}] jednostki piechoty zależne od frakcji (${JSON.stringify(f.q)})`);
    check(f.made >= 1, `[${side}] koszary produkują piechotę (${f.made})`);
    check(f.cloak, `[${side}] skradająca się piechota jest niewidoczna dla wroga`);
    check(f.detect, `[${side}] pies wykrywa skradającą się piechotę`);
    check(f.garr && f.ung, `[${side}] żołnierz obsadza bunkier i go opuszcza`);
    check(f.eng > 10, `[${side}] inżynier naprawia budynek (+${Math.round(f.eng)} HP)`);
    check(f.sab > 400, `[${side}] sabotażysta niszczy ładunkiem (${Math.round(f.sab)} HP)`);
    check(f.aiBar, `[${side}] AI buduje koszary`);
    check(f.icons, `[${side}] ikony nowych jednostek i budynków renderują się`);
    await page.waitForTimeout(300);
    check(errs.length === 0, `[${side}] brak błędów w konsoli` + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
    await page.close();
  }
  await browser.close();
  if (fail.length) { console.log('\nNIEZALICZONE: ' + fail.length); process.exit(1); }
  console.log('\nWszystkie testy zaliczone.');
})();
