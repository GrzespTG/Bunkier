# Demon Biznesu Polska

Gra handlowa w jednym pliku `index.html` (bez zależności). Kupuj tanio, sprzedawaj drożej, jeźdź po Polsce, omijaj policję.

- Budowa: `./build.sh` składa `index.html` z `part1.html` (styl), `part2.js` (dane i logika), `part3.js` (grafika i interfejs).
- Test: `NODE_PATH=<ścieżka do playwright> node tests/smoke.js` (interfejs + balans botem). Balans ręcznie: `node tests/balance.js 30`.
- APK: `python3 tools/mkapk.py android/template.apk index.html DemonBiznesu.apk <katalog_kluczy>`.
