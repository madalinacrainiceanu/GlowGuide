# ✨ GlowGuide — Sistem de Recomandare Personalizată Produse Cosmetice

> Aplicație web full-stack dezvoltată ca proiect de licență — Academia de Studii Economice București  
> **Autor:** Crăiniceanu Mădălina

---

## 🌐 Link-uri Live

| Serviciu | URL |
|----------|-----|
| **Frontend (Vercel)** | https://licenta-theta.vercel.app |
| **Backend (Railway)** | https://licenta-production-20f9.up.railway.app |
| **Baza de date** | MySQL hosted pe Railway |

---

## 📋 Descriere

**GlowGuide** este o aplicație web responsivă care ajută utilizatorii să descopere rutina de îngrijire a pielii potrivită tipului lor de ten. Sistemul combină un chestionar dermatologic inteligent, recomandări personalizate de produse, un jurnal de progres cu poze, o comunitate și un asistent AI specializat în skincare.

---

## 🏗️ Arhitectura Aplicației

```
licenta/
├── glowguide-backend/      # Server Node.js 20 + Express 5 + MySQL 8
└── glowguide-frontend/     # Aplicație React 19 + Vite 7
```

### Stack Tehnologic

| Layer | Tehnologie |
|-------|-----------|
| Frontend | React 19, Vite 7, React Router DOM 7, Axios, Chart.js |
| Backend | Node.js 20, Express 5 |
| Bază de date | MySQL 8 (raw queries, fără ORM) |
| Autentificare | JWT (JSON Web Tokens) + bcryptjs |
| Email | Nodemailer + Gmail SMTP |
| AI / Chatbot | OpenAI API (gpt-3.5-turbo) + bază FAQ locală |
| Storage poze | Cloudinary (jurnal progres) |
| Stilizare | CSS-in-JS (inline styles) + CSS global, design responsive |
| Deployment Frontend | Vercel (auto-deploy din GitHub) |
| Deployment Backend | Railway (Node.js service) |
| Bază de date cloud | Railway MySQL |

---

## 🚀 Funcționalități Implementate

### 1. 🔐 Autentificare & Înregistrare în 2 Pași
- Utilizatorul completează formularul (nume, prenume, email, parolă)
- Sistemul generează un **cod de 6 cifre** și îl trimite pe email (via Gmail SMTP)
- Codul este valid **10 minute**, stocat în memorie cu timestamp
- La introducerea codului corect, contul este creat în baza de date
- **Login** cu email + parolă → token JWT returnat (valabil 7 zile)
- Parola stocată **criptat** cu bcrypt (salt rounds: 10)
- **Logout automat** la expirarea token-ului — interceptor Axios detectează răspuns 401 și curăță localStorage
- Roluri: `membru` și `admin`

### 2. 👤 Profil Dermatologic
- Chestionar cu **8 întrebări** despre tipul de ten
- Algoritm de scoring pe 6 axe: `gras`, `uscat`, `sensibil`, `acnee`, `pigmentare`, `aging`
- Rezultat: diagnostic complet (ex: "Ten MIXT, cu tendință acneică")
- Câmp pentru alergii/ingrediente de evitat (salvate ca JSON în BD)
- Profilul se salvează în tabela `profildermatologic`

### 3. 💆 Rutina Personalizată
- Generare automată bazată pe profilul dermatologic
- JOIN în BD între `profildermatologic` și `produs` — filtrare după tipTen și obiectiv
- Exclude produsele cu ingrediente alergene
- **Buton "Actualizează"** — regenerează rutina cu produse diferite (`regenereaza=true`)
- Afișează produse cu categorie, brand, pret, rating, descriere

### 4. 📔 Jurnal de Progres cu Poze
- Adăugare înregistrări zilnice cu **rating (1-10)**, observații și **poză opțională**
- Pozele sunt uploadate pe **Cloudinary** (cloud storage) — URL-ul e salvat în BD
- **Grafic de evoluție** interactiv (Chart.js) — linie cu arie umplută, media lunară
- Vizualizare istoric complet + funcții de **editare** și **ștergere**
- **Export CSV** — descarcă toate intrările, compatibil Excel (BOM UTF-8)

### 5. 💬 Forum Comunitar
- Feed de postări aprobate
- Postare nouă → intră în **stare de așteptare** (moderare admin)
- **Replies** (răspunsuri) cu vizualizare thread
- **Căutare** în timp real după titlu/conținut
- **Sortare**: 🕐 Recente / 🔥 Populare (likes + replies)
- **Like/Unlike** ❤️ — toggle, actualizare live, UNIQUE KEY per pereche utilizator-postare

### 6. 🛡️ Panou Admin
- Aprobare/respingere postări în așteptare
- **Email automat** la aprobare → autorul primește notificare cu link direct la postare
- **Badge roșu** în Navbar cu numărul postărilor în așteptare (afișează `9+` la overflow)

### 7. 🤖 GlowBot — Asistent AI Skincare
- **Sistem hibrid în 2 straturi:**
  1. **FAQ local** — ~290 întrebări în 5 categorii (rutină, ingrediente, probleme piele, produse, general)
  2. **OpenAI fallback** — `gpt-3.5-turbo` dacă scorul FAQ e sub prag
- Algoritm **scoring pe cuvinte cheie** cu scor minim configurat (evită false matches)
- Badge categorie pe răspuns sau `🤖 AI`
- Butoane cu întrebări rapide predefinite

### 8. ⚙️ Contul Meu
- Avatar generat din inițiale (culoare unică per utilizator)
- Statistici: intrări jurnal, postări publicate, dată înregistrare
- **Editare nume**, **schimbare parolă** (cu verificarea celei vechi)
- **Dark Mode** 🌙 — salvat în `localStorage`, aplicat global
- **Ștergere cont** — cu confirmare dublă, cascade delete toate datele

### 9. 👤 Profil Public
- Click pe autorul din forum → `/profil-public/:membruId`
- Statistici + ultimele 10 postări ale utilizatorului

---

## 📁 Structura Fișierelor

### Backend (`glowguide-backend/`)

```
├── server.js                    # Entry point, configurare Express + CORS
├── db.js                        # Conexiune MySQL (raw queries)
├── .env                         # Variabile de mediu (NU pe GitHub!)
├── .env.example                 # Template variabile (fără valori reale)
├── uploadMiddleware.js          # Multer + Cloudinary pentru upload poze jurnal
├── controllers/
│   ├── authController.js        # Register (cod email), Login, JWT, ContulMeu, ProfilPublic
│   ├── chatbotController.js     # Scoring FAQ + OpenAI fallback
│   ├── forumController.js       # CRUD postări, replies, moderare, likes, email notificare
│   ├── jurnalController.js      # CRUD jurnal + Cloudinary + grafic + export CSV
│   └── rutinaController.js      # Generare + actualizare rutină personalizată
├── routes/
│   ├── authRoutes.js            # POST /trimite-cod, /verifica-cod, /login
│   │                            # GET /cont/:membruId, /profil-public/:membruId
│   │                            # PUT /editare-nume, /schimba-parola
│   │                            # DELETE /sterge-cont
│   ├── chatbotRoutes.js         # POST /intreaba
│   ├── forumRoutes.js           # GET/POST postări + admin + like
│   ├── jurnalRoutes.js          # GET/POST/PUT/DELETE + /export-csv
│   └── rutinaRoutes.js          # POST /genereaza
```

### Frontend (`glowguide-frontend/`)

```
├── src/
│   ├── api.js                   # URL backend centralizat + interceptor Axios (logout la 401)
│   ├── App.jsx                  # Router principal cu toate rutele + ProtectedRoute
│   ├── main.jsx                 # Entry point React
│   ├── index.css                # Stiluri globale + dark mode + responsive
│   ├── assets/                  # Imagini și resurse statice
│   ├── components/
│   │   └── Navbar.jsx           # Navigare, avatar, badge admin, hamburger mobil
│   └── pages/
│       ├── LandingPage.jsx      # Pagina publică de prezentare
│       ├── Login.jsx            # Autentificare
│       ├── Register.jsx         # Înregistrare în 2 pași cu verificare email
│       ├── Dashboard.jsx        # Pagina principală după login
│       ├── Profil.jsx           # Chestionar dermatologic (8 întrebări)
│       ├── RutinaMea.jsx        # Rutină personalizată + buton Actualizează
│       ├── Jurnal.jsx           # Jurnal + upload poze + grafic Chart.js + export CSV
│       ├── Forum.jsx            # Feed postări + likes + căutare + sortare
│       ├── DetaliiPostare.jsx   # Thread postare cu replies
│       ├── AdminModerare.jsx    # Panou admin aprobare/respingere
│       ├── Chatbot.jsx          # Interfața GlowBot
│       ├── ContulMeu.jsx        # Setări cont, dark mode, schimbare parolă, ștergere
│       └── ProfilPublic.jsx     # Profil public al oricărui utilizator
```

---

## 🗄️ Baza de Date (MySQL 8)

### Tabele:

| Tabel | Coloane principale |
|-------|-----------|
| `utilizator` | id, email, parola (hash), rol, dataInregistrare, dataCreare |
| `membru` | id, utilizatorId (FK), nume, prenume |
| `profildermatologic` | id, membruId (FK), tipTen, alergii (JSON), probleme (JSON), dataCreare, dataActualizare |
| `produs` | id, nume, brand, categorie, tipTenRecomandat, obiectiv, pret, rating, descriere |
| `ingredient` | id, nume, descriere, categorie, potentialAlergen |
| `produsingredient` | produsId (FK), ingredientId (FK), concentratie, ordineLista |
| `rutina` | id, membruId (FK), tip, status, dataGenerarii |
| `rutinaprodus` | rutinaId (FK), produsId (FK), ordineAplicare, scorProdus |
| `postare` | id, membruId (FK), titlu, continut, status, dataPostare |
| `raspunspostare` | id, postareId (FK), membruId (FK), continut, dataRaspuns |
| `likepostare` | id, postareId (FK), membruId (FK), dataLike — UNIQUE KEY |
| `jurnalprogres` | id, membruId (FK), imagePath (Cloudinary URL), observatii, rating, dataIntrare |
| `faq` | id, cuvinteCheie, intrebare, raspuns, categorie, numarAfisari |
| `administrator` | id, utilizatorId (FK), nume, prenume |

---

## ⚙️ Instalare și Rulare Locală

### Cerințe:
- Node.js 20+
- MySQL 8+
- npm

### Backend:
```bash
cd glowguide-backend
npm install
cp .env.example .env   # completează valorile
node server.js
```

### Variabile de mediu (`.env`):
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
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### Frontend:
```bash
cd glowguide-frontend
npm install
npm run dev
```
Aplicația va fi disponibilă la: `http://localhost:5173`

---

## 🌍 Deployment (Producție)

```
Browser → Vercel (React SPA) → Railway (Node.js/Express) → Railway (MySQL 8)
                                        ↓               ↓              ↓
                                   Cloudinary       OpenAI API    Email SMTP
```

### Frontend — Vercel
1. New Project → Import repo GitHub → Root Directory: `glowguide-frontend`
2. Environment Variables: `VITE_API_URL` = URL Railway backend
3. Deploy → auto-update la fiecare `git push`

### Backend + DB — Railway
1. New Project → Database → MySQL
2. New Project → GitHub repo → Root Directory: `glowguide-backend`
3. Variables → toate din `.env` (cu credențiale MySQL Railway)
4. Networking → Generate Domain

### Migrare BD locală → Railway:
```cmd
# Din Command Prompt (NU PowerShell!)
mysqldump -u root -p --no-tablespaces glowguide_db > backup.sql
mysql -h HOST -P PORT -u root -pPASS railway < backup.sql
```

---

## 📱 Responsive Design

- Navbar cu **hamburger menu** pe ecrane < 768px
- CSS media queries pentru < 600px (grid 1 coloană, font redus)
- Grid-uri cu `repeat(auto-fill, minmax(280px, 1fr))` adaptive

---

## 🔧 Bug-uri Rezolvate

| Bug | Cauza | Fix |
|-----|-------|-----|
| Butonul Actualizează returna aceleași produse | Trigger MySQL incrementa rating la fiecare INSERT în rutinaprodus | `DROP TRIGGER actualizarePopularitateProdus` |
| Graficul jurnalului nu afișa date | `req.params.id` în loc de `req.params.membruId` | Destructurare corectă a params |
| Chatbot returna mereu același răspuns | FULLTEXT MySQL favoriza rânduri cu `numarAfisari` mare | Algoritm scoring pe cuvinte cheie |
| Chatbot răspuns greșit (acid folic → acid hialuronic) | `scorMinim = 1`, "acidul" se potrivea oricărui acid | `scorMinim = 2` când sunt 2+ keywords |
| Ruta `/admin/in-asteptare` returnează 404 | Ruta `/:id` intercepta cererea înainte | Rutele admin declarate înainte de `/:id` |
| Import MySQL eșua cu eroare ASCII '\0' | `mysqldump` din PowerShell salvează UTF-16 | Rulat din Command Prompt (cmd) |

---

## 🔒 Securitate

- Parole stocate **exclusiv hash bcrypt** (salt 10)
- **JWT** cu expirare 7 zile + logout automat la 401
- `.env` în `.gitignore` — nu ajunge pe GitHub
- Verificare email la înregistrare — previne conturi false
- Moderare forum — previne conținut nepotrivit
- Credențiale producție stocate în Railway Variables (nu în cod)

---

## 👩‍💻 Autor

**Crăiniceanu Mădălina**  
Licență — Academia de Studii Economice București  
An universitar 2025-2026
