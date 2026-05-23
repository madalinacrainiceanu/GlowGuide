import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import API_URL from '../api';

export default function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [badgeAdmin, setBadgeAdmin] = useState(0);

  // Dark mode: urmărește tema din localStorage prin eveniment custom
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('darkMode') === 'true');
  // User: urmărește datele actualizate din localStorage (ex: după editare nume)
  const [userData, setUserData] = useState(() => localStorage.getItem('user'));
  const user = userData ? JSON.parse(userData) : null;

  useEffect(() => {
    const themeHandler = () => setDarkMode(localStorage.getItem('darkMode') === 'true');
    const userHandler = () => setUserData(localStorage.getItem('user'));
    window.addEventListener('glowguide-theme-change', themeHandler);
    window.addEventListener('glowguide-user-update', userHandler);
    return () => {
      window.removeEventListener('glowguide-theme-change', themeHandler);
      window.removeEventListener('glowguide-user-update', userHandler);
    };
  }, []);

  useEffect(() => {
    if (user?.rol === 'admin') {
      axios.get(`${API_URL}/api/forum/admin/numar-asteptare`)
        .then(r => setBadgeAdmin(r.data.numar))
        .catch(() => {});
    }
  }, [location.pathname]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  const linkuri = [
    { path: '/dashboard', label: '🏠 Acasă' },
    { path: '/profil', label: '👤 Profil' },
    { path: '/rutina', label: '💆 Rutina' },
    { path: '/jurnal', label: '📔 Jurnal' },
    { path: '/forum', label: '💬 Forum' },
    { path: '/chatbot', label: '🤖 GlowBot' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <>
      <nav style={{
        background: darkMode ? '#16213e' : 'linear-gradient(90deg, #f7d9ee 0%, #fde8d8 100%)',
        boxShadow: '0 2px 20px rgba(176,96,144,0.18)',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        padding: '0 24px',
      }}>
        <div style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '62px',
        }}>
          {/* Logo */}
          <div
            onClick={() => navigate('/dashboard')}
            style={{ cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
          >
            <span style={{ fontSize: '22px' }}>🌸</span>
            <span style={{ fontWeight: '800', fontSize: '20px', color: '#b06090', letterSpacing: '-0.5px' }}>
              GlowGuide
            </span>
          </div>

          {/* Linkuri desktop */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '4px', '@media(max-width:768px)': { display: 'none' } }}
            className="nav-desktop">
            {linkuri.map(l => (
              <button
                key={l.path}
                onClick={() => navigate(l.path)}
                className="nav-link"
                style={{
                  padding: '6px 14px',
                  fontSize: '1.05rem',
                  fontWeight: isActive(l.path) ? '700' : '600',
                  letterSpacing: '0.3px',
                  backgroundColor: isActive(l.path) ? '#f7eef4' : undefined,
                  color: isActive(l.path) ? '#b06090' : (darkMode ? '#c0b8d0' : '#7a7a8c'),
                }}
              >
                {l.label}
              </button>
            ))}
            {user?.rol === 'admin' && (
              <button
                onClick={() => navigate('/admin/moderare')}
                style={{
                  padding: '6px 12px', border: 'none', borderRadius: '8px',
                  cursor: 'pointer', fontSize: '13px', fontWeight: '600',
                  backgroundColor: isActive('/admin/moderare') ? '#fdecea' : 'transparent',
                  color: '#c0392b', position: 'relative',
                }}
              >
                🛡️ Admin
                {badgeAdmin > 0 && (
                  <span style={{
                    position: 'absolute', top: '-4px', right: '-4px',
                    backgroundColor: '#e53935', color: 'white',
                    borderRadius: '50%', width: '18px', height: '18px',
                    fontSize: '10px', fontWeight: '800',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                  }}>
                    {badgeAdmin > 9 ? '9+' : badgeAdmin}
                  </span>
                )}
              </button>
            )}
          </div>

          {/* Cont + Logout */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <button
              onClick={() => navigate('/cont')}
              style={{
                width: '36px', height: '36px', borderRadius: '50%',
                backgroundColor: '#b06090', color: 'white',
                border: 'none', cursor: 'pointer', fontSize: '14px', fontWeight: '800',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                boxShadow: isActive('/cont') ? '0 0 0 2px #b06090, 0 0 0 4px #f7eef4' : 'none',
              }}
              title="Contul meu"
            >
              {user ? `${user.prenume?.[0] || user.email?.[0] || '?'}`.toUpperCase() : '?'}
            </button>
            <button
              onClick={handleLogout}
              style={{
                padding: '7px 16px',
                backgroundColor: 'transparent',
                color: '#b06090',
                border: '1.5px solid #b06090',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '13px',
                fontWeight: '600',
              }}
            >
              Ieși
            </button>
            {/* Hamburger mobil */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="nav-hamburger"
              style={{
                display: 'none',
                background: 'none',
                border: 'none',
                fontSize: '24px',
                cursor: 'pointer',
                color: '#b06090',
              }}
            >
              {menuOpen ? '✕' : '☰'}
            </button>
          </div>
        </div>

        {/* Meniu mobil */}
        {menuOpen && (
          <div style={{
            borderTop: `1px solid ${darkMode ? '#2a2a4a' : '#e8e3dc'}`,
            backgroundColor: darkMode ? '#16213e' : 'white',
            padding: '12px 0',
            display: 'flex',
            flexDirection: 'column',
            gap: '4px',
          }}>
            {linkuri.map(l => (
              <button
                key={l.path}
                onClick={() => { navigate(l.path); setMenuOpen(false); }}
                style={{
                  padding: '12px 16px',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '15px',
                  fontWeight: isActive(l.path) ? '700' : '500',
                  backgroundColor: isActive(l.path) ? '#f7eef4' : 'transparent',
                  color: isActive(l.path) ? '#b06090' : (darkMode ? '#c0b8d0' : '#2d3142'),
                  textAlign: 'left',
                }}
              >
                {l.label}
              </button>
            ))}
            {user?.rol === 'admin' && (
              <button
                onClick={() => { navigate('/admin/moderare'); setMenuOpen(false); }}
                style={{
                  padding: '12px 16px', border: 'none', borderRadius: '8px',
                  cursor: 'pointer', fontSize: '15px', backgroundColor: 'transparent',
                  color: '#e53935', fontWeight: '600', textAlign: 'left',
                }}
              >
                🛡️ Admin Moderare
              </button>
            )}
            <button
              onClick={() => { navigate('/cont'); setMenuOpen(false); }}
              style={{
                padding: '12px 16px', border: 'none', borderRadius: '8px',
                cursor: 'pointer', fontSize: '15px',
                backgroundColor: isActive('/cont') ? '#f7eef4' : 'transparent',
                color: isActive('/cont') ? '#b06090' : '#2d3142',
                textAlign: 'left', fontWeight: isActive('/cont') ? '700' : '500',
              }}
            >
              ⚙️ Contul Meu
            </button>
          </div>
        )}
      </nav>

      {/* CSS responsive */}
      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
      `}</style>
    </>
  );
}
