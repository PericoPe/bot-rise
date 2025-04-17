import React from 'react';
import ListaComunidades from './ListaComunidades';

const testimonios = [
  {
    nombre: 'María González',
    texto: 'Crear mi comunidad fue súper fácil y ahora somos más de 500 miembros activos. ¡Gracias bot-rise!',
    imagen: 'https://randomuser.me/api/portraits/women/44.jpg',
  },
  {
    nombre: 'Juan Pérez',
    texto: 'La mejor plataforma para descubrir comunidades afines a mis intereses. Muy recomendable.',
    imagen: 'https://randomuser.me/api/portraits/men/32.jpg',
  },
  {
    nombre: 'Lucía Torres',
    texto: 'Unirme a una comunidad nunca fue tan sencillo. He hecho nuevos amigos y aprendido mucho.',
    imagen: 'https://randomuser.me/api/portraits/women/65.jpg',
  },
  {
    nombre: 'Carlos Ramírez',
    texto: 'Me encanta la interfaz y lo rápido que puedo gestionar mi grupo. ¡Excelente herramienta!',
    imagen: 'https://randomuser.me/api/portraits/men/76.jpg',
  },
];

import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import StepWizard from './StepWizard';
import Dashboard from './Dashboard';
import BienvenidaMiembro from './BienvenidaMiembro';
import Miembros from './Miembros';
import Login from './Login';
import { requireAuth } from './auth';

function Landing() {
  const navigate = useNavigate();
  const handleCrearComunidad = async (e) => {
    e.preventDefault();
    // Si no está autenticado, redirige a login y luego vuelve
    const ok = await requireAuth(navigate, '/crear-comunidad');
    if (ok) navigate('/crear-comunidad');
  };
  return (
    <>
      <div style={{ fontFamily: 'sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
        {/* Header fijo */}
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
                padding: 0 4px !important;
              }
              header button {
                font-size: 0.92rem !important;
                padding: 7px 10px !important;
                min-width: 80px;
              }
            }
          `}</style>
        </header>
        <div style={{ height: 64 }} />
        {/* CTA Hero */}
        <section style={{ background: 'linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)', color: '#fff', padding: '60px 20px 40px 20px', textAlign: 'center' }}>
          <h1 style={{ fontSize: '3rem', margin: 0, fontWeight: 800, letterSpacing: '-1px' }}>bot-rise</h1>
          <p style={{ fontSize: '1.5rem', margin: '20px 0 30px 0' }}>
            Gestiona y descubre comunidades de manera fácil y moderna.
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: 20, marginTop: 20 }}>
            <button onClick={handleCrearComunidad} style={{ background: '#fff', color: '#6366f1', padding: '12px 32px', borderRadius: '32px', fontWeight: 700, fontSize: '1.1rem', border: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              Crear una comunidad
            </button>
            <a href="#comunidades" style={{ background: 'transparent', color: '#fff', padding: '12px 32px', borderRadius: '32px', fontWeight: 700, fontSize: '1.1rem', border: '2px solid #fff', textDecoration: 'none', cursor: 'pointer', boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
              Unirme a una comunidad
            </a>
          </div>
        </section>

        {/* Características */}
        <section style={{ maxWidth: 900, margin: '40px auto', padding: '0 20px' }}>
          <h2 style={{ color: '#3b82f6', fontWeight: 700, fontSize: '2rem', textAlign: 'center' }}>Características</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24, marginTop: 30 }}>
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(99,102,241,0.08)', padding: 24, flex: '1 1 220px', minWidth: 220, textAlign: 'center' }}>
              <span style={{ fontSize: 32 }}>⚡</span>
              <h3 style={{ color: '#6366f1', marginTop: 12 }}>Gestión simple</h3>
              <p>Crea, edita y administra comunidades con pocos clics y desde cualquier dispositivo.</p>
            </div>
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(59,130,246,0.08)', padding: 24, flex: '1 1 220px', minWidth: 220, textAlign: 'center' }}>
              <span style={{ fontSize: 32 }}>🔍</span>
              <h3 style={{ color: '#3b82f6', marginTop: 12 }}>Exploración</h3>
              <p>Descubre comunidades y únete fácilmente con un solo clic.</p>
            </div>
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(16,185,129,0.08)', padding: 24, flex: '1 1 220px', minWidth: 220, textAlign: 'center' }}>
              <span style={{ fontSize: 32 }}>🤝</span>
              <h3 style={{ color: '#10b981', marginTop: 12 }}>Colaboración</h3>
              <p>Invita miembros y gestiona regalos grupales de forma segura.</p>
            </div>
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(245,158,11,0.08)', padding: 24, flex: '1 1 220px', minWidth: 220, textAlign: 'center' }}>
              <span style={{ fontSize: 32 }}>📱</span>
              <h3 style={{ color: '#f59e0b', marginTop: 12 }}>Acceso móvil</h3>
              <p>Usa bot-rise desde tu celular, tablet o computadora sin perder funcionalidades.</p>
            </div>
          </div>
        </section>

        {/* Cómo funciona mejorado */}
        <section style={{ maxWidth: 900, margin: '40px auto', padding: '0 20px' }}>
          <h2 style={{ color: '#6366f1', fontWeight: 700, fontSize: '2rem', textAlign: 'center' }}>¿Cómo funciona?</h2>
          <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24, marginTop: 30 }}>
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(99,102,241,0.08)', padding: 32, flex: '1 1 200px', minWidth: 200, textAlign: 'center' }}>
              <span style={{ fontSize: 40 }}>📝</span>
              <h3 style={{ color: '#6366f1', marginTop: 12 }}>1. Registrá tu comunidad</h3>
              <p>Completá los datos básicos y dale un nombre único a tu grupo.</p>
            </div>
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(59,130,246,0.08)', padding: 32, flex: '1 1 200px', minWidth: 200, textAlign: 'center' }}>
              <span style={{ fontSize: 40 }}>🔗</span>
              <h3 style={{ color: '#3b82f6', marginTop: 12 }}>2. Compartí el link</h3>
              <p>Invitá a otros padres o miembros enviando el enlace generado.</p>
            </div>
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(16,185,129,0.08)', padding: 32, flex: '1 1 200px', minWidth: 200, textAlign: 'center' }}>
              <span style={{ fontSize: 40 }}>👥</span>
              <h3 style={{ color: '#10b981', marginTop: 12 }}>3. Sumá miembros</h3>
              <p>Cada invitado completa sus datos y se suma automáticamente a la comunidad.</p>
            </div>
            <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(245,158,11,0.08)', padding: 32, flex: '1 1 200px', minWidth: 200, textAlign: 'center' }}>
              <span style={{ fontSize: 40 }}>🎉</span>
              <h3 style={{ color: '#f59e0b', marginTop: 12 }}>4. Organizá y disfrutá</h3>
              <p>Gestioná aportes, regalos y comunicación desde un solo lugar.</p>
            </div>
          </div>
        </section>

        {/* Testimonios */}
        <section style={{ maxWidth: 900, margin: '40px auto', padding: '0 20px' }}>
          <h2 style={{ color: '#3b82f6', fontWeight: 700, fontSize: '2rem', textAlign: 'center' }}>Testimonios</h2>
          <div className="testimonios-row" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 24, marginTop: 30 }}>
            {testimonios.map((testimonio, index) => (
              <div key={index} className="testimonio-card" style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(99,102,241,0.08)', padding: 24, flex: '1 1 220px', minWidth: 220, maxWidth: 260, textAlign: 'center' }}>
                <img src={testimonio.imagen} alt={`Testimonio ${index + 1}`} style={{ borderRadius: '50%', width: 64, height: 64, marginBottom: 10 }} />
                <p>{testimonio.texto}</p>
                <strong>- {testimonio.nombre}</strong>
              </div>
            ))}
          </div>
          <style>{`
            @media (min-width: 900px) {
              .testimonios-row {
                flex-wrap: nowrap !important;
                justify-content: center;
              }
              .testimonio-card {
                flex: 1 1 0px !important;
                min-width: 0 !important;
                max-width: 260px !important;
              }
            }
            @media (max-width: 900px) {
              .testimonios-row {
                flex-wrap: wrap !important;
              }
              .testimonio-card {
                flex: 1 1 220px !important;
                min-width: 180px !important;
                max-width: 100%;
              }
            }
            @media (max-width: 600px) {
              .testimonios-row {
                flex-direction: column !important;
                gap: 16px !important;
              }
              .testimonio-card {
                width: 100% !important;
                max-width: 100% !important;
                min-width: 0 !important;
              }
            }
          `}</style>
        </section>

        {/* Contacto */}
        <section id="contacto" style={{ maxWidth: 600, margin: '40px auto', padding: '0 20px' }}>
          <h2 style={{ color: '#3b82f6', fontWeight: 700, fontSize: '2rem', textAlign: 'center' }}>Contactanos</h2>
          <form style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(99,102,241,0.06)', padding: 32, marginTop: 30, display: 'flex', flexDirection: 'column', gap: 16 }} onSubmit={e => { e.preventDefault(); alert('¡Gracias por contactarnos!'); }}>
            <input type="text" placeholder="Nombre" required style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc' }} />
            <input type="email" placeholder="Email" required style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc' }} />
            <textarea placeholder="Mensaje" required style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc', minHeight: 80 }} />
            <button type="submit" style={{ background: '#6366f1', color: '#fff', padding: '12px 0', borderRadius: 8, fontWeight: 700, fontSize: '1.1rem', border: 'none', cursor: 'pointer' }}>
              Enviar
            </button>
          </form>
        </section>

        {/* Footer */}
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/crear-comunidad" element={<StepWizard />} />
        <Route path="/miembros/:id" element={<Miembros />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/comunidad/:id" element={<BienvenidaMiembro />} />
      </Routes>
    </Router>
  );
}

export default App;
