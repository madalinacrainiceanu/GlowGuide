const sequelize = require('../db');

exports.genereazaRutina = async (req, res) => {
    // Luăm id-ul membrului trimis de frontend
    const { membruId, regenereaza, produseActuale } = req.body; 

    try {
        // 1. Obținem profilul dermatologic al membrului din baza de date
        const [profilResult] = await sequelize.query(
            'SELECT * FROM profildermatologic WHERE membruId = ?',
            { replacements: [membruId] }
        );

        if (profilResult.length === 0) {
            return res.status(404).json({ eroare: 'Profilul dermatologic nu a fost găsit. Te rugăm să îl completezi!' });
        }

        const profil = profilResult[0];
        const tipTenUser = profil.tipTen;
        
        // Parsăm alergiile (dacă există) dintr-un string JSON într-un array real
        let alergeniArray = [];
        if (profil.alergii) {
             try {
                alergeniArray = JSON.parse(profil.alergii);
             } catch(e) {
                console.log("Alergiile nu sunt un JSON valid", e);
             }
        }

        // 2. Arhivăm o rutină veche, dacă membrul avea deja una activă
        await sequelize.query(
            `UPDATE rutina SET status = 'arhivata' WHERE membruId = ? AND status = 'activa'`,
            { replacements: [membruId] }
        );

        // Categoriile standard pe care trebuie să le conțină rutina
        const categorii = ['curatare', 'toner', 'ser', 'hidratant', 'spf'];
        const produseRecomandate = [];

        // 3. Sistemul Expert: Cautăm produsul ideal pentru fiecare categorie
        for (let i = 0; i < categorii.length; i++) {
            const categorie = categorii[i];
            
            let excludereAlergeniSql = '';
            
            let replacements = [categorie, `%${tipTenUser}%`];

            if (alergeniArray.length > 0) {
                const placeholders = alergeniArray.map(() => '?').join(',');
                excludereAlergeniSql = `
                    AND NOT EXISTS (
                        SELECT 1 FROM produsingredient pi
                        JOIN ingredient i ON pi.ingredientId = i.id
                        WHERE pi.produsId = p.id AND i.nume IN (${placeholders})
                    )
                `;
                replacements.push(...alergeniArray);
            }

            let produsAles = null;

            if (regenereaza && produseActuale) {
                // La actualizare: caută un produs diferit față de cel curent
                const produsActual = produseActuale.find(p => p.categorie === categorie);
                const excludeId = produsActual ? produsActual.produsId : null;

                if (excludeId) {
                    const queryUrmatorul = `
                        SELECT DISTINCT p.id, p.nume, p.brand, p.categorie, p.rating
                        FROM produs p
                        WHERE p.categorie = ?
                          AND p.tipTenRecomandat LIKE ?
                          AND p.id != ?
                          ${excludereAlergeniSql}
                        ORDER BY p.rating DESC
                        LIMIT 1
                    `;
                    const replacementsUrmatorul = [categorie, `%${tipTenUser}%`, excludeId, ...alergeniArray];
                    const [urmatorul] = await sequelize.query(queryUrmatorul, { replacements: replacementsUrmatorul });

                    if (urmatorul.length > 0) {
                        produsAles = urmatorul[0];
                    } else {
                        // Nu există alt produs → păstrăm același
                        const queryAcelasiSql = `
                            SELECT DISTINCT p.id, p.nume, p.brand, p.categorie, p.rating
                            FROM produs p WHERE p.id = ?
                        `;
                        const [acelasi] = await sequelize.query(queryAcelasiSql, { replacements: [excludeId] });
                        if (acelasi.length > 0) produsAles = acelasi[0];
                    }
                }
            } else {
                
                const queryText = `
                    SELECT DISTINCT p.id, p.nume, p.brand, p.categorie, p.rating
                    FROM produs p
                    WHERE p.categorie = ?
                      AND p.tipTenRecomandat LIKE ?
                      ${excludereAlergeniSql}
                    ORDER BY p.rating DESC
                    LIMIT 1
                `;
                const [produsGasit] = await sequelize.query(queryText, { replacements });
                if (produsGasit.length > 0) produsAles = produsGasit[0];
            }

            
            if (produsAles) {
                produseRecomandate.push(produsAles);
            }
        }

        // 4. Creăm instanța noii rutine în baza de date
        const [insertRutina] = await sequelize.query(
            `INSERT INTO rutina (membruId, tip, status) VALUES (?, 'completa', 'activa')`,
            { replacements: [membruId] }
        );
        const rutinaId = insertRutina; // preluăm ID-ul auto_increment generat

        // 5. Asociem fiecare produs găsit cu rutina nou creată, salvând ordinea de aplicare
        for (let i = 0; i < produseRecomandate.length; i++) {
            const produs = produseRecomandate[i];
            await sequelize.query(
                `INSERT INTO rutinaprodus (rutinaId, produsId, ordineAplicare) VALUES (?, ?, ?)`,
                { replacements: [rutinaId, produs.id, i + 1] }
            );
        }

        // --- PREGĂTIRE RĂSPUNS CĂTRE FRONTEND ---
        
        // Transformăm coloana de probleme din DB înapoi în Array ca să o afișăm frumos
        let problemeAfisare = [];
        try {
            if (profil.probleme) {
                problemeAfisare = JSON.parse(profil.probleme);
            }
        } catch(e) {
            console.log("Eroare la parsarea problemelor din DB");
        }

        // Returnăm tot pachetul
        res.json({
            mesaj: 'Rutina a fost generată cu succes!',
            rutinaId: rutinaId,
            profilUtilizator: {
                tipTen: profil.tipTen,
                probleme: problemeAfisare
            },
            produse: produseRecomandate
        });

    } catch (error) {
        console.error("Eroare generare rutina:", error);
        res.status(500).json({ eroare: 'Eroare internă la generarea rutinei.' });
    }
};

// ============================================
// FUNCȚIA DE SALVARE A CHESTIONARULUI DERMATOLOGIC
// ============================================
exports.salveazaProfil = async (req, res) => {
    const { membruId, tipTen, alergii, probleme } = req.body;
    try {
        // Folosim ON DUPLICATE KEY UPDATE. Astfel, dacă utilizatorul reface chestionarul, i se updatează profilul vechi
        await sequelize.query(
            `INSERT INTO profildermatologic (membruId, tipTen, alergii, probleme) 
             VALUES (?, ?, ?, ?) 
             ON DUPLICATE KEY UPDATE tipTen = VALUES(tipTen), alergii = VALUES(alergii), probleme = VALUES(probleme)`,
            { replacements: [membruId, tipTen, alergii, probleme || '[]'] }
        );
        res.json({ mesaj: 'Profil salvat cu succes!' });
    } catch (error) {
        console.error("Eroare salvare profil DB:", error);
        res.status(500).json({ eroare: 'Eroare la salvare.' });
    }
};
