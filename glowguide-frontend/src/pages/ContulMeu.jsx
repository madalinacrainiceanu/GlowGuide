import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CULORI_AVATAR = ['#b06090', '#6aab9e', '#e8956d', '#7b68ee', '#e91e8c', '#00897b'];

function getculoareAvatar(nume) {
  let hash = 0;
  for (let i = 0; i < (nume || '').length; i++) hash = nume.charCodeAt(i) + ((hash << 5) - hash);
  return CULORI_AVATAR[Math.abs(hash) % CULORI_AVATAR.length];
}

export default function ContulMeu() {
  const navigate = useNavigate();
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  const [cont, setCont] = useState(null);
  const [loading, setLoading] = useState(true);
  const [eroare, setEroare] = useState('');

  // Editare nume
  const [editNume, setEditNume] = useState(false);
  const [numeNou, setNumeNou] = useState('');
  const [prenumeNou, setPrenumeNou] = useState('');
  const [mesajNume, setMesajNume] = useState('');

  // Schimbă parola
  const [sectParola, setSectParola] = useState(false);
  const [parolaVeche, setParolaVeche] = useState('');
  const [parolaNoua, setParolaNoua] = useState('');
  const [parolaConfirm, setParolaConfirm] = useState('');
  const [mesajParola, setMesajParola] = useState('');

  // Dark mode
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');

  // Ștergere cont
  const [confirmStergere, setConfirmStergere] = useState(false);
  const [mesajStergere, setMesajStergere] = useState('');

  useEffect(() => {
    if (!user) { navigate('/login'); return; }
    axios.get(`http://localhost:5000/api/auth/cont/${user.id}`)
      .then(r => {
        setCont(r.data);
        setNumeNou(r.data.nume || '');
        setPrenumeNou(r.data.prenume || '');
      })
      .catch(() => setEroare('Nu am putut încărca datele contului.'))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    document.body.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('darkMode', darkMode);
  }, [darkMode]);

  const salveazaNume = async () => {
    try {
      await axios.put('http://localhost:5000/api/auth/editare-nume', {
        membruId: user.id, numeNou, prenumeNou
      });
      setCont(prev => ({ ...prev, nume: numeNou, prenume: prenumeNou }));
      setMesajNume('✅ Numele a fost actualizat!');
      setEditNume(false);
      setTimeout(() => setMesajNume(''), 3000);
    } catch (e) {
      setMesajNume('❌ ' + (e.response?.data?.eroare || 'Eroare la salvare.'));
    }
  };

  const schimbaParola = async () => {
    if (parolaNoua !== parolaConfirm) { setMesajParola('❌ Parolele noi nu se potrivesc.'); return; }
    if (parolaNoua.length < 6) { setMesajParola('❌ Parola trebuie să aibă minim 6 caractere.'); return; }
    try {
      await axios.put('http://localhost:5000/api/auth/schimba-parola', {
        membruId: user.id, parolaVeche, parolaNoua
      });
      setMesajParola('✅ Parola a fost schimbată!');
      setParolaVeche(''); setParolaNoua(''); setParolaConfirm('');
      setSectParola(false);
      setTimeout(() => setMesajParola(''), 3000);
    } catch (e) {
      setMesajParola('❌ ' + (e.response?.data?.eroare || 'Eroare la schimbarea parolei.'));
    }
  };

  const stergeContul = async () => {
    try {
      await axios.delete('http://localhost:5000/api/auth/sterge-cont', { data: { membruId: user.id } });
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      navigate('/');
    } catch (e) {
      setMesajStergere('❌ ' + (e.response?.data?.eroare || 'Eroare la ștergerea contului.'));
    }
  };

  const bg = darkMode ? '#1a1a2e' : '#f7f4f0';
  const card = darkMode ? '#16213e' : 'white';
  const text = darkMode ? '#e8e8f0' : '#333';
  const textMuted = darkMode ? '#9999bb' : '#888';
  const border = darkMode ? '#2a2a4a' : '#f0eaf4';
  const inputBg = darkMode ? '#0f3460' : '#fafafa';
  const inputBorder = darkMode ? '#2a2a4a' : '#e0d8ec';

  if (loading) return (
    <div style={{ minHeight: '100vh', backgroundColor: bg, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#b06090', fontSize: '16px' }}>Se încarcă...</p>
    </div>
  );

  const initiala = `${cont?.prenume?.[0] || ''}${cont?.nume?.[0] || ''}`.toUpperCase() || '?';
  const culoare = getculoareAvatar(cont?.prenume || '');
  const dataInregistrare = cont?.dataCreare ? new Date(cont.dataCreare).toLocaleDateString('ro-RO', { year: 'numeric', month: 'long', day: 'numeric' }) : '—';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: bg, transition: 'background 0.3s' }}>
      <Navbar />
      <div style={{ maxWidth: '720px', margin: '0 auto', padding: '32px 20px' }}>

        {/* HEADER */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ color: '#b06090', margin: '0 0 4px', fontSize: '26px', fontWeight: '800' }}>⚙️ Contul Meu</h1>
          <p style={{ color: textMuted, margin: 0, fontSize: '14px' }}>Gestionează profilul și setările tale</p>
        </div>

        {eroare && <div style={{ backgroundColor: '#fff5f5', color: '#dc2626', padding: '12px', borderRadius: '10px', marginBottom: '16px' }}>{eroare}</div>}

        {/* CARD PROFIL */}
        <div style={{ backgroundColor: card, borderRadius: '20px', padding: '28px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', marginBottom: '16px', border: `1px solid ${border}` }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', marginBottom: '24px' }}>
            {/* Avatar */}
            <div style={{
              width: '72px', height: '72px', borderRadius: '50%',
              backgroundColor: culoare, color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '26px', fontWeight: '800', flexShrink: 0,
              boxShadow: `0 4px 15px ${culoare}55`
            }}>
              {initiala}
            </div>
            <div>
              <h2 style={{ margin: '0 0 4px', fontSize: '20px', fontWeight: '800', color: text }}>
                {cont?.prenume} {cont?.nume}
              </h2>
              <p style={{ margin: '0 0 2px', color: textMuted, fontSize: '14px' }}>{cont?.email}</p>
              <span style={{
                fontSize: '11px', padding: '3px 10px', borderRadius: '20px',
                backgroundColor: cont?.rol === 'admin' ? '#fdecea' : '#f3e5f5',
                color: cont?.rol === 'admin' ? '#c0392b' : '#7b1fa2',
                fontWeight: '700', textTransform: 'uppercase'
              }}>
                {cont?.rol === 'admin' ? '🛡️ Admin' : '👤 Membru'}
              </span>
            </div>
          </div>

          {/* Statistici */}
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '20px' }}>
            {[
              { label: 'Intrări jurnal', value: cont?.statistici?.intrariJurnal || 0, emoji: '📔' },
              { label: 'Postări forum', value: cont?.statistici?.postariPublicate || 0, emoji: '💬' },
              { label: 'ID cont', value: `#${cont?.membruId || '—'}`, emoji: '🆔', small: true },
            ].map((s, i) => (
              <div key={i} style={{
                backgroundColor: darkMode ? '#0f3460' : '#faf7fd',
                borderRadius: '12px', padding: '14px', textAlign: 'center',
                border: `1px solid ${border}`
              }}>
                <div style={{ fontSize: '22px', marginBottom: '4px' }}>{s.emoji}</div>
                <div style={{ fontSize: s.small ? '11px' : '22px', fontWeight: '800', color: '#b06090' }}>{s.value}</div>
                <div style={{ fontSize: '11px', color: textMuted, marginTop: '2px' }}>{s.label}</div>
              </div>
            ))}
          </div>

          {/* Editare nume */}
          {!editNume ? (
            <button
              onClick={() => setEditNume(true)}
              style={{ padding: '9px 20px', backgroundColor: 'transparent', color: '#b06090', border: '1.5px solid #b06090', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}
            >
              ✏️ Editează numele
            </button>
          ) : (
            <div style={{ backgroundColor: darkMode ? '#0f3460' : '#faf7fd', borderRadius: '12px', padding: '16px', border: `1px solid ${border}` }}>
              <p style={{ margin: '0 0 12px', fontWeight: '700', color: text, fontSize: '14px' }}>Editează numele</p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '12px' }}>
                <input value={prenumeNou} onChange={e => setPrenumeNou(e.target.value)}
                  placeholder="Prenume" style={inputStyle(inputBg, inputBorder, text)} />
                <input value={numeNou} onChange={e => setNumeNou(e.target.value)}
                  placeholder="Nume" style={inputStyle(inputBg, inputBorder, text)} />
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button onClick={salveazaNume} style={btnPrimary}>Salvează</button>
                <button onClick={() => setEditNume(false)} style={btnSecondary(border, textMuted)}>Anulează</button>
              </div>
            </div>
          )}
          {mesajNume && <p style={{ marginTop: '10px', fontSize: '13px', color: mesajNume.startsWith('✅') ? '#16a34a' : '#dc2626' }}>{mesajNume}</p>}
        </div>

        {/* SCHIMBĂ PAROLA */}
        <div style={{ backgroundColor: card, borderRadius: '20px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', marginBottom: '16px', border: `1px solid ${border}` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h3 style={{ margin: '0 0 2px', fontSize: '15px', fontWeight: '700', color: text }}>🔒 Schimbă parola</h3>
              <p style={{ margin: 0, fontSize: '12px', color: textMuted }}>Actualizează parola contului tău</p>
            </div>
            <button onClick={() => setSectParola(!sectParola)} style={btnSecondary(border, textMuted)}>
              {sectParola ? 'Anulează' : 'Modifică'}
            </button>
          </div>

          {sectParola && (
            <div style={{ marginTop: '16px' }}>
              {[
                { val: parolaVeche, set: setParolaVeche, ph: 'Parola actuală' },
                { val: parolaNoua, set: setParolaNoua, ph: 'Parola nouă (min. 6 caractere)' },
                { val: parolaConfirm, set: setParolaConfirm, ph: 'Confirmă parola nouă' },
              ].map((f, i) => (
                <input key={i} type="password" value={f.val} onChange={e => f.set(e.target.value)}
                  placeholder={f.ph}
                  style={{ ...inputStyle(inputBg, inputBorder, text), width: '100%', boxSizing: 'border-box', marginBottom: '10px' }} />
              ))}
              <button onClick={schimbaParola} style={btnPrimary}>Schimbă parola</button>
              {mesajParola && <p style={{ marginTop: '10px', fontSize: '13px', color: mesajParola.startsWith('✅') ? '#16a34a' : '#dc2626' }}>{mesajParola}</p>}
            </div>
          )}
        </div>

        {/* SETĂRI */}
        <div style={{ backgroundColor: card, borderRadius: '20px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', marginBottom: '16px', border: `1px solid ${border}` }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '15px', fontWeight: '700', color: text }}>🎨 Setări</h3>

          {/* Dark mode toggle */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0', borderBottom: `1px solid ${border}` }}>
            <div>
              <p style={{ margin: '0 0 2px', fontSize: '14px', fontWeight: '600', color: text }}>
                {darkMode ? '🌙 Mod întunecat' : '☀️ Mod luminos'}
              </p>
              <p style={{ margin: 0, fontSize: '12px', color: textMuted }}>Schimbă tema aplicației</p>
            </div>
            <div
              onClick={() => setDarkMode(!darkMode)}
              style={{
                width: '48px', height: '26px', borderRadius: '13px',
                backgroundColor: darkMode ? '#b06090' : '#e0d0e8',
                cursor: 'pointer', position: 'relative', transition: 'background 0.3s',
                flexShrink: 0
              }}
            >
              <div style={{
                width: '20px', height: '20px', borderRadius: '50%', backgroundColor: 'white',
                position: 'absolute', top: '3px',
                left: darkMode ? '25px' : '3px',
                transition: 'left 0.3s', boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
              }} />
            </div>
          </div>

          {/* Profil dermatologic */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 0' }}>
            <div>
              <p style={{ margin: '0 0 2px', fontSize: '14px', fontWeight: '600', color: text }}>👤 Profil dermatologic</p>
              <p style={{ margin: 0, fontSize: '12px', color: textMuted }}>Actualizează tipul de ten și problemele pielii</p>
            </div>
            <button onClick={() => navigate('/profil')} style={btnSecondary(border, textMuted)}>Editează</button>
          </div>
        </div>

        {/* ZONA PERICULOASĂ */}
        <div style={{ backgroundColor: card, borderRadius: '20px', padding: '24px', border: '1.5px solid #fecaca', marginBottom: '32px' }}>
          <h3 style={{ margin: '0 0 4px', fontSize: '15px', fontWeight: '700', color: '#dc2626' }}>⚠️ Zonă periculoasă</h3>
          <p style={{ margin: '0 0 16px', fontSize: '12px', color: textMuted }}>Această acțiune este ireversibilă. Toate datele tale vor fi șterse permanent.</p>

          {!confirmStergere ? (
            <button
              onClick={() => setConfirmStergere(true)}
              style={{ padding: '9px 20px', backgroundColor: 'transparent', color: '#dc2626', border: '1.5px solid #fca5a5', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', fontWeight: '600' }}
            >
              🗑️ Șterge contul
            </button>
          ) : (
            <div style={{ backgroundColor: '#fff5f5', borderRadius: '12px', padding: '16px' }}>
              <p style={{ margin: '0 0 12px', color: '#dc2626', fontWeight: '600', fontSize: '14px' }}>
                Ești sigură? Această acțiune nu poate fi anulată!
              </p>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button onClick={stergeContul} style={{ padding: '9px 20px', backgroundColor: '#dc2626', color: 'white', border: 'none', borderRadius: '10px', cursor: 'pointer', fontSize: '13px', fontWeight: '700' }}>
                  Da, șterge contul
                </button>
                <button onClick={() => setConfirmStergere(false)} style={btnSecondary(border, textMuted)}>
                  Anulează
                </button>
              </div>
              {mesajStergere && <p style={{ marginTop: '10px', color: '#dc2626', fontSize: '13px' }}>{mesajStergere}</p>}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

const inputStyle = (bg, border, color) => ({
  padding: '10px 14px', borderRadius: '10px', border: `1.5px solid ${border}`,
  fontSize: '14px', backgroundColor: bg, color, outline: 'none', fontFamily: 'inherit',
});

const btnPrimary = {
  padding: '9px 20px', backgroundColor: '#b06090', color: 'white',
  border: 'none', borderRadius: '10px', cursor: 'pointer',
  fontSize: '13px', fontWeight: '700',
};

const btnSecondary = (border, color) => ({
  padding: '9px 16px', backgroundColor: 'transparent', color,
  border: `1.5px solid ${border}`, borderRadius: '10px',
  cursor: 'pointer', fontSize: '13px', fontWeight: '600',
});
