# ✨ GlowGuide — Sistem de Recomandare Personalizată Produse Cosmetice

> Aplicație web full-stack dezvoltată ca proiect de licență — Academia de Studii Economice București
> **Autor:** Crăiniceanu Mădălina

---

## 📋 Descriere

**GlowGuide** este o aplicație web responsivă care ajută utilizatorii să descopere rutina de îngrijire a pielii potrivită tipului lor de ten. Sistemul combină un chestionar dermatologic inteligent, recomandări personalizate de produse, un jurnal de progres, o comunitate și un asistent AI specializat în skincare.

---

## 🏗️ Arhitectura Aplicației

```
licenta/
├── glowguide-backend/      # Server Node.js + Express + MySQL
└── glowguide-frontend/     # Aplicație React + Vite
```

### Stack Tehnologic

| Layer | Tehnologie |
|-------|-----------|
| Frontend | React 18, Vite, React Router DOM, Axios, Chart.js |
| Backend | Node.js, Express.js |
| Bază de date | MySQL cu Sequelize ORM |
| Autentificare | JWT (JSON Web Tokens) + bcryptjs |
| Email | Nodemailer + Gmail SMTP |
| AI / Chatbot | OpenAI API (gpt-3.5-turbo) + bază FAQ locală |
| Stilizare | CSS-in-JS (inline styles), design responsive |

---

## 🚀 Funcționalități Implementate

### 1. 🔐 Autentificare & Înregistrare
- **Înregistrare în 2 pași cu verificare email:**
  - Utilizatorul completează formularul (nume, prenume, email, parolă)
  - Sistemul generează un cod de 6 cifre și îl trimite pe email (via Gmail SMTP)
  - Codul este valid **10 minute**
  - La introducerea codului corect, contul este creat în baza de date
- **Login** cu email + parolă, token JWT returnat (valabil 7 zile)
- Parola este stocată **criptat** cu bcrypt (salt rounds: 10)
- Sistemul distinge între roluri: `membru` și `admin`

### 2. 👤 Profil Dermatologic
- Chestionar cu **8 întrebări** despre tipul de ten
- Algoritm de scoring care calculează scoruri pe 6 axe: `gras`, `uscat`, `sensibil`, `acnee`, `pigmentare`, `aging`
- Rezultat: diagnostic complet (ex: "Ten MIXT, cu tendință acneică")
- Câmp pentru alergii/ingrediente de evitat
- Profilul se salvează în baza de date în tabela `ProfilDermatologic`

### 3. 💆 Rutina Personalizată
- Generare automată bazată pe profilul dermatologic salvat
- Sistemul face JOIN în BD între `ProfilDermatologic` și `Produs` pentru a filtra produse potrivite tipului de ten
- Exclude produsele cu ingrediente la care utilizatorul este alergic
- Afișează produsele recomandate cu categorie, tip ten potrivit, ingrediente active

### 4. 📔 Jurnal de Progres
- Adăugare înregistrări zilnice cu **rating (1-10)** și observații
- **Grafic de evoluție** interactiv (Chart.js) — linie cu aria umplută, afișând media lunară a ratingurilor
- Vizualizare istoric complet cu toate intrările
- Funcții de **editare** și **ștergere** a intrărilor din jurnal
- Date agregate din backend: `SELECT AVG(rating), DATE_FORMAT(data, '%Y-%m') GROUP BY luna`

### 5. 💬 Forum Comunitar
- Feed de postări aprobate (afișate tuturor utilizatorilor autentificați)
- Adăugare postare nouă (titlu + conținut) — intră în **stare de așteptare** (moderare)
- Sistem de **replies** (răspunsuri la postări) cu vizualizare thread
- **Panou Admin** pentru aprobare/respingere postări în așteptare
- Fix important aplicat: rutele Express `/admin/in-asteptare` declarate **înainte** de `/:id` pentru a evita conflictul de parametri

### 6. 🤖 GlowBot — Asistent AI Skincare
- **Sistem hibrid în 2 straturi:**
  1. **Baza FAQ locală** — 95 întrebări în 5 categorii (rutină, ingrediente, probleme piele, produse, general)
  2. **OpenAI fallback** — dacă întrebarea nu se găsește în FAQ, se apelează `gpt-3.5-turbo`
- Algoritm de **scoring pe cuvinte cheie**: calculează scorul de potrivire pentru fiecare FAQ, returnează cel mai relevant răspuns
- Scor minim configurat pentru a evita "false matches" (răspunsuri greșite)
- Badge vizual pe răspuns: categoria din FAQ sau `🤖 AI` dacă vine de la OpenAI
- Butoane cu **întrebări rapide** predefinite
- Indicator de loading animat în timpul procesării

### 12. 📧 Email Notificare Aprobare Forum
- Când adminul aprobă o postare, autorul primește **email automat** cu subiectul "✅ Postarea ta a fost aprobată!"
- Email-ul conține numele postării și un buton cu link direct către forum
- Trimis via Nodemailer (același sistem ca verificarea la înregistrare)

### 13. 📥 Export Jurnal CSV
- Buton **📥 Export CSV** în header-ul paginii Jurnal
- Descarcă toate intrările din jurnal (dată, rating, observații) ca fișier `.csv`
- Compatibil cu Excel (BOM UTF-8 inclus pentru caractere românești)

### 14. 👤 Profil Public Utilizatori
- Click pe **numele oricărui autor** din Feed-ul forumului → navigare la `/profil-public/:membruId`
- Pagina afișează: avatar cu inițiale, nume, dată înregistrare, statistici (postări, intrări jurnal)
- Lista ultimelor 10 postări publicate ale utilizatorului, cu click direct pe fiecare

---
- Butonul **🛡️ Admin** din Navbar afișează un **badge roșu** cu numărul postărilor în așteptare
- Se actualizează automat la fiecare navigare între pagini
- Afișează `9+` dacă sunt mai mult de 9 postări în așteptare

### 10. ❤️ Like-uri Forum
- Buton **Like/Unlike** pe fiecare postare din feed
- Toggle: apasă o dată → like ❤️, apasă din nou → unlike 🤍
- Contorul se actualizează live fără reload
- Salvat în tabela `LikePostare` (un singur like per utilizator per postare — UNIQUE KEY)

### 11. 🔍 Căutare & Sortare Forum
- **Câmp de căutare** în timp real — filtrează postările după titlu sau conținut
- **Sortare**: 🕐 Recente (default) / 🔥 Populare (după suma likes + replies)
- Numărul de rezultate afișat în header-ul feed-ului

---
- **Date cont**: avatar generat din inițiale (culoare unică per utilizator), nume, email, rol
- **Statistici personale**: număr intrări jurnal, postări publicate, dată înregistrare
- **Editare nume**: formular inline pentru actualizarea numelui și prenumelui
- **Schimbare parolă**: cu verificarea parolei vechi, validare lungime minimă și confirmare parolă nouă
- **Dark Mode** 🌙: toggle ON/OFF cu animație, tema salvată în `localStorage` și aplicată global
- **Ștergere cont**: buton cu confirmare dublă, șterge toate datele asociate (jurnal, postări, profil dermatologic)
- Acces rapid din **Navbar** — avatar circular cu inițiala utilizatorului (click → `/cont`)

---
- Implementat cu `nodemailer` + Gmail App Password
- Coduri stocate în memorie cu timestamp de expirare (10 minute)
- Email HTML stilizat cu branding GlowGuide
- Gestionare erori: cod expirat, cod incorect, email deja folosit

---

## 📁 Structura Fișierelor

### Backend (`glowguide-backend/`)

```
├── server.js                    # Entry point, configurare Express + CORS
├── db.js                        # Conexiune MySQL cu Sequelize
├── .env                         # Variabile de mediu (NU pe GitHub!)
├── faq_complet.sql              # Script SQL cu 95 întrebări FAQ
├── controllers/
│   ├── authController.js        # Register (cu cod email), Login, JWT
│   ├── chatbotController.js     # Scoring FAQ + OpenAI fallback
│   ├── forumController.js       # CRUD postări, replies, moderare
│   ├── jurnalController.js      # CRUD jurnal + agregare grafic
│   └── rutinaController.js      # Generare rutină personalizată
├── routes/
│     ├── authRoutes.js            # POST /register, /login, /trimite-cod, /verifica-cod
│     │                            # GET /cont/:membruId, PUT /editare-nume, /schimba-parola
│     │                            # DELETE /sterge-cont
    ├── chatbotRoutes.js         # POST /intreaba
    ├── forumRoutes.js           # GET/POST forum + admin routes
    ├── jurnalRoutes.js          # GET/POST/PUT/DELETE jurnal
    └── rutinaRoutes.js          # POST /genereaza
```

### Frontend (`glowguide-frontend/`)

```
├── src/
│   ├── App.jsx                  # Router principal cu toate rutele
│   ├── main.jsx                 # Entry point React
│   └── pages/
│       ├── Login.jsx            # Autentificare + link către Register
│       ├── Register.jsx         # Înregistrare în 2 pași cu verificare email
│       ├── Dashboard.jsx        # Pagina principală după login
│       ├── Profil.jsx           # Chestionar dermatologic (8 întrebări)
│       ├── RutinaMea.jsx        # Afișare rutină personalizată
│       ├── Jurnal.jsx           # Jurnal zilnic + grafic Chart.js
│       ├── Forum.jsx            # Feed postări + formular postare nouă
│       ├── DetaliiPostare.jsx   # Thread postare cu replies
│       ├── AdminModerare.jsx    # Panou admin aprobare/respingere
│       ├── Chatbot.jsx          # Interfața GlowBot
│       ├── ContulMeu.jsx        # Profil utilizator, setări, dark mode, schimbare parolă
│       ├── ProfilPublic.jsx     # Profil public al oricărui utilizator (postări, statistici)
│       └── LandingPage.jsx      # Pagina publică de prezentare
```

---

## 🗄️ Baza de Date (MySQL)

### Tabele principale:

| Tabel | Descriere |
|-------|-----------|
| `Utilizator` | email, parolă (hash), rol (membru/admin) |
| `Membru` | FK → Utilizator, nume, prenume |
| `ProfilDermatologic` | FK → Membru, tipTen, probleme, alergii |
| `Produs` | nume, categorie, tipTen, ingredienteActive, ingrediente |
| `RutinaPersonalizata` | FK → Membru + Produs |
| `JurnalIngrijire` | FK → Membru, data, rating, observatii |
| `PostareForum` | FK → Membru, titlu, continut, status (pending/approved/rejected) |
| `RaspunsForum` | FK → Postare + Membru, continut |
| `FAQ` | intrebare, raspuns, categorie, cuvinteCheie, numarAfisari |
| `LikePostare` | FK → Postare + Membru, dataLike (UNIQUE per pereche) |

---

## ⚙️ Instalare și Rulare

### Cerințe:
- Node.js v18+
- MySQL 8+
- npm

### Backend:
```bash
cd glowguide-backend
npm install
# Creează fișierul .env cu variabilele de mai jos
node server.js
```

### Variabile de mediu necesare (`.env`):
```
PORT=5000
DB_HOST=localhost
DB_USER=utilizator_mysql
DB_PASSWORD=parola_mysql
DB_NAME=glowguide_db
JWT_SECRET=un_secret_lung_si_sigur
OPENAI_API_KEY=sk-...
EMAIL_USER=emailul_tau@gmail.com
EMAIL_PASS=parola_aplicatie_gmail
```

### Frontend:
```bash
cd glowguide-frontend
npm install
npm run dev
```

Aplicația va fi disponibilă la: `http://localhost:5173`

### Baza de date:
```sql
-- Rulează scriptul FAQ după crearea tabelelor:
SET SQL_SAFE_UPDATES = 0;
-- (conținutul din faq_complet.sql)
```

---

## 🔧 Bug-uri Rezolvate

| Bug | Cauza | Fix |
|-----|-------|-----|
| Graficul jurnalului nu afișa date | `req.params.id` în loc de `req.params.membruId` | Destructurare corectă a params |
| Chatbot returna mereu același răspuns | FULLTEXT MySQL favoriza rânduri cu `numarAfisari` mare | Înlocuit cu algoritm de scoring pe cuvinte cheie |
| Chatbot returna răspuns greșit ("acid folic" → acid hialuronic) | `scorMinim = 1` când orice keyword > 5 litere, "acidul" se potrivea | `scorMinim = 2` când sunt 2+ keywords |
| Ruta `/admin/in-asteptare` returnează 404 | Ruta `/:id` intercepta cererea înainte | Mutat rutele admin înainte de `/:id` în Express |
| Register — eroare "Identifier already declared" | Edit duplicat în fișier | Șters codul vechi duplicat |
| Backend crash la pornire — `await` în funcție ne-async | Header `exports.register = async` lipsea | Adăugat declarația corectă |

---

## 📱 Responsive Design

Aplicația este proiectată să funcționeze atât pe **desktop** cât și pe **dispozitive mobile** prin:
- Containere cu `maxWidth` și `width: 100%`
- Padding adaptiv cu `minHeight: 100vh`
- Layout-uri flexibile cu `flexWrap`

---

## 🔒 Securitate

- Parolele sunt stocate **exclusiv ca hash bcrypt** — niciodată în clar
- Autentificare prin **JWT** cu expirare de 7 zile
- Fișierul `.env` este în `.gitignore` — nu ajunge pe GitHub
- Verificare email la înregistrare previne conturi false
- Moderare forum previne conținut nepotrivit

---

## 👩‍💻 Autor

**Crăiniceanu Mădălina**  
Licență — Academia de Studii Economice București  
An universitar 2025-2026
