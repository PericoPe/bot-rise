import React, { useState } from 'react';

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
    const steps = [
      { icon: '🎓', label: 'Comunidad', color: '#6366f1' },
      { icon: '👤', label: 'Tus datos', color: '#3b82f6' },
      { icon: '🔗', label: 'Invitar', color: '#10b981' },
      { icon: '🎉', label: '¡Listo!', color: '#f59e0b' },
    ];
    return (
      <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginBottom: 32 }}>
        {steps.map((s, i) => (
          <div key={i} style={{ textAlign: 'center', flex: 1 }}>
            <div style={{
              width: 44, height: 44, borderRadius: '50%',
              background: step === i + 1 ? s.color : '#e0e7ef',
              color: '#fff',
              fontSize: 26, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto',
              boxShadow: step === i + 1 ? '0 2px 12px rgba(99,102,241,0.10)' : 'none',
              border: step === i + 1 ? '2px solid #6366f1' : '2px solid #e0e7ef',
              transition: 'all .2s',
            }}>{s.icon}</div>
            <div style={{ fontSize: 13, color: step === i + 1 ? s.color : '#64748b', fontWeight: step === i + 1 ? 700 : 500, marginTop: 4 }}>{s.label}</div>
          </div>
        ))}
      </div>
    );
  };

  const navigate = useNavigate();
  return (
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
  );
}



function StepWizardInner({ onFinish }) {
  const navigate = useNavigate();
  const location = useLocation();
  // Si viene desde invitación, inicializar con esos datos y saltar a paso 2
  const state = location.state || {};
  const desdeInvitacion = !!state.desdeInvitacion;
  const [step, setStep] = useState(desdeInvitacion ? 2 : 1);
  const [form, setForm] = useState({
    tipoComunidad: state.tipoComunidad || '',
    institucion: state.institucion || '',
    sala: state.sala || '',
    division: state.division || '',
    apodo: state.apodo || '',
    nombrePadre: state.nombrePadre || '',
    nombreHijo: '',
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

  // Guardar en Supabase solo si es creación (no invitado) y finaliza
  React.useEffect(() => {
    if (finalizado && !desdeInvitacion && comunidadId) {
      import('./supabaseClient').then(async ({ supabase }) => {
        const { error } = await supabase.from('communities').insert([
          {
            id: comunidadId,
            tipoComunidad: form.tipoComunidad,
            institucion: form.institucion,
            sala: form.sala,
            division: form.division,
            apodo: form.apodo,
            nombrePadre: form.nombrePadre,
            nombreHijo: form.nombreHijo,
            nacimiento: form.nacimiento,
            whatsapp: form.whatsapp,
            email: form.email,
            alias: form.alias,
            monto: form.monto,
            created_at: new Date().toISOString(),
          }
        ]);
        if (error) {
          setSaveStatus({ success: false, error: error.message });
        } else {
          setSaveStatus({ success: true, error: null });
        }
      });
    }
    // Redirige igual
    if (finalizado) {
      const to = setTimeout(() => navigate('/dashboard'), 2000);
      return () => clearTimeout(to);
    }
  }, [finalizado, comunidadId]);

  // Paso 4: Bienvenida y redirección
  if (finalizado) {
    return (
      <div style={{ ...estiloPaso, boxShadow: '0 8px 32px 0 rgba(99,102,241,0.16)', border: 'none', background: '#fff', position: 'relative', textAlign: 'center', padding: 32 }}>
        <span style={{ fontSize: 54, color: '#f59e0b', marginBottom: 16 }}>🎉</span>
        <h2 style={{ color: '#f59e0b', fontWeight: 900, fontSize:'2rem', display:'flex', alignItems:'center', gap:10, justifyContent:'center' }}><span style={{fontSize:32}}>🎉</span> ¡Bienvenido/a a la comunidad!</h2>
        <p style={{ color: '#64748b', marginTop: 18 }}>Tu comunidad fue creada correctamente.<br />Serás redirigido al dashboard en segundos...</p>
        {saveStatus.success === true && (
          <div style={{ color: '#10b981', fontWeight: 700, marginTop: 18 }}>
            ✔ Comunidad guardada en Supabase correctamente.
          </div>
        )}
        {saveStatus.success === false && (
          <div style={{ color: '#ef4444', fontWeight: 700, marginTop: 18 }}>
            ❌ Error al guardar en Supabase: {saveStatus.error}
          </div>
        )}
      </div>
    );
  }

  // Paso 1: Datos de la comunidad
  if (step === 1 && !desdeInvitacion) {
    window.dispatchEvent(new CustomEvent('stepwizard-step', { detail: { step: 1 } }));
    return (
      <div style={{ ...estiloPaso, boxShadow: '0 8px 32px 0 rgba(99,102,241,0.16)', border: 'none', background: '#fff', position: 'relative' }}>
        <span style={{ position: 'absolute', left: 22, top: 22, fontSize: 38, color: '#6366f1' }}>🎓</span>
        <h2 style={{...tituloPaso, display:'flex', alignItems:'center', gap:10}}><span style={{fontSize:32}}>🎓</span> Paso 1: Datos de la comunidad</h2>
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

  // Paso 2: Datos personales
  if (step === 2) {
    window.dispatchEvent(new CustomEvent('stepwizard-step', { detail: { step: 2 } }));
    const camposBloqueados = desdeInvitacion;
    return (
      <div style={{ ...estiloPaso, boxShadow: '0 8px 32px 0 rgba(99,102,241,0.16)', border: 'none', background: '#fff', position: 'relative' }}>
        <span style={{ position: 'absolute', left: 22, top: 22, fontSize: 38, color: '#3b82f6' }}>👤</span>
        <h2 style={{...tituloPaso, display:'flex', alignItems:'center', gap:10}}><span style={{fontSize:32}}>👤</span> Paso 2: Tus datos</h2>
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
    window.dispatchEvent(new CustomEvent('stepwizard-step', { detail: { step: 3 } }));
    // Generar link único si no existe
    if (!link) {
      const id = generarIdUnico({
        institucion: form.institucion.trim(),
        sala: form.sala.trim(),
        division: form.division.trim(),
      });
      // Agrega nombrePadre como query param
      const nombrePadreParam = encodeURIComponent(form.nombrePadre);
      setLink(window.location.origin + '/comunidad/' + id + `?nombrePadre=${nombrePadreParam}`);
      setComunidadId(id);
    }
    return (
      <div style={{ ...estiloPaso, boxShadow: '0 8px 32px 0 rgba(59,130,246,0.16)', border: 'none', background: '#fff', position: 'relative', textAlign: 'center', padding: 32 }}>
        <span style={{ fontSize: 54, color: '#10b981', marginBottom: 16 }}>🔗</span>
        <h2 style={{ color: '#10b981', fontWeight: 900, fontSize:'2rem', display:'flex', alignItems:'center', gap:10, justifyContent:'center' }}><span style={{fontSize:32}}>🔗</span> ¡Comparte el link con los miembros!</h2>
        <p style={{ color: '#64748b', marginTop: 18 }}>Este es el link único para invitar a otros a tu comunidad:</p>
        <input type="text" value={link} readOnly style={{ width: '100%', marginTop: 12, marginBottom: 12, padding: 8, borderRadius: 6, border: '1px solid #ccc', fontSize: '1.1rem' }} />
        <div style={{ marginBottom: 18 }}>
          <button style={{ ...estiloBtnPrincipal, marginRight: 12 }} onClick={() => { navigator.clipboard.writeText(link); }}>Copiar link</button>
          <a href={`https://wa.me/?text=${encodeURIComponent(link)}`} target="_blank" rel="noopener noreferrer" style={{ ...estiloBtnPrincipal, background: '#25D366', color: '#fff' }}>Compartir por WhatsApp</a>
        </div>
        <button style={estiloBtnPrincipal} onClick={() => setFinalizado(true)}>
          Finalizar y ver miembros
        </button>
      </div>
    );
  }
}


const estiloPaso = {
  maxWidth: 480,
  width: '100%',
  margin: '40px auto',
  background: '#fff',
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
