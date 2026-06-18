const sequelize = require('../db');
const OpenAI = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Normalizează diacriticele pentru comparații mai robuste
const normalizeaza = (str) => str
    .toLowerCase()
    .replace(/[?!.,]/g, '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '') // elimină diacritice
    .replace(/ș|ş/g, 's').replace(/ț|ţ/g, 't')
    .replace(/ă/g, 'a').replace(/â|î/g, 'i');

const STOP_WORDS = new Set([
    'este', 'sunt', 'care', 'cum', 'face', 'faci', 'poti', 'trebuie',
    'pentru', 'despre', 'folosesc', 'daca', 'dupa', 'cand', 'unde',
    'ce', 'cea', 'cel', 'cei', 'cele', 'mai', 'sau', 'si', 'din', 'pe'
]);

const TERMENI_SCURTI_IMPORTANTI = new Set(['spf', 'aha', 'bha', 'ha', 'uv', 'ph', 'ten']);

const extrageCuvinteRelevante = (text) => text
    .split(/\s+/)
    .filter(Boolean)
    .filter(c => c.length > 3 || TERMENI_SCURTI_IMPORTANTI.has(c))
    .filter(c => !STOP_WORDS.has(c));

const INTENT_FRECVENTA_REGEX = /(cat de des|de cate ori|frecvent|zilnic|reaplic)/;

exports.intreaba = async (req, res) => {
    const { intrebare } = req.body;

    if (!intrebare || intrebare.trim().length < 2) {
        return res.status(400).json({ eroare: 'Întrebarea este prea scurtă.' });
    }

    try {
        const intrebareNorm = normalizeaza(intrebare);
            const cuvinte = extrageCuvinteRelevante(intrebareNorm);
            const intentFrecventa = INTENT_FRECVENTA_REGEX.test(intrebareNorm);

        // STRATEGIA 1: Căutare după cuvinteCheie cu scor
        if (cuvinte.length > 0) {
            const conditii = cuvinte.map(() => 'LOWER(cuvinteCheie) LIKE ?').join(' OR ');
            const valori = cuvinte.map(c => `%${c}%`);

            const [rezultateCK] = await sequelize.query(
                `SELECT id, raspuns, categorie, numarAfisari,
                        (${cuvinte.map(() => '(CASE WHEN LOWER(cuvinteCheie) LIKE ? THEN 1 ELSE 0 END)').join('+')}) AS scor,
                        CASE 
                            WHEN LOWER(CONCAT(COALESCE(cuvinteCheie, ''), ' ', COALESCE(intrebare, ''))) REGEXP 'cat de des|de cate ori|frecvent|zilnic|reaplic'
                            THEN 1 ELSE 0
                        END AS intentFrecventaPotrivita
                 FROM faq
                 WHERE ${conditii}
                 ORDER BY scor DESC, numarAfisari DESC
                 LIMIT 1`,
                { replacements: [...valori, ...valori] }
            );

                const scorMinim = cuvinte.length >= 4 ? 3 : (cuvinte.length >= 2 ? 2 : 1);
                const acoperireMinima = cuvinte.length >= 4 ? 0.6 : (cuvinte.length >= 2 ? 0.5 : 1);

                if (
                    rezultateCK.length > 0 &&
                    rezultateCK[0].scor >= scorMinim &&
                    (rezultateCK[0].scor / cuvinte.length) >= acoperireMinima &&
                    (!intentFrecventa || rezultateCK[0].intentFrecventaPotrivita === 1)
                ) {
                await sequelize.query(
                    'UPDATE faq SET numarAfisari = numarAfisari + 1 WHERE id = ?',
                    { replacements: [rezultateCK[0].id] }
                );
                return res.json({
                    raspuns: rezultateCK[0].raspuns,
                    categorie: rezultateCK[0].categorie,
                    sursa: 'faq'
                });
            }
        }

        // STRATEGIA 2: Căutare LIKE directă pe câmpul intrebare (fallback FAQ)
        if (cuvinte.length > 0) {
            const conditiiIntrebare = cuvinte.map(() => 'LOWER(intrebare) LIKE ?').join(' OR ');
            const valoriIntrebare = cuvinte.map(c => `%${c}%`);

            const [rezultateInt] = await sequelize.query(
                `SELECT id, raspuns, categorie,
                        (${cuvinte.map(() => '(CASE WHEN LOWER(intrebare) LIKE ? THEN 1 ELSE 0 END)').join('+')}) AS scor,
                        CASE 
                            WHEN LOWER(CONCAT(COALESCE(cuvinteCheie, ''), ' ', COALESCE(intrebare, ''))) REGEXP 'cat de des|de cate ori|frecvent|zilnic|reaplic'
                            THEN 1 ELSE 0
                        END AS intentFrecventaPotrivita
                 FROM faq
                 WHERE ${conditiiIntrebare}
                 ORDER BY scor DESC, numarAfisari DESC
                 LIMIT 1`,
                { replacements: [...valoriIntrebare, ...valoriIntrebare] }
            );

                const scorMinim2 = cuvinte.length >= 4 ? 3 : (cuvinte.length >= 2 ? 2 : 1);
                const acoperireMinima2 = cuvinte.length >= 4 ? 0.6 : (cuvinte.length >= 2 ? 0.5 : 1);

                if (
                    rezultateInt.length > 0 &&
                    rezultateInt[0].scor >= scorMinim2 &&
                    (rezultateInt[0].scor / cuvinte.length) >= acoperireMinima2 &&
                    (!intentFrecventa || rezultateInt[0].intentFrecventaPotrivita === 1)
                ) {
                await sequelize.query(
                    'UPDATE faq SET numarAfisari = numarAfisari + 1 WHERE id = ?',
                    { replacements: [rezultateInt[0].id] }
                );
                return res.json({
                    raspuns: rezultateInt[0].raspuns,
                    categorie: rezultateInt[0].categorie,
                    sursa: 'faq'
                });
            }
        }

        // STRATEGIA 3: Fallback OpenAI
        if (process.env.OPENAI_API_KEY && process.env.OPENAI_API_KEY !== 'sk-aici_pui_cheia_ta' && !process.env.OPENAI_API_KEY.includes('pune_')) {
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
            }
        }

        // Fallback final
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

