import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Forum() {
  const navigate = useNavigate();
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  const [postari, setPostari] = useState([]);
  const [titlu, setTitlu] = useState('');
  const [continut, setContinut] = useState('');
  const [mesaj, setMesaj] = useState('');
  const [loadingPostari, setLoadingPostari] = useState(true);

  const incarcaPostari = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/forum/feed');
      setPostari(res.data);
    } catch (e) {
      console.log('Eroare încărcare postări:', e);
    } finally {
      setLoadingPostari(false);
    }
  };

  useEffect(() => {
    incarcaPostari();
  }, []);

  const trimitePostare = async (e) => {
    e.preventDefault();
    setMesaj('');
    try {
      await axios.post('http://localhost:5000/api/forum/adauga', {
        membruId: user.membruId || user.id,
        titlu,
        continut,
      });
      setMesaj('✅ Postarea ta a fost trimisă și urmează să fie aprobată!');
      setTitlu('');
      setContinut('');
      setTimeout(() => setMesaj(''), 5000);
    } catch (e) {
      setMesaj('❌ Eroare la trimiterea postării.');
    }
  };

  const formateazaData = (dataString) => {
    if (!dataString) return '';
    return new Date(dataString).toLocaleDateString('ro-RO', {
      day: 'numeric', month: 'long', year: 'numeric'
    });
  };

  return (
    <div style={{ padding: '40px 20px', maxWidth: '900px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>

      {/* HEADER */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <div>
          <h1 style={{ color: '#d63384', margin: 0 }}>💬 Comunitatea GlowGuide</h1>
          <p style={{ color: '#888', margin: '5px 0 0 0' }}>Împărtășește experiențe și sfaturi cu comunitatea</p>
        </div>
        <button onClick={() => navigate('/dashboard')} style={{ padding: '10px 20px', backgroundColor: '#f1f1f1', color: '#333', border: 'none', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold' }}>
          ← Înapoi la Dashboard
        </button>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(380px, 1fr))', gap: '30px' }}>

        {/* FORMULAR POSTARE NOUĂ */}
        <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.05)', alignSelf: 'start' }}>
          <h3 style={{ marginTop: 0, marginBottom: '20px' }}>✍️ Creează o postare nouă</h3>
          <form onSubmit={trimitePostare} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div>
              <label style={{ fontWeight: '600', display: 'block', marginBottom: '8px' }}>Titlu:</label>
              <input
                type="text"
                value={titlu}
                onChange={(e) => setTitlu(e.target.value)}
                placeholder="Ex: Experiența mea cu niacinamide..."
                required
                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e0e0e0', fontSize: '14px', boxSizing: 'border-box' }}
              />
            </div>
            <div>
              <label style={{ fontWeight: '600', display: 'block', marginBottom: '8px' }}>Conținut:</label>
              <textarea
                value={continut}
                onChange={(e) => setContinut(e.target.value)}
                placeholder="Scrie întrebarea sau experiența ta..."
                rows="5"
                required
                style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e0e0e0', resize: 'vertical', fontSize: '14px', boxSizing: 'border-box' }}
              />
            </div>
            <button type="submit" style={{ padding: '13px', backgroundColor: '#d63384', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer' }}>
              📤 Trimite spre aprobare
            </button>
          </form>
          {mesaj && (
            <div style={{ marginTop: '15px', padding: '12px', backgroundColor: mesaj.startsWith('✅') ? '#e8f5e9' : '#ffebee', color: mesaj.startsWith('✅') ? '#2e7d32' : '#c62828', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold' }}>
              {mesaj}
            </div>
          )}
        </div>

        {/* FEED POSTĂRI */}
        <div>
          <h3 style={{ marginTop: 0, marginBottom: '20px' }}>🌸 Discuții recente</h3>
          {loadingPostari ? (
            <p style={{ color: '#888' }}>Se încarcă...</p>
          ) : postari.length === 0 ? (
            <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', textAlign: 'center', color: '#888', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
              <p style={{ fontSize: '40px', margin: '0 0 10px 0' }}>🌱</p>
              <p>Comunitatea e nouă! Fii prima care postează.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
              {postari.map((postare) => (
                <div
                  key={postare.id}
                  onClick={() => navigate(`/forum/${postare.id}`)}
                  style={{ backgroundColor: 'white', padding: '20px 25px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', cursor: 'pointer', borderLeft: '5px solid #d63384', transition: 'transform 0.15s', }}
                  onMouseEnter={e => e.currentTarget.style.transform = 'translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform = 'translateY(0)'}
                >
                  <h4 style={{ margin: '0 0 8px 0', color: '#222', fontSize: '16px' }}>{postare.titlu}</h4>
                  <p style={{ margin: '0 0 12px 0', color: '#555', fontSize: '14px', lineHeight: '1.5', overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
                    {postare.continut}
                  </p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '13px', color: '#999' }}>
                    <span>👤 {postare.autor} · 📅 {formateazaData(postare.dataPostare)}</span>
                    <span style={{ backgroundColor: '#f9e8f0', color: '#d63384', padding: '3px 10px', borderRadius: '20px', fontWeight: 'bold' }}>
                      💬 {postare.numar_raspunsuri} răspuns{postare.numar_raspunsuri !== 1 ? 'uri' : ''}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
