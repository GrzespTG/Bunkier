# B.U.N.K.I.E.R.

Prosta strategia czasu rzeczywistego (RTS) w klimacie klasycznych gier typu Red Alert, uruchamiana w przeglądarce i jako aplikacja na Androida.

## O grze

- Dwie strony konfliktu: **COD** (niebiescy) i **BF** (czerwoni).
- Trzy wielkości mapy: **Mała**, **Średnia**, **Duża**.
- Grafika 3D w przeglądarce (WebGL, biblioteka Three.js), dźwięk generowany w locie.
- Rekordy zapisują się na urządzeniu, osobno dla każdej wielkości mapy.
- Działa **offline**: czcionki są wbudowane w plik, gra nie pobiera niczego z internetu.

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
- Dopracowanie sztucznej inteligencji przeciwnika i balansu stron COD i BF.
- Nowe jednostki i budynki.
- Dalsza przyszłość: port do Unreal Engine 5.

## Licencja

Kod gry na licencji [MIT](LICENSE). Wbudowane czcionki (Barlow Condensed, IBM Plex Mono, Saira Stencil One) oraz biblioteka Three.js mają własne, otwarte licencje.
