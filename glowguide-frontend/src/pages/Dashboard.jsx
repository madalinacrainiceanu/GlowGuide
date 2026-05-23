import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const CARDURI = [
  {
    path: '/profil',
    emoji: '👤',
    titlu: 'Profilul Meu',
    descriere: 'Completează chestionarul și descoperă tipul tău de ten',
    bg: '#fce8f3',
    culoare: '#8f4d74',
  },
  {
    path: '/rutina',
    emoji: '🧴',
    titlu: 'Rutina Mea',
    descriere: 'Produse recomandate special pentru tipul tău de ten',
    bg: '#e8f4f0',
    culoare: '#4a897e',
  },
  {
    path: '/jurnal',
    emoji: '📔',
    titlu: 'Jurnal de Progres',
    descriere: 'Urmărește evoluția tenului tău cu grafice și notițe',
    bg: '#fef0e6',
    culoare: '#b5622a',
  },
  {
    path: '/forum',
    emoji: '💬',
    titlu: 'Comunitate',
    descriere: 'Sfaturi, experiențe și discuții cu alți utilizatori',
    bg: '#e8f0fc',
    culoare: '#3a7aaa',
  },
  {
    path: '/chatbot',
    emoji: '🤖',
    titlu: 'GlowBot AI',
    descriere: 'Asistentul tău personal de skincare — întreabă orice!',
    bg: '#f0ecfc',
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
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
      <Navbar />
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '32px 20px' }}>
        <div style={{
          background: 'linear-gradient(135deg, #b06090 0%, #e8956d 100%)',
          borderRadius: '16px', padding: '32px 36px', marginBottom: '36px',
          color: 'white',
        }}>
          <p style={{ margin: '0 0 4px', fontSize: '14px', opacity: 0.85 }}>{salut},</p>
          <h1 style={{ margin: '0 0 8px', fontSize: '28px', fontWeight: '800' }}>{prenume}</h1>
          <p style={{ margin: 0, opacity: 0.85, fontSize: '14px' }}>Continuă rutina și urmărește progresul tenului tău.</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
          {CARDURI.map(card => (
            <div key={card.path} onClick={() => navigate(card.path)}
              style={{ background: card.bg, borderRadius: '16px', padding: '28px', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}
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
              style={{ backgroundColor: '#fdecea', borderRadius: '16px', padding: '28px', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '2px dashed #f5a5a5' }}
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
