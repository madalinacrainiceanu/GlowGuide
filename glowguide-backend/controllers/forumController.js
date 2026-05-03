const sequelize = require('../db');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    },
    tls: { rejectUnauthorized: false }
});

// --- PENTRU MEMBRI ---

// 1. Creare postare nouă (intră direct în starea 'in_asteptare')
exports.creeazaPostare = async (req, res) => {
    const { membruId, titlu, continut } = req.body;

    try {
        await sequelize.query(
            `INSERT INTO postare (membruId, titlu, continut, status) 
             VALUES (?, ?, ?, 'in_asteptare')`,
            { replacements: [membruId, titlu, continut] }
        );
        
        res.status(201).json({ mesaj: 'Postarea ta a fost trimisă spre moderare. Va apărea după aprobare!' });
    } catch (error) {
        console.error("Eroare creare postare:", error);
        res.status(500).json({ eroare: 'Eroare la crearea postării.' });
    }
};

// 2. Afișare toate postările PUBLICATE (pentru Feed-ul comunității)
exports.getPostariPublicate = async (req, res) => {
    const { membruId } = req.query;
    try {
        const [postari] = await sequelize.query(`
            SELECT p.id, p.titlu, p.continut, p.dataPostare, p.membruId, m.nume AS autor, 
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
        `, { replacements: [membruId || 0] });

        res.json(postari);
    } catch (error) {
        res.status(500).json({ eroare: 'Eroare la încărcarea postărilor.' });
    }
};

// 3. Adăugare Reply la o postare existentă
exports.adaugaReply = async (req, res) => {
    const { postareId } = req.params;
    const { membruId, continut } = req.body;

    try {
        await sequelize.query(
            `INSERT INTO raspunspostare (postareId, membruId, continut) 
             VALUES (?, ?, ?)`,
            { replacements: [postareId, membruId, continut] }
        );
        res.status(201).json({ mesaj: 'Răspunsul a fost adăugat!' });
    } catch (error) {
        res.status(500).json({ eroare: 'Eroare la adăugarea răspunsului.' });
    }
};

// 4. Vezi o postare și TOATE reply-urile ei
exports.getPostareCuReplies = async (req, res) => {
    const { id } = req.params;

    try {
        // Detalii postare
        const [postareData] = await sequelize.query(
            `SELECT p.*, m.nume AS autor 
             FROM postare p JOIN membru m ON p.membruId = m.id 
             WHERE p.id = ? AND p.status = 'publicata'`,
            { replacements: [id] }
        );

        if (postareData.length === 0) return res.status(404).json({ eroare: 'Postarea nu există.' });

        // Răspunsurile postării
        const [replies] = await sequelize.query(
            `SELECT r.*, m.nume AS autor 
             FROM raspunspostare r JOIN membru m ON r.membruId = m.id 
             WHERE r.postareId = ? ORDER BY r.dataRaspuns ASC`,
            { replacements: [id] }
        );

        res.json({ postare: postareData[0], replies: replies });
    } catch (error) {
        res.status(500).json({ eroare: 'Eroare la încărcarea detaliilor.' });
    }
};

// --- PENTRU ADMIN ---

// 5. Listare postări în așteptare
exports.getPostariInAsteptare = async (req, res) => {
    try {
        const [postari] = await sequelize.query(`
            SELECT p.id, p.titlu, p.continut, p.dataPostare, m.nume AS autor
            FROM postare p
            JOIN membru m ON p.membruId = m.id
            WHERE p.status = 'in_asteptare'
            ORDER BY p.dataPostare ASC
        `);
        res.json(postari);
    } catch (error) {
        res.status(500).json({ eroare: 'Eroare la încărcarea postărilor.' });
    }
};

// 7. Număr postări în așteptare (pentru badge admin în Navbar)
exports.numarInAsteptare = async (req, res) => {
    try {
        const [result] = await sequelize.query(
            `SELECT COUNT(*) AS numar FROM postare WHERE status = 'in_asteptare'`
        );
        res.json({ numar: result[0].numar });
    } catch (error) {
        res.status(500).json({ eroare: 'Eroare.' });
    }
};

// 8. Toggle like pe postare
exports.toggleLike = async (req, res) => {
    const { postareId } = req.params;
    const { membruId } = req.body;
    try {
        const [existing] = await sequelize.query(
            'SELECT id FROM likepostare WHERE postareId = ? AND membruId = ?',
            { replacements: [postareId, membruId] }
        );
        if (existing.length > 0) {
            await sequelize.query('DELETE FROM likepostare WHERE postareId = ? AND membruId = ?', { replacements: [postareId, membruId] });
        } else {
            await sequelize.query('INSERT INTO likepostare (postareId, membruId) VALUES (?, ?)', { replacements: [postareId, membruId] });
        }
        const [count] = await sequelize.query('SELECT COUNT(*) AS total FROM likepostare WHERE postareId = ?', { replacements: [postareId] });
        res.json({ likeuri: count[0].total, likedDeMine: existing.length === 0 });
    } catch (error) {
        res.status(500).json({ eroare: 'Eroare la like.' });
    }
};

// 6. Aprobare sau Respingere postare (Moderare) + email notificare
exports.modereazaPostare = async (req, res) => {
    const { id } = req.params;
    const { actiune } = req.body;

    if (!['publicata', 'respinsa'].includes(actiune)) {
        return res.status(400).json({ eroare: 'Acțiune invalidă.' });
    }

    try {
        await sequelize.query(
            `UPDATE postare SET status = ? WHERE id = ?`,
            { replacements: [actiune, id] }
        );

        // Trimite email de notificare autorului
        if (actiune === 'publicata') {
            const [rows] = await sequelize.query(
                `SELECT p.titlu, m.prenume, u.email 
                 FROM postare p 
                 JOIN membru m ON p.membruId = m.id 
                 JOIN utilizator u ON m.utilizatorId = u.id 
                 WHERE p.id = ?`,
                { replacements: [id] }
            );
            if (rows.length > 0) {
                const { titlu, prenume, email } = rows[0];
                transporter.sendMail({
                    from: `"GlowGuide 🌸" <${process.env.EMAIL_USER}>`,
                    to: email,
                    subject: '✅ Postarea ta a fost aprobată!',
                    html: `
                        <div style="font-family: Arial, sans-serif; max-width: 500px; margin: 0 auto; padding: 30px; background: #fffafb; border-radius: 15px;">
                            <h2 style="color: #b06090; text-align: center;">🌸 GlowGuide</h2>
                            <p>Bună, <strong>${prenume}</strong>!</p>
                            <p>Postarea ta <strong>"${titlu}"</strong> a fost aprobată și este acum vizibilă în comunitate! 🎉</p>
                            <div style="text-align: center; margin: 24px 0;">
                                <a href="https://licenta-theta.vercel.app/forum" style="background: #b06090; color: white; padding: 12px 28px; border-radius: 10px; text-decoration: none; font-weight: bold;">
                                    Vezi postarea →
                                </a>
                            </div>
                            <p style="color: #888; font-size: 13px;">Echipa GlowGuide 💕</p>
                        </div>
                    `
                }).catch(e => console.error('Email notificare:', e.message));
            }
        }

        res.json({ mesaj: `Postarea a fost ${actiune} cu succes!` });
    } catch (error) {
        res.status(500).json({ eroare: 'Eroare la moderare.' });
    }
};
