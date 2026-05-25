import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler } from 'chart.js';
import { Pie, Bar, Line } from 'react-chartjs-2';
import Navbar from '../components/Navbar';
import API_URL from '../api';

ChartJS.register(ArcElement, BarElement, CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend, Filler);

export default function AdminModerare() {
  const navigate = useNavigate();
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  const [postariInAsteptare, setPostariInAsteptare] = useState([]);
  const [loading, setLoading] = useState(true);
  const [mesaje, setMesaje] = useState({});
  const [statsTipuriTen, setStatsTipuriTen] = useState(null);
  const [statsJurnal, setStatsJurnal] = useState(null);
  const [statsForum, setStatsForum] = useState(null);
  const [loadingStats, setLoadingStats] = useState(true);
  const [errStats, setErrStats] = useState(false);

  // Redirecționează dacă nu e admin
  useEffect(() => {
    if (!user || user.rol !== 'admin') {
      navigate('/dashboard');
      return;
    }
    incarcaPostari();
    incarcaStatistici();

    const interval = setInterval(() => {
      incarcaStatistici();
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const incarcaStatistici = async () => {
    try {
      const [tipuriTen, jurnal, forum] = await Promise.allSettled([
        axios.get(`${API_URL}/api/admin/statistici/tipuri-ten`),
        axios.get(`${API_URL}/api/admin/statistici/jurnal-lunar`),
        axios.get(`${API_URL}/api/admin/statistici/forum-saptamana`),
      ]);

      const culori = { gras: '#f59e0b', uscat: '#3b82f6', mixt: '#8b5cf6', sensibil: '#ec4899', normal: '#10b981' };

      if (tipuriTen.status === 'fulfilled' && tipuriTen.value.data.length > 0) {
        setStatsTipuriTen({
          labels: tipuriTen.value.data.map(d => d.tip ? d.tip.charAt(0).toUpperCase() + d.tip.slice(1) : 'Necunoscut'),
          datasets: [{ data: tipuriTen.value.data.map(d => d.total), backgroundColor: tipuriTen.value.data.map(d => culori[d.tip] || '#94a3b8'), borderWidth: 2, borderColor: 'white' }]
        });
      }

      if (jurnal.status === 'fulfilled' && jurnal.value.data.length > 0) {
        setStatsJurnal({
          labels: jurnal.value.data.map(d => d.luna),
          datasets: [{ label: 'Intrări în jurnal', data: jurnal.value.data.map(d => d.total), borderColor: '#6aab9e', backgroundColor: 'rgba(106,171,158,0.1)', tension: 0.4, fill: true, pointBackgroundColor: '#fff', pointBorderColor: '#6aab9e' }]
        });
      }

      if (forum.status === 'fulfilled' && forum.value.data.length > 0) {
        setStatsForum({
          labels: forum.value.data.map(d => new Date(d.zi).toLocaleDateString('ro-RO', { weekday: 'short', day: 'numeric', month: 'short' })),
          datasets: [{ label: 'Postări noi', data: forum.value.data.map(d => d.total), backgroundColor: 'rgba(176,96,144,0.7)', borderColor: '#b06090', borderWidth: 1, borderRadius: 6 }]
        });
      }
    } catch (e) {
      console.log('Eroare statistici:', e);
      setErrStats(true);
    } finally {
      setLoadingStats(false);
    }
  };

  const incarcaPostari = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/forum/admin/in-asteptare`);
      setPostariInAsteptare(res.data);
    } catch (e) {
      console.log('Eroare încărcare postări:', e);
    } finally {
      setLoading(false);
    }
  };

  const modereaza = async (id, actiune) => {
    try {
      await axios.put(`${API_URL}/api/forum/admin/moderare/${id}`, { actiune });
      setMesaje(prev => ({ ...prev, [id]: actiune === 'publicata' ? '✅ Aprobată!' : '❌ Respinsă!' }));
      // Scoate postarea din listă după 1.5s
      setTimeout(() => {
        setPostariInAsteptare(prev => prev.filter(p => p.id !== id));
        setMesaje(prev => { const n = {...prev}; delete n[id]; return n; });
      }, 1500);
    } catch (e) {
      setMesaje(prev => ({ ...prev, [id]: '⚠️ Eroare la moderare.' }));
    }
  };

  const formateazaData = (dataString) => {
    if (!dataString) return '';
    return new Date(dataString).toLocaleDateString('ro-RO', {
      day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  if (!user || user.rol !== 'admin') return null;

  return (
    <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)' }}>
      <Navbar />
      <div style={{ maxWidth: '850px', margin: '0 auto', padding: '32px 20px' }}>

        {/* HEADER */}
        <div style={{ marginBottom: '28px' }}>
          <h1 style={{ color: '#b06090', margin: '0 0 6px', fontSize: '26px', fontWeight: '800' }}>🛡️ Panou Admin — Moderare Forum</h1>
          <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>Aprobă sau respinge postările trimise de utilizatori</p>
        </div>

        {/* STATISTICI */}
        <div style={{ marginBottom: '36px' }}>
          <h2 style={{ color: '#222', fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>Statistici Platformă</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', marginBottom: '20px' }}>

            {/* PIE CHART */}
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: '700', color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Distribuție utilizatori — tip ten</h3>
              {statsTipuriTen ? (
                <div style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Pie data={statsTipuriTen} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { position: 'bottom', labels: { font: { size: 12 } } } } }} />
                </div>
              ) : <div style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb', fontSize: '13px' }}>{errStats ? 'Serverul nu este disponibil' : loadingStats ? 'Se încarcă...' : 'Nicio dată'}</div>}
            </div>

            {/* BAR CHART */}
            <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }}>
              <h3 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: '700', color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Activitate forum — ultimele 7 zile</h3>
              {statsForum ? (
                <div style={{ height: '220px' }}>
                  <Bar data={statsForum} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: '#f5f5f5' } }, x: { grid: { display: false } } } }} />
                </div>
              ) : <div style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb', fontSize: '13px' }}>{errStats ? 'Serverul nu este disponibil' : loadingStats ? 'Se încarcă...' : 'Nicio dată'}</div>}
            </div>
          </div>

          {/* LINE CHART */}
          <div style={{ backgroundColor: 'white', padding: '24px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.06)' }}>
            <h3 style={{ margin: '0 0 16px', fontSize: '14px', fontWeight: '700', color: '#555', textTransform: 'uppercase', letterSpacing: '0.5px' }}>Engagement jurnal — intrări pe luni (global)</h3>
            {statsJurnal ? (
              <div style={{ height: '220px' }}>
                <Line data={statsJurnal} options={{ responsive: true, maintainAspectRatio: false, plugins: { legend: { display: false } }, scales: { y: { beginAtZero: true, ticks: { stepSize: 1 }, grid: { color: '#f5f5f5' } }, x: { grid: { display: false } } } }} />
              </div>
            ) : <div style={{ height: '220px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#bbb', fontSize: '13px' }}>{errStats ? 'Serverul nu este disponibil' : loadingStats ? 'Se încarcă...' : 'Nicio dată'}</div>}
          </div>
        </div>

        {/* HEADER MODERARE */}
        <h2 style={{ color: '#222', fontSize: '18px', fontWeight: '700', marginBottom: '20px' }}>Moderare Forum</h2>
      {loading ? (
        <p style={{ color: '#888' }}>Se încarcă...</p>
      ) : postariInAsteptare.length === 0 ? (
        <div style={{ backgroundColor: 'white', padding: '50px', borderRadius: '20px', textAlign: 'center', boxShadow: '0 10px 30px rgba(0,0,0,0.05)' }}>
          <p style={{ fontSize: '40px', margin: '0 0 10px 0' }}>🎉</p>
          <p style={{ color: '#555', fontSize: '16px' }}>Nicio postare în așteptare. Totul e moderat!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <p style={{ color: '#666', margin: 0 }}>
            <strong style={{ color: '#b06090' }}>{postariInAsteptare.length}</strong> postare{postariInAsteptare.length !== 1 ? 'i' : ''} în așteptare
          </p>
          {postariInAsteptare.map((postare) => (
            <div key={postare.id} style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.06)', borderLeft: '5px solid #ffc107' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                <h3 style={{ margin: 0, color: '#222', fontSize: '17px' }}>{postare.titlu}</h3>
                <span style={{ backgroundColor: '#fff8e1', color: '#f59e0b', padding: '3px 10px', borderRadius: '20px', fontSize: '12px', fontWeight: 'bold', whiteSpace: 'nowrap', marginLeft: '15px' }}>
                  ⏳ În așteptare
                </span>
              </div>
              <p style={{ color: '#777', fontSize: '13px', margin: '0 0 12px 0' }}>
                👤 <strong>{postare.autor}</strong> · 📅 {formateazaData(postare.dataPostare)}
              </p>
              <p style={{ margin: '0 0 20px 0', color: '#444', fontSize: '15px', lineHeight: '1.6', backgroundColor: '#fafafa', padding: '12px', borderRadius: '8px', whiteSpace: 'pre-wrap' }}>
                {postare.continut}
              </p>

              {mesaje[postare.id] ? (
                <div style={{ padding: '10px', backgroundColor: mesaje[postare.id].startsWith('✅') ? '#e8f5e9' : '#ffebee', color: mesaje[postare.id].startsWith('✅') ? '#2e7d32' : '#c62828', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold' }}>
                  {mesaje[postare.id]}
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    onClick={() => modereaza(postare.id, 'publicata')}
                    style={{ flex: 1, padding: '12px', backgroundColor: '#4caf50', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}
                  >
                    ✅ Aprobă
                  </button>
                  <button
                    onClick={() => modereaza(postare.id, 'respinsa')}
                    style={{ flex: 1, padding: '12px', backgroundColor: '#f44336', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}
                  >
                    ❌ Respinge
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      </div>
    </div>
  );
}
