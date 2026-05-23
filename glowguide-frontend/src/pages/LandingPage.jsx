import { useNavigate } from 'react-router-dom';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: 'var(--bg)', minHeight: '100vh' }}>

      {/* NAVBAR */}
      <nav style={{
        backgroundColor: 'white', boxShadow: '0 1px 0 #ede8e1',
        position: 'sticky', top: 0, zIndex: 1000, padding: '0 32px',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '64px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '20px' }}>🌸</span>
            <span style={{ fontWeight: '800', fontSize: '18px', color: '#b06090', letterSpacing: '-0.3px' }}>GlowGuide</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => navigate('/login')} style={{
              padding: '8px 22px', border: '1.5px solid #d4c5ce', borderRadius: '8px',
              background: 'white', color: '#555', fontWeight: '600', fontSize: '14px', cursor: 'pointer',
            }}>Intră în cont</button>
            <button onClick={() => navigate('/register')} style={{
              padding: '8px 22px', border: 'none', borderRadius: '8px',
              background: 'linear-gradient(135deg, #b06090 0%, #e8956d 100%)',
              color: 'white', fontWeight: '600', fontSize: '14px', cursor: 'pointer',
              transition: 'all 0.2s ease',
            }}>Înregistrare</button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: '700px', margin: '0 auto', padding: '96px 32px 80px', textAlign: 'center' }}>
        <span style={{
          display: 'inline-block', backgroundColor: '#f7eef4', color: '#b06090',
          padding: '5px 14px', borderRadius: '20px', fontSize: '12px',
          fontWeight: '600', letterSpacing: '0.5px', textTransform: 'uppercase', marginBottom: '24px',
        }}>
          Skincare personalizat
        </span>
        <h1 style={{ fontSize: '52px', fontWeight: '900', color: '#1a1a2e', lineHeight: '1.1', margin: '0 0 20px', letterSpacing: '-2px' }}>
          Rutina de îngrijire<br />
          <span style={{ color: '#b06090' }}>potrivită pentru tine</span>
        </h1>
        <p style={{ fontSize: '17px', color: '#6b6b80', lineHeight: '1.7', margin: '0 0 36px', maxWidth: '520px', marginLeft: 'auto', marginRight: 'auto' }}>
          GlowGuide analizează tipul tău de ten și îți recomandă o rutină personalizată din baza noastră dermatologică. Urmărești progresul, înveți cu GlowBot și te conectezi cu comunitatea.
        </p>
        <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button onClick={() => navigate('/register')} style={{
            padding: '14px 36px', border: 'none', borderRadius: '10px',
            background: 'linear-gradient(135deg, #b06090 0%, #e8956d 100%)',
            color: 'white', fontWeight: '700', fontSize: '15px', cursor: 'pointer',
            boxShadow: '0 4px 16px rgba(176,96,144,0.25)',
            transition: 'all 0.2s ease',
          }}>Începe gratuit</button>
          <button onClick={() => navigate('/login')} style={{
            padding: '14px 28px', border: '1.5px solid #d4c5ce', borderRadius: '10px',
            background: 'white', color: '#444', fontWeight: '600', fontSize: '15px', cursor: 'pointer',
          }}>Am deja cont</button>
        </div>
      </section>

      {/* STATISTICI */}
      <section style={{ backgroundColor: 'white', borderTop: '1px solid #ede8e1', borderBottom: '1px solid #ede8e1' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto', padding: '36px 32px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)' }}>
          {[
            { nr: '8', label: 'întrebări pentru profilul tău' },
            { nr: '5', label: 'produse recomandate în rutină' },
            { nr: '100%', label: 'personalizat pentru tine' },
          ].map((item, i) => (
            <div key={i} style={{ textAlign: 'center', padding: '8px 24px', borderRight: i < 2 ? '1px solid #ede8e1' : 'none' }}>
              <p style={{ margin: '0 0 4px', fontSize: '32px', fontWeight: '800', color: '#b06090' }}>{item.nr}</p>
              <p style={{ margin: 0, fontSize: '13px', color: '#888' }}>{item.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CUM FUNCTIONEAZA */}
      <section style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 32px' }}>
        <h2 style={{ textAlign: 'center', fontSize: '30px', fontWeight: '800', color: '#1a1a2e', margin: '0 0 56px', letterSpacing: '-0.5px' }}>
          Cum funcționează?
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '24px' }}>
          {[
            { nr: '01', titlu: 'Completezi profilul', desc: 'Răspunzi la 8 întrebări despre tenul tău în mai puțin de 2 minute.', bg: '#fce8f3', color: '#a0527a' },
            { nr: '02', titlu: 'Primești rutina', desc: 'Algoritmul selectează automat produsele potrivite din baza de date dermatologică.', bg: '#e8f4f0', color: '#3d8a7a' },
            { nr: '03', titlu: 'Urmărești progresul', desc: 'Notezi zilnic în jurnal și vizualizezi evoluția tenului cu grafice lunare.', bg: '#fef0e6', color: '#b5622a' },
          ].map((pas, i) => (
            <div key={i} style={{ backgroundColor: pas.bg, borderRadius: '16px', padding: '28px 24px' }}>
              <span style={{ fontSize: '13px', fontWeight: '800', color: pas.color, letterSpacing: '1px' }}>{pas.nr}</span>
              <h3 style={{ margin: '10px 0 8px', fontSize: '16px', fontWeight: '700', color: '#1a1a2e' }}>{pas.titlu}</h3>
              <p style={{ margin: 0, fontSize: '13px', color: '#666', lineHeight: '1.6' }}>{pas.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* FUNCTIONALITATI */}
      <section style={{ backgroundColor: 'white', borderTop: '1px solid #ede8e1' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '80px 32px' }}>
          <h2 style={{ textAlign: 'center', fontSize: '30px', fontWeight: '800', color: '#1a1a2e', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
            Tot ce ai nevoie, într-un singur loc
          </h2>
          <p style={{ textAlign: 'center', color: '#888', fontSize: '15px', margin: '0 0 52px' }}>
            Funcționalități construite pentru rezultate reale
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '16px' }}>
            {[
              { emoji: '🧬', titlu: 'Analiză dermatologică', desc: 'Chestionar în 8 pași care determină tipul de ten și problemele specifice.', bg: '#fce8f3', color: '#a0527a' },
              { emoji: '🧴', titlu: 'Rutină personalizată', desc: 'Produse selectate din baza dermatologică, potrivite pentru profilul tău.', bg: '#e8f4f0', color: '#3d8a7a' },
              { emoji: '📔', titlu: 'Jurnal de progres', desc: 'Notițe zilnice și grafic lunar de evoluție a stării tenului.', bg: '#fef0e6', color: '#b5622a' },
              { emoji: '💬', titlu: 'Comunitate', desc: 'Forum moderat unde utilizatoarele împărtășesc experiențe și sfaturi.', bg: '#e8f0fc', color: '#3a6aaa' },
              { emoji: '🤖', titlu: 'GlowBot AI', desc: 'Asistent disponibil oricând pentru întrebări despre ingrediente și rutine.', bg: '#f0ecfc', color: '#6a4aaa' },
            ].map((f, i) => (
              <div key={i} style={{ backgroundColor: f.bg, borderRadius: '14px', padding: '24px 20px' }}>
                <span style={{ fontSize: '28px', display: 'block', marginBottom: '12px' }}>{f.emoji}</span>
                <h3 style={{ margin: '0 0 6px', fontSize: '15px', fontWeight: '700', color: f.color }}>{f.titlu}</h3>
                <p style={{ margin: 0, fontSize: '13px', color: '#666', lineHeight: '1.6' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ maxWidth: '640px', margin: '0 auto', padding: '80px 32px', textAlign: 'center' }}>
        <h2 style={{ fontSize: '30px', fontWeight: '800', color: '#1a1a2e', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
          Pregătit/ă să începi?
        </h2>
        <p style={{ color: '#888', fontSize: '15px', margin: '0 0 32px', lineHeight: '1.7' }}>
          Creează-ți contul gratuit și descoperă rutina de îngrijire potrivită pentru tipul tău de ten.
        </p>
        <button onClick={() => navigate('/register')} style={{
          padding: '15px 40px', border: 'none', borderRadius: '10px',
          backgroundColor: '#b06090', color: 'white',
          fontWeight: '700', fontSize: '16px', cursor: 'pointer',
          boxShadow: '0 4px 16px rgba(176,96,144,0.2)',
        }}>Creează cont gratuit</button>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: 'white', borderTop: '1px solid #ede8e1', padding: '24px 32px', textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px', marginBottom: '6px' }}>
          <span style={{ fontSize: '16px' }}>🌸</span>
          <span style={{ fontWeight: '800', color: '#b06090', fontSize: '15px' }}>GlowGuide</span>
        </div>
        <p style={{ color: '#bbb', fontSize: '12px', margin: 0 }}>© 2026 GlowGuide · Rutine de îngrijire personalizate</p>
      </footer>

      <style>{`
        @media (max-width: 768px) {
          h1 { font-size: 36px !important; letter-spacing: -1px !important; }
        }
      `}</style>
    </div>
  );
}
