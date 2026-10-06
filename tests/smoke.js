// Test dymny: ładuje grę w Chromium bez interfejsu i sprawdza, czy nic się nie sypie.
const { chromium } = require('playwright');
const path = require('path');
const FILE = 'file://' + path.resolve(__dirname, '..', 'index.html') + '#lowfx';
const fail = [];
const check = (ok, msg) => { console.log((ok ? 'OK   ' : 'BŁĄD ') + msg); if (!ok) fail.push(msg); };

(async () => {
  const browser = await chromium.launch({ args: ['--use-gl=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'] });
  for (const side of ['blue', 'red']) {
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
      for (const t of ['pow', 'ref', 'fac', 'bun', 'aat', 'rep', 'lab', 'air', swTypeFor(0)]) {
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
    check(r.built === 9, `[${side}] zbudowano 9 budynków (jest ${r.built})`);
    check(r.pwOk && r.pwUse > 0, `[${side}] elektrownia daje energię (zużycie ${r.pwUse})`);
    check(!r.far, `[${side}] nie da się budować daleko od własnych budynków`);
    check(r.lowF < 1, `[${side}] deficyt prądu spowalnia (x${r.lowF.toFixed(2)})`);
    check(r.fired, `[${side}] super broń wystrzeliła`);
    check(r.hpDrop > 200, `[${side}] super broń zadała obrażenia (${Math.round(r.hpDrop)} HP)`);
    check(r.enemyUnits >= 5, `[${side}] AI buduje armię (${r.enemyUnits} jednostek)`);
    await page.waitForTimeout(300);
    check(errs.length === 0, `[${side}] brak błędów w konsoli` + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
    await page.close();
  }
  await browser.close();
  if (fail.length) { console.log('\nNIEZALICZONE: ' + fail.length); process.exit(1); }
  console.log('\nWszystkie testy zaliczone.');
})();
