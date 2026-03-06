const sequelize = require('../db');

// --- PENTRU MEMBRI ---

// 1. Creare postare nouă (intră direct în starea 'in_asteptare')
exports.creeazaPostare = async (req, res) => {
    const { membruId, titlu, continut } = req.body;

    try {
        await sequelize.query(
            `INSERT INTO Postare (membruId, titlu, continut, status) 
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
    try {
        // Query-ul de aici aduce postarea + numărul de replies (folosind LEFT JOIN)
        const [postari] = await sequelize.query(`
            SELECT p.id, p.titlu, p.continut, p.dataPostare, m.nume AS autor, 
                   COUNT(r.id) AS numar_raspunsuri
            FROM Postare p
            JOIN Membru m ON p.membruId = m.id
            LEFT JOIN RaspunsPostare r ON p.id = r.postareId
            WHERE p.status = 'publicata'
            GROUP BY p.id
            ORDER BY p.dataPostare DESC
        `);

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
            `INSERT INTO RaspunsPostare (postareId, membruId, continut) 
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
             FROM Postare p JOIN Membru m ON p.membruId = m.id 
             WHERE p.id = ? AND p.status = 'publicata'`,
            { replacements: [id] }
        );

        if (postareData.length === 0) return res.status(404).json({ eroare: 'Postarea nu există.' });

        // Răspunsurile postării
        const [replies] = await sequelize.query(
            `SELECT r.*, m.nume AS autor 
             FROM RaspunsPostare r JOIN Membru m ON r.membruId = m.id 
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
            FROM Postare p
            JOIN Membru m ON p.membruId = m.id
            WHERE p.status = 'in_asteptare'
            ORDER BY p.dataPostare ASC
        `);
        res.json(postari);
    } catch (error) {
        res.status(500).json({ eroare: 'Eroare la încărcarea postărilor.' });
    }
};

// 6. Aprobare sau Respingere postare (Moderare)
exports.modereazaPostare= async (req, res) => {
    const { id } = req.params;
    const { actiune } = req.body; // Trebuie să fie 'publicata' sau 'respinsa'

    if (!['publicata', 'respinsa'].includes(actiune)) {
        return res.status(400).json({ eroare: 'Acțiune invalidă.' });
    }

    try {
        await sequelize.query(
            `UPDATE Postare SET status = ? WHERE id = ?`,
            { replacements: [actiune, id] }
        );
        res.json({ mesaj: `Postarea a fost ${actiune} cu succes!` });
    } catch (error) {
        res.status(500).json({ eroare: 'Eroare la moderare.' });
    }
};
