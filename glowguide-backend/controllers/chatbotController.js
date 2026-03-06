const sequelize = require('../db');
const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

exports.intreaba = async (req, res) => {
    const { intrebare } = req.body;

    if (!intrebare || intrebare.trim().length < 2) {
        return res.status(400).json({ eroare: 'Întrebarea este prea scurtă.' });
    }

    try {
        // STRATEGIA 1: Căutare exactă în cuvinteCheie (cea mai precisă)
        const cuvinte = intrebare.toLowerCase()
            .replace(/[?!.,]/g, '')
            .split(' ')
            .filter(c => c.length > 3 && !['este', 'sunt', 'care', 'cum', 'face', 'faci', 'poti', 'trebuie', 'pentru', 'despre', 'folosesc'].includes(c));

        if (cuvinte.length > 0) {
            // Construim scor: câte cuvinte cheie se potrivesc
            const conditii = cuvinte.map(() => 'cuvinteCheie LIKE ?').join(' OR ');
            const valori = cuvinte.map(c => `%${c}%`);

            const [rezultateCK] = await sequelize.query(
                `SELECT id, raspuns, categorie, numarAfisari,
                    (${cuvinte.map(() => '(CASE WHEN cuvinteCheie LIKE ? THEN 1 ELSE 0 END)').join('+')}) AS scor
                 FROM FAQ
                 WHERE ${conditii}
                 ORDER BY scor DESC, numarAfisari DESC
                 LIMIT 1`,
                { replacements: [...valori, ...valori] }
            );

            // Scor minim = cel puțin 2 cuvinte cheie potrivite SAU 1 cuvânt specific (>5 litere)
            const scorMinim = cuvinte.some(c => c.length > 5) ? 1 : 2;

            if (rezultateCK.length > 0 && rezultateCK[0].scor >= scorMinim) {
                await sequelize.query(
                    'UPDATE FAQ SET numarAfisari = numarAfisari + 1 WHERE id = ?',
                    { replacements: [rezultateCK[0].id] }
                );
                return res.json({
                    raspuns: rezultateCK[0].raspuns,
                    categorie: rezultateCK[0].categorie,
                    sursa: 'faq'
                });
            }
        }

        // STRATEGIA 2: Fallback OpenAI (dacă BD nu a găsit ceva relevant)
        if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'sk-aici_pui_cheia_ta') {
            try {
                const completion = await openai.chat.completions.create({
                    model: 'gpt-3.5-turbo',
                    messages: [
                        {
                            role: 'system',
                            content: 'Ești GlowBot, un asistent specializat în skincare și îngrijirea pielii. Răspunde DOAR la întrebări despre ingrediente cosmetice, rutine de îngrijire, tipuri de ten și produse cosmetice. Dacă întrebarea nu e despre skincare, spune politicos că nu poți ajuta cu acel subiect. Răspunde în română, concis și clar, cu bullet points când e cazul.'
                        },
                        { role: 'user', content: intrebare }
                    ],
                    max_tokens: 400,
                    temperature: 0.7
                });

                return res.json({
                    raspuns: completion.choices[0].message.content,
                    categorie: 'general',
                    sursa: 'openai'
                });
            } catch (openaiError) {
                console.error('OpenAI error:', openaiError.message);
                // Dacă OpenAI eșuează, continuăm cu fallback-ul de mai jos
            }
        }

        // Fallback final dacă nu există API key
        res.json({
            raspuns: 'Hmm, nu am găsit un răspuns specific pentru asta în baza mea de date. Încearcă să reformulezi întrebarea sau întreabă despre un ingredient specific (ex: "niacinamide", "retinol", "acid hialuronic").',
            categorie: 'general',
            sursa: 'fallback'
        });

    } catch (error) {
        console.error('Eroare chatbot:', error);
        res.status(500).json({ eroare: 'Eroare la căutarea răspunsului.' });
    }
};

