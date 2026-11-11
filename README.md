# BARICA — frizerski salon Ivanec

Premium statička web stranica namijenjena prezentaciji vlasnici, izrađena u HTML/CSS/JavaScript. **Animirani uvod BARICA traje približno 2,55 sekundi i prikazuje se jednom po kartici** (naredne podstranice otvaraju se bez čekanja). Za korisnike s uključenu opcijom smanjenih animacija uvod se preskače.

## Postavljanje preko GitHuba i Cloudflare Pages

1. Raspakirajte ZIP na svoje računalo.
2. Napravite novi **GitHub repository** i u njega prenesite **sadržaj mape `BARICA-WEB`**, ne ZIP kao jednu datoteku. `index.html`, `functions`, `_headers`, `_routes.json` moraju biti u korijenu repozitorija.
3. U Cloudflareu odaberite **Workers & Pages > Create > Pages > Connect to Git**, odaberite repozitorij.
4. **Framework preset: None**, **Build command: prazno**, **Build output directory: `.`** (točka, korijen projekta). Objavite.
5. Za funkcije dinamičkog `sitemap.xml`, `robots.txt`, canonical i Open Graph koristite **GitHub integraciju**, a ne običan statički drag-and-drop upload: u drugom slučaju Cloudflare Pages Functions neće biti aktivne.
6. Nakon objave provjerite `/sitemap.xml` i `/robots.txt`, zatim povežite stvarnu domenu i provjerite da canonical URL pokazuje baš na tu domenu.
7. **Pages.dev probne adrese automatski dobivaju noindex** preko Cloudflare Function, kako se demonstracijska verzija ne bi pojavila u tražilicama. Vlastita domena dobiva indeksabilnu verziju.

## Najvažnije izmjene prije objave

- **Potvrdite stvarni kućni broj i punu adresu salona**. Trenutačno piše samo Ivanec; nije ugrađena izmišljena Google lokacija.
- **Potvrdite svih šest navedenih usluga** i uklonite ili uredite one koje salon ne pruža. Usluge su radna pretpostavka za prezentaciju.
- **Potvrdite broj, e-mail i ovlaštenje njihove javne objave.** Koriste se podaci iz upitnog obrasca: +385 98 948 0164 i fsbarica@gmail.com.
- **Zamijenite fotografije stvarnim fotografijama salona i frizura** kada ih vlasnica pošalje. Sadašnje fotografije služe kao inspiracija, ne predstavljaju stvarne radove BARICE.
- **Dopunite obvezne identifikacijske podatke** u Politici privatnosti i Uvjetima korištenja (pun naziv, registrirano sjedište, podatke koje zakon zahtijeva). Nije preporučeno javno lansiranje pravnih stranica bez provjere.
- **Postavite službenu domenu** u Cloudflare Pages i provjerite URL canonical, sitemap, OG i HTTPS.
- **Kontaktni obrazac**: bez pristupnog ključa ispravno kreira poruku u korisnikovoj e-mail aplikaciji, NE šalje ju automatski. Za izravnu dostavu dodajte Web3Forms pristupni ključ (i ažurirajte politiku privatnosti, provjerite spam zaštitu).
- **Google Analytics 4**: nije konfiguriran i neće se učitavati bez mjernog ID-a ili privole. Dodajte ID kad bude poznat i provjerite privole.
- **Prikupite stvarne recenzije** prije uključivanja recenzijskog dijela. Nisu objavljene izmišljene recenzije niti ocjene.
- **Radno vrijeme** nije izmišljeno ni prikazano prije potvrde.

## Gdje se što mijenja

- `assets/js/settings.js` — telefon, e-mail, grad, adresa, GA4 i Web3Forms ključ, domena.
- `index.html` — sadržaj početne.
- `usluge/index.html` — sve usluge i opisi.
- `o-nama/index.html` — priča o salonu.
- `galerija/index.html` — fotografije i kategorije.
- `kontakt/index.html` — kontakt, obrazac i lokacija.
- `assets/css/style.css` — boje, tipografija, animacije, responsive.
- `assets/js/main.js` — intro, cookie privole, navigacija, galerija, obrazac.
- `functions/` — dinamički sitemap, robots i SEO oznake na Cloudflare Pages.
- `scripts/generate.py` — izvorni generator stranica; ako uređujete ručno HTML, **nemojte ponovno pokretati** generator jer će zamijeniti HTML izmjene.

## Fotografije

Koriste se vanjski URL-ovi `images.unsplash.com`, s `auto=format`, dinamičkim dimenzijama i podešenom kvalitetom. U podržanim preglednicima CDN može automatski poslužiti moderni format, uključujući AVIF/WebP. Fotografije **nisu fizički spremljene u ZIP**, stoga se učitavaju putem interneta. Za potpuno lokalni deployment kasnije zamijenite URL-ove lokalnim AVIF datotekama, posebno kada vlasnica pošalje vlastite slike. Uporaba fotografija podliježe uvjetima licence i pravima prikazanih osoba/brendova.

Izvor licence: https://unsplash.com/license. Popis upotrijebljenih ID-ova nalazi se u `FOTOGRAFIJE-I-IZVORI.md`.

## Napomene o provjeri

Provjereni su JavaScript sintaksa, HTML struktura, interna povezivanja i datoteke. Potpuna browser, Lighthouse, stvarna dostava obrasca, Cloudflare runtime provjera i licencna provjera svake pojedine fotografije nisu mogli biti završeni u ovom radnom okruženju. Pogledajte `ZAVRSNI-IZVJESTAJ.md`.
