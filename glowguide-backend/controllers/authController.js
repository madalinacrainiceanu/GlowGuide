const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const sequelize = require('../db'); 

// Stocare temporară coduri de verificare (în memorie — se resetează la repornirea serverului)
const coduriVerificare = {};

// Trimitere email prin Brevo HTTP API
const trimiteEmailBrevo = async (catre, subiect, html) => {
    await axios.post('https://api.brevo.com/v3/smtp/email', {
        sender: { name: 'GlowGuide 🌸', email: process.env.EMAIL_USER },
        to: [{ email: catre }],
        subject: subiect,
        htmlContent: html
    }, {
        headers: {
            'api-key': process.env.BREVO_API_KEY,
            'Content-Type': 'application/json'
        }
    });
};

// --- PASUL 1: TRIMITE COD DE VERIFICARE PE EMAIL ---
exports.trimiteCodum = async (req, res) => {
    const { email, parola, nume, prenume } = req.body;

    try {
        // Verificăm dacă email-ul există deja
        const [userExistent] = await sequelize.query(
            'SELECT * FROM utilizator WHERE email = ?',
            { replacements: [email] }
        );
        if (userExistent.length > 0) {
            return res.status(400).json({ eroare: 'Email-ul este deja folosit!' });
        }

        // Generăm cod de 6 cifre
        const cod = Math.floor(100000 + Math.random() * 900000).toString();

        // Salvăm codul + datele temporar (expiră în 10 minute)
        coduriVerificare[email] = {
            cod,
            parola,
            nume,
            prenume,
            expira: Date.now() + 10 * 60 * 1000
        };

        // Trimitem emailul
        await trimiteEmailBrevo(email, 'Cod de verificare GlowGuide', `
                <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 30px; background: #fffafb; border-radius: 15px;">
                    <h2 style="color: #d63384; text-align: center;">✨ GlowGuide</h2>
                    <p>Bună, <strong>${prenume}</strong>!</p>
                    <p>Codul tău de verificare pentru crearea contului este:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #d63384; background: #fff0f6; padding: 15px 30px; border-radius: 10px;">${cod}</span>
                    </div>
                    <p style="color: #888; font-size: 13px;">Codul este valabil <strong>10 minute</strong>. Dacă nu ai solicitat tu crearea unui cont, ignoră acest email.</p>
                </div>
            `);

        res.json({ mesaj: 'Cod trimis pe email! Verifică inbox-ul.' });

    } catch (error) {
        console.error('Eroare trimitere email:', error);
        res.status(500).json({ eroare: 'Eroare la trimiterea email-ului. Încearcă din nou.' });
    }
};

// --- PASUL 2: VERIFICĂ CODUL ȘI CREEAZĂ CONTUL ---
exports.verificaCod = async (req, res) => {
    const { email, cod } = req.body;

    const datePendinte = coduriVerificare[email];

    if (!datePendinte) {
        return res.status(400).json({ eroare: 'Nu există o cerere de înregistrare pentru acest email.' });
    }
    if (Date.now() > datePendinte.expira) {
        delete coduriVerificare[email];
        return res.status(400).json({ eroare: 'Codul a expirat. Solicită un cod nou.' });
    }
    if (datePendinte.cod !== cod.trim()) {
        return res.status(400).json({ eroare: 'Cod incorect. Verifică emailul și încearcă din nou.' });
    }

    try {
        const { parola, nume, prenume } = datePendinte;

        // Hash parola
        const salt = await bcrypt.genSalt(10);
        const parolaHash = await bcrypt.hash(parola, salt);

        // Inserare utilizator
        const [resultUtilizator] = await sequelize.query(
            `INSERT INTO utilizator (email, parola, rol) VALUES (?, ?, 'membru')`,
            { replacements: [email, parolaHash] }
        );
        const utilizatorId = resultUtilizator;

        // Inserare membru
        await sequelize.query(
            `INSERT INTO membru (utilizatorId, nume, prenume) VALUES (?, ?, ?)`,
            { replacements: [utilizatorId, nume, prenume] }
        );

        // Ștergem codul folosit
        delete coduriVerificare[email];

        res.status(201).json({ mesaj: 'Cont creat cu succes! Te poți autentifica acum.' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ eroare: 'Eroare la crearea contului.' });
    }
};

// --- ÎNREGISTRARE DIRECTĂ (păstrată pentru compatibilitate) ---
exports.register = async (req, res) => {
    const { email, parola, nume, prenume } = req.body;

    try {
        const [userExistent] = await sequelize.query(
            'SELECT * FROM utilizator WHERE email = ?',
            { replacements: [email] }
        );

        if (userExistent.length > 0) {
            return res.status(400).json({ eroare: 'Email-ul este deja folosit!' });
        }

        const salt = await bcrypt.genSalt(10);
        const parolaHash = await bcrypt.hash(parola, salt);

        const [resultUtilizator] = await sequelize.query(
            `INSERT INTO utilizator (email, parola, rol) VALUES (?, ?, 'membru')`,
            { replacements: [email, parolaHash] }
        );
        const utilizatorId = resultUtilizator;

        await sequelize.query(
            `INSERT INTO membru (utilizatorId, nume, prenume) VALUES (?, ?, ?)`,
            { replacements: [utilizatorId, nume, prenume] }
        );

        res.status(201).json({ mesaj: 'Cont creat cu succes!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ eroare: 'Eroare la server în timpul înregistrării.' });
    }
};


// --- ÎNREGISTRARE DIRECTĂ (păstrată pentru compatibilitate) ---
exports.register = async (req, res) => {
    const { email, parola, nume, prenume } = req.body;

    try {
        // 1. Verificăm dacă email-ul există deja
        const [userExistent] = await sequelize.query(
            'SELECT * FROM utilizator WHERE email = ?',
            { replacements: [email] }
        );

        if (userExistent.length > 0) {
            return res.status(400).json({ eroare: 'Email-ul este deja folosit!' });
        }

        // 2. Hash parola (criptare ireversibilă)
        const salt = await bcrypt.genSalt(10);
        const parolaHash = await bcrypt.hash(parola, salt);

        // 3. Inserare în tabelul utilizator
        const [resultUtilizator] = await sequelize.query(
            `INSERT INTO utilizator (email, parola, rol) VALUES (?, ?, 'membru')`,
            { replacements: [email, parolaHash] }
        );
        const utilizatorId = resultUtilizator; // ID-ul generat automat de MySQL

        // 4. Inserare în tabelul membru (legat prin FK de utilizator)
        await sequelize.query(
            `INSERT INTO membru (utilizatorId, nume, prenume) VALUES (?, ?, ?)`,
            { replacements: [utilizatorId, nume, prenume] }
        );

        res.status(201).json({ mesaj: 'Cont creat cu succes!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ eroare: 'Eroare la server în timpul înregistrării.' });
    }
};

// --- PROFIL PUBLIC UTILIZATOR ---
exports.getProfilPublic = async (req, res) => {
    const { membruId } = req.params;
    try {
        const [rows] = await sequelize.query(
            `SELECT m.id, m.prenume, m.nume,
                    COUNT(DISTINCT p.id) AS postariPublicate,
                    COUNT(DISTINCT j.id) AS intrariJurnal
             FROM membru m
             JOIN utilizator u ON m.utilizatorId = u.id
             LEFT JOIN postare p ON p.membruId = m.id AND p.status = 'publicata'
             LEFT JOIN jurnalprogres j ON j.membruId = m.id
             WHERE m.id = ?
             GROUP BY m.id`,
            { replacements: [membruId] }
        );
        if (rows.length === 0) return res.status(404).json({ eroare: 'Utilizatorul nu există.' });

        const [postari] = await sequelize.query(
            `SELECT p.id, p.titlu, p.dataPostare, COUNT(r.id) AS numar_raspunsuri
             FROM postare p
             LEFT JOIN raspunspostare r ON r.postareId = p.id
             WHERE p.membruId = ? AND p.status = 'publicata'
             GROUP BY p.id ORDER BY p.dataPostare DESC LIMIT 10`,
            { replacements: [membruId] }
        );

        res.json({ ...rows[0], postari });
    } catch (error) {
        res.status(500).json({ eroare: 'Eroare la încărcarea profilului.' });
    }
};

// --- GET DETALII CONT + STATISTICI ---
exports.getContMeu = async (req, res) => {
    const { membruId } = req.params;
    try {
        const [rows] = await sequelize.query(
            `SELECT u.id AS utilizatorId, u.email, u.rol,
                    m.id AS membruId, m.nume, m.prenume
             FROM membru m
             JOIN utilizator u ON m.utilizatorId = u.id
             WHERE m.id = ?`,
            { replacements: [membruId] }
        );
        if (rows.length === 0) return res.status(404).json({ eroare: 'Utilizatorul nu a fost găsit.' });

        const [stats] = await sequelize.query(
            `SELECT 
                (SELECT COUNT(*) FROM jurnalprogres WHERE membruId = ?) AS intrariJurnal,
                (SELECT COUNT(*) FROM postare WHERE membruId = ? AND status = 'publicata') AS postariPublicate,
                (SELECT MAX(dataIntrare) FROM jurnalprogres WHERE membruId = ?) AS ultimaIntrareJurnal`,
            { replacements: [membruId, membruId, membruId] }
        );

        res.json({ ...rows[0], statistici: stats[0] });
    } catch (error) {
        console.error(error);
        res.status(500).json({ eroare: 'Eroare la preluarea datelor contului.' });
    }
};

// --- EDITARE NUME ---
exports.editareNume = async (req, res) => {
    const { membruId, numeNou, prenumeNou } = req.body;
    try {
        await sequelize.query(
            'UPDATE membru SET nume = ?, prenume = ? WHERE id = ?',
            { replacements: [numeNou, prenumeNou, membruId] }
        );
        res.json({ mesaj: 'Numele a fost actualizat cu succes!' });
    } catch (error) {
        res.status(500).json({ eroare: 'Eroare la actualizarea numelui.' });
    }
};

// --- SCHIMBĂ PAROLA ---
exports.schimbaParola = async (req, res) => {
    const { membruId, parolaVeche, parolaNoua } = req.body;
    try {
        const [rows] = await sequelize.query(
            'SELECT u.parola FROM utilizator u JOIN membru m ON u.id = m.utilizatorId WHERE m.id = ?',
            { replacements: [membruId] }
        );
        if (rows.length === 0) return res.status(404).json({ eroare: 'Utilizatorul nu există.' });

        const potrivire = await bcrypt.compare(parolaVeche, rows[0].parola);
        if (!potrivire) return res.status(400).json({ eroare: 'Parola actuală este incorectă.' });

        const salt = await bcrypt.genSalt(10);
        const parolaHash = await bcrypt.hash(parolaNoua, salt);

        await sequelize.query(
            'UPDATE utilizator u JOIN membru m ON u.id = m.utilizatorId SET u.parola = ? WHERE m.id = ?',
            { replacements: [parolaHash, membruId] }
        );
        res.json({ mesaj: 'Parola a fost schimbată cu succes!' });
    } catch (error) {
        res.status(500).json({ eroare: 'Eroare la schimbarea parolei.' });
    }
};

// --- ȘTERGERE CONT ---
exports.stergeCont = async (req, res) => {
    const { membruId } = req.body;
    try {
        // Ștergem datele asociate
        await sequelize.query('DELETE FROM jurnalprogres WHERE membruId = ?', { replacements: [membruId] });
        await sequelize.query('DELETE FROM postare WHERE membruId = ?', { replacements: [membruId] });
        await sequelize.query('DELETE FROM profildermatologic WHERE membruId = ?', { replacements: [membruId] });

        // Găsim utilizatorId
        const [rows] = await sequelize.query('SELECT utilizatorId FROM membru WHERE id = ?', { replacements: [membruId] });
        if (rows.length === 0) return res.status(404).json({ eroare: 'Utilizatorul nu există.' });
        const utilizatorId = rows[0].utilizatorId;

        await sequelize.query('DELETE FROM membru WHERE id = ?', { replacements: [membruId] });
        await sequelize.query('DELETE FROM utilizator WHERE id = ?', { replacements: [utilizatorId] });

        res.json({ mesaj: 'Contul a fost șters.' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ eroare: 'Eroare la ștergerea contului.' });
    }
};

// --- AUTENTIFICARE (LOGIN) ---
exports.login = async (req, res) => {
    const { email, parola } = req.body;

    try {
        // 1. Căutăm utilizatorul în BD, făcând JOIN cu Membru pentru a lua ID-ul corect
        const [users] = await sequelize.query(
            `SELECT u.id AS utilizatorId, u.email, u.parola, u.rol, m.id AS membruId, m.prenume, m.nume
             FROM utilizator u 
             LEFT JOIN membru m ON u.id = m.utilizatorId
             WHERE u.email = ?`,
            { replacements: [email] }
        );

        if (users.length === 0) {
            return res.status(400).json({ eroare: 'Email sau parolă incorecte!' });
        }

        const user = users[0]; 

        // 2. Verificăm parola
        const isMatch = await bcrypt.compare(parola, user.parola);
        if (!isMatch) {
            return res.status(400).json({ eroare: 'Email sau parolă incorecte!' });
        }

        // 3. Generăm token-ul JWT (folosind datele corecte)
        const token = jwt.sign(
            { utilizatorId: user.utilizatorId, membruId: user.membruId, rol: user.rol },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // 4. Returnăm ID-ul de MEMBRU (foarte important pentru restul aplicației)
        res.json({
            mesaj: 'Autentificare reușită!',
            token,
            user: { 
                id: user.membruId, 
                email: user.email, 
                rol: user.rol,
                prenume: user.prenume,
                nume: user.nume
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ eroare: 'Eroare la server în timpul autentificării.' });
    }
};
