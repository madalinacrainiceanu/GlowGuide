import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import API_URL from '../api';

export default function Register() {
  const [pas, setPas] = useState(1); // 1 = formular, 2 = cod email
  const [nume, setNume] = useState('');
  const [prenume, setPrenume] = useState('');
  const [email, setEmail] = useState('');
  const [parola, setParola] = useState('');
  const [confirmaParola, setConfirmaParola] = useState('');
  const [cod, setCod] = useState('');
  const [eroare, setEroare] = useState('');
  const [succes, setSucces] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleTrimiteCodum = async (e) => {
    e.preventDefault();
    setEroare('');
    if (parola !== confirmaParola) return setEroare('Parolele nu coincid!');
    if (parola.length < 6) return setEroare('Parola trebuie să aibă cel puțin 6 caractere!');

    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/auth/trimite-cod`, { email, parola, nume, prenume });
      setSucces(`Cod trimis pe ${email}! Verifică inbox-ul (și Spam).`);
      setPas(2);
    } catch (err) {
      setEroare(err.response?.data?.eroare || 'Eroare la trimiterea codului.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerificaCod = async (e) => {
    e.preventDefault();
    setEroare('');
    setLoading(true);
    try {
      await axios.post(`${API_URL}/api/auth/verifica-cod`, { email, cod });
      setSucces('Cont creat cu succes! Te redirecționăm...');
      setTimeout(() => navigate('/'), 2000);
    } catch (err) {
      setEroare(err.response?.data?.eroare || 'Cod incorect sau expirat.');
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    padding: '10px 14px',
    borderRadius: '8px',
    border: '1px solid #ddd',
    fontSize: '14px',
    width: '100%',
    boxSizing: 'border-box'
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', backgroundColor: '#f7f4f0', padding: '20px' }}>
      <div style={{ padding: '40px', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', width: '100%', maxWidth: '420px' }}>
        
        <h2 style={{ textAlign: 'center', color: '#b06090', marginBottom: '6px' }}>GlowGuide</h2>
        <p style={{ textAlign: 'center', color: '#888', fontSize: '13px', marginBottom: '24px' }}>
          {pas === 1 ? 'Creează-ți contul' : `Introdu codul primit pe ${email}`}
        </p>

        {/* Indicator pași */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '8px', marginBottom: '24px' }}>
          {[1, 2].map(p => (
            <div key={p} style={{
              width: '32px', height: '6px', borderRadius: '3px',
              backgroundColor: pas >= p ? '#b06090' : '#e8d8e4'
            }} />
          ))}
        </div>

        {eroare && (
          <p style={{ color: '#c0392b', fontSize: '13px', marginBottom: '12px', backgroundColor: '#fff5f5', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
            {eroare}
          </p>
        )}
        {succes && (
          <p style={{ color: '#27ae60', fontSize: '13px', marginBottom: '12px', backgroundColor: '#f0fff4', padding: '10px', borderRadius: '8px', textAlign: 'center' }}>
            {succes}
          </p>
        )}

        {/* PAS 1: Formular */}
        {pas === 1 && (
          <form onSubmit={handleTrimiteCodum} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input type="text" placeholder="Nume" value={nume} onChange={e => setNume(e.target.value)} required style={{ ...inputStyle }} />
              <input type="text" placeholder="Prenume" value={prenume} onChange={e => setPrenume(e.target.value)} required style={{ ...inputStyle }} />
            </div>
            <input type="email" placeholder="Email-ul tău" value={email} onChange={e => setEmail(e.target.value)} required style={inputStyle} />
            <input type="password" placeholder="Parolă (min. 6 caractere)" value={parola} onChange={e => setParola(e.target.value)} required style={inputStyle} />
            <input type="password" placeholder="Confirmă parola" value={confirmaParola} onChange={e => setConfirmaParola(e.target.value)} required style={inputStyle} />
            <button type="submit" disabled={loading} style={{
              padding: '12px', backgroundColor: loading ? '#d4b0c4' : '#b06090',
              color: 'white', border: 'none', borderRadius: '8px',
              fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '15px'
            }}>
              {loading ? 'Se trimite codul...' : 'Trimite cod de verificare'}
            </button>
          </form>
        )}

        {/* PAS 2: Cod email */}
        {pas === 2 && (
          <form onSubmit={handleVerificaCod} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <p style={{ textAlign: 'center', color: '#555', fontSize: '14px', margin: '0 0 8px' }}>
              Introdu codul de <strong>6 cifre</strong> primit pe email:
            </p>
            <input
              type="text"
              placeholder="Ex: 847291"
              value={cod}
              onChange={e => setCod(e.target.value)}
              maxLength={6}
              required
              style={{ ...inputStyle, textAlign: 'center', fontSize: '22px', fontWeight: 'bold', letterSpacing: '8px' }}
            />
            <button type="submit" disabled={loading} style={{
              padding: '12px', backgroundColor: loading ? '#d4b0c4' : '#b06090',
              color: 'white', border: 'none', borderRadius: '8px',
              fontWeight: 'bold', cursor: loading ? 'not-allowed' : 'pointer', fontSize: '15px'
            }}>
              {loading ? 'Se verifică...' : 'Verifică și creează cont'}
            </button>
            <button type="button" onClick={() => { setPas(1); setEroare(''); setSucces(''); }} style={{
              padding: '10px', backgroundColor: 'transparent', color: '#b06090',
              border: '1px solid #b06090', borderRadius: '8px', cursor: 'pointer', fontSize: '13px'
            }}>
              ← Înapoi (schimbă datele)
            </button>
          </form>
        )}

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#666' }}>
          Ai deja cont?{' '}
          <Link to="/login" style={{ color: '#b06090', fontWeight: 'bold', textDecoration: 'none' }}>
            Intră în cont
          </Link>
        </p>
      </div>
    </div>
  );
}

