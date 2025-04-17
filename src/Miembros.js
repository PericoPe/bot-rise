import React from 'react';

export default function Miembros() {
  const navigate = useNavigate();
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)' }}>
      {/* Header fijo igual a landing */}
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        background: '#fff',
        boxShadow: '0 2px 12px rgba(99,102,241,0.08)',
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 12px',
        height: 64
      }}>
        <span style={{ fontWeight: 900, fontSize: 26, color: '#6366f1', letterSpacing: '-1px' }}>bot-rise</span>
        <button
          onClick={() => navigate('/dashboard')}
          style={{
            background: '#fff',
            color: '#6366f1',
            border: '2px solid #6366f1',
            borderRadius: 32,
            fontWeight: 700,
            fontSize: '1.05rem',
            padding: '10px 18px',
            boxShadow: '0 2px 12px rgba(99,102,241,0.12)',
            cursor: 'pointer',
            transition: 'background .15s, color .15s',
            maxWidth: '100vw',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
          }}
          onMouseOver={e => { e.target.style.background = '#6366f1'; e.target.style.color = '#fff'; }}
          onMouseOut={e => { e.target.style.background = '#fff'; e.target.style.color = '#6366f1'; }}
        >
          Ingresar
        </button>
        <style>{`
          @media (max-width: 700px) {
            header {
              padding: 0 2vw !important;
            }
            header button {
              font-size: 0.92rem !important;
              padding: 7px 10px !important;
              min-width: 80px;
            }
            .miembros-card {
              padding: 18px 6px !important;
              font-size: 1.01rem !important;
            }
            .miembros-title {
              font-size: 1.3rem !important;
              margin-top: 18px !important;
            }
          }
        `}</style>
      </header>
      <div style={{ height: 64 }} />
      <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ background: '#fff', borderRadius: 24, boxShadow: '0 8px 32px 0 rgba(99,102,241,0.16)', padding: '52px 40px 36px 40px', textAlign: 'center', maxWidth: 480, width: '100%' }}>
          <span style={{ fontSize: 32 }}>👥</span>
          <h2 style={{ color: '#3b82f6', fontWeight: 900, fontSize: '2rem', marginBottom: 18, letterSpacing: '-1px' }}>Invita miembros a tu comunidad</h2>
          <p style={{ color: '#6366f1', fontWeight: 600, fontSize: '1.15rem', marginBottom: 24 }}>
            Comparte el link con quienes quieras sumar. Ellos podrán unirse fácilmente y completar sus datos.
          </p>
          {/* Aquí puedes agregar funcionalidades para copiar/enviar el link y ver miembros actuales */}
        </div>
      </div>
    </div>
  );
}
