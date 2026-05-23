import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import API_URL from '../api';

export default function Login() {
  const [email, setEmail] = useState('');
  const [parola, setParola] = useState('');
  const [eroare, setEroare] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setEroare('');
    try {
      const raspuns = await axios.post(`${API_URL}/api/auth/login`, { email, parola });
      localStorage.setItem('token', raspuns.data.token);
      localStorage.setItem('user', JSON.stringify(raspuns.data.user));
      navigate('/dashboard');
    } catch (err) {
      setEroare(err.response?.data?.eroare || 'Nu m-am putut conecta la server.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: 'var(--bg)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px'
    }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        {/* Logo */}
        <div style={{ textAlign: 'center', marginBottom: '32px' }}>
          <div style={{ fontSize: '28px', marginBottom: '8px' }}>🌸</div>
          <h1 style={{ color: '#b06090', fontSize: '32px', fontWeight: '800', margin: 0, letterSpacing: '-1px' }}>GlowGuide</h1>
          <p style={{ color: '#999', marginTop: '6px', fontSize: '14px' }}>Rutina ta de îngrijire personalizată</p>
        </div>

        {/* Card */}
        <div style={{
          backgroundColor: 'white', borderRadius: '20px',
          boxShadow: '0 20px 60px rgba(45,49,66,0.10)', padding: '36px'
        }}>
          <h2 style={{ color: '#222', fontSize: '20px', fontWeight: '700', marginBottom: '24px', textAlign: 'center' }}>
            Bun venit înapoi
          </h2>

          {eroare && (
            <div style={{
              backgroundColor: '#fff5f5', border: '1px solid #fecaca',
              borderRadius: '10px', padding: '12px 16px', marginBottom: '16px',
              color: '#dc2626', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '8px'
            }}>
              {eroare}
            </div>
          )}

          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Email</label>
              <input
                type="email" value={email} onChange={e => setEmail(e.target.value)} required
                placeholder="exemplu@email.com"
                style={{
                  width: '100%', padding: '12px 14px', marginTop: '6px',
                  border: '1.5px solid #e5e7eb', borderRadius: '10px',
                  fontSize: '14px', boxSizing: 'border-box', outline: 'none',
                  transition: 'border-color 0.2s'
                }}
                onFocus={e => e.target.style.borderColor = '#b06090'}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
            <div>
              <label style={{ fontSize: '12px', fontWeight: '600', color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Parolă</label>
              <input
                type="password" value={parola} onChange={e => setParola(e.target.value)} required
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '12px 14px', marginTop: '6px',
                  border: '1.5px solid #e5e7eb', borderRadius: '10px',
                  fontSize: '14px', boxSizing: 'border-box', outline: 'none',
                }}
                onFocus={e => e.target.style.borderColor = '#b06090'}
                onBlur={e => e.target.style.borderColor = '#e5e7eb'}
              />
            </div>
            <button
              type="submit" disabled={loading}
              style={{
                padding: '13px', marginTop: '4px',
                background: loading ? '#d4b0c4' : 'linear-gradient(135deg, #b06090 0%, #e8956d 100%)',
                color: 'white', border: 'none', borderRadius: '10px',
                fontWeight: '700', fontSize: '15px', cursor: loading ? 'not-allowed' : 'pointer',
                boxShadow: '0 4px 15px rgba(176,96,144,0.25)', transition: 'all 0.2s ease'
              }}
            >
              {loading ? 'Se încarcă...' : 'Intră în cont →'}
            </button>
          </form>

          <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '14px', color: '#888' }}>
            Nu ai cont?{' '}
            <Link to="/register" style={{ color: '#b06090', fontWeight: '700', textDecoration: 'none' }}>
              Înregistrează-te gratuit
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

