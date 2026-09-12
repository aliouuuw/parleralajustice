# Jokko Ak Yoon and e-Justice (Senegal) — public briefing

Checked: 12 September 2026, about 20:45–21:00 UTC. Second pass confirmed APS, INSOFT MULTI FORMS hosts, `e-justice.sn` HTTP 500, and JUBBANTI as a 2024 predecessor.

Scope: official and press pages, NIC.SN WHOIS, live DNS/HTTP, public HTML/JS. No exploit work. No private code.

## A. Official announcements

**Launch date:** Thursday 10 September 2026. Venue: Palais de Justice Lat Dior, Dakar.

**Speaker:** Samba Kane, directeur de cabinet, standing in for Garde des Sceaux Me Moussa Sarr (Council of Ministers).

| Source | Role | URL |
|---|---|---|
| APS (Agence de Presse Sénégalaise), 10 Sep 2026 14:46 | State news agency dispatch | https://aps.sn/deux-plateformes-numeriques-lancees-pour-moderniser-les-procedures-judiciaires/ |
| Vie Publique SN X post, 12 Sep 2026 10:25 UTC | Civic information account; names both URLs | https://x.com/ViePubliqueSN/status/2098719759839744494 |
| RTS, 4 Sep 2026 | Public TV preview of 10 Sep launch | https://www.rts.sn/actualite/detail/a-la-une/e-justice-et-jokko-ak-yoon-les-services-judiciaires-a-lere-du-numerique |
| Ministry site `justice.sec.gouv.sn` | Official portal | https://justice.sec.gouv.sn/ |

**Not found on the Ministry site:** a dedicated Jokko Ak Yoon / 10 September 2026 launch article. Homepage on this check still leads with other news.

Vie Publique SN is not the Ministry account. Bio: “Plateforme d’information sur le Sénégal”. Verified X account `@ViePubliqueSN`. Website on the profile: https://linktr.ee/ViePubliqueSN. Ministry social listed on the official portal: `@minjustsn` and Facebook `MinJustsn`. No Ministry tweet of the launch was retrieved in this pass.

Press that quotes the same ceremony (not APS):

- https://www.seneweb.com/fr/news/Justice/modernisation-de-la-justice-les-plateformes-e-justice-et-jokko-ak-yoon-officiellement-lancees_n_503904.html (10 Sep 2026)
- https://www.pressafrik.com/Dakar-l-Etat-lance-officiellement-les-plateformes-e-Justice-et-Jokko-Ak-Yoon_a311346.html
- https://www.pointactu.sn/e-justice-et-jokko-ak-yoon-des-plateformes-pour-dematerialiser-les-demarches/
- https://ledakarois221.com/lancement-officiel-de-e-justice-et-de-jokko-ak-yonn-pour-accelerer-les-procedures-judiciaires/

Pre-launch:

- Le Soleil, 4 Sep 2026: https://lesoleil.sn/justice/le-senegal-mise-sur-le-numerique-pour-rapprocher-les-citoyens-des-tribunaux/
- Seneweb, 6 Sep 2026: https://www.seneweb.com/fr/news/Justice/e-justice-et-jokkoo-ak-yoon-le-senegal-accelere-la-digitalisation-et-laccessibilite-de-la-justice_n_503476.html
- We are Tech, 7 Sep 2026: https://www.wearetech.africa/en/fils-uk/news/tech/senegal-turns-to-digital-platforms-to-tackle-judicial-backlog

## B. Exact official domains

Vie Publique SN names:

1. Jokko Ak Yoon → `http://jokkooakyoon.sn`
2. E-JUSTICE → `http://gatewaye.services.justice.sn`

Concatenation of *Jokkoo* + *ak* + *Yoon* produces `jokkooakyoon` (double o). That is the registered name.

### Resolves (12 Sep 2026)

| Host | A record | HTTP result |
|---|---|---|
| `jokkooakyoon.sn` / `www.jokkooakyoon.sn` | 161.97.121.252 | HTTPS 503, nginx, page « Maintenance en cours » |
| `www.apijust.jokkooakyoon.sn` / `apijust.jokkooakyoon.sn` | 161.97.121.252 | nginx, body `Cannot GET:/` |
| `api.jokkooakyoon.sn` / `app.jokkooakyoon.sn` | 41.82.206.103 | TLS cert is `apiprod-tmp.e-service.sn` (name mismatch) |
| `e-justice.sn` | 161.97.121.252 | HTTPS 500, WordPress « Erreur critique » |
| `services.justice.sn` | 161.97.121.252 | TLS name mismatch |
| `e-service.sn` (apex) | 161.97.121.252 | nginx redirect to cPanel `/cgi-sys/defaultwebpage.cgi` |
| `public.e-service.sn` | 41.82.206.103 | 200, Vite SPA « e-Justice Sénégal — Services en ligne » |
| `apiprod-tmp.e-service.sn` | 41.82.206.103 | 200, « MULTI FORMS - By Insoftsas » |
| `e-senegal.sn` | Cloudflare | 200, national one-stop shop |

### Does not resolve

| Host | Note |
|---|---|
| `gatewaye.services.justice.sn` | Zone `services.justice.sn` exists (SOA `ns1.justice.sn`). One recursive A lookup returned no record. `http://` still got nginx **301** to `https://`. HTTPS cert does **not** match this hostname. |
| `jokkoakyoon.sn` | NXDOMAIN |
| `jokkoo-ak-yoon.sn` | NXDOMAIN |
| `jokko-ak-yoon.sn` | NXDOMAIN |
| `ejustice.sn` | NXDOMAIN |
| `e-justice.gouv.sn` | NXDOMAIN |

WHOIS `jokkooakyoon.sn` (NIC.SN):

- Created: 2026-09-10T08:09:37Z (launch morning)
- Expires: 2027-09-10
- Registrar: Hebersenegal
- Holder / admin / tech: Ousseynou GUEYE, `ousseynou.gueye@justice.gouv.sn`
- NS: `ns1.justice.sn`, `ns2.justice.sn` (both 161.97.121.252)

WHOIS `e-justice.sn`: created 2024-10-18, holder « Ministere JUSTICE SENEGAL », `ddasj@justice.gouv.sn`, Afriregister Senegal.

WHOIS `e-service.sn`: created 2025-06-11, same Ministry contact.

TLS `jokkooakyoon.sn`: Let’s Encrypt, issued 10 Sep 2026. SAN: `jokkooakyoon.sn`, `*.jokkooakyoon.sn`, `www.apijust.jokkooakyoon.sn`.

IP 161.97.121.252: RIPE netname CONTABO, Contabo GmbH, Munich, DE.

IP 41.82.206.103: AFRINIC, Sonatel / Orange Internet Dakar, SN.

## C. Public GitHub / GitLab

Searched GitHub repositories for: `jokkooakyoon`, `jokko-ak-yoon`, `jokkoo ak yoon`, `jokkoakyoon`, `gatewaye.services.justice`, `e-justice senegal`, `insoftsas`.

**Result: 0 matching application repos.** GitHub code search required authentication; not completed.

GitLab.com project search for `jokkooakyoon` / `jokko-ak-yoon`: no relevant project returned.

Unrelated civic repos (not these platforms):

- https://github.com/senegalouvert/servicepublic
- https://github.com/senegalouvert/annuaire-sites-publics-senegal

## D. Claimed citizen services

Press mixes three products. Officials separate them.

### 1. Jokko Ak Yoon (dialogue)

Wolof gloss in Seneweb: « le dialogue avec la justice ». APS often shortens to « Jokko Yoon ».

APS quote of Samba Kane: citizens may send a demande d’information, réclamation, signalement, suggestion, observation, or contestation. Each request is recorded, routed, tracked, and answered.

**Explicit non-service (APS, PointActu, Seneweb):** not for request or delivery of administrative or judicial acts. Those stay on dedicated e-service / e-Sénégal platforms.

Also announced, not confirmed live:

- call centre and numéros verts (APS: « prévoit »)
- SMS, USSD, audio, video (Le Soleil, Seneweb 6 Sep)
- national languages, especially oral (Le Soleil, UNDP remarks in Le Dakarois)

### 2. e-Justice métier (court system)

Samba Kane (APS): « socle métier » for progressive dematerialization of pénal, civil, commercial, and social chains. Better procedure management, information flow, traceability, data security, shorter delays.

Pilot: TGI Pikine-Guédiawaye (Le Soleil, Seneweb, UN). Pieces named: enrôlement, rôle général, Parquet, Greffe, instruction, recours.

This is a staff tool. It is not the citizen document portal.

### 3. e-Services Justice / e-Sénégal (acts)

Already online before 10 Sep 2026.

- Public SPA: https://public.e-service.sn/#/public
- National desk: https://e-senegal.sn/#/home/administrations/ministere-de-la-justice
- Ministry catalogue: https://justice.sec.gouv.sn/services-aux-usagers/

Named services: casier judiciaire, certificat de nationalité, permis de communiquer (Senego 24 Mar 2026: https://senego.com/digitalisation-de-la-justice-des-services-desormais-accessibles-en-ligne-pour-les-citoyens_1941148.html). e-Sénégal also added attestation de non-appartenance à la Fonction publique (We are Tech, 26 Mar 2026).

Ministry casier page still describes the old greffe paper path: https://justice.sec.gouv.sn/services-aux-usagers/casier-judiciaire/

## E. Tech stack clues (public pages only)

### Jokko (`jokkooakyoon.sn`)

- nginx
- Static French maintenance HTML (no JS bundle while 503)
- Let’s Encrypt
- SPF `v=spf1 +a +mx +ip4:161.97.121.252 ~all`
- API hostname on cert: `www.apijust.jokkooakyoon.sn` (Express-style `Cannot GET:/`)
- No Set-Cookie on the 503 page

### Citizen e-Service (`public.e-service.sn`)

- Apache 2.4.41 (Ubuntu)
- Vite production build (`/vite.svg`, hashed `/assets/*.js`)
- React (`react.lazy`, `#root`)
- Hash routing chunk `hash-DGl4KUN9.js`
- Vendor chunk with `QueryClient` (TanStack Query style)
- FingerprintJS CDN (`m1.openfpcdn.io/fingerprintjs`)
- Compiled env: `VITE_API_BASE_URL=https://externalaccess.e-service.sn`
- Compiled env also sets a ChaCha-related flag (`VITE_CHACHA_ACTIVE`). Do not treat browser crypto as a secret store.
- Last-Modified of `index.html`: 15 Apr 2026

### Related e-service host (`apiprod-tmp.e-service.sn`)

- Title: « MULTI FORMS - By Insoftsas »
- Same title on `https://multiformapi.e-service.sn/` and `https://multiformprivate.e-service.sn/`
- Cookies: `adonis-session` (HttpOnly) — AdonisJS session name
- Security headers: `x-frame-options: DENY`, HSTS, `x-content-type-options: nosniff`

### `e-justice.sn`

- WordPress error page (fr-FR)
- Cert SAN includes `e-justice.sn.161-97-121-252.cpanel.site`

### `e-senegal.sn`

- Cloudflare
- Angular-style `main-*.js`, `data-beasties-container`
- CSP allows `https://gateway.e-senegal.sn`

## F. robots.txt / sitemap / public routes

| URL | Result |
|---|---|
| https://jokkooakyoon.sn/robots.txt | 404 (Apache-style 404 behind nginx) |
| https://jokkooakyoon.sn/sitemap.xml | 503 maintenance HTML |
| https://e-justice.sn/robots.txt | 404 |
| https://public.e-service.sn/robots.txt | `User-agent: *` / `Allow: /` |
| https://public.e-service.sn/sitemap.xml | 404 |

Public SPA paths from `index-BSweTIi8.js` (citizen):

- `/public`, `/public/services`, `/public/services/:serviceRef`
- `/public/operations`, `/public/operations/:operationRef`
- `/public/operations/:operationRef/complement`
- `/public/operations/:operationRef/document-preview`
- `/public/operations/:operationRef/payment`
- `/public/signatures`, `/public/traitements`, `/public/profil`
- `/public/document-verification/:codeVerification`
- `/public/auth`, `/public/register`, `/public/logout`, `/public/device_register`
- `/login`, `/logout`, `/register`, `/unauthorized`

Same bundle also lists `/admin` and `/admin/{dossiers,forms,menus,profiles,requirements,rules,services,users}`. Those are frontend routes, not proof that admin APIs are open.

Jokko app routes were not readable: the site served only the 503 page.

## G. Press coverage and public criticism

**Press tone:** mostly launch coverage. Samba Kane also stresses confidentiality, integrity, cybersecurity, and that technology must not replace judges (APS, PointActu).

**Observed availability (this check, 2 days after launch):**

- Jokko homepage: 503 maintenance
- `e-justice.sn`: WordPress 500
- `gatewaye.services.justice.sn`: HTTP 301 to HTTPS; TLS name mismatch (the URL in the Vie Publique post)

**French quality:**

- Vie Publique post itself: « permet la dématérialisation … et améliorer » (mixed noun / infinitive)
- PointActu: missing quotes, « Samba Ka » vs « Kane »
- Le Dakarois title: « Jokko ak Yonn »
- User screenshots of Jokko on 12 Sep 2026 (before the 503): broken French (`Demandde`, `Décrivezz`, `vidééo`, `Écotter`). Voice recorder with a 5:00 cap. Guest-looking session.

**Seneweb comments (public):**

- Wolof naming vs other national languages (Bassari, Mandjak, Diola, Pulaar) — comment on the 6 Sep article
- « Such a project takes more than three months » — comment on the 10 Sep article
- Unrelated political complaints (déclaration de patrimoine)

**X thread:** the Vie Publique post had 9 replies and 46 quotes at fetch time. The public tweet API used here did not return reply bodies. Handle-level criticism was **not independently verified** in this pass.

**No finding:** a published security audit, a professional UX review, or a named downtime post-mortem.

## H. Vendor / integrator / builder

Named in public sources:

| Actor | Role | Source |
|---|---|---|
| DDA (Direction de la Dématérialisation et de l’Automatisation) | Ministry owner | https://justice.sec.gouv.sn/le-ministere/directions/direction-de-la-dematerialisation-et-de-lautomatisation-dda/ |
| Ousseynou Gueye | DDA director; Jokko domain holder | UN Dakar 24 Jul 2025; NIC.SN WHOIS |
| PNUD / UNDP | Support to e-Justice; Catherine Phuong at the ceremony | Le Soleil; Seneweb; Ecofin 25 Aug 2026 |
| UIT / ITU, UNOPS, ONU Femmes | Joint SDG Fund pilot (infra, maisons de justice) | https://www.un.org/fr/information-center-dakar/le-projet-pilote-d%E2%80%99e-justice-dans-la-banlieue-de-dakar-progresse-avec-l |
| Joint SDG Fund | Grant for Tier III mini datacenter, backup, antennas, hardware | same UN page; Ecofin |
| INSOFT SAS (insoftsas.com, Point-E, Dakar) | Brands « MULTI FORMS » on `apiprod-tmp.e-service.sn` and other `*.e-service.sn` hosts | Live title tag; https://www.insoftsas.com/ |
| Hebersenegal | Registrar of `jokkooakyoon.sn` (not proven as software builder) | NIC.SN WHOIS |
| Afriregister Senegal | Registrar of `e-justice.sn` and `e-service.sn` | NIC.SN WHOIS |
| GAINDE 2000 + APIX | Older **e-RCCM** (commercial register), not Jokko | https://justice.sec.gouv.sn/deploiement-du-e-rccm-au-tgi-de-sedhiou/ |

UNDP 2024 joint-programme report ticks **no private-sector partner** for the court pilot: https://mptf.undp.org/sites/default/files/documents/2025-04/senegal_digital_transformation.pdf

**Not found:** a contract, tender, or Ministry page that names INSOFT SAS as builder of Jokko Ak Yoon or of the court *socle métier*. The Insoftsas brand is on the **e-service / MULTI FORMS** stack.

## I. Relationship to older justice digital projects

1. **Schéma directeur numérique de la justice 2023–2027** (validated 13 Jul 2023, ~8 billion FCFA). Acts, casier, fines, archives, naturalization, e-mail. Pikine-Guédiawaye as pilot. https://www.wearetech.africa/fr/fils/actualites/gestion-publique/le-senegal-sest-dote-dun-plan-de-numerisation-de-son-secteur-judiciaire-pour-la-periode-2023-2027

2. **UN e-justice pilot (2024–2025)** at Pikine-Guédiawaye: mini datacenter, microwave to Dakar, backup, hardware. Goal: request documents, track cases, later pay fees. Director Gueye quoted. Joint programme title: « Support to the Operationalization of e-justice in Dakar Suburbs ». Five procedures listed in the 2024 report: judicial chains, mail, e-roles, e-recourses, electronic archiving.

3. **e-Justice already in use by Q1 2026.** Ministry bilan 6 May 2026: « La plateforme e-Justice permet déjà d’effectuer certaines démarches en ligne ». https://justice.sec.gouv.sn/bilan-du-premier-trimestre-2026-la-justice-fait-le-point-devant-lassemblee-nationale/

4. **24 March 2026 New Deal wave:** casier, certificat de nationalité, attestation fonction publique on e-Sénégal (We are Tech; Senego). Minister then: Yassine Fall.

5. **JUBBANTI** (May 2024): earlier citizen consultation « Sa Gis-Gis ci Doxaliinu Yoon » — French or Wolof form, plus green number **1222** ([RFI, 26 May 2024](https://www.rfi.fr/fr/afrique/20240526-les-s%C3%A9n%C3%A9galais-appel%C3%A9s-%C3%A0-donner-leur-avis-sur-le-syst%C3%A8me-judiciaire)). Ministry page: https://justice.sec.gouv.sn/lancement-de-la-plateforme-en-perspective-de-la-journee-du-dialogue-national/ — `jubbanti.sec.gouv.sn`. No official text found that says Jokko replaces JUBBANTI. This is a consultation form, not a court-file tool.

6. **e-RCCM** (GAINDE 2000 / APIX): commercial-register digitization, separate from Jokko.

7. **Centre national du casier judiciaire:** announced under former Garde des Sceaux Ousmane Diagne (2025 press). Online casier in 2026 sits on e-Sénégal / e-service, not on Jokko.

8. **Older letter of sector policy (2018–2022)** already noted incomplete penal/civil IT chains (SYSTRAITE / CPDA): https://justice.sec.gouv.sn/wp-content/uploads/2020/11/LPS_rev_07_mai_cep.pdf

**10 Sep 2026 is a public ceremony for tools that already had a Pikine-Guédiawaye / e-Sénégal life.** Jokko is the new citizen-dialogue front. e-Justice métier is the court stack. e-Service is the document stack.

Abdoulaye Ba (Seneweb) praised Justice « propres infrastructures d’hébergement ». The **public Jokko A record is a Contabo (DE) VPS**. The UN datacenter story is about the court pilot, not this VPS.

## Not found

- Ministry HTML press release for 10 Sep 2026
- Working e-Justice UI at `gatewaye.services.justice.sn` (HTTP 301, HTTPS cert mismatch)
- Jokko frontend routes or sitemap (503)
- Public source repo
- Confirmed green number or USSD code
- Named software vendor for Jokko itself
- Independent security or UX audit
- Wayback snapshot of jokkooakyoon.sn (not retrieved)
- X reply bodies (API did not return them)

## Primary URLs

- https://x.com/ViePubliqueSN/status/2098719759839744494
- https://aps.sn/deux-plateformes-numeriques-lancees-pour-moderniser-les-procedures-judiciaires/
- https://jokkooakyoon.sn/
- https://public.e-service.sn/#/public
- https://justice.sec.gouv.sn/
- https://www.un.org/fr/information-center-dakar/le-projet-pilote-d%E2%80%99e-justice-dans-la-banlieue-de-dakar-progresse-avec-l
- https://www.jointsdgfund.org/article/digital-justice-senegal-e-justice-pilot-brings-courts-online-dakar-suburbs
