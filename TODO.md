# 📋 Plan de Dezvoltare — Ce Mai Avem de Făcut

> Acest fișier documentează toate îmbunătățirile planificate pentru aplicația GlowGuide.

---

## 🔴 FAZA 1 — Bază Solidă (Prioritate Mare)

### 1.1 Navbar comun
- [ ] Componentă `Navbar.jsx` prezentă pe toate paginile (după login)
- [ ] Logo GlowGuide + linkuri: Dashboard, Profil, Rutina, Jurnal, Forum, Chatbot
- [ ] Buton Logout vizibil mereu
- [ ] Buton Admin vizibil doar pentru `rol === 'admin'`
- [ ] Responsive: meniu hamburger pe mobil

### 1.2 Protecție rute
- [ ] Componentă `ProtectedRoute.jsx` — dacă nu ești logat, redirect la `/`
- [ ] Aplicat pe toate rutele: `/dashboard`, `/profil`, `/rutina`, `/jurnal`, `/forum`, `/chatbot`, `/admin/moderare`

### 1.3 Design responsive (mobile-friendly)
- [ ] Login — maxWidth + padding adaptiv
- [ ] Register — deja parțial responsive, verificat pe mobil
- [ ] Dashboard — carduri care se stivuiesc pe mobil
- [ ] Profil — formular responsive
- [ ] RutinaMea — carduri produse responsive
- [ ] Jurnal — grafic responsive
- [ ] Forum — feed responsive
- [ ] Chatbot — interfață chat responsive
- [ ] AdminModerare — tabel responsive

---

## 🎨 FAZA 2 — Redesign Complet (Design Superb)

> Obiectiv: aplicație cu aspect profesional, modern, feminin (roz/alb/violet), cu animații subtile și UX excelent.

### 2.1 Login & Register
- [ ] Fundal cu gradient roz-alb sau imagine subtilă
- [ ] Card centrat cu shadow elegant
- [ ] Logo/ilustrație skincare
- [ ] Animație la hover pe buton
- [ ] Mesaje de eroare/succes mai vizuale

### 2.2 Dashboard
- [ ] Înlocuit lista cu **carduri vizuale** (iconiță + titlu + descriere scurtă)
- [ ] Card "Bun venit, [Prenume]!" cu avatar/emoji
- [ ] Statistici rapide: număr intrări jurnal, data ultimei rutine
- [ ] Carduri: Profil 👤, Rutina 💆, Jurnal 📔, Forum 💬, Chatbot 🤖
- [ ] Culori diferite per card
- [ ] Responsive: 2 coloane pe desktop, 1 coloană pe mobil

### 2.3 Profil Dermatologic
- [ ] **Progress bar** — arată la ce întrebare ești (ex: "Întrebarea 3 din 8")
- [ ] Câte o întrebare pe ecran (wizard step-by-step) SAU toate deodată mai stilate
- [ ] Butoane radio stilate cu emoji în loc de radio buttons standard
- [ ] Rezultat diagnostic afișat ca un "card de identitate a tenului"

### 2.4 Rutina Mea
- [ ] **Carduri produse** cu: emoji categorie, nume produs, ingrediente active, badge tip ten
- [ ] Grup produse pe categorii: Curățare / Toner / Ser / Hidratant / SPF
- [ ] Buton "Salvează rutina" și "Regenerează"
- [ ] Secțiune cu diagnosticul afișat frumos

### 2.5 Jurnal de Progres
- [ ] Header cu data de azi și un mesaj motivațional
- [ ] Rating cu **stele** în loc de input număr (1-10 → 5 stele)
- [ ] Cards pentru fiecare intrare din istoric
- [ ] Grafic mai mare și mai colorat
- [ ] Badge colorat pe rating (roșu=slab, galben=mediu, verde=bun)

### 2.6 Forum
- [ ] Cards pentru postări cu: avatar cu inițiale, data, titlu bold, preview text
- [ ] Badge "Nou" pentru postări recente
- [ ] Formular de postare nouă mai vizual (cu preview)
- [ ] Thread de replies stilat (ca o conversație)
- [ ] Număr de replies afișat pe card

### 2.7 Chatbot (GlowBot)
- [ ] Header cu avatar GlowBot (emoji 🌸 sau ilustrație)
- [ ] Bule de mesaj distincte: utilizator (dreapta, roz) / bot (stânga, alb)
- [ ] Animație "typing..." când bot-ul procesează
- [ ] Butoane întrebări rapide cu icon
- [ ] Badge categorie mai stilat

### 2.8 Admin Moderare
- [ ] Cards pentru postările în așteptare (în loc de tabel)
- [ ] Buton Aprobă (verde) / Respinge (roșu) mai vizuale
- [ ] Număr badge "X postări în așteptare" în navbar

---

## ➕ FAZA 3 — Features Extra

### 3.1 Landing Page (Pagina de start)
- [ ] Pagină publică la `/` înainte de login
- [ ] Hero section cu titlu + descriere + buton "Începe acum"
- [ ] Secțiuni: Cum funcționează, Funcționalități, Testimoniale
- [ ] Login mutat la `/login`

### 3.2 Rutina Salvată
- [ ] Pagină care arată rutina generată anterior (fără să regenereze)
- [ ] Data la care a fost generată
- [ ] Buton "Actualizează rutina" (regenerează)

### 3.3 Notificări
- [ ] Notificare când o postare din forum a fost aprobată
- [ ] Număr badge în navbar la iconița Forum

### 3.4 Pagina de profil utilizator
- [ ] Vizualizare date cont (nume, email, data înregistrării)
- [ ] Buton "Schimbă parola"
- [ ] Statistici personale: intrări jurnal, postări forum

---

## 📱 Obiectiv Final

Aplicația să funcționeze perfect pe:
- ✅ Desktop (1200px+)
- ✅ Tabletă (768px - 1199px)
- ✅ Mobil (320px - 767px)

Și să aibă un design:
- 🎨 Modern, feminin, roz/alb/violet
- ✨ Carduri cu shadow
- 🌸 Iconițe și emoji relevante
- 📱 Responsive pe orice ecran
- ⚡ Animații subtile la hover/click

---

## 🔵 FAZA 4 — Profil Utilizator Complet

### 4.1 Pagina "Contul Meu"
- [ ] Date cont: nume, email, dată înregistrare, avatar cu inițiale
- [ ] Buton "Editează numele"
- [ ] Buton "Schimbă parola" (cu confirmare pe email sau direct)
- [ ] Statistici personale: nr. intrări jurnal, nr. postări forum, data ultimei rutine

### 4.2 Setări aplicație
- [ ] **Dark Mode** — toggle ON/OFF, salvat în localStorage
- [ ] **Limbă** — Română / English (i18n basic)
- [ ] **Notificări** — toggle pentru emailuri (postare aprobată etc.)
- [ ] **Ștergere cont** — buton cu confirmare (GDPR)

### 4.3 Avatar & Personalizare
- [ ] Avatar generat din inițiale (colorat random per user)
- [ ] Upload poză de profil (opțional)

---

## 🔵 FAZA 5 — Features Standard Aplicații Moderne

### 5.1 Notificări in-app
- [ ] Badge "X postări în așteptare" în Navbar pentru admin
- [ ] Notificare când postarea din forum a fost aprobată
- [ ] Centru notificări (clopoțel în navbar) cu lista ultimelor notificări

### 5.2 Căutare & Filtrare
- [ ] Căutare în Forum (după titlu/conținut)
- [ ] Filtrare Forum după categorie / cele mai populare / recente
- [ ] Căutare în Jurnal după dată sau rating

### 5.3 Social & Comunitate
- [ ] Like / ❤️ pe postările din forum
- [ ] Număr vizualizări pe postare
- [ ] Profil public al utilizatorilor (click pe nume → vezi postările lor)

### 5.4 Onboarding
- [ ] Tutorial/walkthrough prima dată când te loghezi (tooltips)
- [ ] Completare profil dermatologic obligatorie la primul login (reminder)

### 5.5 Export & Date personale
- [ ] Export jurnal ca PDF sau CSV
- [ ] "Descarcă datele mele" (GDPR)

---

## ✅ Deja Realizat

- [x] Login funcțional
- [x] Register cu verificare email în 2 pași
- [x] Profil dermatologic + algoritm diagnostic
- [x] Rutina personalizată generată din BD
- [x] Jurnal zilnic + grafic evoluție Chart.js
- [x] Forum cu moderare admin
- [x] Chatbot FAQ + OpenAI fallback
- [x] Verificare email la înregistrare (Nodemailer)
- [x] README detaliat pe GitHub
