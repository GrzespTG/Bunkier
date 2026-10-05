# B.U.N.K.I.E.R.

Prosta strategia czasu rzeczywistego (RTS) w klimacie klasycznych gier typu Red Alert, uruchamiana w przeglądarce i jako aplikacja na Androida.

## O grze

- Dwie strony konfliktu: **COD** (niebiescy) i **BF** (czerwoni).
- Trzy wielkości mapy: **Mała**, **Średnia**, **Duża**.
- Grafika 3D w przeglądarce (WebGL, biblioteka Three.js), dźwięk generowany w locie.
- Rekordy zapisują się na urządzeniu, osobno dla każdej wielkości mapy.
- Działa **offline**: czcionki są wbudowane w plik, gra nie pobiera niczego z internetu.

## Co nowego

- **Jednostki:** Zwiadowca, Wyrzutnia SAM, Mamut, Śmigłowiec bojowy, Niszczyciel.
- **Budynki:** Bunkier, Wieża SAM, Warsztat, Centrum Badań.
- **Super bronie:** Zenit (COD, uderzenie orbitalne) i Pożoga (BF, rakieta napalmowa). Wróg też ich używa, a koło celu widać na mapie i minimapie.
- **Sterowanie:** grupy Ctrl+1…9, atak w marszu (F), utrzymanie pozycji (H), super broń (Z), skok do bazy (B), skok do alarmu (Spacja), Shift dodaje do zaznaczenia, środkowy przycisk przesuwa mapę.
- **Sztuczna inteligencja:** wróg planuje rozwój, wysyła różne typy jednostek, rajdy zwiadowców, lotnictwo, odpiera ataki i odpala super broń.
- **Grafika i dźwięk:** nowe modele, dym uszkodzonych jednostek, wstrząs ekranu, nowe efekty dźwiękowe.

## Jak uruchomić

Cała gra to jeden plik: [`index.html`](index.html).

1. Pobierz repozytorium (przycisk **Code → Download ZIP**) i rozpakuj.
2. Otwórz `index.html` w nowoczesnej przeglądarce (Chrome, Edge, Firefox).

Wersja na Androida to ten sam plik opakowany w aplikację (WebView). Plik APK nie jest przechowywany w repozytorium.

## Budowa kodu

Kod w `index.html` dzieli się na dwie części:

| Część | Zawartość |
| --- | --- |
| Silnik 3D | wbudowana biblioteka Three.js |
| Logika gry | mapa, ruch i ścieżki, walka, jednostki, budynki, sztuczna inteligencja przeciwnika, pętla gry, kamera i sterowanie, panel i menu, rekordy |
| Grafika | teren, woda, drzewa i skały, kryształy rudy, pojazdy, budynki, cząsteczki, pociski, minimapa, mgła wojny |
| Dźwięk | instrumenty i efekty (Web Audio) |

## Plany

- Podział jednego dużego pliku na osobne moduły.
- Dalsze dopracowanie balansu stron COD i BF.
- Dalsza przyszłość: port do Unreal Engine 5.

## Testy i budowanie APK

Po każdym wypchnięciu zmian GitHub Actions uruchamia test dymny (`tests/smoke.js`: ładowanie gry, sterowanie, budowa, super bronie, AI, brak błędów w konsoli), a dopiero potem składa i podpisuje APK (artefakt `BUNKIER-apk` w zakładce Actions). Lokalnie: `npm i playwright && node tests/smoke.js`.

Aby APK dało się aktualizować bez odinstalowywania, dodaj w Settings → Secrets sekrety `KEYSTORE_B64` (plik .jks zakodowany base64) i `KEYSTORE_PASS`. Bez nich budowany jest APK z kluczem tymczasowym.

## Licencja

Kod gry na licencji [MIT](LICENSE). Wbudowane czcionki (Barlow Condensed, IBM Plex Mono, Saira Stencil One) oraz biblioteka Three.js mają własne, otwarte licencje.
