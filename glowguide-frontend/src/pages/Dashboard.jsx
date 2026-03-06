import { useNavigate } from 'react-router-dom';

export default function Dashboard() {
  const navigate = useNavigate();
  
  // Citim datele userului salvate la login
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/'); // Ne întoarcem la pagina principală/login
  };

  if (!user) {
    return <div style={{textAlign: 'center', marginTop:'50px'}}>Te rog să te loghezi mai întâi!</div>;
  }

  return (
    <div style={{ padding: '40px', maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ color: '#d63384' }}>✨ Bun venit, {user.email}!</h1>
        <button onClick={handleLogout} style={{ padding: '8px 15px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>
          Ieși din cont
        </button>
      </div>
      
      <div style={{ marginTop: '30px', padding: '20px', backgroundColor: 'white', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <h3>Meniul tău:</h3>
        <ul style={{ lineHeight: '2', marginTop: '15px', paddingLeft: '20px' }}>
             <li style={{ marginBottom: '10px' }}>
     <button onClick={() => navigate('/profil')} style={{ background: 'none', border: 'none', color: '#d63384', fontSize: '16px', cursor: 'pointer', textDecoration: 'underline' }}>
       Completează Profil / Generează Rutină
     </button>
   </li>

           <li style={{ marginBottom: '10px' }}>
  <button onClick={() => navigate('/jurnal')} style={{ background: 'none', border: 'none', color: '#d63384', fontSize: '16px', cursor: 'pointer', textDecoration: 'underline' }}>
    Accesează Jurnalul de Progres
  </button>
</li>

           <li style={{ marginBottom: '10px' }}>
  <button onClick={() => navigate('/forum')} style={{ background: 'none', border: 'none', color: '#d63384', fontSize: '16px', cursor: 'pointer', textDecoration: 'underline' }}>
    Comunitatea GlowGuide (Forum)
  </button>
</li>

           <li style={{ marginBottom: '10px' }}>
  <button onClick={() => navigate('/chatbot')} style={{ background: 'none', border: 'none', color: '#d63384', fontSize: '16px', cursor: 'pointer', textDecoration: 'underline' }}>
    🤖 GlowBot — Asistent Skincare
  </button>
</li>

           {user.rol === 'admin' && (
             <li style={{ marginTop: '20px' }}>
               <button onClick={() => navigate('/admin/moderare')} style={{ background: 'none', border: 'none', color: '#e53935', fontSize: '16px', cursor: 'pointer', textDecoration: 'underline', fontWeight: 'bold' }}>
                 🛡️ Panou Admin — Moderare Forum
               </button>
             </li>
           )}
        </ul>
      </div>
    </div>
  );
}
