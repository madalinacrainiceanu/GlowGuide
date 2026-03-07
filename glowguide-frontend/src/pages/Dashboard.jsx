import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CARDURI = [
  {
    path: '/profil',
    emoji: '👤',
    titlu: 'Profilul Meu',
    descriere: 'Completează chestionarul și descoperă tipul tău de ten',
    gradient: 'linear-gradient(135deg, #fdf0f8, #f5e0ee)',
    culoare: '#8f4d74',
  },
  {
    path: '/rutina',
    emoji: '💆',
    titlu: 'Rutina Mea',
    descriere: 'Produse recomandate special pentru tipul tău de ten',
    gradient: 'linear-gradient(135deg, #eef6f4, #d8ede8)',
    culoare: '#4a897e',
  },
  {
    path: '/jurnal',
    emoji: '📔',
    titlu: 'Jurnal de Progres',
    descriere: 'Urmărește evoluția tenului tău cu grafice și notițe',
    gradient: 'linear-gradient(135deg, #fef6ef, #fce7d8)',
    culoare: '#b5622a',
  },
  {
    path: '/forum',
    emoji: '💬',
    titlu: 'Comunitate',
    descriere: 'Sfaturi, experiențe și discuții cu alte utilizatoare',
    gradient: 'linear-gradient(135deg, #eff5fd, #d8e8f8)',
    culoare: '#3a7aaa',
  },
  {
    path: '/chatbot',
    emoji: '🤖',
    titlu: 'GlowBot AI',
    descriere: 'Asistentul tău personal de skincare — întreabă orice!',
    gradient: 'linear-gradient(135deg, #f4f0fc, #e6dff8)',
    culoare: '#5b4a9a',
  },
];

export default function Dashboard() {
  const navigate = useNavigate();
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  if (!user) return null;

  const prenume = user.prenume || user.email?.split('@')[0] || 'frumoasă';
  const ora = new Date().getHours();
  const salut = ora < 12 ? 'Bună dimineața' : ora < 18 ? 'Bună ziua' : 'Bună seara';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7f4f0' }}>
      <Navbar />
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 20px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #b06090 0%, #6aab9e 100%)',
          borderRadius: '20px', padding: '32px 36px', marginBottom: '36px',
          color: 'white', position: 'relative', overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', right: '30px', top: '50%', transform: 'translateY(-50%)', fontSize: '80px', opacity: 0.15 }}>🌸</div>
          <p style={{ margin: '0 0 4px', fontSize: '14px', opacity: 0.85 }}>{salut},</p>
          <h1 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: '800' }}>{prenume} ✨</h1>
          <p style={{ margin: 0, opacity: 0.85, fontSize: '14px' }}>Cum se simte tenul tău azi? Continuă rutina și urmărește progresul!</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {CARDURI.map(card => (
            <div key={card.path} onClick={() => navigate(card.path)}
              style={{ background: card.gradient, borderRadius: '16px', padding: '28px', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.06)'; }}
            >
              <div style={{ fontSize: '36px', marginBottom: '14px' }}>{card.emoji}</div>
              <h3 style={{ margin: '0 0 8px', color: card.culoare, fontSize: '17px', fontWeight: '700' }}>{card.titlu}</h3>
              <p style={{ margin: 0, color: '#555', fontSize: '13px', lineHeight: '1.5' }}>{card.descriere}</p>
              <div style={{ marginTop: '16px', color: card.culoare, fontSize: '13px', fontWeight: '600' }}>Accesează →</div>
            </div>
          ))}
          {user.rol === 'admin' && (
            <div onClick={() => navigate('/admin/moderare')}
              style={{ background: 'linear-gradient(135deg, #ffebee, #ffcdd2)', borderRadius: '16px', padding: '28px', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 4px 15px rgba(0,0,0,0.06)', border: '2px dashed #ef9a9a' }}
              onMouseEnter={e => { e.currentTarget.style.transform = 'translateY(-4px)'; e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.12)'; }}
              onMouseLeave={e => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = '0 4px 15px rgba(0,0,0,0.06)'; }}
            >
              <div style={{ fontSize: '36px', marginBottom: '14px' }}>🛡️</div>
              <h3 style={{ margin: '0 0 8px', color: '#c62828', fontSize: '17px', fontWeight: '700' }}>Panou Admin</h3>
              <p style={{ margin: 0, color: '#555', fontSize: '13px', lineHeight: '1.5' }}>Aprobă sau respinge postările din forum</p>
              <div style={{ marginTop: '16px', color: '#c62828', fontSize: '13px', fontWeight: '600' }}>Accesează →</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
