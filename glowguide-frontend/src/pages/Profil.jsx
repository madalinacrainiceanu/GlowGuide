import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import API_URL from '../api';

const INTREBARI = [
  {
    id: 'q1',
    sectiune: '💧 Hidratare & Sebum',
    intrebare: 'La o oră după spălare (fără să aplici nimic), cum simți pielea?',
    optiuni: [
      { val: 'confortabil', label: 'Normală, confortabilă', emoji: '😌' },
      { val: 'strange', label: 'Mă strânge, simt nevoia de cremă', emoji: '😣' },
      { val: 'luceste_t', label: 'Lucește doar pe frunte/nas (Zona T)', emoji: '✨' },
      { val: 'luceste', label: 'Lucește pe toată fața', emoji: '💦' },
    ],
  },
  {
    id: 'q2',
    sectiune: '💧 Hidratare & Sebum',
    intrebare: 'Cum arată porii tăi?',
    optiuni: [
      { val: 'invizibili', label: 'Sunt mici, abia îi observ', emoji: '🔍' },
      { val: 'mari_t', label: 'Dilatați doar pe nas și pomeți', emoji: '👃' },
      { val: 'mari_tot', label: 'Dilatați și vizibili peste tot', emoji: '😤' },
    ],
  },
  {
    id: 'q3',
    sectiune: '💧 Hidratare & Sebum',
    intrebare: 'Ai zone cu piele uscată, aspră sau care se descuamează?',
    optiuni: [
      { val: 'nu', label: 'Nu, textura e uniformă', emoji: '✅' },
      { val: 'aspra', label: 'Da, în special pe obraji sau iarna', emoji: '🌵' },
    ],
  },
  {
    id: 'q4',
    sectiune: '🛡️ Barieră & Sensibilitate',
    intrebare: 'Pielea ta se înroșește ușor la frig, vânt sau soare?',
    optiuni: [
      { val: 'rar', label: 'Rar, nu prea reacționez', emoji: '🧊' },
      { val: 'des', label: 'Da, mă înroșesc foarte repede', emoji: '🔴' },
    ],
  },
  {
    id: 'q5',
    sectiune: '🛡️ Barieră & Sensibilitate',
    intrebare: 'Simți usturime sau mâncărime când aplici produse noi?',
    optiuni: [
      { val: 'rar', label: 'Nu, tolerez orice produs', emoji: '💪' },
      { val: 'des', label: 'Da, am des reacții neplăcute', emoji: '⚠️' },
    ],
  },
  {
    id: 'q6',
    sectiune: '🔬 Condiții Specifice',
    intrebare: 'Te confrunți cu acnee, puncte negre sau coșuri subcutanate?',
    optiuni: [
      { val: 'rar', label: 'Aproape niciodată', emoji: '😊' },
      { val: 'uneori', label: 'Uneori (1-2 coșuri ocazional)', emoji: '🤔' },
      { val: 'frecvent', label: 'Frecvent (mai multe coșuri regulat)', emoji: '😟' },
      { val: 'constant', label: 'Constant (acnee severă/chistică)', emoji: '😰' },
    ],
  },
  {
    id: 'q7',
    sectiune: '🔬 Condiții Specifice',
    intrebare: 'Ai pete maronii, urme lăsate de coșuri sau hiperpigmentare?',
    optiuni: [
      { val: 'nu', label: 'Nu, tenul e uniform', emoji: '✨' },
      { val: 'pete', label: 'Da, am pete care trec greu', emoji: '🟤' },
    ],
  },
  {
    id: 'q8',
    sectiune: '⏳ Anti-Aging',
    intrebare: 'Ești preocupat(ă) de prevenirea sau estomparea ridurilor?',
    optiuni: [
      { val: 'nu', label: 'Nu e o prioritate momentan', emoji: '🌱' },
      { val: 'riduri', label: 'Da, am început să observ linii fine', emoji: '🕐' },
    ],
  },
];

export default function Profil() {
  const navigate = useNavigate();
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  const [pas, setPas] = useState(0); // 0..7 = intrebari, 8 = alergii, 9 = rezultat
  const [raspunsuri, setRaspunsuri] = useState({});
  const [alergii, setAlergii] = useState('');
  const [loading, setLoading] = useState(false);
  const [rezultatFinal, setRezultatFinal] = useState(null);

  const TOTAL_PASI = INTREBARI.length + 1; // +1 pentru alergii

  const calculeazaDiagnostic = (r) => {
    let axe = { gras: 0, uscat: 0, sensibil: 0, acnee: 0, pigmentare: 0, aging: 0 };
    if (r.q1 === 'strange') axe.uscat += 3;
    if (r.q1 === 'luceste') axe.gras += 3;
    if (r.q1 === 'luceste_t') { axe.gras += 2; axe.uscat += 1; }
    if (r.q2 === 'invizibili') axe.uscat += 1;
    if (r.q2 === 'mari_t') axe.gras += 1;
    if (r.q2 === 'mari_tot') axe.gras += 2;
    if (r.q3 === 'aspra') axe.uscat += 2;
    if (r.q4 === 'des') axe.sensibil += 2;
    if (r.q5 === 'des') axe.sensibil += 3;
    if (r.q6 === 'frecvent' || r.q6 === 'constant') axe.acnee += 3;
    if (r.q6 === 'uneori') axe.acnee += 1;
    if (r.q7 === 'pete') axe.pigmentare += 2;
    if (r.q8 === 'riduri') axe.aging += 2;

    let tipBaza = 'normal';
    if (axe.gras >= 4) tipBaza = 'gras';
    if (axe.uscat >= 4) tipBaza = 'uscat';
    if (axe.gras >= 2 && axe.uscat >= 2) tipBaza = 'mixt';
    if (axe.sensibil >= 4) tipBaza = 'sensibil';

    let problemeArray = [];
    if (axe.acnee >= 3) problemeArray.push('tendință acneică');
    if (axe.pigmentare > 0) problemeArray.push('hiperpigmentare');
    if (axe.aging > 0) problemeArray.push('semne de îmbătrânire');

    return {
      tipDeBazaBackend: tipBaza,
      problemeBackend: problemeArray,
      diagnosticAfisat: `Ten ${tipBaza.toUpperCase()}${problemeArray.length > 0 ? `, cu ${problemeArray.join(' și ')}` : ''}.`,
    };
  };

  const selecteazaOptiune = (val) => {
    const intrebare = INTREBARI[pas];
    setRaspunsuri(prev => ({ ...prev, [intrebare.id]: val }));
    // Avansează automat după 300ms
    setTimeout(() => {
      if (pas < INTREBARI.length - 1) {
        setPas(p => p + 1);
      } else {
        setPas(INTREBARI.length); // pagina alergii
      }
    }, 300);
  };

  const finalizeaza = async () => {
    if (!user) return;
    setLoading(true);
    const diagnostic = calculeazaDiagnostic(raspunsuri);
    setRezultatFinal(diagnostic.diagnosticAfisat);
    const arrayAlergii = alergii.split(',').map(i => i.trim()).filter(i => i);
    try {
      await axios.post(`${API_URL}/api/rutina/salveaza-profil`, {
        membruId: user.id,
        tipTen: diagnostic.tipDeBazaBackend,
        probleme: JSON.stringify(diagnostic.problemeBackend),
        alergii: JSON.stringify(arrayAlergii),
      });
      setPas(INTREBARI.length + 1); // rezultat
      setTimeout(() => navigate('/rutina'), 4000);
    } catch {
      setLoading(false);
    }
  };

  const raspunsCurent = pas < INTREBARI.length ? raspunsuri[INTREBARI[pas]?.id] : null;
  const progres = Math.round((pas / TOTAL_PASI) * 100);

  // --- ECRAN REZULTAT ---
  if (pas === INTREBARI.length + 1 && rezultatFinal) {
    return (
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
        <Navbar />
        <div style={{ maxWidth: '560px', margin: '0 auto', padding: '60px 20px', textAlign: 'center' }}>
          <div style={{ fontSize: '48px', marginBottom: '20px' }}>🧬</div>
          <h2 style={{ color: '#2d3142', fontSize: '24px', marginBottom: '12px' }}>Analiză Finalizată!</h2>
          <div style={{
            backgroundColor: '#fce8f3',
            borderRadius: '16px', padding: '28px', marginBottom: '24px',
          }}>
            <p style={{ color: '#7a7a8c', fontSize: '14px', margin: '0 0 12px' }}>Profilul tău dermatologic:</p>
            <p style={{ fontSize: '22px', fontWeight: '800', color: '#8f4d74', margin: 0 }}>{rezultatFinal}</p>
          </div>
          <p style={{ color: '#7a7a8c', fontSize: '14px' }}>Generăm rutina personalizată... te rugăm să aștepți.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
      <Navbar />
      <div style={{ maxWidth: '600px', margin: '0 auto', padding: '40px 20px' }}>

        {/* HEADER */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <h2 style={{ color: '#2d3142', fontSize: '22px', fontWeight: '800', margin: '0 0 6px' }}>Analiza Profilului Tău</h2>
          <p style={{ color: '#7a7a8c', fontSize: '14px', margin: 0 }}>
            {pas < INTREBARI.length ? `Întrebarea ${pas + 1} din ${INTREBARI.length}` : 'Ultimul pas — alergii'}
          </p>
        </div>

        {/* PROGRESS BAR */}
        <div style={{ marginBottom: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
            <span style={{ fontSize: '12px', color: '#7a7a8c', fontWeight: '600' }}>Progres</span>
            <span style={{ fontSize: '12px', color: '#b06090', fontWeight: '700' }}>{progres}%</span>
          </div>
          <div style={{ height: '8px', backgroundColor: '#e8e3dc', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{
              height: '100%',
              width: `${progres}%`,
              backgroundColor: '#b06090',
              borderRadius: '10px',
              transition: 'width 0.4s ease',
            }} />
          </div>
          {/* Indicator pași */}
          <div style={{ display: 'flex', gap: '6px', marginTop: '12px', justifyContent: 'center' }}>
            {Array.from({ length: TOTAL_PASI }).map((_, i) => (
              <div key={i} style={{
                width: i < pas ? '24px' : '8px',
                height: '8px',
                borderRadius: '10px',
                backgroundColor: i < pas ? '#b06090' : i === pas ? '#6aab9e' : '#e8e3dc',
                transition: 'all 0.3s ease',
              }} />
            ))}
          </div>
        </div>

        {/* CARD ÎNTREBARE */}
        {pas < INTREBARI.length && (
          <div style={{
            backgroundColor: 'white', borderRadius: '24px',
            boxShadow: '0 8px 30px rgba(45,49,66,0.08)', padding: '36px',
          }}>
            <p style={{
              fontSize: '11px', fontWeight: '700', textTransform: 'uppercase',
              letterSpacing: '1px', color: '#b06090', marginBottom: '12px',
            }}>
              {INTREBARI[pas].sectiune}
            </p>
            <h3 style={{ color: '#2d3142', fontSize: '18px', fontWeight: '700', marginBottom: '28px', lineHeight: '1.4' }}>
              {INTREBARI[pas].intrebare}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {INTREBARI[pas].optiuni.map(opt => (
                <button
                  key={opt.val}
                  onClick={() => selecteazaOptiune(opt.val)}
                  style={{
                    display: 'flex', alignItems: 'center', gap: '14px',
                    padding: '16px 20px', borderRadius: '14px', cursor: 'pointer',
                    border: raspunsCurent === opt.val ? '2px solid #b06090' : '2px solid #e8e3dc',
                    backgroundColor: raspunsCurent === opt.val ? '#f7eef4' : 'white',
                    textAlign: 'left', transition: 'all 0.15s',
                    transform: raspunsCurent === opt.val ? 'scale(1.01)' : 'scale(1)',
                  }}
                  onMouseEnter={e => { if (raspunsCurent !== opt.val) e.currentTarget.style.borderColor = '#b06090'; }}
                  onMouseLeave={e => { if (raspunsCurent !== opt.val) e.currentTarget.style.borderColor = '#e8e3dc'; }}
                >
                  <span style={{ fontSize: '24px', flexShrink: 0 }}>{opt.emoji}</span>
                  <span style={{ fontSize: '15px', color: '#2d3142', fontWeight: raspunsCurent === opt.val ? '700' : '400' }}>
                    {opt.label}
                  </span>
                  {raspunsCurent === opt.val && (
                    <span style={{ marginLeft: 'auto', color: '#b06090', fontSize: '18px' }}>✓</span>
                  )}
                </button>
              ))}
            </div>

            {/* Navigare manuală */}
            {pas > 0 && (
              <button
                onClick={() => setPas(p => p - 1)}
                style={{
                  marginTop: '20px', background: 'none', border: 'none',
                  color: '#7a7a8c', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px',
                }}
              >
                ← Înapoi
              </button>
            )}
          </div>
        )}

        {/* CARD ALERGII (ultimul pas) */}
        {pas === INTREBARI.length && (
          <div style={{
            backgroundColor: 'white', borderRadius: '24px',
            boxShadow: '0 8px 30px rgba(45,49,66,0.08)', padding: '36px',
          }}>
            <p style={{ fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '1px', color: '#6aab9e', marginBottom: '12px' }}>
              Opțional
            </p>
            <h3 style={{ color: '#2d3142', fontSize: '18px', fontWeight: '700', marginBottom: '10px', lineHeight: '1.4' }}>
              Ai alergii sau ingrediente pe care le eviți?
            </h3>
            <p style={{ color: '#7a7a8c', fontSize: '13px', marginBottom: '20px' }}>
              Lasă gol dacă nu știi sau nu ai alergii cunoscute.
            </p>
            <input
              type="text"
              value={alergii}
              onChange={e => setAlergii(e.target.value)}
              placeholder="ex: parabeni, parfum, alcool..."
              style={{
                width: '100%', padding: '14px 16px', borderRadius: '12px',
                border: '1.5px solid #e8e3dc', fontSize: '14px', boxSizing: 'border-box',
                outline: 'none', marginBottom: '24px',
              }}
              onFocus={e => e.target.style.borderColor = '#b06090'}
              onBlur={e => e.target.style.borderColor = '#e8e3dc'}
            />
            <button
              onClick={finalizeaza}
              disabled={loading}
              style={{
                width: '100%', padding: '16px',
                background: loading ? '#d4b0c4' : 'linear-gradient(135deg, #b06090 0%, #e8956d 100%)',
                color: 'white', border: 'none', borderRadius: '14px',
                fontWeight: '700', fontSize: '16px', cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all 0.2s ease',
              }}
            >
              {loading ? 'Se analizează...' : 'Generează Diagnostic și Rutină'}
            </button>
            <button
              onClick={() => setPas(p => p - 1)}
              style={{ marginTop: '14px', background: 'none', border: 'none', color: '#7a7a8c', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              ← Înapoi
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
