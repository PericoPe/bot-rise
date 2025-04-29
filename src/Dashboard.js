import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { footerLinks } from './footerTexts';

export default function Dashboard() {
  // Mock data
  const comunidades = [
    { nombre: 'Padres 2025', estado: 'activa' },
    { nombre: 'Familia Jardín', estado: 'activa' },
    { nombre: 'Fútbol Amigos', estado: 'inactiva' },
    { nombre: 'Viaje Egresados', estado: 'inactiva' },
    { nombre: 'Cocina Creativa', estado: 'inactiva' },
    { nombre: 'Libros Compartidos', estado: 'inactiva' },
    { nombre: 'Yoga Mamás', estado: 'inactiva' },
  ];
  const eventos = [
    { titulo: 'Reunión de padres', fecha: '2025-04-21', comunidad: 'Padres 2025' },
    { titulo: 'Taller de cocina', fecha: '2025-05-03', comunidad: 'Cocina Creativa' },
    { titulo: 'Partido de fútbol', fecha: '2025-04-27', comunidad: 'Fútbol Amigos' },
  ];

  const navigate = useNavigate();
  return (
    <React.Fragment>
      <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)', fontFamily: 'Inter, Rubik, sans-serif', overflowX: 'hidden', position: 'relative' }}>
        {/* Fondo decorativo animado */}
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none', background: 'radial-gradient(circle at 70% 30%, #6366f1 0%, transparent 60%), radial-gradient(circle at 20% 80%, #10b981 0%, transparent 70%)', opacity: 0.10 }} />
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
          onClick={() => {
            // Solo navega a la landing (sin supabase)
            navigate('/');
          }}
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
            display: 'flex',
            alignItems: 'center',
            gap: 7
          }}
          onMouseOver={e => { e.target.style.background = '#6366f1'; e.target.style.color = '#fff'; }}
          onMouseOut={e => { e.target.style.background = '#fff'; e.target.style.color = '#6366f1'; }}
        >
          <span style={{fontSize: '1.35em'}}>🚪</span> Salir
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
            .dashboard-main {
              flex-direction: column !important;
              gap: 18px !important;
              margin-top: 18px !important;
            }
            .dashboard-card {
              min-width: 0 !important;
              width: 100% !important;
              padding: 14px 8px !important;
              font-size: 0.98rem !important;
            }
            .dashboard-title {
              font-size: 1.3rem !important;
              margin-top: 20px !important;
            }
          }
        `}</style>
      </header>
      <div style={{ height: 64 }} />
      <div style={{ maxWidth: 1100, margin: '40px auto', padding: '0 20px', background: '#f8fafc', borderRadius: 20, boxShadow: '0 2px 16px rgba(99,102,241,0.08)' }}>
        <h2 style={{ color: '#6366f1', fontWeight: 900, fontSize: '2.3rem', textAlign: 'center', marginTop: 32, letterSpacing: '-1px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 14 }}><span style={{fontSize:34}}>📊</span> Dashboard</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 32, marginTop: 40, justifyContent: 'space-between' }}>
        {/* Comunidades */}
        <div style={{ flex: '1 1 320px', background: '#fff', borderRadius: 18, boxShadow: '0 4px 18px rgba(99,102,241,0.10)', padding: 28, minWidth: 300 }}>
          <h3 style={{ color: '#6366f1', fontWeight: 900, fontSize: '1.35rem', marginBottom: 18, letterSpacing:'-1px', display:'flex', alignItems:'center', gap:9 }}><span style={{fontSize:26}}>📣</span> Comunidades</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {comunidades.map((c, i) => (
              <li key={i} style={{
                padding: '12px 0',
                borderBottom: i !== comunidades.length - 1 ? '1px solid #f1f5f9' : 'none',
                color: '#334155',
                fontWeight: 600,
                display: 'flex',
                alignItems: 'center',
                gap: 10
              }}>
                <span style={{
                  display: 'inline-block',
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: c.estado === 'activa' ? 'linear-gradient(90deg,#10b981 0%,#34d399 100%)' : '#cbd5e1',
                  marginRight: 8,
                  boxShadow: c.estado === 'activa' ? '0 0 6px #34d39999' : 'none',
                  border: c.estado === 'activa' ? '2px solid #10b981' : '2px solid #cbd5e1',
                  transition: 'all .2s',
                }}></span>
                {c.nombre}
                <span style={{
                  marginLeft: 'auto',
                  fontSize: 13,
                  color: c.estado === 'activa' ? '#10b981' : '#64748b',
                  fontWeight: 900,
                  background: c.estado === 'activa' ? 'rgba(16,185,129,0.11)' : '#f1f5f9',
                  borderRadius: 12,
                  padding: '2px 12px',
                  letterSpacing: '0.5px',
                  border: c.estado === 'activa' ? '1.5px solid #10b981' : '1.5px solid #cbd5e1',
                  marginRight: 2
                }}>
                  {c.estado === 'activa' ? 'Activa' : 'Inactiva'}
                </span>
              </li>
            ))}
          </ul>
        </div>
        {/* Próximos eventos */}
        <div style={{ flex: '1 1 320px', background: '#fff', borderRadius: 18, boxShadow: '0 4px 18px rgba(59,130,246,0.10)', padding: 28, minWidth: 300 }}>
          <h3 style={{ color: '#3b82f6', fontWeight: 900, fontSize: '1.35rem', marginBottom: 18, letterSpacing:'-1px', display:'flex', alignItems:'center', gap:9 }}><span style={{fontSize:26}}>📅</span> Próximos eventos</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {eventos.map((e, i) => (
              <li key={i} style={{
                padding: '12px 0',
                borderBottom: i !== eventos.length - 1 ? '1px solid #f1f5f9' : 'none',
                display: 'flex',
                alignItems: 'center',
                gap: 10
              }}>
                <span style={{
                  display: 'inline-block',
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: '#6366f1',
                  marginRight: 8,
                  boxShadow: '0 0 6px #6366f199',
                  border: '2px solid #6366f1',
                  transition: 'all .2s',
                }}></span>
                <span style={{ fontWeight: 600, color: '#3b82f6' }}>{e.titulo}</span>
                <span style={{
                  marginLeft: 'auto',
                  fontSize: 13,
                  color: '#3b82f6',
                  fontWeight: 900,
                  background: 'rgba(59,130,246,0.11)',
                  borderRadius: 12,
                  padding: '2px 12px',
                  letterSpacing: '0.5px',
                  border: '1.5px solid #3b82f6',
                  marginRight: 2
                }}>{e.comunidad} • {new Date(e.fecha).toLocaleDateString()}</span>
              </li>
            ))}
          </ul>
        </div>
        {/* Crear evento */}
        <div style={{ flex: '1 1 320px', background: 'linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)', borderRadius: 18, boxShadow: '0 4px 18px rgba(99,102,241,0.13)', padding: 28, minWidth: 300, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <h3 style={{ color: '#fff', fontWeight: 900, fontSize: '1.35rem', marginBottom: 18, letterSpacing:'-1px', display:'flex', alignItems:'center', gap:9 }}><span style={{fontSize:26}}>✨</span> Crear un evento</h3>
          <button style={{ background: '#fff', color: '#6366f1', fontWeight: 800, fontSize: '1.1rem', border: 'none', borderRadius: 32, padding: '16px 38px', boxShadow: '0 2px 8px rgba(99,102,241,0.09)', cursor: 'pointer', marginTop: 10, display:'flex', alignItems:'center', gap:8 }} onClick={() => alert('Funcionalidad próximamente disponible')}><span style={{fontSize:22}}>➕</span> Nuevo evento</button>
        </div>
      </div>
        </div>
      </div>
    </React.Fragment>
  );
}

// FooterLegal: footer fijo con enlaces legales y modal
function FooterLegal() {
  const [modal, setModal] = useState(null);
  return (
    <>
      <footer style={{
        position: 'fixed', bottom: 0, left: 0, width: '100%', background: '#f8fafc', borderTop: '1px solid #e0e7ef',
        display: 'flex', justifyContent: 'center', gap: 24, padding: '12px 0', zIndex: 500, fontSize: 15, color: '#6366f1',
        boxShadow: '0 -2px 12px rgba(99,102,241,0.03)', flexWrap: 'wrap'
      }}>
        {footerLinks.map(link => (
          <button
            key={link.key}
            onClick={() => setModal(link)}
            style={{ background: 'none', border: 'none', color: '#6366f1', cursor: 'pointer', padding: 0, fontWeight: 600 }}
          >
            {link.label}
          </button>
        ))}
      </footer>
      {modal && (
        <div style={{
          position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(30,41,59,0.25)',
          display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 999
        }} onClick={() => setModal(null)}>
          <div style={{
            background: '#fff', borderRadius: 14, boxShadow: '0 8px 32px 0 rgba(99,102,241,0.16)',
            padding: 32, maxWidth: 440, width: '90vw', position: 'relative', color: '#334155',
            fontSize: 16, lineHeight: 1.6
          }} onClick={e => e.stopPropagation()}>
            <h3 style={{ color: '#6366f1', fontWeight: 900, fontSize: 22, marginBottom: 16 }}>{modal.label}</h3>
            <div style={{ whiteSpace: 'pre-line' }}>{modal.content}</div>
            <button style={{ position: 'absolute', top: 10, right: 18, background: 'none', border: 'none', color: '#64748b', fontSize: 20, cursor: 'pointer' }} onClick={() => setModal(null)}>&#10005;</button>
          </div>
        </div>
      )}
    </>
  );
}

