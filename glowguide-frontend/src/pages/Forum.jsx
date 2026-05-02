import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import API_URL from '../api';

export default function Forum() {
  const navigate = useNavigate();
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  const [postari, setPostari] = useState([]);
  const [titlu, setTitlu] = useState('');
  const [continut, setContinut] = useState('');
  const [mesaj, setMesaj] = useState('');
  const [loadingPostari, setLoadingPostari] = useState(true);
  const [cautare, setCautare] = useState('');
  const [sortare, setSortare] = useState('recent'); // recent | popular

  const incarcaPostari = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/forum/feed?membruId=${user?.id || 0}`);
      setPostari(res.data);
    } catch (e) {
      console.log('Eroare încărcare postări:', e);
    } finally {
      setLoadingPostari(false);
    }
  };

  useEffect(() => { incarcaPostari(); }, []);

  const trimitePostare = async (e) => {
    e.preventDefault();
    setMesaj('');
    try {
      await axios.post(`${API_URL}/api/forum/adauga`, {
        membruId: user.membruId || user.id, titlu, continut,
      });
              setMesaj('Postarea ta a fost trimisă și urmează să fie aprobată!');
      setTitlu(''); setContinut('');
      setTimeout(() => setMesaj(''), 5000);
    } catch (e) {
      setMesaj('Eroare la trimiterea postării.');
    }
  };

  const toggleLike = async (e, postareId) => {
    e.stopPropagation();
    try {
      const res = await axios.post(`${API_URL}/api/forum/${postareId}/like`, { membruId: user?.id });
      setPostari(prev => prev.map(p => p.id === postareId
        ? { ...p, numar_likeuri: res.data.likeuri, likedDeMine: res.data.likedDeMine ? 1 : 0 }
        : p
      ));
    } catch (e) { console.log(e); }
  };

  const formateazaData = (dataString) => {
    if (!dataString) return '';
    return new Date(dataString).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' });
  };

  const esteNou = (dataString) => {
    if (!dataString) return false;
    const diff = (Date.now() - new Date(dataString).getTime()) / (1000 * 60 * 60 * 24);
    return diff < 2;
  };

  const initialeAvatar = (autor) => {
    if (!autor) return '?';
    const parts = autor.trim().split(' ');
    return parts.length >= 2
      ? (parts[0][0] + parts[1][0]).toUpperCase()
      : autor.slice(0, 2).toUpperCase();
  };

  const culoriAvatar = ['#b06090', '#6aab9e', '#e8956d', '#6aaad4', '#8f4d74', '#4a897e'];
  const culoareAvatar = (autor) => culoriAvatar[(autor?.charCodeAt(0) || 0) % culoriAvatar.length];

  const postariAfisate = postari
    .filter(p => !cautare || p.titlu?.toLowerCase().includes(cautare.toLowerCase()) || p.continut?.toLowerCase().includes(cautare.toLowerCase()))
    .sort((a, b) => sortare === 'popular'
      ? (Number(b.numar_likeuri) + Number(b.numar_raspunsuri)) - (Number(a.numar_likeuri) + Number(a.numar_raspunsuri))
      : new Date(b.dataPostare) - new Date(a.dataPostare)
    );

  const inputStyle = {
    width: '100%', padding: '11px 14px', borderRadius: '10px',
    border: '1.5px solid #e5e7eb', fontSize: '14px', boxSizing: 'border-box',
    outline: 'none', fontFamily: 'inherit',
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7f4f0' }}>
      <Navbar />
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 20px' }}>

        {/* HEADER */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ color: '#b06090', margin: '0 0 6px', fontSize: '26px', fontWeight: '800' }}>Comunitatea GlowGuide</h1>
          <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>Împărtășește experiențe și sfaturi cu comunitatea</p>
        </div>

        {/* CĂUTARE + SORTARE */}
        <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <input
            value={cautare}
            onChange={e => setCautare(e.target.value)}
            placeholder="Caută în discuții..."
            style={{ flex: 1, minWidth: '200px', padding: '10px 16px', borderRadius: '12px', border: '1.5px solid #e5e7eb', fontSize: '14px', outline: 'none', fontFamily: 'inherit', backgroundColor: 'white' }}
          />
          <div style={{ display: 'flex', gap: '6px' }}>
            {[{ val: 'recent', label: 'Recente' }, { val: 'popular', label: 'Populare' }].map(s => (
              <button key={s.val} onClick={() => setSortare(s.val)} style={{
                padding: '10px 16px', borderRadius: '12px', border: 'none', cursor: 'pointer',
                fontSize: '13px', fontWeight: '600',
                backgroundColor: sortare === s.val ? '#b06090' : 'white',
                color: sortare === s.val ? 'white' : '#888',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
              }}>
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="responsive-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '24px' }}>

          {/* FORMULAR POSTARE */}
          <div style={{ backgroundColor: 'white', padding: '28px', borderRadius: '20px', boxShadow: '0 4px 20px rgba(0,0,0,0.06)', alignSelf: 'start' }}>
            <h3 style={{ marginTop: 0, marginBottom: '20px', color: '#222', fontSize: '16px' }}>Postare nouă</h3>
            <form onSubmit={trimitePostare} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Titlu</label>
                <input type="text" value={titlu} onChange={e => setTitlu(e.target.value)}
                  placeholder="Ex: Experiența mea cu niacinamide..." required
                  style={{ ...inputStyle, marginTop: '6px' }}
                  onFocus={e => e.target.style.borderColor = '#b06090'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
              </div>
              <div>
                <label style={{ fontSize: '12px', fontWeight: '600', color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Conținut</label>
                <textarea value={continut} onChange={e => setContinut(e.target.value)}
                  placeholder="Scrie întrebarea sau experiența ta..." rows="5" required
                  style={{ ...inputStyle, marginTop: '6px', resize: 'vertical' }}
                  onFocus={e => e.target.style.borderColor = '#b06090'}
                  onBlur={e => e.target.style.borderColor = '#e5e7eb'} />
              </div>
              <button type="submit" style={{
                padding: '12px', backgroundColor: '#b06090',
                color: 'white', border: 'none', borderRadius: '10px',
                fontWeight: '700', fontSize: '14px', cursor: 'pointer',
              }}>
                Trimite spre aprobare
              </button>
            </form>
            {mesaj && (
              <div style={{
                marginTop: '14px', padding: '12px', borderRadius: '10px', textAlign: 'center',
                backgroundColor: mesaj.startsWith('Postarea') ? '#f0fdf4' : '#fff5f5',
                color: mesaj.startsWith('Postarea') ? '#16a34a' : '#dc2626', fontSize: '13px', fontWeight: '600'
              }}>
                {mesaj}
              </div>
            )}
          </div>

          {/* FEED POSTĂRI */}
          <div>
            <h3 style={{ marginTop: 0, marginBottom: '16px', color: '#222', fontSize: '16px' }}>
              Discuții {cautare ? `— ${postariAfisate.length} rezultate` : `recente (${postariAfisate.length})`}
            </h3>
            {loadingPostari ? (
              <p style={{ color: '#aaa', textAlign: 'center' }}>Se încarcă...</p>
            ) : postariAfisate.length === 0 ? (
              <div style={{ backgroundColor: 'white', padding: '40px', borderRadius: '20px', textAlign: 'center', color: '#aaa', boxShadow: '0 4px 20px rgba(0,0,0,0.06)' }}>
                <div style={{ fontSize: '48px', marginBottom: '12px' }}>{cautare ? '🔍' : '🌱'}</div>
                <p style={{ margin: 0 }}>{cautare ? 'Nicio postare nu corespunde căutării.' : 'Comunitatea e nouă! Fii primul/prima care postează.'}</p>
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {postariAfisate.map(postare => (
                  <div
                    key={postare.id}
                    onClick={() => navigate(`/forum/${postare.id}`)}
                    style={{
                      backgroundColor: 'white', padding: '20px 22px', borderRadius: '16px',
                      boxShadow: '0 4px 15px rgba(0,0,0,0.05)', cursor: 'pointer',
                      borderLeft: '4px solid #b06090', transition: 'transform 0.15s, box-shadow 0.15s',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = '0 8px 25px rgba(0,0,0,0.1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.05)'; }}
                  >
                    {/* Header postare */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                      <div style={{
                        width: '36px', height: '36px', borderRadius: '50%', flexShrink: 0,
                        backgroundColor: culoareAvatar(postare.autor),
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'white', fontSize: '13px', fontWeight: '700',
                      }}>
                        {initialeAvatar(postare.autor)}
                      </div>
                      <div style={{ flex: 1 }}>
                        <span
                          onClick={e => { e.stopPropagation(); navigate(`/profil-public/${postare.membruId}`); }}
                          style={{ fontSize: '13px', fontWeight: '600', color: '#2d3142', cursor: 'pointer', textDecoration: 'underline', textDecorationColor: 'transparent' }}
                          onMouseEnter={e => e.target.style.color = '#b06090'}
                          onMouseLeave={e => e.target.style.color = '#2d3142'}
                        >
                          {postare.autor}
                        </span>
                        <span style={{ fontSize: '12px', color: '#aaa', marginLeft: '8px' }}>{formateazaData(postare.dataPostare)}</span>
                      </div>
                      {esteNou(postare.dataPostare) && (
                        <span style={{ backgroundColor: '#eef6f4', color: '#4a897e', padding: '2px 10px', borderRadius: '20px', fontSize: '11px', fontWeight: '700' }}>
                          Nou
                        </span>
                      )}
                    </div>
                    <h4 style={{ margin: '0 0 6px', color: '#222', fontSize: '15px', fontWeight: '700' }}>{postare.titlu}</h4>
                    <p style={{
                      margin: '0 0 12px', color: '#666', fontSize: '13px', lineHeight: '1.5',
                      overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical'
                    }}>
                      {postare.continut}
                    </p>
                    <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      {/* Buton Like */}
                      <button
                        onClick={e => toggleLike(e, postare.id)}
                        style={{
                          display: 'flex', alignItems: 'center', gap: '4px',
                          padding: '4px 12px', borderRadius: '20px', border: 'none', cursor: 'pointer',
                          backgroundColor: postare.likedDeMine ? '#fce4ec' : '#f5f5f5',
                          color: postare.likedDeMine ? '#e91e63' : '#888',
                          fontSize: '12px', fontWeight: '600', transition: 'all 0.15s',
                        }}
                      >
                        {postare.likedDeMine ? '❤️' : '🤍'} {postare.numar_likeuri || 0}
                      </button>
                      <span style={{ backgroundColor: '#f7eef4', color: '#b06090', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>
                        💬 {postare.numar_raspunsuri || 0}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}


