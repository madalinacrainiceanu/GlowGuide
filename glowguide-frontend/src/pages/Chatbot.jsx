import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const INTREBARI_RAPIDE = [
  'În ce ordine aplic produsele?',
  'Ce este niacinamide?',
  'Cât de des folosesc retinolul?',
  'Trebuie SPF și în zilele înnorate?',
  'Tenul gras are nevoie de hidratant?',
];

const CULORI_CATEGORIE = {
  rutina: { bg: '#e8f4fd', color: '#1565c0', label: 'Rutină' },
  ingrediente: { bg: '#f3e5f5', color: '#7b1fa2', label: 'Ingrediente' },
  produse: { bg: '#e8f5e9', color: '#2e7d32', label: 'Produse' },
  probleme_piele: { bg: '#fff3e0', color: '#e65100', label: 'Probleme piele' },
  general: { bg: '#f5f5f5', color: '#616161', label: 'General' },
};

export default function Chatbot() {
  const navigate = useNavigate();
  const [mesaje, setMesaje] = useState([
    {
      tip: 'bot',
      text: 'Bună! Sunt GlowBot 🌸 Îți pot răspunde la întrebări despre ingrediente, rutine de îngrijire și tipuri de ten. Ce te interesează?',
      categorie: 'general',
    },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [mesaje]);

  const trimiteMesaj = async (text) => {
    const intrebare = text || input.trim();
    if (!intrebare) return;

    setMesaje((prev) => [...prev, { tip: 'user', text: intrebare }]);
    setInput('');
    setLoading(true);

    try {
      const res = await axios.post('http://localhost:5000/api/chatbot/intreaba', { intrebare });
      setMesaje((prev) => [
        ...prev,
        { tip: 'bot', text: res.data.raspuns, categorie: res.data.categorie, sursa: res.data.sursa },
      ]);
    } catch {
      setMesaje((prev) => [
        ...prev,
        { tip: 'bot', text: 'A apărut o eroare. Încearcă din nou.', categorie: 'general' },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f7f4f0' }}>
      <Navbar />
      <div style={{ maxWidth: '750px', margin: '0 auto', padding: '32px 20px' }}>

        {/* HEADER */}
        <div style={{ marginBottom: '24px' }}>
          <h1 style={{ color: '#b06090', margin: '0 0 6px', fontSize: '26px', fontWeight: '800' }}>🤖 GlowBot</h1>
          <p style={{ color: '#888', margin: 0, fontSize: '14px' }}>Asistent educativ pentru îngrijirea pielii</p>
        </div>

      {/* FEREASTRA CHAT */}
      <div style={{ backgroundColor: 'white', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.07)', overflow: 'hidden' }}>

        {/* MESAJE */}
        <div style={{ height: '420px', overflowY: 'auto', padding: '20px', backgroundColor: '#f7f4f0', display: 'flex', flexDirection: 'column', gap: '14px' }}>
          {mesaje.map((m, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: m.tip === 'user' ? 'flex-end' : 'flex-start' }}>
              {m.tip === 'bot' && (
                <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#eef6f4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px', marginRight: '10px', flexShrink: 0, alignSelf: 'flex-end' }}>
                  🌸
                </div>
              )}
              <div style={{ maxWidth: '75%' }}>
                <div style={{
                  padding: '12px 16px',
                  borderRadius: m.tip === 'user' ? '18px 18px 4px 18px' : '18px 18px 18px 4px',
                  backgroundColor: m.tip === 'user' ? '#e8956d' : 'white',
                  color: m.tip === 'user' ? 'white' : '#333',
                  fontSize: '14px',
                  lineHeight: '1.6',
                  boxShadow: m.tip === 'bot' ? '0 2px 8px rgba(0,0,0,0.06)' : 'none',
                  whiteSpace: 'pre-wrap',
                }}>
                  {m.text}
                </div>
                {m.tip === 'bot' && m.categorie && m.categorie !== 'general' && (
                  <span style={{
                    display: 'inline-block', marginTop: '5px', fontSize: '11px', padding: '2px 8px',
                    borderRadius: '10px',
                    backgroundColor: CULORI_CATEGORIE[m.categorie]?.bg || '#f5f5f5',
                    color: CULORI_CATEGORIE[m.categorie]?.color || '#666',
                  }}>
                    {CULORI_CATEGORIE[m.categorie]?.label || m.categorie}
                  </span>
                )}
                {m.tip === 'bot' && m.sursa === 'openai' && (
                  <span style={{ display: 'inline-block', marginTop: '5px', marginLeft: '5px', fontSize: '11px', padding: '2px 8px', borderRadius: '10px', backgroundColor: '#e8f4fd', color: '#1565c0' }}>
                    🤖 AI
                  </span>
                )}
              </div>
            </div>
          ))}

          {loading && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#eef6f4', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '16px' }}>🌸</div>
              <div style={{ backgroundColor: 'white', padding: '12px 16px', borderRadius: '18px 18px 18px 4px', boxShadow: '0 2px 8px rgba(0,0,0,0.06)', color: '#aaa', fontSize: '14px' }}>
                GlowBot scrie<span style={{ animation: 'none' }}>...</span>
              </div>
            </div>
          )}
          <div ref={bottomRef} />
        </div>

        {/* ÎNTREBĂRI RAPIDE */}
        <div style={{ padding: '12px 20px', borderTop: '1px solid #f5e6ef', backgroundColor: '#fff', display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          {INTREBARI_RAPIDE.map((q, i) => (
            <button
              key={i}
              onClick={() => trimiteMesaj(q)}
              disabled={loading}
              style={{ padding: '6px 12px', backgroundColor: '#eef6f4', color: '#4a897e', border: '1px solid #b8d8d2', borderRadius: '20px', fontSize: '12px', cursor: 'pointer', fontWeight: '500' }}
            >
              {q}
            </button>
          ))}
        </div>

        {/* INPUT */}
        <div style={{ display: 'flex', padding: '15px 20px', borderTop: '1px solid #f0f0f0', gap: '10px', backgroundColor: 'white' }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && !loading && trimiteMesaj()}
            placeholder="Scrie întrebarea ta despre skincare..."
            disabled={loading}
            style={{ flex: 1, padding: '12px 16px', borderRadius: '25px', border: '1px solid #e0e0e0', fontSize: '14px', outline: 'none', backgroundColor: loading ? '#fafafa' : 'white' }}
          />
          <button
            onClick={() => trimiteMesaj()}
            disabled={loading || !input.trim()}
            style={{ padding: '12px 20px', backgroundColor: loading || !input.trim() ? '#d4b0c4' : '#b06090', color: 'white', border: 'none', borderRadius: '25px', fontWeight: 'bold', fontSize: '18px', cursor: loading || !input.trim() ? 'default' : 'pointer' }}
          >
            ➤
          </button>
        </div>
      </div>

      {/* INFO */}
      <p style={{ textAlign: 'center', color: '#bbb', fontSize: '12px', marginTop: '15px' }}>
        GlowBot răspunde din baza de date FAQ 📚 + AI pentru întrebări noi
      </p>
    </div>
    </div>
  );
}
