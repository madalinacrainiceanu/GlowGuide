const sequelize = require('../db');

// Funcția 1: Adaugă notă
exports.adaugaIntrare = async (req, res) => {
    const { membruId, rating, observatii } = req.body;
    const azi = new Date().toISOString().split('T')[0]; 

    try {
        await sequelize.query(
            'INSERT INTO JurnalProgres (membruId, rating, observatii, dataIntrare) VALUES (?, ?, ?, ?)',
            { replacements: [membruId, rating, observatii, azi] }
        );
        res.json({ mesaj: 'Salvata cu succes!' });
    } catch (error) {
        res.status(500).json({ eroare: error.message });
    }
};

// Funcția 2: Evoluție Grafic (REPARATĂ)
exports.getEvolutie = async (req, res) => {
    const { membruId: id } = req.params;
    try {
        // Aducem direct toate notele. Fara funcții de data SQL care să strice formatul.
        const [toateNotele] = await sequelize.query(
            `SELECT dataIntrare, rating FROM JurnalProgres WHERE membruId = ?`,
            { replacements: [id] }
        );

        if (toateNotele.length === 0) {
            return res.json([]);
        }

        // Grupăm notele pe LUNI (cum îi place lui Chart.js) folosind JavaScript pur
        const evolutieLuni = {};
        
        toateNotele.forEach(nota => {
            if (!nota.dataIntrare) return;
            
            // Extragem primele 7 caractere: "YYYY-MM" (ex: "2026-02")
            let luna = "";
            if (typeof nota.dataIntrare === 'string') {
                luna = nota.dataIntrare.substring(0, 7);
            } else if (nota.dataIntrare instanceof Date) {
                luna = nota.dataIntrare.toISOString().substring(0, 7);
            }

            if (!evolutieLuni[luna]) {
                evolutieLuni[luna] = { suma: 0, count: 0 };
            }
            evolutieLuni[luna].suma += parseInt(nota.rating, 10);
            evolutieLuni[luna].count += 1;
        });

        // Convertim obiectul într-un array pentru Chart.js
        let dateGrafic = Object.keys(evolutieLuni).map(lunaStr => {
            return {
                luna: lunaStr, 
                rating_mediu: (evolutieLuni[lunaStr].suma / evolutieLuni[lunaStr].count).toFixed(2)
            };
        });

        // Sortăm frumos crescător (din trecut în prezent)
        dateGrafic.sort((a, b) => a.luna.localeCompare(b.luna));

        // SUPER-TRUC: Dacă există O SINGURĂ lună cu note, 
        // Chart.js refuză să facă o linie. Îi dăm un punct fals din luna trecută.
        if (dateGrafic.length === 1) {
            const [an, luna] = dateGrafic[0].luna.split('-');
            let anPrec = parseInt(an);
            let lunaPrec = parseInt(luna) - 1;
            
            if (lunaPrec === 0) { lunaPrec = 12; anPrec -= 1; }
            
            let formatLuna = lunaPrec < 10 ? `0${lunaPrec}` : `${lunaPrec}`;
            let lunaTrecuta = `${anPrec}-${formatLuna}`;

            // Adăugăm punctul anterior la fel (o linie orizontală din trecut până azi)
            dateGrafic.unshift({
                luna: lunaTrecuta,
                rating_mediu: dateGrafic[0].rating_mediu
            });
        }

        res.json(dateGrafic);

    } catch (error) {
        console.error("Eroare Evolutie:", error);
        res.status(500).json({ eroare: error.message });
    }
};



// Funcția 3: Istoric (Aceeași care a mers la test)
exports.getIstoricJurnal = async (req, res) => {
    const { id } = req.params;
    try {
        const [istoric] = await sequelize.query(
            `SELECT * FROM JurnalProgres WHERE membruId = ? ORDER BY id DESC`,
            { replacements: [id] }
        );
        res.json(istoric);
    } catch (error) {
        res.status(500).json({ eroare: error.message });
    }
};

// --- FUNCȚII NOI PENTRU EDITARE ȘI ȘTERGERE ---

exports.stergeIntrare = async (req, res) => {
    const { notaId } = req.params;
    try {
        await sequelize.query(
            'DELETE FROM JurnalProgres WHERE id = ?',
            { replacements: [notaId] }
        );
        res.json({ mesaj: 'Notă ștearsă cu succes!' });
    } catch (error) {
        res.status(500).json({ eroare: 'Nu s-a putut șterge.' });
    }
};

exports.editeazaIntrare = async (req, res) => {
    const { notaId } = req.params;
    const { rating, observatii } = req.body;
    try {
        await sequelize.query(
            'UPDATE JurnalProgres SET rating = ?, observatii = ? WHERE id = ?',
            { replacements: [rating, observatii, notaId] }
        );
        res.json({ mesaj: 'Notă actualizată!' });
    } catch (error) {
        res.status(500).json({ eroare: 'Nu s-a putut edita.' });
    }
};

