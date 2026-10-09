# ANALIZA COMPLETĂ A APLICAȚIEI GLOWGUIDE
### Aplicație Web pentru Îngrijire Personalizată a Pielii
**Autor:** Crăiniceanu Mădălina  
**Instituție:** Academia de Studii Economice, București  
**An:** 2026

---

## CUPRINS

1. [Prezentare Generală](#1-prezentare-generală)
2. [Arhitectura Tehnică](#2-arhitectura-tehnică)
3. [Structura Proiectului](#3-structura-proiectului)
4. [Baza de Date — Structură Detaliată](#4-baza-de-date--structură-detaliată)
5. [Backend — Analiză Completă pe Fișiere](#5-backend--analiză-completă-pe-fișiere)
6. [Frontend — Analiză Completă pe Pagini](#6-frontend--analiză-completă-pe-pagini)
7. [Fluxuri Complete ale Aplicației](#7-fluxuri-complete-ale-aplicației)
8. [Securitate și Autentificare](#8-securitate-și-autentificare)
9. [Deployment și Infrastructură](#9-deployment-și-infrastructură)
10. [Tehnologii Utilizate](#10-tehnologii-utilizate)

---

## 1. PREZENTARE GENERALĂ

**GlowGuide** este o aplicație web full-stack de tip SPA (Single Page Application) destinată îngrijirii personalizate a pielii. Aplicația combină un **sistem expert** bazat pe reguli pentru recomandarea produselor cosmetice cu elemente de **comunitate online** și **inteligență artificială** (chatbot).

### Scopul aplicației:
- Analizarea tipului de ten al utilizatorului printr-un chestionar dermatologic cu 8 întrebări
- Generarea automată a unei rutine de îngrijire personalizate (5 produse: curățare, toner, ser, hidratant, SPF)
- Urmărirea progresului tenului printr-un jurnal cu grafice de evoluție
- Facilitarea schimbului de experiențe într-un forum moderat
- Asistență skincare prin chatbot cu bază de cunoștințe FAQ și fallback OpenAI GPT

### Link-uri live:
- **Frontend:** https://licenta-theta.vercel.app
- **Backend API:** https://licenta-production-20f9.up.railway.app
- **Test API:** https://licenta-production-20f9.up.railway.app/api/test

---

## 2. ARHITECTURA TEHNICĂ

```
┌─────────────────────────────────────────────────────────┐
│                     UTILIZATOR                          │
│              (Browser / Telefon Mobil)                  │
└──────────────────────┬──────────────────────────────────┘
                       │  HTTPS
                       ▼
┌─────────────────────────────────────────────────────────┐
│              FRONTEND — Vercel                          │
│         React 19 + Vite + React Router v7               │
│         https://licenta-theta.vercel.app                │
└──────────────────────┬──────────────────────────────────┘
                       │  REST API (HTTPS + JSON)
                       │  Axios HTTP Client
                       ▼
┌─────────────────────────────────────────────────────────┐
│              BACKEND — Railway                          │
│         Node.js + Express 5 + Sequelize ORM             │
│   https://licenta-production-20f9.up.railway.app        │
│                                                         │
│  Middleware: CORS, express.json(), dotenv               │
│  Autentificare: JWT + bcryptjs                          │
│  Email: Nodemailer + Gmail SMTP                         │
│  AI: OpenAI GPT-3.5-turbo (fallback chatbot)            │
└──────────────────────┬──────────────────────────────────┘
                       │  Sequelize ORM + mysql2
                       ▼
┌─────────────────────────────────────────────────────────┐
│              BAZA DE DATE — Railway MySQL               │
│         MySQL 8.0 — 14 tabele                           │
│         Host: hopper.proxy.rlwy.net:46131               │
└─────────────────────────────────────────────────────────┘
```

### Tipul arhitecturii: **Client-Server cu REST API**
- Comunicarea se face exclusiv prin cereri HTTP (GET, POST, PUT, DELETE)
- Frontend-ul și backend-ul sunt **complet separate** și pot rula independent
- Nu există sesiuni server-side — autentificarea e bazată pe **token JWT** trimis în fiecare cerere

---

## 3. STRUCTURA PROIECTULUI

```
licenta vscode/
├── glowguide-frontend/          # Aplicația React
│   ├── src/
│   │   ├── api.js               # URL centralizat backend
│   │   ├── App.jsx              # Rutele aplicației
│   │   ├── main.jsx             # Entry point React
│   │   ├── index.css            # Stiluri globale
│   │   ├── components/
│   │   │   ├── Navbar.jsx       # Bara de navigare
│   │   │   └── ProtectedRoute.jsx  # Gardă autentificare
│   │   └── pages/
│   │       ├── LandingPage.jsx  # Pagina publică
│   │       ├── Login.jsx        # Autentificare
│   │       ├── Register.jsx     # Înregistrare cu OTP
│   │       ├── Dashboard.jsx    # Pagina principală
│   │       ├── Profil.jsx       # Chestionar dermatologic
│   │       ├── RutinaMea.jsx    # Rutina generată
│   │       ├── Jurnal.jsx       # Jurnal progres + grafic
│   │       ├── Forum.jsx        # Feed comunitate
│   │       ├── DetaliiPostare.jsx  # Postare + replies
│   │       ├── AdminModerare.jsx   # Panou admin
│   │       ├── Chatbot.jsx      # GlowBot AI
│   │       ├── ContulMeu.jsx    # Setări cont
│   │       └── ProfilPublic.jsx # Profil public utilizator
│   ├── package.json
│   └── vite.config.js
│
├── glowguide-backend/           # API Node.js
│   ├── server.js                # Entry point + middleware
│   ├── db.js                    # Conexiune Sequelize MySQL
│   ├── .env                     # Variabile de mediu (secret)
│   ├── .env.example             # Template variabile
│   ├── controllers/
│   │   ├── authController.js    # Autentificare, cont, profil
│   │   ├── rutinaController.js  # Sistem expert rutine
│   │   ├── jurnalController.js  # Jurnal progres
│   │   ├── forumController.js   # Forum + moderare
│   │   └── chatbotController.js # FAQ + OpenAI
│   └── routes/
│       ├── authRoutes.js
│       ├── rutinaRoutes.js
│       ├── jurnalRoutes.js
│       ├── forumRoutes.js
│       └── chatbotRoutes.js
│
├── README.md
└── trigger.sql                  # Trigger MySQL populatitate produs
```

---

## 4. BAZA DE DATE — STRUCTURĂ DETALIATĂ

### 4.1 Schema bazei de date

Baza de date conține **14 tabele** organizate în grupuri logice:

#### Grup 1: Utilizatori și autentificare
```sql
utilizator (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  parola VARCHAR(255) NOT NULL,   -- bcrypt hash
  rol ENUM('membru', 'admin') DEFAULT 'membru'
)

membru (
  id INT AUTO_INCREMENT PRIMARY KEY,
  utilizatorId INT NOT NULL,       -- FK → utilizator(id)
  nume VARCHAR(100),
  prenume VARCHAR(100)
)
```
**Relație:** Un utilizator are exact un profil de membru. Separarea permite stocarea datelor de autentificare separat de datele personale.

#### Grup 2: Profilul dermatologic
```sql
profildermatologic (
  id INT AUTO_INCREMENT PRIMARY KEY,
  membruId INT UNIQUE NOT NULL,    -- FK → membru(id), UNIQUE = un singur profil
  tipTen VARCHAR(50),              -- 'normal', 'gras', 'uscat', 'mixt', 'sensibil'
  alergii TEXT,                    -- JSON array: ["parabeni", "alcool"]
  probleme TEXT                    -- JSON array: ["tendință acneică", "hiperpigmentare"]
)
```

#### Grup 3: Produse cosmetice
```sql
produs (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nume VARCHAR(255),
  brand VARCHAR(255),
  categorie VARCHAR(100),          -- 'curatare', 'toner', 'ser', 'hidratant', 'spf'
  tipTenRecomandat VARCHAR(255),   -- ex: 'normal,mixt,gras'
  rating DECIMAL(3,2)              -- actualizat automat prin trigger
)

ingredient (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nume VARCHAR(255)
)

produsingredient (                 -- Relație many-to-many Produs ↔ Ingredient
  produsId INT NOT NULL,           -- FK → produs(id)
  ingredientId INT NOT NULL,       -- FK → ingredient(id)
  PRIMARY KEY (produsId, ingredientId)
)
```

#### Grup 4: Rutine de îngrijire
```sql
rutina (
  id INT AUTO_INCREMENT PRIMARY KEY,
  membruId INT NOT NULL,           -- FK → membru(id)
  tip VARCHAR(50),                 -- 'completa'
  status VARCHAR(50),              -- 'activa' sau 'arhivata'
  dataCreare TIMESTAMP
)

rutinaprodus (                     -- Produsele dintr-o rutină
  rutinaId INT NOT NULL,           -- FK → rutina(id) ON DELETE CASCADE
  produsId INT NOT NULL,           -- FK → produs(id)
  ordineAplicare INT NOT NULL,     -- 1=curatare, 2=toner, 3=ser, 4=hidratant, 5=spf
  scorProdus DECIMAL(4,2),
  PRIMARY KEY (rutinaId, produsId)
)
```

**Trigger MySQL:**
```sql
CREATE TRIGGER actualizarePopularitateProdus
AFTER INSERT ON rutinaprodus
FOR EACH ROW
BEGIN
    UPDATE produs SET rating = LEAST(rating + 0.01, 5.00)
    WHERE id = NEW.produsId;
END;
```
*La fiecare inserare în rutinaprodus, ratingul produsului crește cu 0.01, maxim 5.00. Astfel produsele recomandate frecvent urcă în clasament.*

#### Grup 5: Jurnal de progres
```sql
jurnalprogres (
  id INT AUTO_INCREMENT PRIMARY KEY,
  membruId INT NOT NULL,           -- FK → membru(id)
  rating INT,                      -- 1-10, nota tenului
  observatii TEXT,
  dataIntrare DATE,
  poza VARCHAR(500) NULL           -- URL imagine Cloudinary (opțional)
)
```

#### Grup 6: Forum și comunitate
```sql
postare (
  id INT AUTO_INCREMENT PRIMARY KEY,
  membruId INT NOT NULL,           -- FK → membru(id)
  titlu VARCHAR(255),
  continut TEXT,
  status ENUM('in_asteptare', 'publicata', 'respinsa'),
  dataPostare TIMESTAMP
)

raspunspostare (
  id INT AUTO_INCREMENT PRIMARY KEY,
  postareId INT NOT NULL,          -- FK → postare(id)
  membruId INT NOT NULL,           -- FK → membru(id)
  continut TEXT,
  dataRaspuns TIMESTAMP
)

likepostare (
  id INT AUTO_INCREMENT PRIMARY KEY,
  postareId INT NOT NULL,          -- FK → postare(id)
  membruId INT NOT NULL            -- FK → membru(id)
  -- Combinația (postareId, membruId) e unică → un user = un like per postare
)
```

#### Grup 7: Chatbot
```sql
faq (
  id INT AUTO_INCREMENT PRIMARY KEY,
  intrebare TEXT,
  raspuns TEXT,
  categorie VARCHAR(100),
  cuvinteCheie TEXT,               -- cuvinte cheie separate prin virgulă
  numarAfisari INT DEFAULT 0       -- tracking popularitate întrebare
)
```

#### Grup 8: Administrator
```sql
administrator (
  id INT AUTO_INCREMENT PRIMARY KEY,
  utilizatorId INT,                -- FK → utilizator(id)
  ...
)
```

---

## 5. BACKEND — ANALIZĂ COMPLETĂ PE FIȘIERE

### 5.1 `server.js` — Entry Point

```javascript
const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./db');
const app = express();

app.use(cors());           // Permite cereri din orice origine (Vercel → Railway)
app.use(express.json());   // Parsează body JSON automat

// Montare rute
app.use('/api/auth', authRoutes);
app.use('/api/rutina', rutinaRoutes);
app.use('/api/chatbot', chatbotRoutes);
app.use('/api/jurnal', jurnalRoutes);
app.use('/api/forum', forumRoutes);

app.get('/api/test', (req, res) => {
  res.json({ mesaj: '🚀 Serverul GlowGuide funcționează perfect!' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serverul rulează pe port ${PORT}`));
```

**Detalii importante:**
- `process.env.PORT` este setat dinamic de Railway (8080 în producție)
- `cors()` fără restricții permite frontend-ul Vercel să acceseze backend-ul Railway
- Toate rutele sunt prefixate cu `/api/` pentru claritate

### 5.2 `db.js` — Conexiunea la Baza de Date

```javascript
const sequelize = new Sequelize(
  process.env.DB_NAME,       // 'railway'
  process.env.DB_USER,       // 'root'
  process.env.DB_PASSWORD,   // parola Railway
  {
    host: process.env.DB_HOST,       // 'hopper.proxy.rlwy.net'
    port: process.env.DB_PORT || 3306, // 46131 pe Railway
    dialect: 'mysql',
    logging: false,
  }
);
```

**Observație critică rezolvată:** Pe Railway (Linux), MySQL este **case-sensitive** pentru numele tabelelor. Toate query-urile folosesc **litere mici** (`utilizator`, `membru` etc.), spre deosebire de Windows unde `Utilizator` și `utilizator` sunt echivalente.

---

### 5.3 `authController.js` — Autentificare și Gestionare Cont

**Funcții implementate:**

#### `trimiteCodum` — Pasul 1 din înregistrare
```
POST /api/auth/trimite-cod
Body: { email, parola, nume, prenume }
```
- Verifică dacă email-ul există deja în `utilizator`
- Generează cod OTP de 6 cifre: `Math.floor(100000 + Math.random() * 900000)`
- Stochează temporar în obiectul în memorie `coduriVerificare[email]`:
  - codul, datele utilizatorului, timestamp expirare (10 minute)
- Trimite email HTML formatat prin Nodemailer (Gmail SMTP)

#### `verificaCod` — Pasul 2 din înregistrare
```
POST /api/auth/verifica-cod
Body: { email, cod }
```
- Verifică existența codului pentru email
- Verifică dacă nu a expirat (`Date.now() > datePendinte.expira`)
- Verifică corecitudinea codului (`datePendinte.cod !== cod.trim()`)
- Dacă valid: hash parolă cu bcrypt (salt rounds 10), INSERT în `utilizator` și `membru`
- Șterge codul din memorie după folosire

#### `register` — Înregistrare directă (compatibilitate)
```
POST /api/auth/register
Body: { email, parola, nume, prenume }
```
- Versiune simplificată fără OTP (păstrată pentru compatibilitate)
- Același flux: verificare unicitate email → hash → INSERT utilizator + membru

#### `login` — Autentificare
```
POST /api/auth/login
Body: { email, parola }
```
- Caută utilizatorul cu JOIN:
  ```sql
  SELECT u.id AS utilizatorId, u.email, u.parola, u.rol,
         m.id AS membruId, m.prenume, m.nume
  FROM utilizator u
  LEFT JOIN membru m ON u.id = m.utilizatorId
  WHERE u.email = ?
  ```
- Verifică parola cu `bcrypt.compare(parola, user.parola)`
- Generează JWT cu payload `{ utilizatorId, membruId, rol }`, expiră în 7 zile
- Returnează tokenul + datele utilizatorului (id = membruId, folosit în tot frontend-ul)

#### `getContMeu` — Date cont + statistici
```
GET /api/auth/cont/:membruId
```
- Returnează datele contului + statistici calculate:
  ```sql
  SELECT
    (SELECT COUNT(*) FROM jurnalprogres WHERE membruId = ?) AS intrariJurnal,
    (SELECT COUNT(*) FROM postare WHERE membruId = ? AND status = 'publicata') AS postariPublicate,
    (SELECT MAX(dataIntrare) FROM jurnalprogres WHERE membruId = ?) AS ultimaIntrareJurnal
  ```

#### `getProfilPublic` — Profil vizibil altor utilizatori
```
GET /api/auth/profil-public/:membruId
```
- Returnează: date membre + număr postări + număr intrări jurnal + ultimele 10 postări publicate

#### `editareNume` — Schimbare nume
```
PUT /api/auth/editare-nume
Body: { membruId, numeNou, prenumeNou }
```

#### `schimbaParola` — Schimbare parolă securizată
```
PUT /api/auth/schimba-parola
Body: { membruId, parolaVeche, parolaNoua }
```
- Verifică parola veche cu bcrypt înainte de a o schimba
- Stochează noua parolă tot ca hash bcrypt

#### `stergeCont` — Ștergere cascadă
```
DELETE /api/auth/sterge-cont
Body: { membruId }
```
Șterge în ordine (respectând FK):
1. `jurnalprogres` WHERE membruId
2. `postare` WHERE membruId
3. `profildermatologic` WHERE membruId
4. Găsește `utilizatorId` din `membru`
5. `membru` WHERE id
6. `utilizator` WHERE id

---

### 5.4 `rutinaController.js` — Sistemul Expert

#### `genereazaRutina`
```
POST /api/rutina/genereaza
Body: { membruId }
```

**Algoritmul complet în 5 pași:**

**Pasul 1:** Citire profil dermatologic
```sql
SELECT * FROM profildermatologic WHERE membruId = ?
```
Dacă nu există profil → eroare 404 (utilizatorul trebuie să completeze chestionarul)

**Pasul 2:** Parsare alergii din JSON
```javascript
alergeniArray = JSON.parse(profil.alergii);
// Ex: ["parabeni", "alcool", "parfum"]
```

**Pasul 3:** Arhivare rutină anterioară
```sql
UPDATE rutina SET status = 'arhivata' WHERE membruId = ? AND status = 'activa'
```
Utilizatorul poate regenera rutina oricând — cea veche devine 'arhivata'.

**Pasul 4:** Căutare produse — 5 iterații (câte una per categorie)
```javascript
const categorii = ['curatare', 'toner', 'ser', 'hidratant', 'spf'];
```

Pentru fiecare categorie, query-ul de bază:
```sql
SELECT DISTINCT p.id, p.nume, p.brand, p.categorie, p.rating
FROM produs p
WHERE p.categorie = ?
  AND p.tipTenRecomandat LIKE ?    -- ex: '%gras%'
ORDER BY p.rating DESC
LIMIT 1
```

Dacă utilizatorul are alergii, se adaugă subquery de excludere:
```sql
AND NOT EXISTS (
    SELECT 1 FROM produsingredient pi
    JOIN ingredient i ON pi.ingredientId = i.id
    WHERE pi.produsId = p.id AND i.nume IN (?, ?, ?)
)
```
*Această tehnică SQL (NOT EXISTS cu subquery) garantează că nu se recomandă niciun produs care conține vreun ingredient alergen al utilizatorului.*

**Pasul 5:** Creare rutină și asociere produse
```sql
INSERT INTO rutina (membruId, tip, status) VALUES (?, 'completa', 'activa')
```
Apoi pentru fiecare produs:
```sql
INSERT INTO rutinaprodus (rutinaId, produsId, ordineAplicare) VALUES (?, ?, ?)
```
La fiecare INSERT în `rutinaprodus`, **triggerul MySQL** crește automat rating-ul produsului cu 0.01.

#### `salveazaProfil`
```
POST /api/rutina/salveaza-profil
Body: { membruId, tipTen, alergii, probleme }
```
```sql
INSERT INTO profildermatologic (membruId, tipTen, alergii, probleme)
VALUES (?, ?, ?, ?)
ON DUPLICATE KEY UPDATE
  tipTen = VALUES(tipTen),
  alergii = VALUES(alergii),
  probleme = VALUES(probleme)
```
*`ON DUPLICATE KEY UPDATE` permite recompleting chestionarului — dacă profilul există, se actualizează în loc să se insereze duplicat.*

---

### 5.5 `jurnalController.js` — Jurnalul de Progres

#### `adaugaIntrare`
```
POST /api/jurnal/adauga
Body: multipart/form-data { membruId, rating, observatii, poza (opțional) }
```
- Dacă este atașată o imagine, aceasta este uploadată pe **Cloudinary** (folder `glowguide-jurnal`) prin middleware `multer-storage-cloudinary`
- URL-ul imaginii returnate de Cloudinary este salvat în coloana `poza` din `jurnalprogres`
- Dacă nu există imagine, `poza` este `NULL`

#### `getEvolutie` — Cel mai complex endpoint
```
GET /api/jurnal/evolutie/:membruId
```
**Algoritmul de calcul al evoluției:**
1. Aduce toate intrările din `jurnalprogres`
2. Grupează pe luni **în JavaScript** (nu SQL) pentru control mai bun al formatului:
   ```javascript
   let luna = nota.dataIntrare.substring(0, 7); // "2026-02"
   evolutieLuni[luna].suma += parseInt(nota.rating);
   evolutieLuni[luna].count += 1;
   ```
3. Calculează media per lună: `suma / count`
4. Sortează cronologic cu `localeCompare`
5. **Caz special:** Dacă există o singură lună, Chart.js nu poate trasa o linie. Soluție: adaugă artificial un punct fictiv pentru luna anterioară cu același rating (linie orizontală).

#### `getIstoricJurnal`
```
GET /api/jurnal/istoric/:id
```
```sql
SELECT * FROM jurnalprogres WHERE membruId = ? ORDER BY id DESC
```

#### `stergeIntrare` / `editeazaIntrare`
```
DELETE /api/jurnal/sterge/:notaId
PUT /api/jurnal/editeaza/:notaId
Body: multipart/form-data { rating, observatii, poza (opțional) }
```
- La **ștergere**: dacă intrarea are o poză, aceasta este ștearsă și din Cloudinary (`cloudinary.uploader.destroy`)
- La **editare**: dacă se trimite o poză nouă, poza veche este ștearsă din Cloudinary și înlocuită cu cea nouă

#### `exportCSV`
```
GET /api/jurnal/export/:id
```
- Generează CSV cu header `Data,Rating,Observatii`
- Adaugă **BOM UTF-8** (`\uFEFF`) pentru compatibilitate cu Microsoft Excel
- Setează header-ul `Content-Disposition: attachment` pentru download automat

---

### 5.6 `forumController.js` — Comunitate și Moderare

#### `creeazaPostare`
```
POST /api/forum/postare
Body: { membruId, titlu, continut }
```
Orice postare nouă intră cu `status = 'in_asteptare'` — nu este vizibilă până la aprobare admin.

#### `getPostariPublicate` — Feed principal
```
GET /api/forum/postari?membruId=X
```
Query complex cu JOIN multiplu:
```sql
SELECT p.id, p.titlu, p.continut, p.dataPostare, p.membruId,
       m.nume AS autor,
       COUNT(DISTINCT r.id) AS numar_raspunsuri,
       COUNT(DISTINCT l.id) AS numar_likeuri,
       MAX(CASE WHEN l.membruId = ? THEN 1 ELSE 0 END) AS likedDeMine
FROM postare p
JOIN membru m ON p.membruId = m.id
LEFT JOIN raspunspostare r ON p.id = r.postareId
LEFT JOIN likepostare l ON p.id = l.postareId
WHERE p.status = 'publicata'
GROUP BY p.id
ORDER BY p.dataPostare DESC
```
*`likedDeMine` returnează 1 dacă utilizatorul curent a dat like — calculat eficient direct în SQL prin `MAX(CASE WHEN...)`.*

#### `toggleLike`
```
POST /api/forum/postare/:postareId/like
Body: { membruId }
```
- Verifică dacă like-ul există
- Dacă există → DELETE (unlike)
- Dacă nu există → INSERT (like)
- Returnează noul număr de like-uri + starea curentă

#### `modereazaPostare` — Aprobare/Respingere
```
PUT /api/forum/admin/modereaza/:id
Body: { actiune: 'publicata' | 'respinsa' }
```
- Actualizează status postare
- Dacă `actiune = 'publicata'`: trimite email de notificare autorului prin Nodemailer
  - Email-ul conține titlul postării și un link către forum

#### `numarInAsteptare` — Badge admin Navbar
```
GET /api/forum/admin/numar-asteptare
```
Returnează numărul de postări `in_asteptare` — afișat ca badge roșu în Navbar pentru admin.

---

### 5.7 `chatbotController.js` — GlowBot AI

```
POST /api/chatbot/intreaba
Body: { intrebare }
```

**Sistem în 4 niveluri:**

**Nivel 0: Normalizare text**
```javascript
const normalizeaza = (str) => str
    .toLowerCase()
    .replace(/[?!.,]/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')   // elimină diacritice
    .replace(/ș|ş/g, 's').replace(/ț|ţ/g, 't')
    .replace(/ă/g, 'a').replace(/â|î/g, 'i');
```
Și filtrare cuvinte stop: `este`, `sunt`, `care`, `cum`, `face`, `faci`, `poti`, `trebuie`, `pentru`, `despre`, `folosesc`

**Nivel 1: Căutare după `cuvinteCheie` cu sistem de scoring**
```sql
SELECT id, raspuns, categorie, numarAfisari,
    (CASE WHEN LOWER(cuvinteCheie) LIKE '%niacinamide%' THEN 1 ELSE 0 END +
     CASE WHEN LOWER(cuvinteCheie) LIKE '%vitamina%' THEN 1 ELSE 0 END) AS scor
FROM faq
WHERE LOWER(cuvinteCheie) LIKE '%niacinamide%'
   OR LOWER(cuvinteCheie) LIKE '%vitamina%'
ORDER BY scor DESC, numarAfisari DESC
LIMIT 1
```
Prag minim: scor ≥ 2 pentru 2+ cuvinte cheie, scor ≥ 1 pentru un singur cuvânt.

**Nivel 2: Căutare după câmpul `intrebare`** (aceeași logică, fallback)

**Nivel 3: OpenAI GPT-3.5-turbo** (dacă cheia API e configurată)
```javascript
const completion = await openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages: [
        { role: 'system', content: 'Ești GlowBot, asistent specializat în skincare...' },
        { role: 'user', content: intrebare }
    ],
    max_tokens: 400,
    temperature: 0.7
});
```

**Nivel 4: Fallback final** — mesaj generic care îndrumă utilizatorul să reformuleze.

---

## 6. FRONTEND — ANALIZĂ COMPLETĂ PE PAGINI

### 6.1 `api.js` — Centralizarea URL-ului Backend
```javascript
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
export default API_URL;
```
- `import.meta.env.VITE_API_URL` este variabila de mediu Vite setată pe Vercel
- Fallback la `localhost:5000` pentru development local
- Importat în toate cele 12 fișiere JSX care fac cereri HTTP

### 6.2 `App.jsx` — Rutele Aplicației
```javascript
<Router>
  <Routes>
    <Route path="/" element={<LandingPage />} />
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
    <Route path="/rutina" element={<ProtectedRoute><RutinaMea /></ProtectedRoute>} />
    <Route path="/profil" element={<ProtectedRoute><Profil /></ProtectedRoute>} />
    <Route path="/jurnal" element={<ProtectedRoute><Jurnal /></ProtectedRoute>} />
    <Route path="/forum" element={<ProtectedRoute><Forum /></ProtectedRoute>} />
    <Route path="/forum/:id" element={<ProtectedRoute><DetaliiPostare /></ProtectedRoute>} />
    <Route path="/admin/moderare" element={<ProtectedRoute><AdminModerare /></ProtectedRoute>} />
    <Route path="/chatbot" element={<ProtectedRoute><Chatbot /></ProtectedRoute>} />
    <Route path="/cont" element={<ProtectedRoute><ContulMeu /></ProtectedRoute>} />
    <Route path="/profil-public/:membruId" element={<ProtectedRoute><ProfilPublic /></ProtectedRoute>} />
    <Route path="*" element={<Navigate to="/" />} />
  </Routes>
</Router>
```
- Rutele publice: `/`, `/login`, `/register`
- Toate celelalte rute sunt protejate prin `ProtectedRoute`
- Ruta `*` redirecționează orice URL necunoscut la landing page

### 6.3 `ProtectedRoute.jsx` — Gardă de Autentificare
```javascript
export default function ProtectedRoute({ children }) {
  const token = localStorage.getItem('token');
  if (!token) return <Navigate to="/login" />;
  return children;
}
```
Verifică existența tokenului JWT în localStorage. Dacă nu există, redirecționează la login.

### 6.4 `Navbar.jsx` — Bara de Navigare
- Afișează link-urile de navigare: Acasă, Profil, Rutina, Jurnal, Forum, GlowBot
- Buton de logout (șterge token + user din localStorage, redirect la /login)
- **Badge admin:** Dacă utilizatorul are `rol = 'admin'`, face polling la `GET /api/forum/admin/numar-asteptare` la fiecare schimbare de pagină și afișează numărul postărilor în așteptare
- Actualizat la fiecare schimbare de rută (`useLocation` + `useEffect`)

---

### 6.5 `Login.jsx`
- Formular: email + parolă
- `POST /api/auth/login`
- La succes: salvează `token` și `user` în localStorage, redirect la `/dashboard`
- La eroare: afișează mesajul de eroare primit de la backend sau "Nu m-am putut conecta la server"

### 6.6 `Register.jsx` — Înregistrare în 2 pași

**Pasul 1 (stare `pas = 1`):**
- Formular: prenume, nume, email, parolă, confirmare parolă
- Validare locală: parolele trebuie să coincidă
- `POST /api/auth/trimite-cod` → backend trimite email cu cod OTP

**Pasul 2 (stare `pas = 2`):**
- Input pentru codul de 6 cifre primit pe email
- `POST /api/auth/verifica-cod`
- La succes: redirect la `/login` cu mesaj de succes

### 6.7 `Dashboard.jsx` — Pagina Principală
- Afișează un grid de carduri pentru fiecare secțiune
- Fiecare card are gradient de culoare unic, emoji și descriere
- Nu face nicio cerere HTTP — date statice
- Mesaj de bun venit cu prenumele utilizatorului din localStorage

### 6.8 `Profil.jsx` — Chestionarul Dermatologic

**Structura interfeței:**
- Progress bar animat: `Math.round((pas / TOTAL_PASI) * 100)%`
- Afișare câte o întrebare pe ecran (navigare pas cu pas)
- La selectarea unui răspuns: avansare automată după 300ms

**Cele 8 întrebări:**
1. Cum simți pielea după spălare? (4 opțiuni → clasificare gras/uscat/mixt)
2. Cum arată porii? (3 opțiuni)
3. Zone cu piele uscată? (2 opțiuni)
4. Se înroșește ușor? (2 opțiuni → sensibil)
5. Reacții la produse noi? (2 opțiuni → sensibil)
6. Acnee/coșuri? (4 opțiuni → tendință acneică)
7. Pete maronii/hiperpigmentare? (2 opțiuni)
8. Preocupări anti-aging? (2 opțiuni)

**+ Pasul 9:** Introducere alergii la ingrediente (text liber, separate prin virgulă)

**Algoritmul `calculeazaDiagnostic`:**
```javascript
let axe = { gras: 0, uscat: 0, sensibil: 0, acnee: 0, pigmentare: 0, aging: 0 };

// Sistem de punctaj:
if (r.q1 === 'strange') axe.uscat += 3;
if (r.q1 === 'luceste') axe.gras += 3;
if (r.q1 === 'luceste_t') { axe.gras += 2; axe.uscat += 1; } // mixt
// ... etc

// Clasificare tip bază:
if (axe.gras >= 4) tipBaza = 'gras';
if (axe.uscat >= 4) tipBaza = 'uscat';
if (axe.gras >= 2 && axe.uscat >= 2) tipBaza = 'mixt';
if (axe.sensibil >= 4) tipBaza = 'sensibil';
// else: 'normal'
```

Rezultatul (tipTen + probleme) e trimis la `POST /api/rutina/salveaza-profil`, apoi redirect automat la `/rutina` după 4 secunde.

### 6.9 `RutinaMea.jsx` — Rutina Personalizată

**La deschiderea paginii:**
- Verifică localStorage pentru rutina salvată anterior (`rutina_${user.id}`)
- Dacă există → afișează direct fără cerere HTTP
- Dacă nu există → afișează buton "Generează Rutina"

**La generare:**
- `POST /api/rutina/genereaza` cu `{ membruId: user.id }`
- Afișează produsele recomandate cu emoji per categorie:
  - 🧴 curățare, 💧 toner, ✨ ser, 🌊 hidratant, ☀️ SPF
- Salvează în localStorage pentru persistență între sesiuni

**Afișare produs:** Nume produs, brand, categorie cu emoji

### 6.10 `Jurnal.jsx` — Jurnalul de Progres

**Secțiunea 1 — Adăugare intrare:**
- Slider rating 1-10
- Textarea observații
- `POST /api/jurnal/adauga`

**Secțiunea 2 — Grafic evoluție (Chart.js):**
```javascript
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);
```
- Tip: Line Chart cu area fill
- Culoare: verde (#6aab9e), fill cu opacitate 12%
- Tension: 0.4 (linii curbate)
- Date: media ratingurilor pe luni, de la backend

**Secțiunea 3 — Istoric intrări:**
- Lista tuturor intrărilor ordonate descrescător
- Fiecare intrare: dată, rating vizual (emoji/stele), observații
- Buton editare → formular inline cu rating + observații
- Buton ștergere cu confirmare

**Export CSV:**
- `GET /api/jurnal/export/:id`
- Descarcă fișier `jurnal_glowguide.csv` direct în browser

### 6.11 `Forum.jsx` — Feed Comunitate

**La încărcare:** `GET /api/forum/postari?membruId=X`

**Feed postări:**
- Titlu, autor (link către profil public), dată
- Preview conținut (primele 200 caractere)
- Număr răspunsuri 💬 și like-uri ❤️
- Buton like (toggle, colorat dacă utilizatorul a dat like)
- Click pe postare → redirect la `/forum/:id`

**Creare postare nouă:**
- Modal/formular cu titlu + conținut
- `POST /api/forum/postare`
- Mesaj: "Postarea va apărea după moderare"

### 6.12 `DetaliiPostare.jsx` — Postare Completă
- `GET /api/forum/postare/:id` → postare + toate reply-urile
- Afișare cronologică a reply-urilor (de la cel mai vechi la cel mai nou)
- Formular de adăugare reply
- `POST /api/forum/postare/:id/reply`

### 6.13 `AdminModerare.jsx` — Panoul Adminului
- `GET /api/forum/admin/asteptare`
- Lista postărilor `in_asteptare` cu titlu, autor, conținut preview, dată
- Buton **Aprobă** → `PUT /api/forum/admin/modereaza/:id` cu `{ actiune: 'publicata' }`
- Buton **Respinge** → aceeași rută cu `{ actiune: 'respinsa' }`
- La aprobare: backend trimite email autorului

### 6.14 `Chatbot.jsx` — GlowBot AI
- Interfață de tip chat (bule mesaje)
- Mesaje utilizator (dreapta, roz) + răspunsuri bot (stânga, verde)
- Indicator de sursă: 🗃️ FAQ sau 🤖 AI
- `POST /api/chatbot/intreaba` cu `{ intrebare }`
- Indicatort loading ("GlowBot tastează...") în timp ce se așteaptă răspunsul

### 6.15 `ContulMeu.jsx` — Setări Cont

**Afișare date cont:**
- Avatar generat din inițialele numelui cu culoare determinată prin hash:
  ```javascript
  function getCuloareAvatar(nume) {
    const CULORI = ['#b06090', '#6aab9e', '#e8956d', '#7b68ee', '#e91e8c', '#00897b'];
    let hash = 0;
    for (let i = 0; i < (nume || '').length; i++)
      hash = nume.charCodeAt(i) + ((hash << 5) - hash);
    return CULORI[Math.abs(hash) % CULORI.length];
  }
  ```
- Email, rol, statistici (intrări jurnal, postări, ultima activitate)

**Funcționalități:**
- Editare nume/prenume (PUT /api/auth/editare-nume)
- Schimbare parolă cu verificare parolă veche (PUT /api/auth/schimba-parola)
- Toggle **Dark Mode** (persistat în localStorage, aplicat pe `document.body`)
- Ștergere cont cu confirmare dublă (DELETE /api/auth/sterge-cont) → cascadă DB

### 6.16 `ProfilPublic.jsx` — Profil Public
- `GET /api/auth/profil-public/:membruId`
- Accesibil din forum (click pe numele autorului)
- Afișează: avatar, nume, statistici publice, ultimele 10 postări

---

## 7. FLUXURI COMPLETE ALE APLICAȚIEI

### 7.1 Flux Înregistrare + Verificare Email
```
Utilizator → completează formular → POST /api/auth/trimite-cod
Backend → verifică unicitate email → generează OTP 6 cifre
Backend → stochează OTP în memorie (10 min) → trimite email HTML via Gmail
Utilizator → primește email → introduce codul → POST /api/auth/verifica-cod
Backend → verifică OTP (existență + expirare + corectitudine)
Backend → hash parolă bcrypt → INSERT utilizator + INSERT membru
Frontend → redirect la /login
```

### 7.2 Flux Generare Rutină Personalizată
```
Utilizator → completează chestionar 8 întrebări + alergii
Frontend → calculeazaDiagnostic() → determină tipTen + probleme
Frontend → POST /api/rutina/salveaza-profil → INSERT profildermatologic
Frontend → redirect la /rutina după 4 secunde
Utilizator → apasă "Generează Rutina"
Frontend → POST /api/rutina/genereaza
Backend → SELECT profildermatologic
Backend → UPDATE rutina SET status='arhivata' (rutina anterioară)
Backend → LOOP pe 5 categorii:
    → SELECT produs WHERE categorie=? AND tipTen LIKE ? [AND NOT EXISTS alergeni]
    → ORDER BY rating DESC LIMIT 1
Backend → INSERT rutina (activa)
Backend → INSERT rutinaprodus × 5 (trigger crește rating automat)
Frontend → afișează 5 produse recomandate + salvează în localStorage
```

### 7.3 Flux Forum cu Moderare
```
Utilizator → scrie postare → POST /api/forum/postare
Backend → INSERT postare WHERE status='in_asteptare'
Frontend → afișează mesaj "Va apărea după aprobare"

Admin → deschide /admin/moderare
Admin → GET /api/forum/admin/asteptare → lista postări pendinte
Admin → apasă Aprobă → PUT /api/forum/admin/modereaza/:id { actiune: 'publicata' }
Backend → UPDATE postare SET status='publicata'
Backend → SELECT prenume, email → trimite email notificare via Nodemailer
Postare → apare în feed public pentru toți utilizatorii
```

### 7.4 Flux Chatbot Multi-Nivel
```
Utilizator → introduce întrebare
Frontend → POST /api/chatbot/intreaba
Backend → normalizeaza() → elimină diacritice, punctuație, lowercase
Backend → filtrare cuvinte stop → extrage cuvinte semnificative

Nivel 1: SELECT FROM faq WHERE cuvinteCheie LIKE ? → scor ≥ prag?
  DA → returnează răspuns FAQ + UPDATE numarAfisari + 1
  NU ↓

Nivel 2: SELECT FROM faq WHERE intrebare LIKE ? → scor ≥ prag?
  DA → returnează răspuns FAQ + UPDATE numarAfisari + 1
  NU ↓

Nivel 3: OPENAI_API_KEY configurată?
  DA → openai.chat.completions.create() → returnează răspuns GPT
  NU ↓

Nivel 4: returnează mesaj generic de fallback
```

---

## 8. SECURITATE ȘI AUTENTIFICARE

### 8.1 Hashing parole — bcryptjs
```javascript
const salt = await bcrypt.genSalt(10);           // 10 runde de salt
const parolaHash = await bcrypt.hash(parola, salt);
// Parolele sunt ireversibil criptate — nimeni nu poate vedea parola originală
// Verificare: bcrypt.compare(parolaIntrodusa, hashDinBD)
```

### 8.2 JWT — JSON Web Tokens
```javascript
// Generare (la login):
jwt.sign(
  { utilizatorId, membruId, rol },   // payload
  process.env.JWT_SECRET,             // cheie secretă din .env
  { expiresIn: '7d' }                 // expiră în 7 zile
)

// Verificare (în ProtectedRoute pe frontend):
const token = localStorage.getItem('token');
if (!token) redirect('/login');
```

### 8.3 Variabile de mediu `.env`
```
DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_NAME
JWT_SECRET
EMAIL_USER, EMAIL_PASS
OPENAI_API_KEY
```
Fișierul `.env` este în `.gitignore` — nu ajunge niciodată pe GitHub.

### 8.4 Protecție SQL Injection
Toate query-urile folosesc **parametri legați** (prepared statements) prin Sequelize:
```javascript
sequelize.query('SELECT * FROM utilizator WHERE email = ?', {
  replacements: [email]   // NU concatenare string — protejat SQL injection
});
```

---

## 9. DEPLOYMENT ȘI INFRASTRUCTURĂ

### 9.1 CI/CD Automat
- La fiecare `git push` pe branch-ul `main`:
  - **Vercel** detectează modificările în `glowguide-frontend/` → rebuild automat
  - **Railway** detectează modificările în `glowguide-backend/` → redeploy automat

### 9.2 Variabile de Mediu în Producție
- **Vercel:** `VITE_API_URL=https://licenta-production-20f9.up.railway.app`
  - Variabilele Vite cu prefix `VITE_` sunt inline la **build time** (nu runtime)
- **Railway:** `DB_HOST`, `DB_PORT`, `DB_USER`, `DB_PASSWORD`, `DB_NAME`, `JWT_SECRET`, `EMAIL_USER`, `EMAIL_PASS`

### 9.3 Problemă rezolvată: MySQL case-sensitivity
- **Windows (dev):** MySQL case-insensitive → `Utilizator` = `utilizator`
- **Linux/Railway (prod):** MySQL case-sensitive → `Utilizator` ≠ `utilizator`
- **Fix aplicat:** Toate query-urile backend folosesc litere mici pentru numele tabelelor

### 9.4 Trigger MySQL recreat pe Railway
Triggerul `actualizarePopularitateProdus` a trebuit recreat manual pe Railway deoarece a eșuat la import din cauza aceluiași problema de case-sensitivity.

---

## 10. TEHNOLOGII UTILIZATE

### Frontend
| Tehnologie | Versiune | Utilizare |
|------------|---------|-----------|
| React | 19.2.0 | Framework UI, componente, hooks |
| Vite | 7.3.1 | Build tool, dev server, env variables |
| React Router DOM | 7.13.1 | Routing SPA, Navigate, useParams |
| Axios | 1.13.5 | HTTP client pentru cereri REST API |
| Chart.js | 4.5.1 | Grafice (line chart evoluție jurnal) |
| react-chartjs-2 | 5.3.1 | Wrapper React pentru Chart.js |

### Backend
| Tehnologie | Versiune | Utilizare |
|------------|---------|-----------|
| Node.js | 22.x | Runtime JavaScript server-side |
| Express | 5.2.1 | Framework web, routing, middleware |
| Sequelize | 6.37.7 | ORM pentru MySQL, query builder |
| mysql2 | 3.18.0 | Driver MySQL pentru Node.js |
| bcryptjs | 3.0.3 | Hashing parole (salt + hash ireversibil) |
| jsonwebtoken | 9.0.3 | Generare și verificare token JWT |
| nodemailer | 6.9.16 | Trimitere emailuri (Gmail SMTP) |
| openai | 6.27.0 | Client OpenAI API (GPT-3.5-turbo) |
| dotenv | 17.3.1 | Variabile de mediu din fișier .env |
| cors | 2.8.6 | Cross-Origin Resource Sharing |
| multer | 2.0.2 | Upload fișiere (pregătit, neutilizat activ) |

### Infrastructură
| Serviciu | Utilizare |
|----------|-----------|
| GitHub | Versionare cod, CI/CD trigger |
| Vercel | Hosting frontend (CDN global, HTTPS automat) |
| Railway | Hosting backend Node.js + MySQL |
| Gmail SMTP | Trimitere emailuri verificare OTP și notificări |

---

*Document generat pentru lucrarea de licență — GlowGuide, 2026*
*Crăiniceanu Mădălina — ASE București*
