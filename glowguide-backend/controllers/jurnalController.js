const sequelize = require('../db');
const { cloudinary } = require('../uploadMiddleware');
const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Funcția 1: Adaugă notă (cu poză opțională)
exports.adaugaIntrare = async (req, res) => {
    const { membruId, rating, observatii } = req.body;
    const azi = new Date().toISOString().split('T')[0];
    const pozaUrl = req.file ? req.file.path : null;

    try {
        await sequelize.query(
            'INSERT INTO jurnalprogres (membruId, rating, observatii, dataIntrare, poza) VALUES (?, ?, ?, ?, ?)',
            { replacements: [membruId, rating, observatii, azi, pozaUrl] }
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
            `SELECT dataIntrare, rating FROM jurnalprogres WHERE membruId = ?`,
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
            `SELECT * FROM jurnalprogres WHERE membruId = ? ORDER BY id DESC`,
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
        // Ștergem poza din Cloudinary dacă există
        const [[intrare]] = await sequelize.query(
            'SELECT poza FROM jurnalprogres WHERE id = ?',
            { replacements: [notaId] }
        );
        // Ștergem mai întâi din DB — dacă eșuează, poza rămâne intactă în cloud
        await sequelize.query(
            'DELETE FROM jurnalprogres WHERE id = ?',
            { replacements: [notaId] }
        );
        // Abia după confirmarea ștergerii din DB, ștergem poza din Cloudinary
        if (intrare && intrare.poza) {
            const parts = intrare.poza.split('/');
            const fileName = parts[parts.length - 1].split('.')[0];
            const publicId = `glowguide-jurnal/${fileName}`;
            await cloudinary.uploader.destroy(publicId).catch(() => {});
        }
        res.json({ mesaj: 'Notă ștearsă cu succes!' });
    } catch (error) {
        res.status(500).json({ eroare: 'Nu s-a putut șterge.' });
    }
};

exports.editeazaIntrare = async (req, res) => {
    const { notaId } = req.params;
    const { rating, observatii } = req.body;
    const pozaNoua = req.file ? req.file.path : null;
    try {
        if (pozaNoua) {
            // Ștergem poza veche din Cloudinary
            const [[intrare]] = await sequelize.query(
                'SELECT poza FROM jurnalprogres WHERE id = ?',
                { replacements: [notaId] }
            );
            if (intrare && intrare.poza) {
                const parts = intrare.poza.split('/');
                const fileName = parts[parts.length - 1].split('.')[0];
                const publicId = `glowguide-jurnal/${fileName}`;
                await cloudinary.uploader.destroy(publicId).catch(() => {});
            }
            await sequelize.query(
                'UPDATE jurnalprogres SET rating = ?, observatii = ?, poza = ? WHERE id = ?',
                { replacements: [rating, observatii, pozaNoua, notaId] }
            );
        } else {
            await sequelize.query(
                'UPDATE jurnalprogres SET rating = ?, observatii = ? WHERE id = ?',
                { replacements: [rating, observatii, notaId] }
            );
        }
        res.json({ mesaj: 'Notă actualizată!' });
    } catch (error) {
        res.status(500).json({ eroare: 'Nu s-a putut edita.' });
    }
};

exports.comparaEvolutie = async (req, res) => {
    const { url1, url2 } = req.body;
    if (!url1 || !url2) {
        return res.status(400).json({ eroare: 'Sunt necesare exact 2 imagini.' });
    }
    try {
        const response = await openai.chat.completions.create({
            model: 'gpt-4o',
            messages: [{
                role: 'user',
                content: [
                    { type: 'text', text: 'Ești un dermatolog virtual. Analizează starea tenului din aceste două imagini. Prima imagine este mai veche, a doua este mai recentă. Descrie evoluția observată: ce s-a îmbunătățit, ce a rămas la fel sau s-a înrăutățit. Răspunde în română, în maximum 150 de cuvinte, într-un mod prietenos.' },
                    { type: 'image_url', image_url: { url: url1 } },
                    { type: 'image_url', image_url: { url: url2 } }
                ]
            }],
            max_tokens: 400
        });
        res.json({ analiza: response.choices[0].message.content });
    } catch (error) {
        console.error('Eroare OpenAI Vision:', error);
        res.status(500).json({ eroare: 'Eroare la analiza AI. Încearcă din nou.' });
    }
};

exports.exportCSV = async (req, res) => {
    const { id } = req.params;
    try {
        const [intrari] = await sequelize.query(
            `SELECT dataIntrare, rating, observatii FROM jurnalprogres WHERE membruId = ? ORDER BY dataIntrare ASC`,
            { replacements: [id] }
        );
        const header = 'Data,Rating,Observatii\n';
        const randuri = intrari.map(r => {
            const data = r.dataIntrare ? String(r.dataIntrare).substring(0, 10) : '';
            const obs = (r.observatii || '').replace(/"/g, '""');
            return `${data},${r.rating},"${obs}"`;
        }).join('\n');
        res.setHeader('Content-Type', 'text/csv; charset=utf-8');
        res.setHeader('Content-Disposition', 'attachment; filename="jurnal_glowguide.csv"');
        res.send('\uFEFF' + header + randuri); // BOM pentru Excel
    } catch (error) {
        res.status(500).json({ eroare: 'Eroare la export.' });
    }
};


