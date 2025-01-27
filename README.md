# SoundWave

SoundWave je moderna web aplikacija za streaming glazbe koja pruža jedinstveno, interaktivno iskustvo slušanja glazbe. Projekt je razvijen kao završni rad s fokusom na stvaranje inovativnog korisničkog sučelja koje dinamički prilagođava svoj vizualni identitet prema trenutno reproduciranoj glazbi.

## Značajke
- Dinamička prilagodba boja sučelja prema naslovnici albuma
- Interaktivni glazbeni reproduktor
- Sustav preporuka glazbe
- Društvene funkcionalnosti i dijeljenje glazbe
- Personalizirane playliste
- Responzivni dizajn za sve veličine zaslona
- Administratorsko sučelje za upravljanje sadržajem
- WCAG 2.2 pristupačnost s minimalnim omjerom kontrasta 4.5:1

## Tehnologije
- Frontend: React.js, SASS
- Backend: Node.js, Express
- Baza podataka: MySQL
- Dodatne biblioteke: Color Thief (za ekstrakciju boja), React Router, Redux

## Početak Rada

### Preduvjeti
- Node.js
- MySQL
- XAMPP (Apache i MySQL server)

### Instalacija

1. Klonirajte repozitorij:
`git clone https://github.com/LighterThanAir7/SoundWave.git`
2. Instalirajte dependencies
`npm install`
3. Pokrenite XAMPP:
- Pokrenite XAMPP Control Panel
- Pokrenite Apache i MySQL servise
4. Pokrenite frontend aplikaciju
`npm run dev`
5. Pokrenite backend server:
`cd src\backend`
`node server.js`

## Dizajn
Projekt je dizajniran s posebnim naglaskom na korisničko iskustvo i vizualnu atraktivnost. Kompletan dizajn sustav temelji se na metodologiji atomarnog dizajna, omogućujući konzistentno i skalabilno korisničko sučelje.

Pogledajte detaljni [Figma projekt](https://www.figma.com/design/r17i8EyIzbl08ecTmZdIOM/SoundWave-Projekt).

## Pronašli ste bug?

Ako ste pronašli problem ili želite predložiti poboljšanje, molimo vas da otvorite issue u GitHub repozitoriju. Ako želite doprinijeti projektu, slobodno pošaljite Pull Request s referencom na kreirani issue.
