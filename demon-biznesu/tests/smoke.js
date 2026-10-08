// Test dymny „Demon Biznesu Polska”: klika interfejs jak gracz i sprawdza logikę.
const { chromium } = require('playwright');
const path = require('path'), fs = require('fs');
const FILE = 'file://' + path.resolve(__dirname, '..', 'index.html');
const fail = [];
const check = (ok, msg) => { console.log((ok ? 'OK   ' : 'BŁĄD ') + msg); if (!ok) fail.push(msg); };
(async () => {
  const browser = await chromium.launch();
  for (const vp of [{ width: 390, height: 844, n: 'telefon' }, { width: 1280, height: 800, n: 'komputer' }]) {
    const page = await browser.newPage({ viewport: vp });
    const errs = [];
    page.on('pageerror', e => errs.push('pageerror: ' + e.message));
    page.on('console', m => { if (m.type() === 'error') errs.push('console: ' + m.text()); });
    await page.goto(FILE); await page.waitForTimeout(400);
    const t = s => `[${vp.n}] ${s}`;
    check(await page.evaluate(() => !!document.querySelector('.menu .title') && document.body.scrollWidth <= innerWidth), t('menu się wyświetla, bez przewijania w poziomie'));
    await page.click('[data-act=new]'); await page.waitForTimeout(200);
    check(await page.evaluate(() => document.querySelectorAll('.g').length === 12), t('rynek pokazuje 12 towarów'));
    check(await page.evaluate(() => document.body.scrollWidth <= innerWidth), t('gra bez przewijania w poziomie'));
    // kup i sprzedaj przez interfejs
    const c0 = await page.evaluate(() => DBG.S.cash);
    await page.click('[data-act=sel][data-v=sugar]'); await page.click('[data-act=qs][data-v="5"]'); await page.click('[data-act=buy]');
    const r1 = await page.evaluate(() => ({ cash: DBG.S.cash, q: DBG.S.inv.sugar && DBG.S.inv.sugar.q }));
    check(r1.q === 5 && r1.cash < c0, t('zakup 5 szt. przez przycisk działa (gotówka ' + c0 + ' → ' + r1.cash + ')'));
    await page.click('[data-act=sellall]');
    check(await page.evaluate(() => !DBG.S.inv.sugar && DBG.S.cash > 0), t('„Sprzedaj wszystko” działa'));
    // limit ładowni
    await page.click('[data-act=buymax]');
    check(await page.evaluate(() => DBG.used() <= DBG.cap()), t('limit ładowni nie jest przekraczany'));
    // wpływ ceny
    const imp = await page.evaluate(() => { const S = DBG.S, g = DBG.GOODS.findIndex(x => x.id === 'elec'); const a = DBG.buyTotal(S.city, g, 1), b = DBG.buyTotal(S.city, g, 20) / 20; return b > a; });
    check(imp, t('duże partie podnoszą cenę jednostkową'));
    // bank
    await page.click('[data-act=tab][data-v=bank]');
    await page.fill('#amt', '1000'); await page.click('[data-act=bk][data-v=loan]');
    check(await page.evaluate(() => DBG.S.debt >= 5000), t('pożyczka od lichwiarza działa'));
    await page.click('[data-act=bk][data-v=pay]');
    await page.click('[data-act=tab][data-v=veh]');
    check(await page.evaluate(() => document.querySelectorAll('.veh').length === 5), t('widok pojazdów: 5 pojazdów'));
    // podróż z animacją
    await page.click('[data-act=tab][data-v=map]');
    const d0 = await page.evaluate(() => DBG.S.day);
    const target = await page.evaluate(() => { let b = -1, bd = 1e9; for (let i = 0; i < DBG.CITIES.length; i++) if (i !== DBG.S.city && DBG.DIST[DBG.S.city][i] < bd) { bd = DBG.DIST[DBG.S.city][i]; b = i; } return b; });
    await page.evaluate(i => document.querySelector(`[data-act=city][data-v="${i}"] circle`).dispatchEvent(new MouseEvent('click', { bubbles: true })), target); await page.click('[data-act=go]');
    await page.waitForTimeout(2600);
    for (let k = 0; k < 6; k++) { const o = await page.$('[data-act=opt]'); if (!o) break; await o.click(); await page.waitForTimeout(150); }
    check(await page.evaluate(([d0, tg]) => DBG.S.day > d0 && DBG.S.city === tg, [d0, target]), t('podróż przesunęła dzień i miasto'));
    check(await page.evaluate(() => DBG.UI.tab === 'market' && !document.querySelector('#modal.on')), t('po podróży wracasz na rynek, okna zamknięte'));
    // naloty policji: wymuś kontrabandę i dużą czujność
    const pol = await page.evaluate(() => {
      const S = DBG.S; S.inv.drugs = { q: 20, avg: 1200 }; S.heat.fill(100); S.cash = 9000;
      let got = false; for (let i = 0; i < 200 && !got; i++) { DBG.PQ.length = 0; DBG.policeCheck(S.city); got = DBG.PQ.length > 0; }
      if (got) DBG.nextModal();
      return { got, title: document.querySelector('.sheet h3')?.textContent, opts: document.querySelectorAll('[data-act=opt]').length };
    });
    check(pol.got && /policji/i.test(pol.title) && pol.opts === 3, t('kontrola policji pokazuje okno z 3 wyborami'));
    await page.click('[data-act=opt][data-v="2"]'); await page.waitForTimeout(150);   // poddaj się
    check(await page.evaluate(() => !DBG.S.inv.drugs), t('„Poddaj się” odbiera kontrabandę'));
    await page.click('[data-act=opt]'); await page.waitForTimeout(150);
    // łapówka
    const br = await page.evaluate(() => { const S = DBG.S; S.inv.drugs = { q: 20, avg: 1200 }; S.cash = 20000; S.heat.fill(100); const c = S.cash; let got = false; for (let i = 0; i < 200 && !got; i++) { DBG.PQ.length = 0; DBG.policeCheck(S.city); got = DBG.PQ.length > 0; } DBG.nextModal(); return c; });
    await page.click('[data-act=opt][data-v="0"]'); await page.waitForTimeout(150);
    check(await page.evaluate(c => DBG.S.cash < c, br), t('łapówka kosztuje gotówkę'));
    await page.click('[data-act=opt]'); await page.waitForTimeout(100);
    // koniec gry i rekordy
    await page.evaluate(() => { DBG.S.day = DBG.S.maxDays; DBG.S.cash = 123456; });
    await page.click('[data-act=gmenu]'); await page.click('[data-act=opt][data-v="1"]'); await page.waitForTimeout(250);
    check(await page.evaluate(() => /Koniec gry|Czas minął/.test(document.body.innerText) && /zł/.test(document.querySelector('.endn').textContent)), t('ekran końcowy z wynikiem'));
    check(await page.evaluate(() => JSON.parse(localStorage.getItem('db_scores') || '[]').length >= 1), t('wynik zapisany w rekordach'));
    await page.click('[data-act=menu]'); await page.click('[data-act=scores]');
    check(await page.evaluate(() => document.querySelectorAll('.hs').length >= 1), t('lista rekordów się wyświetla'));
    await page.click('[data-act=menu]'); await page.click('[data-act=how]');
    check(await page.evaluate(() => /Kontrabanda/.test(document.body.innerText)), t('instrukcja „Jak grać” działa'));
    check(errs.length === 0, t('brak błędów w konsoli') + (errs.length ? ': ' + errs.slice(0, 3).join(' | ') : ''));
    await page.close();
  }
  // balans: bot rozgrywa pełne partie
  const p = await browser.newPage(); await p.goto(FILE);
  await p.addScriptTag({ content: fs.readFileSync(path.join(__dirname, 'bot.js'), 'utf8') });
  const res = await p.evaluate(() => { const o = { legal: [], full: [] }; for (let s = 1; s <= 8; s++) { o.legal.push(runBot('legal', s, 100).score); o.full.push(runBot('full', s, 100, .5).score); } return o; });
  const med = a => a.slice().sort((x, y) => x - y)[Math.floor(a.length / 2)];
  check(med(res.legal) > 250000 && med(res.legal) < 1500000, `balans: legalny bot z pełną wiedzą, mediana ${Math.round(med(res.legal))} zł`);
  check(med(res.full) > med(res.legal) * .8 && med(res.full) < 3000000, `balans: bot z kontrabandą, mediana ${Math.round(med(res.full))} zł`);
  await browser.close();
  if (fail.length) { console.log('\nNIEZALICZONE: ' + fail.length); process.exit(1); }
  console.log('\nWszystkie testy zaliczone.');
})();
