import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function RutinaMea() {
  const navigate = useNavigate();
  const [produse, setProduse] = useState([]);
  const [diagnostic, setDiagnostic] = useState(null); // <-- Stare nouă pentru diagnostic
  const [loading, setLoading] = useState(false);
  const [eroare, setEroare] = useState('');
  
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  const genereazaRutina = async () => {
    if (!user) return;
    
    setLoading(true);
    setEroare('');
    
    try {
      const raspuns = await axios.post('http://localhost:5000/api/rutina/genereaza', {
        membruId: user.id
      });
      
      setProduse(raspuns.data.produse);
      setDiagnostic(raspuns.data.profilUtilizator); // Salvăm diagnosticul din backend

    } catch (err) {
      setEroare(err.response?.data?.eroare || 'Ceva nu a funcționat. Ai completat profilul dermatologic?');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h2 style={{ color: '#d63384' }}>✨ Rutina Ta Personalizată</h2>
        <button onClick={() => navigate('/dashboard')} style={{ padding: '8px 15px', backgroundColor: '#ddd', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          ← Înapoi
        </button>
      </div>

      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', textAlign: 'center', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <p style={{ marginBottom: '20px', color: '#555' }}>
          Sistemul nostru expert a analizat răspunsurile tale din chestionar pentru a-ți oferi cele mai bune produse.
        </p>
        
        <button 
          onClick={genereazaRutina} 
          disabled={loading}
          style={{ 
            padding: '15px 30px', 
            backgroundColor: '#d63384', 
            color: 'white', 
            border: 'none', 
            borderRadius: '8px', 
            fontSize: '16px',
            fontWeight: 'bold', 
            cursor: loading ? 'not-allowed' : 'pointer' 
          }}>
          {loading ? 'Sistemul calculează...' : '🔍 Afișează Rutina Acum'}
        </button>

        {eroare && <p style={{ color: 'red', marginTop: '15px' }}>{eroare}</p>}
      </div>

      {/* Aici afișăm DIAGNOSTICUL permanent! */}
      {diagnostic && (
        <div style={{ marginTop: '30px', backgroundColor: '#e8f5e9', border: '2px solid #4caf50', padding: '20px', borderRadius: '12px', textAlign: 'center' }}>
           <h3 style={{ color: '#2e7d32', margin: '0 0 10px 0' }}>📋 Diagnosticul tău:</h3>
           <p style={{ fontSize: '18px', fontWeight: 'bold', color: '#1b5e20', margin: 0 }}>
             Ten {diagnostic.tipTen.toUpperCase()}
             {diagnostic.probleme && diagnostic.probleme.length > 0 
               ? `, cu ${diagnostic.probleme.join(' și ')}` 
               : ''}.
           </p>
        </div>
      )}

      {/* Lista de produse */}
      {produse.length > 0 && (
        <div style={{ marginTop: '30px' }}>
          <h3 style={{ marginBottom: '20px', color: '#333' }}>Rutina zilnică ({produse.length} pași):</h3>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {produse.map((produs, index) => (
              <div key={produs.id} style={{ 
                display: 'flex', 
                alignItems: 'center', 
                backgroundColor: 'white', 
                padding: '20px', 
                borderRadius: '12px', 
                boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
                borderLeft: '5px solid #d63384'
              }}>
                <div style={{ 
                  width: '40px', height: '40px', borderRadius: '50%', 
                  backgroundColor: '#fbe2eb', color: '#d63384', 
                  display: 'flex', justifyContent: 'center', alignItems: 'center', 
                  fontWeight: 'bold', fontSize: '18px', marginRight: '20px' 
                }}>
                  {index + 1}
                </div>
                
                <div style={{ flex: 1 }}>
                  <p style={{ fontSize: '12px', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', margin: '0 0 5px 0' }}>
                    Pasul: {produs.categorie}
                  </p>
                  <h4 style={{ margin: '0 0 5px 0', fontSize: '18px', color: '#333' }}>
                    {produs.nume}
                  </h4>
                  <p style={{ margin: 0, fontSize: '14px', color: '#666' }}>Brand: {produs.brand}</p>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <span style={{ backgroundColor: '#ffe58f', padding: '5px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold' }}>
                    ⭐ {produs.rating} / 5.0
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
