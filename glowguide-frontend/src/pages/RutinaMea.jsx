import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

export default function RutinaMea() {
  const navigate = useNavigate();
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  // Încarcă rutina salvată din localStorage dacă există
  const rutinaStocata = localStorage.getItem(`rutina_${user?.id}`);
  const rutinaInitiala = rutinaStocata ? JSON.parse(rutinaStocata) : null;

  const [produse, setProduse] = useState(rutinaInitiala?.produse || []);
  const [diagnostic, setDiagnostic] = useState(rutinaInitiala?.diagnostic || null);
  const [dataGenerare, setDataGenerare] = useState(rutinaInitiala?.dataGenerare || null);
  const [loading, setLoading] = useState(false);
  const [eroare, setEroare] = useState('');

  const genereazaRutina = async () => {
    if (!user) return;
    setLoading(true);
    setEroare('');
    try {
      const raspuns = await axios.post('http://localhost:5000/api/rutina/genereaza', { membruId: user.id });
      const produsePrimite = raspuns.data.produse;
      const diagnosticPrimit = raspuns.data.profilUtilizator;
      const data = new Date().toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' });

      setProduse(produsePrimite);
      setDiagnostic(diagnosticPrimit);
      setDataGenerare(data);

      // Salvează în localStorage pentru persistență
      localStorage.setItem(`rutina_${user.id}`, JSON.stringify({
        produse: produsePrimite,
        diagnostic: diagnosticPrimit,
        dataGenerare: data,
      }));
    } catch (err) {
      setEroare(err.response?.data?.eroare || 'Ceva nu a funcționat. Ai completat profilul dermatologic?');
    } finally {
      setLoading(false);
    }
  };

  const EMOJI_CATEGORIE = {
    curatare: '🧴', toner: '💧', ser: '✨', hidratant: '🌊', spf: '☀️',
    exfoliant: '🌿', ochi: '👁️', masca: '🎭'
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7f4f0' }}>
      <Navbar />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 20px' }}>

        {/* HEADER */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ color: '#b06090', margin: '0 0 6px', fontSize: '26px', fontWeight: '800' }}>💆 Rutina Ta Personalizată</h1>
          <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>Produse selectate special pentru tipul tău de ten</p>
        </div>

        {/* Card CTA — doar dacă nu există rutină salvată */}
        {produse.length === 0 && (
          <div style={{
            background: 'linear-gradient(135deg, #eef6f4, #d8ede8)',
            borderRadius: '20px', padding: '40px', textAlign: 'center',
            marginBottom: '24px'
          }}>
            <div style={{ fontSize: '56px', marginBottom: '16px' }}>🌸</div>
            <p style={{ color: '#4a897e', marginBottom: '24px', fontSize: '15px', lineHeight: '1.6' }}>
              Sistemul nostru analizează profilul tău dermatologic pentru a-ți oferi cele mai potrivite produse.
            </p>
            <button
              onClick={genereazaRutina} disabled={loading}
              style={{
                padding: '14px 36px',
                background: loading ? '#d4b0c4' : 'linear-gradient(135deg, #b06090, #6aab9e)',
                color: 'white', border: 'none', borderRadius: '12px',
                fontSize: '16px', fontWeight: '700', cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 6px 20px rgba(176,96,144,0.25)'
              }}
            >
              {loading ? '⏳ Se calculează...' : '🔍 Generează Rutina Acum'}
            </button>
            {eroare && (
              <div style={{ marginTop: '16px', color: '#dc2626', backgroundColor: '#fff5f5', padding: '12px', borderRadius: '10px', fontSize: '14px' }}>
                ❌ {eroare}
              </div>
            )}
          </div>
        )}

        {/* Diagnostic */}
        {diagnostic && (
          <div style={{
            background: 'linear-gradient(135deg, #eef6f4, #d8ede8)',
            border: '2px solid #a8d5cc', padding: '20px 24px', borderRadius: '16px',
            marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '16px'
          }}>
            <div style={{ fontSize: '40px' }}>📋</div>
            <div style={{ flex: 1 }}>
              <p style={{ margin: '0 0 4px', fontSize: '12px', fontWeight: '700', color: '#4a897e', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Diagnosticul tău</p>
              <p style={{ margin: '0 0 4px', fontSize: '18px', fontWeight: '800', color: '#2d3142' }}>
                Ten {diagnostic.tipTen?.toUpperCase()}
                {diagnostic.probleme?.length > 0 ? `, cu ${diagnostic.probleme.join(' și ')}` : ''}
              </p>
              {dataGenerare && <p style={{ margin: 0, fontSize: '12px', color: '#aaa' }}>Generată pe {dataGenerare}</p>}
            </div>
          </div>
        )}

        {/* Lista produse */}
        {produse.length > 0 && (
          <>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0, color: '#222', fontSize: '17px' }}>Rutina zilnică — {produse.length} pași</h3>
              <button onClick={genereazaRutina} disabled={loading} style={{
                padding: '8px 16px', backgroundColor: 'white', color: '#b06090',
                border: '1.5px solid #b06090', borderRadius: '20px', cursor: 'pointer',
                fontSize: '13px', fontWeight: '600'
              }}>
                {loading ? '⏳...' : '🔄 Actualizează'}
              </button>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {produse.map((produs, index) => (
                <div key={produs.id} style={{
                  display: 'flex', alignItems: 'center', gap: '16px',
                  backgroundColor: 'white', padding: '18px 22px', borderRadius: '14px',
                  boxShadow: '0 4px 15px rgba(0,0,0,0.05)',
                  borderLeft: '4px solid #b06090',
                }}>
                  <div style={{
                    width: '42px', height: '42px', borderRadius: '12px',
                    background: 'linear-gradient(135deg, #eef6f4, #d8ede8)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: '20px', flexShrink: 0
                  }}>
                    {EMOJI_CATEGORIE[produs.categorie?.toLowerCase()] || '✨'}
                  </div>
                  <div style={{ flex: 1 }}>
                    <p style={{ margin: '0 0 3px', fontSize: '11px', color: '#aaa', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      Pasul {index + 1} · {produs.categorie === 'spf' ? '☀️ Dimineață' : produs.categorie === 'ser' || produs.categorie === 'ochi' || produs.categorie === 'masca' ? '🌙 Seară' : index % 2 === 0 ? '☀️ Dimineață' : '🌙 Seară'} · {produs.categorie}
                    </p>
                    <h4 style={{ margin: '0 0 2px', fontSize: '16px', color: '#222', fontWeight: '700' }}>{produs.nume}</h4>
                    <p style={{ margin: 0, fontSize: '13px', color: '#888' }}>{produs.brand}</p>
                  </div>
                  <div style={{
                    backgroundColor: '#fff8e1', color: '#f57f17',
                    padding: '6px 12px', borderRadius: '20px',
                    fontSize: '13px', fontWeight: '700', whiteSpace: 'nowrap'
                  }}>
                    ⭐ {produs.rating}
                  </div>
                </div>
              ))}
            </div>
            {eroare && (
              <div style={{ marginTop: '16px', color: '#dc2626', backgroundColor: '#fff5f5', padding: '12px', borderRadius: '10px', fontSize: '14px' }}>
                ❌ {eroare}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

