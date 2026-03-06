import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler } from 'chart.js';
import { Line } from 'react-chartjs-2';

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
                    borderColor: '#d63384',
                    backgroundColor: 'rgba(214, 51, 132, 0.15)',
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#d63384',
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
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>
      
      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
            <h1 style={{ color: '#d63384', margin: 0 }}>📖 Jurnalul Meu</h1>
        </div>
        <button onClick={() => navigate('/dashboard')} style={{ padding: '10px 20px', backgroundColor: '#f1f1f1', color: '#333', border: 'none', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold'}}>
          ← Înapoi la Dashboard
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '30px' }}>
          
          {/* FORMULAR ADAUGARE */}
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              <h3 style={{ marginBottom: '20px' }}>Scrie o filă nouă</h3>
              <form onSubmit={adaugaIntrare} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                  <label style={{ fontWeight: '600', display: 'flex', justifyContent: 'space-between' }}>
                  Starea tenului: <span style={{color: '#d63384', fontSize: '18px', fontWeight: 'bold'}}>{rating} / 10</span>
                  </label>
                  <input type="range" min="1" max="10" value={rating} onChange={(e) => setRating(parseInt(e.target.value))} style={{ width: '100%', marginTop: '10px' }} />
              </div>
              <div>
                  <label style={{ fontWeight: '600', display: 'block', marginBottom: '10px' }}>Gândurile tale:</label>
                  <textarea value={observatii} onChange={(e) => setObservatii(e.target.value)} rows="4" style={{ width: '100%', padding: '15px', borderRadius: '12px', border: '1px solid #e0e0e0', resize: 'vertical' }} required />
              </div>
              <button type="submit" style={{ padding: '15px', backgroundColor: '#d63384', color: 'white', border: 'none', borderRadius: '12px', fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}>
                  ✨ Salvează în Jurnal
              </button>
              </form>
              {mesaj && <div style={{ marginTop: '15px', padding: '10px', backgroundColor: '#e8f5e9', color: '#2e7d32', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold' }}>{mesaj}</div>}
          </div>

          {/* GRAFIC */}
          <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              <h3 style={{ marginBottom: '20px' }}>Evoluție Ten</h3>
              {dateGrafic ? (
              <div style={{ width: '100%', height: '280px' }}>
                  <Line ref={chartRef} options={{responsive: true, maintainAspectRatio: false, scales: {y: { min: 0, max: 10 }}}} data={dateGrafic} />
              </div>
              ) : (
              <div style={{ height: '280px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#888' }}>
                  Adaugă note în jurnal pentru a genera graficul.
              </div>
              )}
          </div>
      </div>

      {/* AGENDA CU EDITARE SI STERGERE */}
      <div style={{ marginTop: '40px' }}>
          <h2 style={{ color: '#333', marginBottom: '20px' }}>📚 Filele Jurnalului Tău</h2>
          
          {istoric.length === 0 ? (
              <p style={{ color: '#666', fontStyle: 'italic' }}>Jurnalul este gol momentan. Adaugă o notă mai sus!</p>
          ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  {istoric.map((intrare) => (
                      <div key={intrare.id} style={{ 
                          backgroundColor: '#fffdf9', border: '1px solid #f0e6d2', borderLeft: '6px solid #d63384', borderRadius: '12px', padding: '25px', boxShadow: '0 4px 10px rgba(0,0,0,0.03)'
                      }}>
                          {/* MODUL EDITARE */}
                          {editareId === intrare.id ? (
                              <div style={{display: 'flex', flexDirection: 'column', gap: '15px'}}>
                                  <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                                      <strong>Modifică nota: <span style={{color:'#d63384'}}>{ratingEdit}</span></strong>
                                      <input type="range" min="1" max="10" value={ratingEdit} onChange={(e) => setRatingEdit(parseInt(e.target.value))} style={{width: '60%'}}/>
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
                                      
                                      <div style={{display: 'flex', alignItems: 'center', gap: '15px'}}>
                                          <button onClick={() => pornesteEditare(intrare)} style={{background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px'}} title="Editează">✏️</button>
                                          <button onClick={() => stergeNota(intrare.id)} style={{background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px'}} title="Șterge">🗑️</button>
                                          
                                          <span style={{ 
                                              backgroundColor: intrare.rating >= 7 ? '#e8f5e9' : intrare.rating <= 4 ? '#ffebee' : '#fff3e0',
                                              color: intrare.rating >= 7 ? '#2e7d32' : intrare.rating <= 4 ? '#c62828' : '#ef6c00',
                                              padding: '5px 12px', borderRadius: '20px', fontWeight: 'bold', fontSize: '14px'
                                          }}>Nota: {intrare.rating} / 10</span>
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
  );
}
