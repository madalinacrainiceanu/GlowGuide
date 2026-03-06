import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';

export default function DetaliiPostare() {
  const { id } = useParams();
  const navigate = useNavigate();
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : null;

  const [postare, setPostare] = useState(null);
  const [replies, setReplies] = useState([]);
  const [continutReply, setContinutReply] = useState('');
  const [mesaj, setMesaj] = useState('');
  const [loading, setLoading] = useState(true);

  const incarcaPostare = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/forum/${id}`);
      setPostare(res.data.postare);
      setReplies(res.data.replies);
    } catch (e) {
      console.log('Eroare încărcare postare:', e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    incarcaPostare();
  }, [id]);

  const trimiteReply = async (e) => {
    e.preventDefault();
    setMesaj('');
    try {
      await axios.post(`http://localhost:5000/api/forum/${id}/reply`, {
        membruId: user.membruId || user.id,
        continut: continutReply,
      });
      setContinutReply('');
      setMesaj('✅ Răspunsul tău a fost adăugat!');
      incarcaPostare();
      setTimeout(() => setMesaj(''), 3000);
    } catch (e) {
      setMesaj('❌ Eroare la adăugarea răspunsului.');
    }
  };

  const formateazaData = (dataString) => {
    if (!dataString) return '';
    return new Date(dataString).toLocaleDateString('ro-RO', {
      day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
    });
  };

  if (loading) return <div style={{ textAlign: 'center', marginTop: '80px', color: '#888' }}>Se încarcă...</div>;
  if (!postare) return <div style={{ textAlign: 'center', marginTop: '80px', color: '#888' }}>Postarea nu a fost găsită.</div>;

  return (
    <div style={{ padding: '40px 20px', maxWidth: '750px', margin: '0 auto', fontFamily: "'Inter', sans-serif" }}>

      {/* HEADER */}
      <button onClick={() => navigate('/forum')} style={{ padding: '10px 20px', backgroundColor: '#f1f1f1', color: '#333', border: 'none', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold', marginBottom: '25px' }}>
        ← Înapoi la Forum
      </button>

      {/* POSTAREA PRINCIPALĂ */}
      <div style={{ backgroundColor: 'white', padding: '30px', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.06)', borderTop: '5px solid #d63384', marginBottom: '30px' }}>
        <h2 style={{ margin: '0 0 15px 0', color: '#222' }}>{postare.titlu}</h2>
        <div style={{ fontSize: '13px', color: '#999', marginBottom: '20px' }}>
          👤 <strong style={{ color: '#d63384' }}>{postare.autor}</strong> · 📅 {formateazaData(postare.dataPostare)}
        </div>
        <p style={{ margin: 0, color: '#444', fontSize: '16px', lineHeight: '1.7', whiteSpace: 'pre-wrap' }}>
          {postare.continut}
        </p>
      </div>

      {/* REPLIES */}
      <h3 style={{ color: '#333', marginBottom: '15px' }}>
        💬 {replies.length} răspuns{replies.length !== 1 ? 'uri' : ''}
      </h3>

      {replies.length === 0 ? (
        <p style={{ color: '#aaa', fontStyle: 'italic', marginBottom: '30px' }}>Niciun răspuns încă. Fii primul!</p>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
          {replies.map((reply) => (
            <div key={reply.id} style={{ backgroundColor: '#fdf5fb', padding: '18px 22px', borderRadius: '14px', borderLeft: '4px solid #f4a7c3' }}>
              <div style={{ fontSize: '13px', color: '#999', marginBottom: '8px' }}>
                👤 <strong style={{ color: '#d63384' }}>{reply.autor}</strong> · {formateazaData(reply.dataRaspuns)}
              </div>
              <p style={{ margin: 0, color: '#444', fontSize: '15px', lineHeight: '1.6', whiteSpace: 'pre-wrap' }}>
                {reply.continut}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* FORMULAR REPLY */}
      <div style={{ backgroundColor: 'white', padding: '25px', borderRadius: '16px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <h4 style={{ marginTop: 0, marginBottom: '15px' }}>✍️ Adaugă un răspuns</h4>
        <form onSubmit={trimiteReply} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <textarea
            value={continutReply}
            onChange={(e) => setContinutReply(e.target.value)}
            placeholder="Scrie răspunsul tău..."
            rows="4"
            required
            style={{ width: '100%', padding: '12px', borderRadius: '10px', border: '1px solid #e0e0e0', resize: 'vertical', fontSize: '14px', boxSizing: 'border-box' }}
          />
          <button type="submit" style={{ padding: '12px', backgroundColor: '#d63384', color: 'white', border: 'none', borderRadius: '10px', fontWeight: 'bold', fontSize: '15px', cursor: 'pointer', alignSelf: 'flex-end', minWidth: '150px' }}>
            💬 Răspunde
          </button>
        </form>
        {mesaj && (
          <div style={{ marginTop: '12px', padding: '10px', backgroundColor: mesaj.startsWith('✅') ? '#e8f5e9' : '#ffebee', color: mesaj.startsWith('✅') ? '#2e7d32' : '#c62828', borderRadius: '8px', textAlign: 'center', fontWeight: 'bold' }}>
            {mesaj}
          </div>
        )}
      </div>
    </div>
  );
}
