import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';
import Navbar from '../components/Navbar';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

export default function Jurnal() {
  const navigate = useNavigate();
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;
  const chartRef = useRef(null);

  const [rating, setRating] = useState(5);
  const [observatii, setObservatii] = useState('');
  const [mesaj, setMesaj] = useState('');
  
  const [dateGrafic, setDateGrafic] = useState(null);
  const [istoric, setIstoric] = useState([]); 

  // Stările pentru modul de EDITARE
  const [editareId, setEditareId] = useState(null);
  const [ratingEdit, setRatingEdit] = useState(5);
  const [observatiiEdit, setObservatiiEdit] = useState('');

  const incarcaDateJurnal = async () => {
    if (!user) return;
    
    // 1. Încărcare Grafic (Forțăm afișarea oricărui set de date)
    try {
        const raspunsGrafic = await axios.get(`http://localhost:5000/api/jurnal/evolutie/${user.id}`);
        const dateBackend = raspunsGrafic.data;

        // Dacă backend-ul trimite cel puțin o înregistrare, facem graficul
        if (Array.isArray(dateBackend) && dateBackend.length > 0) {
            setDateGrafic({
                labels: dateBackend.map(item => item.luna),
                datasets: [{
                    label: 'Evoluția Tenului (Nota Medie)',
                    data: dateBackend.map(item => parseFloat(item.rating_mediu)),
                    borderColor: '#6aab9e',
                    backgroundColor: 'rgba(106, 171, 158, 0.12)',
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#6aab9e',
                    tension: 0.4,
                    fill: true
                }]
            });
        } else {
            setDateGrafic(null);
        }
    } catch (e) { 
        console.log("Eroare grafic:", e); 
        setDateGrafic(null);
    }

    // 2. Încărcare Istoric (Agenda)
    try {
        const raspunsIstoric = await axios.get(`http://localhost:5000/api/jurnal/istoric/${user.id}`);
        setIstoric(raspunsIstoric.data);
    } catch (e) { 
        console.log("Eroare istoric:", e); 
    }
  };

  useEffect(() => {
    incarcaDateJurnal();
    return () => { if(chartRef.current) chartRef.current.destroy(); }
  }, []);

  // --- FUNCTIA ADAUGARE ---
  const adaugaIntrare = async (e) => {
    e.preventDefault();
    setMesaj('');

    try {
      await axios.post('http://localhost:5000/api/jurnal/adauga', { 
          membruId: user.id, 
          rating: rating, 
          observatii: observatii 
      });
      setMesaj('✅ Pagina de jurnal a fost salvată!');
      setObservatii(''); 
      setRating(5);
      
      incarcaDateJurnal(); // Reîncarcă imediat lista și graficul
      setTimeout(() => setMesaj(''), 3000);
    } catch (err) { 
      setMesaj('❌ Eroare la salvare.'); 
    }
  };

  // --- FUNCTII STERGERE / EDITARE ---
  const stergeNota = async (idStergere) => {
      const confirmare = window.confirm("Sigur vrei să ștergi această notiță?");
      if (!confirmare) return;

      try {
          await axios.delete(`http://localhost:5000/api/jurnal/sterge/${idStergere}`);
          incarcaDateJurnal(); // Se va actualiza și graficul automat!
      } catch (e) { 
          console.log("Eroare la ștergere:", e); 
      }
  };

  const pornesteEditare = (nota) => {
      setEditareId(nota.id);
      setRatingEdit(nota.rating);
      setObservatiiEdit(nota.observatii);
  };

  const salveazaEditare = async (idEditat) => {
      try {
          await axios.put(`http://localhost:5000/api/jurnal/editeaza/${idEditat}`, {
              rating: ratingEdit,
              observatii: observatiiEdit
          });
          setEditareId(null); 
          incarcaDateJurnal(); 
      } catch (e) { 
          console.log("Eroare la editare:", e); 
      }
  };

  const formateazaData = (dataString) => {
    if (!dataString) return 'Azi';
    const formatCurat = typeof dataString === 'string' ? dataString.split('T')[0] : dataString;
    return new Date(formatCurat).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7f4f0' }}>
      <Navbar />
      <div style={{ maxWidth: '900px', margin: '0 auto', padding: '32px 20px' }}>

        {/* HEADER */}
        <div style={{ marginBottom: '28px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '12px' }}>
          <div>
            <h1 style={{ color: '#b06090', margin: '0 0 6px', fontSize: '26px', fontWeight: '800' }}>📔 Jurnalul Meu</h1>
            <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>Urmărește evoluția tenului și notează observațiile zilnice</p>
          </div>
          <a
            href={`http://localhost:5000/api/jurnal/export-csv/${user?.id}`}
            download="jurnal_glowguide.csv"
            style={{
              padding: '9px 18px', backgroundColor: 'white', color: '#6aab9e',
              border: '1.5px solid #6aab9e', borderRadius: '10px',
              fontSize: '13px', fontWeight: '600', textDecoration: 'none',
              display: 'inline-flex', alignItems: 'center', gap: '6px',
              boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
            }}
          >
            📥 Export CSV
          </a>
        </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '24px' }}>
          
          {/* FORMULAR ADAUGARE */}
          <div style={{ backgroundColor: 'white', padding: '28px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <h3 style={{ marginBottom: '20px', color: '#222', fontSize: '16px', marginTop: 0 }}>✍️ Scrie o filă nouă</h3>
              <form onSubmit={adaugaIntrare} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              <div>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'flex', justifyContent: 'space-between' }}>
                    Starea tenului
                    <span style={{ color: '#b06090', fontSize: '16px', fontWeight: '800' }}>{rating}/10</span>
                  </label>
                  <input type="range" min="1" max="10" value={rating} onChange={(e) => setRating(parseInt(e.target.value))}
                    style={{ width: '100%', marginTop: '10px', accentColor: '#b06090' }} />
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: '#aaa', marginTop: '4px' }}>
                    <span>😔 Slab</span><span>😊 Excelent</span>
                  </div>
              </div>
              <div>
                  <label style={{ fontSize: '12px', fontWeight: '600', color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px', display: 'block', marginBottom: '8px' }}>Observații</label>
                  <textarea value={observatii} onChange={(e) => setObservatii(e.target.value)} rows="4"
                    placeholder="Cum arată tenul azi? Ce produse ai folosit?"
                    style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1.5px solid #e5e7eb', resize: 'vertical', fontSize: '14px', boxSizing: 'border-box', fontFamily: 'inherit', outline: 'none' }}
                    onFocus={e => e.target.style.borderColor = '#b06090'}
                    onBlur={e => e.target.style.borderColor = '#e5e7eb'}
                    required />
              </div>
              <button type="submit" style={{
                padding: '13px', background: 'linear-gradient(135deg, #b06090, #6aab9e)',
                color: 'white', border: 'none', borderRadius: '10px',
                fontWeight: '700', fontSize: '15px', cursor: 'pointer',
                boxShadow: '0 4px 15px rgba(176,96,144,0.25)'
              }}>
                  ✨ Salvează în Jurnal
              </button>
              </form>
              {mesaj && <div style={{ marginTop: '14px', padding: '12px', backgroundColor: mesaj.includes('✅') ? '#f0fdf4' : '#fff5f5', color: mesaj.includes('✅') ? '#16a34a' : '#dc2626', borderRadius: '10px', textAlign: 'center', fontWeight: '600', fontSize: '13px' }}>{mesaj}</div>}
          </div>

          {/* GRAFIC */}
          <div style={{ backgroundColor: 'white', padding: '28px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
              <h3 style={{ marginBottom: '20px', color: '#222', fontSize: '16px', marginTop: 0 }}>📈 Evoluție Ten</h3>
              {dateGrafic ? (
              <div style={{ width: '100%', height: '260px' }}>
                  <Line ref={chartRef} options={{ responsive: true, maintainAspectRatio: false, scales: { y: { min: 0, max: 10, grid: { color: '#f5f5f5' } } }, plugins: { legend: { display: false } } }} data={dateGrafic} />
              </div>
              ) : (
              <div style={{ height: '260px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#bbb' }}>
                  <div style={{ fontSize: '48px', marginBottom: '12px' }}>📊</div>
                  <p style={{ margin: 0, fontSize: '14px' }}>Adaugă note pentru a genera graficul</p>
              </div>
              )}
          </div>
      </div>

      {/* AGENDA */}
      <div style={{ marginTop: '32px' }}>
          <h2 style={{ color: '#222', marginBottom: '20px', fontSize: '18px' }}>📚 Filele Jurnalului</h2>
          
          {istoric.length === 0 ? (
              <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '20px', textAlign: 'center', color: '#bbb', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>📝</div>
                <p style={{ margin: 0 }}>Jurnalul este gol. Adaugă prima notă mai sus!</p>
              </div>
          ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                  {istoric.map((intrare) => (
                      <div key={intrare.id} style={{ 
                          backgroundColor: 'white', borderLeft: '4px solid #b06090',
                          borderRadius: '14px', padding: '22px 24px',
                          boxShadow: '0 4px 15px rgba(0,0,0,0.05)'
                      }}>
                          {/* MODUL EDITARE */}
                          {editareId === intrare.id ? (
                              <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                      <strong>Modifică nota: <span style={{color:'#b06090'}}>{ratingEdit}</span></strong>
                                      <input type="range" min="1" max="10" value={ratingEdit} onChange={(e) => setRatingEdit(parseInt(e.target.value))} style={{width: '60%', accentColor: '#b06090'}}/>
                                  </div>
                                  <textarea value={observatiiEdit} onChange={(e) => setObservatiiEdit(e.target.value)} rows="3" style={{width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid #ccc'}} />
                                  
                                  <div style={{display: 'flex', gap: '10px'}}>
                                      <button onClick={() => salveazaEditare(intrare.id)} style={{padding: '8px 15px', backgroundColor: '#4CAF50', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}>💾 Salvează</button>
                                      <button onClick={() => setEditareId(null)} style={{padding: '8px 15px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold'}}>❌ Anulează</button>
                                  </div>
                              </div>
                          ) : (
                              // MODUL AFISARE NORMALA
                              <>
                                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px dashed #e0d5c1', paddingBottom: '15px', marginBottom: '15px' }}>
                                      <span style={{ color: '#8b7355', fontWeight: 'bold' }}>
                                          📅 {formateazaData(intrare.dataIntrare)}
                                      </span>
                                      
                                      <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                                          <button onClick={() => pornesteEditare(intrare)} style={{background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px'}} title="Editează">✏️</button>
                                          <button onClick={() => stergeNota(intrare.id)} style={{background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px'}} title="Șterge">🗑️</button>
                                          <span style={{ 
                                              backgroundColor: intrare.rating >= 7 ? '#eef6f4' : intrare.rating <= 4 ? '#ffebee' : '#fff8e1',
                                              color: intrare.rating >= 7 ? '#4a897e' : intrare.rating <= 4 ? '#c62828' : '#b5622a',
                                              padding: '4px 12px', borderRadius: '20px', fontWeight: '700', fontSize: '13px',
                                              display: 'flex', alignItems: 'center', gap: '4px'
                                          }}>
                                            {intrare.rating >= 7 ? '🟢' : intrare.rating <= 4 ? '🔴' : '🟡'} {intrare.rating}/10
                                          </span>
                                      </div>
                                  </div>
                                  <p style={{ margin: 0, color: '#444', fontSize: '17px', fontStyle: 'italic', fontFamily: "'Georgia', serif" }}>
                                      "{intrare.observatii}"
                                  </p>
                              </>
                          )}
                      </div>
                  ))}
              </div>
          )}
      </div>

    </div>
    </div>
  );
}
