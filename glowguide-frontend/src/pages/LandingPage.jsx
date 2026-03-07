import { useNavigate } from 'react-router-dom';

const FUNCTIONALITATI = [
  {
    emoji: '🧬',
    titlu: 'Analiză Dermatologică',
    descriere: 'Chestionar inteligent în 8 pași care determină exact tipul tău de ten și problemele specifice.',
    culoare: '#8f4d74',
    bg: 'linear-gradient(135deg, #fdf0f8, #f5e0ee)',
  },
  {
    emoji: '💆',
    titlu: 'Rutină Personalizată',
    descriere: 'Produse selectate din baza noastră dermatologică, potrivite perfect pentru profilul tău.',
    culoare: '#4a897e',
    bg: 'linear-gradient(135deg, #eef6f4, #d8ede8)',
  },
  {
    emoji: '📔',
    titlu: 'Jurnal de Progres',
    descriere: 'Urmărește evoluția tenului cu grafice lunare și notițe zilnice. Vizualizează transformarea.',
    culoare: '#b5622a',
    bg: 'linear-gradient(135deg, #fef6ef, #fce7d8)',
  },
  {
    emoji: '💬',
    titlu: 'Comunitate',
    descriere: 'Forum moderat unde utilizatoarele împărtășesc experiențe, sfaturi și rutine de succes.',
    culoare: '#3a7aaa',
    bg: 'linear-gradient(135deg, #eff5fd, #d8e8f8)',
  },
  {
    emoji: '🤖',
    titlu: 'GlowBot AI',
    descriere: 'Asistent inteligent disponibil oricând pentru întrebări despre ingrediente și rutine.',
    culoare: '#5b4a9a',
    bg: 'linear-gradient(135deg, #f4f0fc, #e6dff8)',
  },
];

const PASI = [
  { nr: '01', titlu: 'Completezi profilul', descriere: 'Răspunzi la 8 întrebări despre tenul tău — durează 2 minute.' },
  { nr: '02', titlu: 'Primești rutina', descriere: 'Algoritmul nostru selectează produsele potrivite din baza de date.' },
  { nr: '03', titlu: 'Urmărești progresul', descriere: 'Notezi zilnic în jurnal și vezi graficul evoluției tenului tău.' },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: '#f7f4f0', minHeight: '100vh', fontFamily: "'Segoe UI', system-ui, sans-serif" }}>

      {/* NAVBAR */}
      <nav style={{
        backgroundColor: 'white', boxShadow: '0 2px 12px rgba(45,49,66,0.08)',
        position: 'sticky', top: 0, zIndex: 1000, padding: '0 24px',
      }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '62px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '22px' }}>🌸</span>
            <span style={{ fontWeight: '800', fontSize: '20px', color: '#b06090', letterSpacing: '-0.5px' }}>GlowGuide</span>
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={() => navigate('/login')} style={{
              padding: '8px 20px', border: '1.5px solid #b06090', borderRadius: '10px',
              background: 'transparent', color: '#b06090', fontWeight: '600', fontSize: '14px', cursor: 'pointer',
            }}>
              Intră în cont
            </button>
            <button onClick={() => navigate('/register')} style={{
              padding: '8px 20px', border: 'none', borderRadius: '10px',
              background: 'linear-gradient(135deg, #b06090, #6aab9e)', color: 'white',
              fontWeight: '600', fontSize: '14px', cursor: 'pointer',
              boxShadow: '0 4px 15px rgba(176,96,144,0.3)',
            }}>
              Începe gratuit
            </button>
          </div>
        </div>
      </nav>

      {/* HERO */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '80px 24px 60px', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: '8px',
            backgroundColor: '#f7eef4', color: '#b06090', padding: '6px 16px',
            borderRadius: '20px', fontSize: '13px', fontWeight: '600', marginBottom: '20px',
          }}>
            🌿 Skincare personalizat, bazat pe știință
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: '900', color: '#2d3142', lineHeight: '1.15', margin: '0 0 20px', letterSpacing: '-1.5px' }}>
            Rutina ta de<br />
            <span style={{ background: 'linear-gradient(135deg, #b06090, #6aab9e)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>
              îngrijire perfectă
            </span>
          </h1>
          <p style={{ fontSize: '17px', color: '#7a7a8c', lineHeight: '1.7', margin: '0 0 36px', maxWidth: '440px' }}>
            GlowGuide analizează tipul tău de ten și îți recomandă produse din baza noastră dermatologică. Urmărești progresul, înveți cu GlowBot și te conectezi cu comunitatea.
          </p>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button onClick={() => navigate('/register')} style={{
              padding: '14px 32px', border: 'none', borderRadius: '14px',
              background: 'linear-gradient(135deg, #b06090, #6aab9e)', color: 'white',
              fontWeight: '700', fontSize: '16px', cursor: 'pointer',
              boxShadow: '0 6px 25px rgba(176,96,144,0.35)',
            }}>
              Începe gratuit ✨
            </button>
            <button onClick={() => navigate('/login')} style={{
              padding: '14px 28px', border: '1.5px solid #e8e3dc', borderRadius: '14px',
              background: 'white', color: '#2d3142', fontWeight: '600', fontSize: '15px', cursor: 'pointer',
            }}>
              Am deja cont →
            </button>
          </div>
          <p style={{ marginTop: '20px', fontSize: '13px', color: '#aaa' }}>
            ✅ Gratuit · ✅ Fără card · ✅ Rezultate imediate
          </p>
        </div>

        {/* Visual card */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
          <div style={{ background: 'linear-gradient(135deg, #b06090 0%, #6aab9e 100%)', borderRadius: '24px', padding: '28px', color: 'white' }}>
            <p style={{ margin: '0 0 4px', fontSize: '13px', opacity: 0.85 }}>Profilul tău dermatologic</p>
            <h3 style={{ margin: '0 0 16px', fontSize: '22px', fontWeight: '800' }}>Ten MIXT ✨</h3>
            <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
              {['Hidratare', 'Fără uleiuri grele', 'SPF zilnic', 'Niacinamide'].map(tag => (
                <span key={tag} style={{ backgroundColor: 'rgba(255,255,255,0.25)', padding: '4px 12px', borderRadius: '20px', fontSize: '12px', fontWeight: '600' }}>{tag}</span>
              ))}
            </div>
          </div>
          {[
            { emoji: '🧴', pas: 'Dimineață', produs: 'Gentle Foaming Cleanser · CeraVe', sub: 'Curățare' },
            { emoji: '☀️', pas: 'Dimineață', produs: 'SPF 50+ Fluid · La Roche-Posay', sub: 'Protecție solară' },
            { emoji: '🌙', pas: 'Seară', produs: 'Niacinamide 10% + Zinc · The Ordinary', sub: 'Ser activ' },
          ].map((item, i) => (
            <div key={i} style={{ backgroundColor: 'white', borderRadius: '16px', padding: '16px 20px', display: 'flex', alignItems: 'center', gap: '14px', boxShadow: '0 4px 15px rgba(45,49,66,0.06)' }}>
              <span style={{ fontSize: '28px' }}>{item.emoji}</span>
              <div>
                <p style={{ margin: 0, fontWeight: '700', fontSize: '14px', color: '#2d3142' }}>{item.produs}</p>
                <p style={{ margin: 0, fontSize: '12px', color: '#aaa' }}>{item.sub} · {item.pas}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CUM FUNCȚIONEAZĂ */}
      <section style={{ backgroundColor: 'white', padding: '72px 24px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '52px' }}>
            <h2 style={{ fontSize: '34px', fontWeight: '800', color: '#2d3142', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
              Cum funcționează?
            </h2>
            <p style={{ color: '#7a7a8c', fontSize: '16px', margin: 0 }}>Trei pași simpli spre pielea ta ideală</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '32px' }}>
            {PASI.map((pas, i) => (
              <div key={i} style={{ textAlign: 'center' }}>
                <div style={{
                  width: '56px', height: '56px', borderRadius: '16px', margin: '0 auto 16px',
                  background: 'linear-gradient(135deg, #b06090, #6aab9e)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  color: 'white', fontSize: '20px', fontWeight: '800',
                }}>
                  {pas.nr}
                </div>
                <h3 style={{ color: '#2d3142', fontSize: '17px', fontWeight: '700', margin: '0 0 8px' }}>{pas.titlu}</h3>
                <p style={{ color: '#7a7a8c', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>{pas.descriere}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FUNCȚIONALITĂȚI */}
      <section style={{ maxWidth: '1100px', margin: '0 auto', padding: '72px 24px' }}>
        <div style={{ textAlign: 'center', marginBottom: '52px' }}>
          <h2 style={{ fontSize: '34px', fontWeight: '800', color: '#2d3142', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
            Tot ce ai nevoie, într-un singur loc
          </h2>
          <p style={{ color: '#7a7a8c', fontSize: '16px', margin: 0 }}>Funcționalități construite pentru rezultate reale</p>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px' }}>
          {FUNCTIONALITATI.map(f => (
            <div key={f.titlu} style={{
              background: f.bg, borderRadius: '20px', padding: '28px',
              boxShadow: '0 4px 15px rgba(45,49,66,0.05)',
            }}>
              <span style={{ fontSize: '36px', display: 'block', marginBottom: '14px' }}>{f.emoji}</span>
              <h3 style={{ color: f.culoare, fontSize: '17px', fontWeight: '700', margin: '0 0 8px' }}>{f.titlu}</h3>
              <p style={{ color: '#555', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>{f.descriere}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA FINAL */}
      <section style={{ padding: '72px 24px' }}>
        <div style={{
          maxWidth: '680px', margin: '0 auto', textAlign: 'center',
          background: 'linear-gradient(135deg, #b06090 0%, #6aab9e 100%)',
          borderRadius: '28px', padding: '56px 40px', color: 'white',
          boxShadow: '0 20px 60px rgba(176,96,144,0.3)',
        }}>
          <div style={{ fontSize: '52px', marginBottom: '16px' }}>🌸</div>
          <h2 style={{ fontSize: '30px', fontWeight: '800', margin: '0 0 12px', letterSpacing: '-0.5px' }}>
            Începe transformarea azi
          </h2>
          <p style={{ opacity: 0.9, fontSize: '16px', margin: '0 0 32px', lineHeight: '1.6' }}>
            Descoperă-ți tipul de ten și primește rutina personalizată în mai puțin de 3 minute.
          </p>
          <button onClick={() => navigate('/register')} style={{
            padding: '16px 40px', border: '2px solid white', borderRadius: '14px',
            background: 'white', color: '#b06090', fontWeight: '800', fontSize: '16px',
            cursor: 'pointer', boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
          }}>
            Creează cont gratuit ✨
          </button>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ backgroundColor: 'white', padding: '28px 24px', textAlign: 'center', borderTop: '1px solid #e8e3dc' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', marginBottom: '8px' }}>
          <span style={{ fontSize: '18px' }}>🌸</span>
          <span style={{ fontWeight: '800', color: '#b06090', fontSize: '16px' }}>GlowGuide</span>
        </div>
        <p style={{ color: '#aaa', fontSize: '13px', margin: 0 }}>
          © 2025 GlowGuide · Rutine de îngrijire personalizate
        </p>
      </footer>

      {/* Responsive */}
      <style>{`
        @media (max-width: 768px) {
          section:first-of-type > div { grid-template-columns: 1fr !important; }
          section:nth-of-type(3) > div > div { grid-template-columns: 1fr !important; }
          h1 { font-size: 36px !important; }
        }
      `}</style>
    </div>
  );
}
