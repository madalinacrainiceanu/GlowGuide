const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
const sequelize = require('../db'); 

// Stocare temporară coduri de verificare (în memorie — se resetează la repornirea serverului)
const coduriVerificare = {};

// Configurare transporter email
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// --- PASUL 1: TRIMITE COD DE VERIFICARE PE EMAIL ---
exports.trimiteCodum = async (req, res) => {
    const { email, parola, nume, prenume } = req.body;

    try {
        // Verificăm dacă email-ul există deja
        const [userExistent] = await sequelize.query(
            'SELECT * FROM Utilizator WHERE email = ?',
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
        await transporter.sendMail({
            from: `"GlowGuide 🌸" <${process.env.EMAIL_USER}>`,
            to: email,
            subject: 'Cod de verificare GlowGuide',
            html: `
                <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 30px; background: #fffafb; border-radius: 15px;">
                    <h2 style="color: #d63384; text-align: center;">✨ GlowGuide</h2>
                    <p>Bună, <strong>${prenume}</strong>!</p>
                    <p>Codul tău de verificare pentru crearea contului este:</p>
                    <div style="text-align: center; margin: 30px 0;">
                        <span style="font-size: 36px; font-weight: bold; letter-spacing: 8px; color: #d63384; background: #fff0f6; padding: 15px 30px; border-radius: 10px;">${cod}</span>
                    </div>
                    <p style="color: #888; font-size: 13px;">Codul este valabil <strong>10 minute</strong>. Dacă nu ai solicitat tu crearea unui cont, ignoră acest email.</p>
                </div>
            `
        });

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

        // Inserare Utilizator
        const [resultUtilizator] = await sequelize.query(
            `INSERT INTO Utilizator (email, parola, rol) VALUES (?, ?, 'membru')`,
            { replacements: [email, parolaHash] }
        );
        const utilizatorId = resultUtilizator;

        // Inserare Membru
        await sequelize.query(
            `INSERT INTO Membru (utilizatorId, nume, prenume) VALUES (?, ?, ?)`,
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
            'SELECT * FROM Utilizator WHERE email = ?',
            { replacements: [email] }
        );

        if (userExistent.length > 0) {
            return res.status(400).json({ eroare: 'Email-ul este deja folosit!' });
        }

        const salt = await bcrypt.genSalt(10);
        const parolaHash = await bcrypt.hash(parola, salt);

        const [resultUtilizator] = await sequelize.query(
            `INSERT INTO Utilizator (email, parola, rol) VALUES (?, ?, 'membru')`,
            { replacements: [email, parolaHash] }
        );
        const utilizatorId = resultUtilizator;

        await sequelize.query(
            `INSERT INTO Membru (utilizatorId, nume, prenume) VALUES (?, ?, ?)`,
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
            'SELECT * FROM Utilizator WHERE email = ?',
            { replacements: [email] }
        );

        if (userExistent.length > 0) {
            return res.status(400).json({ eroare: 'Email-ul este deja folosit!' });
        }

        // 2. Hash parola (criptare ireversibilă)
        const salt = await bcrypt.genSalt(10);
        const parolaHash = await bcrypt.hash(parola, salt);

        // 3. Inserare în tabelul Utilizator
        const [resultUtilizator] = await sequelize.query(
            `INSERT INTO Utilizator (email, parola, rol) VALUES (?, ?, 'membru')`,
            { replacements: [email, parolaHash] }
        );
        const utilizatorId = resultUtilizator; // ID-ul generat automat de MySQL

        // 4. Inserare în tabelul Membru (legat prin FK de Utilizator)
        await sequelize.query(
            `INSERT INTO Membru (utilizatorId, nume, prenume) VALUES (?, ?, ?)`,
            { replacements: [utilizatorId, nume, prenume] }
        );

        res.status(201).json({ mesaj: 'Cont creat cu succes!' });

    } catch (error) {
        console.error(error);
        res.status(500).json({ eroare: 'Eroare la server în timpul înregistrării.' });
    }
};

// --- AUTENTIFICARE (LOGIN) ---
exports.login = async (req, res) => {
    const { email, parola } = req.body;

    try {
        // 1. Căutăm utilizatorul în BD, făcând JOIN cu Membru pentru a lua ID-ul corect
        const [users] = await sequelize.query(
            `SELECT u.id AS utilizatorId, u.email, u.parola, u.rol, m.id AS membruId 
             FROM Utilizator u 
             LEFT JOIN Membru m ON u.id = m.utilizatorId 
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
                rol: user.rol 
            }
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ eroare: 'Eroare la server în timpul autentificării.' });
    }
};
