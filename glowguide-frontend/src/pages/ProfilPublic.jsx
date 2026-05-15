import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import API_URL from '../api';

const CULORI = ['#b06090', '#6aab9e', '#e8956d', '#7b68ee', '#e91e8c', '#00897b'];
const getCuloare = (nume) => {
  let h = 0;
  for (let i = 0; i < (nume || '').length; i++) h = nume.charCodeAt(i) + ((h << 5) - h);
  return CULORI[Math.abs(h) % CULORI.length];
};

export default function ProfilPublic() {
  const { membruId } = useParams();
  const navigate = useNavigate();
  const [profil, setProfil] = useState(null);
  const [loading, setLoading] = useState(true);
  const [eroare, setEroare] = useState('');

  useEffect(() => {
    axios.get(`${API_URL}/api/auth/profil-public/${membruId}`)
      .then(r => setProfil(r.data))
      .catch(() => setEroare('Profilul nu a putut fi încărcat.'))
      .finally(() => setLoading(false));
  }, [membruId]);

  if (loading) return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: '#b06090' }}>Se încarcă...</p>
    </div>
  );

  if (eroare) return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
      <Navbar />
      <div style={{ maxWidth: '600px', margin: '60px auto', textAlign: 'center' }}>
        <div style={{ fontSize: '48px', marginBottom: '16px' }}>😔</div>
        <p style={{ color: '#888' }}>{eroare}</p>
      </div>
    </div>
  );

  const initiala = `${profil?.prenume?.[0] || ''}${profil?.nume?.[0] || ''}`.toUpperCase();
  const culoare = getCuloare(profil?.prenume || '');
  const dataInreg = profil?.dataCreare
    ? new Date(profil.dataCreare).toLocaleDateString('ro-RO', { year: 'numeric', month: 'long' })
    : '—';

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
      <Navbar />
      <div style={{ maxWidth: '680px', margin: '0 auto', padding: '32px 20px' }}>

        {/* Card profil */}
        <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '32px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)', marginBottom: '20px', textAlign: 'center' }}>
          <div style={{
            width: '80px', height: '80px', borderRadius: '50%',
            backgroundColor: culoare, color: 'white',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', fontWeight: '800', margin: '0 auto 16px',
            boxShadow: `0 4px 20px ${culoare}55`
          }}>
            {initiala}
          </div>
          <h2 style={{ margin: '0 0 6px', fontSize: '22px', fontWeight: '800', color: '#2d3142' }}>
            {profil?.prenume} {profil?.nume}
          </h2>
          <p style={{ margin: '0 0 20px', color: '#aaa', fontSize: '13px' }}>Membră din {dataInreg}</p>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', maxWidth: '300px', margin: '0 auto' }}>
            {[
              { emoji: '💬', val: profil?.postariPublicate || 0, label: 'Postări' },
              { emoji: '📔', val: profil?.intrariJurnal || 0, label: 'Intrări jurnal' },
            ].map((s, i) => (
              <div key={i} style={{ backgroundColor: '#faf7fd', borderRadius: '12px', padding: '16px', border: '1px solid #f0eaf4' }}>
                <div style={{ fontSize: '24px' }}>{s.emoji}</div>
                <div style={{ fontSize: '22px', fontWeight: '800', color: '#b06090' }}>{s.val}</div>
                <div style={{ fontSize: '11px', color: '#aaa' }}>{s.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Postările utilizatorului */}
        <div style={{ backgroundColor: 'white', borderRadius: '20px', padding: '24px', boxShadow: '0 4px 20px rgba(0,0,0,0.07)' }}>
          <h3 style={{ margin: '0 0 16px', fontSize: '16px', fontWeight: '700', color: '#2d3142' }}>
            💬 Postările lui {profil?.prenume}
          </h3>

          {profil?.postari?.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '32px', color: '#aaa' }}>
              <div style={{ fontSize: '36px', marginBottom: '8px' }}>🌱</div>
              <p style={{ margin: 0 }}>Nicio postare publicată încă.</p>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {profil?.postari?.map(p => (
                <div
                  key={p.id}
                  onClick={() => navigate(`/forum/${p.id}`)}
                  style={{
                    padding: '14px 18px', borderRadius: '12px', cursor: 'pointer',
                    border: '1px solid #f0eaf4', backgroundColor: '#faf7fd',
                    transition: 'all 0.15s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.backgroundColor = '#f7eef4'; e.currentTarget.style.borderColor = '#e8d0e0'; }}
                  onMouseLeave={e => { e.currentTarget.style.backgroundColor = '#faf7fd'; e.currentTarget.style.borderColor = '#f0eaf4'; }}
                >
                  <p style={{ margin: '0 0 6px', fontSize: '14px', fontWeight: '700', color: '#2d3142' }}>{p.titlu}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '12px', color: '#aaa' }}>
                      {new Date(p.dataPostare).toLocaleDateString('ro-RO', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                    <span style={{ fontSize: '12px', color: '#b06090', fontWeight: '600' }}>
                      💬 {p.numar_raspunsuri || 0} răspunsuri
                    </span>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <button
          onClick={() => navigate(-1)}
          style={{ marginTop: '20px', padding: '10px 20px', backgroundColor: 'transparent', color: '#888', border: '1px solid #ddd', borderRadius: '10px', cursor: 'pointer', fontSize: '13px' }}
        >
          ← Înapoi
        </button>
      </div>
    </div>
  );
}
