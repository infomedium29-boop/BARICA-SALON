# Završni izvještaj — BARICA

Datum: 11. studenoga 2026. Radna verzija za prezentaciju vlasnici.

| # | Stavka | Status | Napomena |
|---|---|---|---|
| 1 | Privacy Policy | ⚠️ Potrebna dodatna konfiguracija | Stranica izrađena; treba provjeriti pravni identitet, sjedište, postupanje s podacima i rokove pohrane. |
| 2 | Terms Page | ⚠️ Potrebna dodatna konfiguracija | Stranica postoji; podaci o registraciji i ponuđenim uslugama trebaju potvrdu. |
| 3 | Clear CTA | ✅ Implementirano i provjereno | Telefonski CTA na početnoj, kontaktu, uslugama i mobilnoj verziji. |
| 4 | FAQ | ✅ Implementirano i provjereno | Semantički `<details>`/`<summary>` na početnoj i uslugama. |
| 5 | robots.txt | ⚠️ Potrebna dodatna konfiguracija | Datoteka postoji i Cloudflare funkcija generira robots prema hostu; treba test na produkciji. |
| 6 | sitemap.xml | ⚠️ Potrebna dodatna konfiguracija | Cloudflare funkcija generira XML s apsolutnim URL-ovima; produkcijska provjera nakon objave. |
| 7 | Custom 404 | ⚠️ Potrebna dodatna konfiguracija | `404.html` izrađen; potrebno provjeriti stvarni 404 HTTP status na Cloudflareu. |
| 8 | ALT Text | ✅ Implementirano i provjereno | Svaka slikovna oznaka sadrži smislen alternativni tekst. |
| 9 | Analytics | ⚠️ Potrebna dodatna konfiguracija | GA4 konfiguracija prazna; skripte se uključuju tek nakon privole i upisa ID-a. |
| 10 | Meta Titles | ✅ Implementirano i provjereno | Jedinstveni naslovi svih podstranica. |
| 11 | Meta Description | ✅ Implementirano i provjereno | Jedinstveni opisi svih indeksabilnih podstranica. |
| 12 | Social Share | ⚠️ Potrebna dodatna konfiguracija | Osnovne OG/Twitter oznake i slika postoje, apsolutni URL i slika dodaju se u Cloudflare middlewareu; treba test. |
| 13 | Favicon | ✅ Implementirano i provjereno | Lokalni SVG favicon i PNG Apple touch ikona. |
| 14 | Canonical URLs | ⚠️ Potrebna dodatna konfiguracija | Generira Cloudflare middleware prema aktivnoj domeni; potrebno provjeriti produkciju i www redirect. |
| 15 | Cookie Consent | ✅ Implementirano i provjereno | Prihvati, odbij, postavke i naknadna promjena; samo nužna pohrana prije privole. |
| 16 | Mobile Version | ⚠️ Potrebna dodatna konfiguracija | Responzivni CSS i mobilni CTA implementirani, ali bez potpune provjere na stvarnim uređajima. |
| 17 | Accessibility | ⚠️ Potrebna dodatna konfiguracija | Semantika, navigacija tipkovnicom, focus, alt, smanjena animacija; potrebna formalna WCAG provjera. |
| 18 | Test Forms | ⚠️ Potrebna dodatna konfiguracija | Mailto fallback + validacija implementirani; Web3Forms ključ, antispam i stvarna dostava nisu testirani. |
| 19 | Check Broken Links | ⚠️ Potrebna dodatna konfiguracija | Lokalni interni linkovi pregledani, vanjske poveznice/CDN potrebno provjeriti online. |
| 20 | Optimise Performance | ⚠️ Potrebna dodatna konfiguracija | Mali JS/CSS, lazy-load i optimizacija preko Unsplash CDN-a; stvarni Lighthouse/Core Web Vitals trebaju online mjerenje. |

U konačnom produkcijskom izvještaju nijedna stavka ne smije biti prebačena u ✅ bez stvarnog testa.

## Preostali preduvjeti za produkciju

Potvrda adrese i radnog vremena, verifikacija popisa usluga, stvarne fotografije, kontrola licenci, pravni podaci, vlastita domena, Web3Forms/GA4 po želji, provjera obrazaca i analiza performansi uživo.
