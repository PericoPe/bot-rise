import React, { useState } from 'react';
import { footerLinks } from './footerTexts';

const opcionesComunidad = [
  'Padres & Madres',
  'Familiares',
  'Amigos',
  'Compañeros de trabajo',
  'Otros',
];

function generarIdUnico({ institucion, sala, division }) {
  // Genera un id único y amigable para compartir
  const base = `${institucion || ''}-${sala || ''}-${division || ''}`
    .replace(/[^a-zA-Z0-9]/g, '-')
    .replace(/-+/g, '-')
    .toLowerCase();
  // Agrega un sufijo de 4 letras aleatorias para evitar colisiones
  const random = Math.random().toString(36).substring(2, 6);
  return `${base}-${random}`;
}

import { useNavigate, useLocation } from 'react-router-dom';

export default function StepWizard({ onFinish }) {
  // Comic art: Hey-Jack superhéroe
  const heyJackEmoji = "🦸‍♂️";
  const comicBubble = (text, color='#f59e0b') => (
    <div style={{ background: '#fffbe7', borderRadius: 18, boxShadow: '0 2px 12px rgba(245,158,11,0.10)', padding: '14px 20px', marginBottom: 18, color, fontWeight: 700, fontSize: 17, border: `2px solid ${color}`, position: 'relative' }}>
      <span style={{ position: 'absolute', left: -14, top: 6, fontSize: 28 }}>🗨️</span>
      {text}
    </div>
  );
  // Barra de progreso visual
  // ...
  // (sin cambios)

  // Barra de progreso visual
  window.StepWizardProgress = function StepWizardProgress() {
    const [step, setStep] = React.useState(1);
    React.useEffect(() => {
      const handler = e => {
        if (e.detail && e.detail.step) setStep(e.detail.step);
      };
      window.addEventListener('stepwizard-step', handler);
      return () => window.removeEventListener('stepwizard-step', handler);
    }, []);
    // Íconos nuevos, vibrantes y alineados al branding Hey-Jack
    const steps = [
      { icon: '🦸‍♂️', label: 'Hey-Jack', color: '#f59e0b', bg: 'linear-gradient(135deg,#f59e0b 0%,#6366f1 100%)' }, // superhéroe
      { icon: '🤝', label: 'Comunidad', color: '#10b981', bg: 'linear-gradient(135deg,#10b981 0%,#3b82f6 100%)' }, // comunidad
      { icon: '💬', label: 'WhatsApp', color: '#25D366', bg: 'linear-gradient(135deg,#25D366 0%,#6366f1 100%)' }, // WhatsApp
      { icon: '🎊', label: '¡Listo!', color: '#6366f1', bg: 'linear-gradient(135deg,#6366f1 0%,#f59e0b 100%)' }, // celebración
    ];  
    return (
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 32 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ textAlign: 'center', flex: 1 }}>
            <div style={{
              width: 54, height: 54, borderRadius: '50%',
              background: step === i + 1 ? s.bg : '#e0e7ef',
              color: step === i + 1 ? '#fff' : '#b4b4b4',
              fontSize: 32, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto',
              boxShadow: step === i + 1 ? '0 4px 14px rgba(99,102,241,0.13)' : 'none',
              border: step === i + 1 ? '3px solid #f59e0b' : '2px solid #e0e7ef',
              transition: 'all .2s',
              outline: step === i + 1 ? '3px solid #ffe082' : 'none',
            }}>{s.icon}</div>
            <div style={{ fontSize: 15, color: step === i + 1 ? s.color : '#b4b4b4', fontWeight: step === i + 1 ? 900 : 500, marginTop: 8, letterSpacing: '-0.5px', textShadow: step === i + 1 ? '0 1px 6px #fffbe7' : 'none' }}>{s.label}</div>
          </div>
        ))}
      </div>
    );
  };

  const navigate = useNavigate();
  return (
    <React.Fragment>
    <div style={{ minHeight: '100vh', background: '#f8fafc' }}>
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
            .stepwizard-card {
              padding: 18px 6px !important;
              font-size: 1.01rem !important;
            }
            .stepwizard-title {
              font-size: 1.3rem !important;
              margin-top: 18px !important;
            }
          }
        `}</style>
      </header>
      <div style={{ height: 64 }} />
      {/* Fondo y tarjetas consistentes */}
      <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'flex-start', justifyContent: 'center', padding: '32px 0' }}>
        <div style={{ width: '100%', maxWidth: 520 }}>
          <StepWizardProgress />
          <StepWizardInner onFinish={onFinish} />
        </div>
      </div>
    </div>
  </React.Fragment>);
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



function StepWizardInner({ onFinish }) {
  // Todos los hooks deben ir antes de cualquier return o condicional
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state || {};
  const desdeInvitacion = !!state.desdeInvitacion;
  const [step, setStep] = useState(desdeInvitacion ? 2 : 1); // Si viene desde invitación, arranca en paso 2
  const [form, setForm] = useState({
    tipoComunidad: state.tipoComunidad || '',
    institucion: state.institucion || '',
    sala: state.sala || '',
    division: state.division || '',
    apodo: state.apodo || '',
    nombrePadre: state.nombrePadre || '',
    nombreHijo: '', // este se completa por el usuario
    nacimiento: '',
    whatsapp: '',
    email: '',
    alias: '',
    monto: '',
  });
  const [link, setLink] = useState('');
  const [finalizado, setFinalizado] = useState(false);
  const [comunidadId, setComunidadId] = useState('');
  const [saveStatus, setSaveStatus] = useState({ success: null, error: null });

  // Efecto para redirigir al dashboard al finalizar
  React.useEffect(() => {
    if (finalizado) {
      const to = setTimeout(() => navigate('/dashboard'), 2000);
      return () => clearTimeout(to);
    }
  }, [finalizado]);

  // Efecto para disparar evento de progreso
  React.useEffect(() => {
    if (step === 1 && !desdeInvitacion) {
      window.dispatchEvent(new CustomEvent('stepwizard-step', { detail: { step: 1 } }));
    } else if (step === 2) {
      window.dispatchEvent(new CustomEvent('stepwizard-step', { detail: { step: 2 } }));
    } else if (step === 3) {
      window.dispatchEvent(new CustomEvent('stepwizard-step', { detail: { step: 3 } }));
    }
  }, [step, desdeInvitacion]);

  // Efecto para generar link único en el paso 3
  React.useEffect(() => {
    if (step === 3 && !link) {
      const comunidadId = generarIdUnico({
        institucion: form.institucion,
        sala: form.sala,
        division: form.division
      });
      const url = `${window.location.origin}/comunidad/${comunidadId}`;
      setLink(url);
      setComunidadId(comunidadId);
    }
    // eslint-disable-next-line
  }, [step, link, form.institucion, form.sala, form.division]);

  // Utilidades visuales
  const heyJackEmoji = "🦸‍♂️";
  const comicBubble = (text, color='#f59e0b') => (
    <div style={{ background: '#fffbe7', borderRadius: 18, boxShadow: '0 2px 12px rgba(245,158,11,0.10)', padding: '14px 20px', marginBottom: 18, color, fontWeight: 700, fontSize: 17, border: `2px solid ${color}`, position: 'relative' }}>
      <span style={{ position: 'absolute', left: -14, top: 6, fontSize: 28 }}>🗨️</span>
      {text}
    </div>
  );

  // Paso 4: Bienvenida y redirección
  if (finalizado) {
    return (
      <div style={{ ...estiloPaso, boxShadow: '0 8px 32px 0 rgba(99,102,241,0.16)', border: 'none', background: '#fff', position: 'relative', textAlign: 'center', padding: 32 }}>
        <span style={{ fontSize: 54, color: '#f59e0b', marginBottom: 16 }}>{heyJackEmoji}</span>
        <h2 style={{ color: '#f59e0b', fontWeight: 900, fontSize:'2rem', display:'flex', alignItems:'center', gap:10, justifyContent:'center' }}><span style={{fontSize:32}}>{heyJackEmoji}</span> ¡Hey-Jack se ocupa del resto!</h2>
        {comicBubble('¡Listo! Ahora Hey-Jack te va a contactar por WhatsApp para ayudarte a organizar la colecta, enviar recordatorios y motivar a todos. ¡Chequeá tu WhatsApp!')}
        <a href="https://wa.me/549XXXXXXXXXX?text=¡Hola%20Hey-Jack!%20Acabo%20de%20crear%20una%20colecta" target="_blank" rel="noopener noreferrer" style={{ display:'inline-block', marginTop: 16, background: 'linear-gradient(90deg,#6366f1 0%,#f59e0b 100%)', color: '#fff', borderRadius: 10, padding: '14px 28px', fontWeight: 900, fontSize: 18, textDecoration: 'none', boxShadow: '0 2px 12px 0 rgba(99,102,241,0.12)' }}>
          Escribirle a Hey-Jack por WhatsApp
        </a>
      </div>
    );
  }

  // Paso 1: Datos de la colecta
  if (step === 1 && !desdeInvitacion) {
    // El evento se dispara en useEffect más abajo
    return (
      <div style={{ ...estiloPaso, boxShadow: '0 8px 32px 0 rgba(99,102,241,0.16)', border: 'none', background: '#fff', position: 'relative' }}>
        <span style={{ position: 'absolute', left: 22, top: 22, fontSize: 38, color: '#6366f1' }}>{heyJackEmoji}</span>
        <h2 style={{...tituloPaso, display:'flex', alignItems:'center', gap:10}}><span style={{fontSize:32}}>{heyJackEmoji}</span> ¿A quién vamos a sorprender?</h2>
        {comicBubble('Contame para quién es la colecta y cuándo es el evento. ¡Yo me encargo del resto!')}

        <label style={estiloLabel}>¿A qué corresponde la comunidad?
          <select name="tipoComunidad" value={form.tipoComunidad} onChange={e => setForm({ ...form, tipoComunidad: e.target.value })} style={estiloInput} required>
            <option value="">Seleccionar...</option>
            {opcionesComunidad.map(op => <option value={op} key={op}>{op}</option>)}
          </select>
        </label>
        <label style={estiloLabel}>¿Institución?
          <input name="institucion" value={form.institucion} onChange={e => setForm({ ...form, institucion: e.target.value })} style={estiloInput} required />
        </label>
        <label style={estiloLabel}>¿Sala o Grado?
          <input name="sala" value={form.sala} onChange={e => setForm({ ...form, sala: e.target.value })} style={estiloInput} required />
        </label>
        <label style={estiloLabel}>¿División?
          <input name="division" value={form.division} onChange={e => setForm({ ...form, division: e.target.value })} style={estiloInput} required />
        </label>
        <label style={estiloLabel}>¿Apodo?
          <input name="apodo" value={form.apodo || ''} onChange={e => setForm({ ...form, apodo: e.target.value })} style={estiloInput} />
        </label>
        <div style={estiloBotones}>
          <button style={estiloBtnPrincipal} onClick={() => setStep(2)} disabled={!(form.tipoComunidad && form.institucion && form.sala && form.division)}>
            Siguiente
          </button>
        </div>
      </div>
    );
  }

  // Paso 2: Tus datos
  if (step === 2) {
    // El evento se dispara en useEffect más abajo
    const camposBloqueados = desdeInvitacion;
    return (
      <div style={{ ...estiloPaso, boxShadow: '0 8px 32px 0 rgba(99,102,241,0.16)', border: 'none', background: '#fff', position: 'relative' }}>
        <span style={{ position: 'absolute', left: 22, top: 22, fontSize: 38, color: '#3b82f6' }}>{heyJackEmoji}</span>
        <h2 style={{...tituloPaso, display:'flex', alignItems:'center', gap:10}}><span style={{fontSize:32}}>{heyJackEmoji}</span> ¿Quiénes se suman a la misión?</h2>
        {comicBubble('Organizá colectas, cumpleaños y regalos por WhatsApp. Hey Jack se encarga de todo.')}

        {/* Datos de comunidad precargados y bloqueados si viene desde invitación */}
        {camposBloqueados && (
          <div style={{ marginBottom: 18, background: '#f1f5f9', borderRadius: 8, padding: 14 }}>
            <div><b>Comunidad:</b> {form.tipoComunidad}</div>
            <div><b>Institución:</b> {form.institucion}</div>
            <div><b>Sala/Grado:</b> {form.sala}</div>
            <div><b>División:</b> {form.division}</div>
            {form.apodo && <div><b>Apodo:</b> {form.apodo}</div>}
          </div>
        )}
        <label style={estiloLabel}>¿Cómo se llama tu hijo/a?
          <input name="nombreHijo" value={form.nombreHijo} onChange={e => setForm({ ...form, nombreHijo: e.target.value })} style={estiloInput} required />
        </label>
        <label style={estiloLabel}>¿Cuándo nació?
          <input name="nacimiento" type="date" value={form.nacimiento} onChange={e => setForm({ ...form, nacimiento: e.target.value })} style={estiloInput} required />
        </label>
        <label style={estiloLabel}>¿Cómo te llamas?
          <input name="nombrePadre" value={form.nombrePadre} onChange={e => setForm({ ...form, nombrePadre: e.target.value })} style={estiloInput} required />
        </label>
        <label style={estiloLabel}>Whatsapp
          <input name="whatsapp" value={form.whatsapp} onChange={e => setForm({ ...form, whatsapp: e.target.value })} style={estiloInput} required />
        </label>
        <label style={estiloLabel}>Email
          <input name="email" type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} style={estiloInput} required />
        </label>
        <label style={estiloLabel}>Alias de Mercado Pago
          <input name="alias" value={form.alias} onChange={e => setForm({ ...form, alias: e.target.value })} style={estiloInput} />
        </label>
        {/* Campo de aporte solo para creación, no para miembros invitados */}
        {!camposBloqueados && (
          <>
            <label style={estiloLabel}>¿Cuánto aportan para cada regalo? ($$$)
              <input name="monto" type="number" value={form.monto} onChange={e => setForm({ ...form, monto: e.target.value })} style={estiloInput} required />
            </label>
          </>
        )}

        <div style={estiloBotones}>
          {!camposBloqueados && (
            <button style={{ ...estiloBtnPrincipal, marginRight: 12 }} onClick={() => setStep(1)}>Atrás</button>
          )}
          <button style={estiloBtnPrincipal} onClick={() => {
            if (camposBloqueados) {
              setFinalizado(true);
              return;
            }
            setStep(3);
          }} disabled={!(form.nombreHijo && form.nacimiento && form.nombrePadre && form.whatsapp && form.email && (camposBloqueados || form.monto))}>
            {camposBloqueados ? 'Finalizar' : 'Siguiente'}
          </button>
        </div>
      </div>
    );
  }

  // Paso 3: Compartir link
  if (step === 3) {
    return (
      <div style={{ ...estiloPaso, boxShadow: '0 8px 32px 0 rgba(59,130,246,0.16)', border: 'none', background: '#fff', position: 'relative', textAlign: 'center', padding: 32 }}>
        <span style={{ fontSize: 54, color: '#10b981', marginBottom: 16 }}>{heyJackEmoji}</span>
        <h2 style={{ color: '#10b981', fontWeight: 900, fontSize:'2rem', display:'flex', alignItems:'center', gap:10, justifyContent:'center' }}><span style={{fontSize:32}}>{heyJackEmoji}</span> Compartí el link</h2>
        {comicBubble('Enviá este link al grupo de WhatsApp. Cuando se sumen, yo los contacto y me encargo de los recordatorios y la motivación.')}
        <input type="text" value={link} readOnly style={{ width: '100%', marginTop: 12, marginBottom: 12, padding: 8, borderRadius: 6, border: '1px solid #ccc', fontSize: '1.1rem' }} />
        <div style={{ marginBottom: 18 }}>
          <button style={{ ...estiloBtnPrincipal, marginRight: 12 }} onClick={() => { navigator.clipboard.writeText(link); }}>Copiar link</button>
          <a href={`https://wa.me/?text=${encodeURIComponent(link)}`} target="_blank" rel="noopener noreferrer" style={{ ...estiloBtnPrincipal, background: '#25D366', color: '#fff' }}>Compartir por WhatsApp</a>
        </div>
        <button style={estiloBtnPrincipal} onClick={() => setFinalizado(true)}>
          Finalizar y ver instrucciones
        </button>
      </div>
    );
  }
}

const estiloPaso = {
  borderRadius: 24,
  boxShadow: '0 8px 32px 0 rgba(99,102,241,0.14)',
  padding: '52px 40px 36px 40px',
  display: 'flex',
  flexDirection: 'column',
  gap: 22,
  border: 'none',
  position: 'relative',
};

const estiloLabel = {
  display: 'block',
  color: '#334155',
  fontWeight: 600,
  marginBottom: 8,
  marginTop: 18,
};

const estiloInput = {
  width: '100%',
  padding: '10px 14px',
  borderRadius: 8,
  border: '1px solid #e5e7eb',
  marginTop: 6,
  fontSize: 16,
  background: '#f8fafc',
  color: '#334155',
  outline: 'none',
  marginBottom: 4,
};

const estiloBotones = {
  display: 'flex',
  justifyContent: 'flex-end',
  marginTop: 30,
};

const estiloBtnPrincipal = {
  background: 'linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)',
  color: '#fff',
  border: 'none',
  borderRadius: 8,
  padding: '12px 32px',
  fontWeight: 700,
  fontSize: 18,
  cursor: 'pointer',
  boxShadow: '0 2px 8px 0 rgba(99,102,241,0.12)',
  transition: 'background 0.2s',
};

const tituloPaso = {
  color: '#3b82f6',
  fontWeight: 900,
  fontSize: '2rem',
  marginBottom: 16,
  marginTop: 0,
  textAlign: 'center',
  letterSpacing: '-1px',
};
