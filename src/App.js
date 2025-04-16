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

function App() {
  // Simulación de navegación para el StepWizard
  const handleCrearComunidad = (e) => {
    e.preventDefault();
    alert('Aquí iría el StepWizard para crear una comunidad. (Placeholder)');
  };

  return (
    <div style={{ fontFamily: 'sans-serif', background: '#f8fafc', minHeight: '100vh' }}>
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
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(99,102,241,0.08)', padding: 24, flex: '1 1 220px', minWidth: 220 }}>
            <h3 style={{ color: '#6366f1' }}>Gestión simple</h3>
            <p>Crea, edita y administra comunidades con pocos clics.</p>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(59,130,246,0.08)', padding: 24, flex: '1 1 220px', minWidth: 220 }}>
            <h3 style={{ color: '#3b82f6' }}>Exploración</h3>
            <p>Descubre comunidades públicas y privadas fácilmente.</p>
          </div>
          <div style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(16,185,129,0.08)', padding: 24, flex: '1 1 220px', minWidth: 220 }}>
            <h3 style={{ color: '#10b981' }}>Seguridad</h3>
            <p>Tus datos y los de tu comunidad siempre protegidos.</p>
          </div>
        </div>
      </section>

      {/* Cómo funciona */}
      <section style={{ maxWidth: 900, margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ color: '#3b82f6', fontWeight: 700, fontSize: '2rem', textAlign: 'center' }}>¿Cómo funciona?</h2>
        <ol style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(99,102,241,0.06)', padding: 32, marginTop: 30, listStyle: 'decimal inside', fontSize: '1.1rem' }}>
          <li>Regístrate o inicia sesión.</li>
          <li>Crea una comunidad o únete a una existente.</li>
          <li>Invita miembros y comparte recursos.</li>
          <li>Gestiona tu comunidad desde el panel de control.</li>
        </ol>
      </section>

      {/* Testimonios */}
      <section style={{ maxWidth: 1000, margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ color: '#3b82f6', fontWeight: 700, fontSize: '2rem', textAlign: 'center' }}>Testimonios</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 32, marginTop: 30 }}>
          {testimonios.map((testi, idx) => (
            <div key={idx} style={{ background: '#fff', borderRadius: 16, boxShadow: '0 2px 12px rgba(99,102,241,0.06)', padding: 24, maxWidth: 220, textAlign: 'center' }}>
              <img src={testi.imagen} alt={testi.nombre} style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover', marginBottom: 16 }} />
              <p style={{ fontStyle: 'italic', marginBottom: 12 }}>&ldquo;{testi.texto}&rdquo;</p>
              <strong style={{ color: '#6366f1' }}>{testi.nombre}</strong>
            </div>
          ))}
        </div>
      </section>

      {/* Comunidades Section */}
      <section id="comunidades" style={{ maxWidth: 900, margin: '40px auto', padding: '0 20px' }}>
        <ListaComunidades />
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
      <footer style={{ textAlign: 'center', color: '#888', padding: '32px 0 16px 0', fontSize: '1rem' }}>
        © {new Date().getFullYear()} bot-rise. Creado con ❤️ usando React y Supabase.
      </footer>
    </div>
  );
}

export default App;
