import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Profil() {
  const navigate = useNavigate();
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  const [q1, setQ1] = useState('');
  const [q2, setQ2] = useState('');
  const [q3, setQ3] = useState('');
  const [q4, setQ4] = useState('');
  const [q5, setQ5] = useState('');
  const [q6, setQ6] = useState('');
  const [q7, setQ7] = useState('');
  const [q8, setQ8] = useState('');
  
  const [alergii, setAlergii] = useState('');
  const [mesaj, setMesaj] = useState('');
  const [loading, setLoading] = useState(false);
  const [rezultatFinal, setRezultatFinal] = useState(null);

  const calculeazaDiagnostic = () => {
    let axe = { gras: 0, uscat: 0, sensibil: 0, acnee: 0, pigmentare: 0, aging: 0 };

    if (q1 === 'strange') axe.uscat += 3;
    if (q1 === 'luceste') axe.gras += 3;
    if (q1 === 'luceste_t') { axe.gras += 2; axe.uscat += 1; }

    if (q2 === 'invizibili') axe.uscat += 1;
    if (q2 === 'mari_t') axe.gras += 1;
    if (q2 === 'mari_tot') axe.gras += 2;

    if (q3 === 'aspra') axe.uscat += 2;

    if (q4 === 'des') axe.sensibil += 2;
    if (q5 === 'des') axe.sensibil += 3;

    if (q6 === 'frecvent' || q6 === 'constant') axe.acnee += 3;
    if (q6 === 'uneori') axe.acnee += 1;

    if (q7 === 'pete') axe.pigmentare += 2;
    if (q8 === 'riduri') axe.aging += 2;

    let tipBaza = 'normal';
    if (axe.gras >= 4) tipBaza = 'gras';
    if (axe.uscat >= 4) tipBaza = 'uscat';
    if (axe.gras >= 2 && axe.uscat >= 2) tipBaza = 'mixt';
    if (axe.sensibil >= 4) tipBaza = 'sensibil';

    let problemeArray = [];
    if (axe.acnee >= 3) problemeArray.push('tendință acneică');
    if (axe.pigmentare > 0) problemeArray.push('hiperpigmentare');
    if (axe.aging > 0) problemeArray.push('semne de îmbătrânire');

    let textProbleme = problemeArray.length > 0 ? `, cu ${problemeArray.join(' și ')}` : '';
    let diagnosticComplet = `Ten ${tipBaza.toUpperCase()}${textProbleme}.`;

    return { 
      tipDeBazaBackend: tipBaza, 
      problemeBackend: problemeArray,
      diagnosticAfisat: diagnosticComplet 
    };
  };

  const salveazaProfil = async (e) => {
    e.preventDefault();
    if (!user) return;

    if (!q1 || !q2 || !q3 || !q4 || !q5 || !q6 || !q7 || !q8) {
      setMesaj('Te rugăm să răspunzi la toate cele 8 întrebări pentru o analiză precisă.');
      return;
    }

    setLoading(true);
    setMesaj('');

    const diagnostic = calculeazaDiagnostic();
    setRezultatFinal(diagnostic.diagnosticAfisat);
    
    const arrayAlergii = alergii.split(',').map(item => item.trim()).filter(i => i);

    try {
      await axios.post('http://localhost:5000/api/rutina/salveaza-profil', {
        membruId: user.id,
        tipTen: diagnostic.tipDeBazaBackend,
        probleme: JSON.stringify(diagnostic.problemeBackend),
        alergii: JSON.stringify(arrayAlergii)
      });
      
      setTimeout(() => navigate('/rutina'), 4000); 
    } catch (err) {
      setMesaj('Eroare la salvarea profilului. Verifică terminalul.');
    } finally {
      setLoading(false);
    }
  };

  const qStyle = { marginBottom: '15px', padding: '15px', backgroundColor: '#fdfdfd', borderRadius: '8px', border: '1px solid #eee' };
  const lStyle = { fontWeight: 'bold', display: 'block', marginBottom: '8px', color: '#444', fontSize: '15px' };
  const sStyle = { width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #ccc' };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '800px', margin: '0 auto' }}>
      <h2 style={{ color: '#d63384', textAlign: 'center', marginBottom: '5px' }}>🧬 Sistem Expert Dermatologic</h2>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '30px' }}>Analiză complexă în 8 pași pentru determinarea exactă a profilului tău.</p>
      
      {rezultatFinal ? (
        <div style={{ backgroundColor: '#e8f5e9', padding: '30px', borderRadius: '15px', textAlign: 'center', border: '2px solid #4caf50' }}>
          <h3 style={{ color: '#2e7d32', marginBottom: '15px' }}>✅ Analiză Finalizată!</h3>
          <p style={{ fontSize: '18px', marginBottom: '20px' }}>Rezultatul tău este:</p>
          <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#1b5e20', padding: '15px', backgroundColor: 'white', borderRadius: '10px', display: 'inline-block' }}>
            {rezultatFinal}
          </div>
          <p style={{ marginTop: '20px', color: '#555' }}>Generăm rutina personalizată... te rugăm să aștepți.</p>
        </div>
      ) : (
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
          <form onSubmit={salveazaProfil}>
            
            <h4 style={{ color: '#d63384', borderBottom: '1px solid #eee', paddingBottom: '10px', marginBottom: '15px' }}>Secțiunea 1: Hidratare & Sebum</h4>
            
            <div style={qStyle}>
              <label style={lStyle}>1. La o oră după spălare (fără să aplici nimic), cum simți pielea?</label>
              <select value={q1} onChange={(e) => setQ1(e.target.value)} style={sStyle}>
                <option value="">Alege...</option>
                <option value="confortabil">Normală, confortabilă</option>
                <option value="strange">Mă strânge, simt nevoia de cremă</option>
                <option value="luceste_t">Lucește doar pe frunte/nas (Zona T)</option>
                <option value="luceste">Lucește pe toată fața</option>
              </select>
            </div>

            <div style={qStyle}>
              <label style={lStyle}>2. Cum arată porii tăi?</label>
              <select value={q2} onChange={(e) => setQ2(e.target.value)} style={sStyle}>
                <option value="">Alege...</option>
                <option value="invizibili">Sunt mici, abia îi observ</option>
                <option value="mari_t">Sunt dilatați doar pe nas și pomeți</option>
                <option value="mari_tot">Sunt dilatați și vizibili peste tot</option>
              </select>
            </div>

            <div style={qStyle}>
              <label style={lStyle}>3. Ai zone cu piele uscată, aspră sau care se descuamează?</label>
              <select value={q3} onChange={(e) => setQ3(e.target.value)} style={sStyle}>
                <option value="">Alege...</option>
                <option value="nu">Nu, textura e uniformă</option>
                <option value="aspra">Da, în special pe obraji sau iarna</option>
              </select>
            </div>

            <h4 style={{ color: '#d63384', borderBottom: '1px solid #eee', paddingBottom: '10px', marginTop: '30px', marginBottom: '15px' }}>Secțiunea 2: Barieră & Sensibilitate</h4>
            <div style={qStyle}>
              <label style={lStyle}>4. Pielea ta se înroșește ușor la frig, vânt sau soare?</label>
              <select value={q4} onChange={(e) => setQ4(e.target.value)} style={sStyle}>
                <option value="">Alege...</option>
                <option value="rar">Rar</option>
                <option value="des">Da, mă înroșesc foarte repede</option>
              </select>
            </div>

            <div style={qStyle}>
              <label style={lStyle}>5. Simți usturime sau mâncărime când aplici produse noi?</label>
              <select value={q5} onChange={(e) => setQ5(e.target.value)} style={sStyle}>
                <option value="">Alege...</option>
                <option value="rar">Nu, tolerez orice produs</option>
                <option value="des">Da, foarte des am reacții neplăcute</option>
              </select>
            </div>

            <h4 style={{ color: '#d63384', borderBottom: '1px solid #eee', paddingBottom: '10px', marginTop: '30px', marginBottom: '15px' }}>Secțiunea 3: Condiții Specifice</h4>
            <div style={qStyle}>
              <label style={lStyle}>6. Te confrunți cu acnee, puncte negre sau coșuri subcutanate?</label>
              <select value={q6} onChange={(e) => setQ6(e.target.value)} style={sStyle}>
                <option value="">Alege...</option>
                <option value="rar">Aproape niciodată</option>
                <option value="uneori">Uneori (1-2 coșuri ocazional)</option>
                <option value="frecvent">Frecvent (mai multe coșuri regulat)</option>
                <option value="constant">Constant (acnee severă/chistică)</option>
              </select>
            </div>

            <div style={qStyle}>
              <label style={lStyle}>7. Ai pete maronii, urme lăsate de coșuri sau hiperpigmentare?</label>
              <select value={q7} onChange={(e) => setQ7(e.target.value)} style={sStyle}>
                <option value="">Alege...</option>
                <option value="nu">Nu, tenul e uniform</option>
                <option value="pete">Da, am pete care trec greu</option>
              </select>
            </div>

            <div style={qStyle}>
              <label style={lStyle}>8. Ești preocupat(ă) de prevenirea sau estomparea ridurilor?</label>
              <select value={q8} onChange={(e) => setQ8(e.target.value)} style={sStyle}>
                <option value="">Alege...</option>
                <option value="nu">Nu e o prioritate momentan</option>
                <option value="riduri">Da, am început să observ linii fine</option>
              </select>
            </div>

            <div style={{ ...qStyle, backgroundColor: '#fff0f5', borderColor: '#f8bbd0' }}>
              <label style={lStyle}>Ai alergii cunoscute? (opțional)</label>
              <input type="text" value={alergii} onChange={(e) => setAlergii(e.target.value)} placeholder="ex: parabeni, parfum" style={sStyle} />
            </div>

            <button type="submit" disabled={loading} style={{ width: '100%', padding: '15px', backgroundColor: '#d63384', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', fontSize: '18px', cursor: loading ? 'not-allowed' : 'pointer', marginTop: '20px' }}>
              {loading ? 'Analizăm...' : 'Generează Diagnostic și Rutină'}
            </button>

            {mesaj && <p style={{ color: 'red', textAlign: 'center', marginTop: '15px', fontWeight: 'bold' }}>{mesaj}</p>}
          </form>
        </div>
      )}
    </div>
  );
}
