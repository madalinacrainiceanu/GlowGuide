import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

export default function Login() {
  const [email, setEmail] = useState('');
  const [parola, setParola] = useState('');
  const [eroare, setEroare] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      // Apelăm backend-ul (Port 5000)
      const raspuns = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        parola
      });
      
      // Salvăm datele utilizatorului în browser (localStorage) ca să știe că e logat
      localStorage.setItem('token', raspuns.data.token);
      localStorage.setItem('user', JSON.stringify(raspuns.data.user));
      
      // Îl trimitem către pagina principală (Dashboard)
      navigate('/dashboard');
    } catch (err) {
      setEroare('Eroare: ' + (err.response?.data?.eroare || 'Nu m-am putut conecta la server.'));
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#fffafb' }}>
      <div style={{ padding: '40px', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)', width: '350px' }}>
        <h2 style={{ textAlign: 'center', color: '#d63384', marginBottom: '20px' }}>✨ GlowGuide Login</h2>
        
        {eroare && <p style={{ color: 'red', textAlign: 'center', fontSize: '14px', marginBottom: '10px' }}>{eroare}</p>}
        
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <input 
            type="email" 
            placeholder="Email-ul tău" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
          />
          <input 
            type="password" 
            placeholder="Parola" 
            value={parola}
            onChange={(e) => setParola(e.target.value)}
            required
            style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ddd' }}
          />
          <button type="submit" style={{ padding: '12px', backgroundColor: '#d63384', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
            Intră în cont
          </button>
        </form>
        <p style={{ textAlign: 'center', marginTop: '16px', fontSize: '14px', color: '#666' }}>
          Nu ai cont?{' '}
          <Link to="/register" style={{ color: '#d63384', fontWeight: 'bold', textDecoration: 'none' }}>
            Înregistrează-te
          </Link>
        </p>
      </div>
    </div>
  );
}
