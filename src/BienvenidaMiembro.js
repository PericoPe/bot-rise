import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { requireAuth } from './auth';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function BienvenidaMiembro() {
  const navigate = useNavigate();
  const { id } = useParams();
  const query = useQuery();
  const [institucion, setInstitucion] = React.useState(query.get('institucion') || '');
  const [sala, setSala] = React.useState(query.get('sala') || '');
  const [division, setDivision] = React.useState(query.get('division') || '');
  // Mejor fallback: si no está en la query, muestra 'El organizador/a'
  const [nombrePadre, setNombrePadre] = React.useState(query.get('nombrePadre') || localStorage.getItem('nombrePadre') || 'El organizador/a');



  // Ya no redirige automáticamente. El usuario siempre ve la bienvenida y debe hacer click en 'Unirme'.
  const handleUnirme = () => {
    navigate('/crear-comunidad', {
      state: {
        pasoInicial: 2,
        institucion,
        sala,
        division,
        nombrePadre,
        desdeInvitacion: true
      }
    });
  };




  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)', fontFamily: 'sans-serif' }}>
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
            marginRight: 16
          }}
        >
          Ingresar
        </button>
      </header>
      <div style={{ height: 64 }} />
      <main style={{ maxWidth: 480, margin: '0 auto', background: '#fff', borderRadius: 24, boxShadow: '0 8px 32px 0 rgba(99,102,241,0.14)', padding: '48px 32px 36px 32px', marginTop: 48, textAlign: 'center' }}>
        <span style={{ fontSize: 52, color: '#6366f1', marginBottom: 16 }}>🤝</span>
        <h1 style={{ color: '#3b82f6', fontWeight: 900, fontSize: '2rem', marginBottom: 10 }}>¡Te invitaron a una comunidad en bot-rise!</h1>
        <p style={{ color: '#64748b', fontSize: '1.15rem', margin: '18px 0 28px 0' }}>
          bot-rise es la forma más fácil y moderna de organizar comunidades de padres, amigos o grupos para gestionar aportes, regalos y comunicación.<br /><br />
          <b>¿Qué podés hacer?</b>
          <ul style={{ textAlign: 'left', margin: '18px auto', maxWidth: 340, color: '#334155', fontSize: '1rem' }}>
            <li>Sumarte a una comunidad exclusiva</li>
            <li>Ver y contactar a otros miembros</li>
            <li>Recibir recordatorios y novedades</li>
            <li>Participar en regalos grupales</li>
          </ul>
        </p>
        <div style={{ background: '#f1f5f9', borderRadius: 14, padding: 18, margin: '18px 0', color: '#334155', fontSize: '1.07rem', textAlign: 'left', boxShadow: '0 2px 8px rgba(99,102,241,0.07)' }}>
          <div><b>Institución:</b> {institucion || <span style={{ color: '#cbd5e1' }}>No especificada</span>}</div>
          <div><b>Sala:</b> {sala || <span style={{ color: '#cbd5e1' }}>No especificada</span>}</div>
          <div><b>División:</b> {division || <span style={{ color: '#cbd5e1' }}>No especificada</span>}</div>
          <div><b>Organizador/a:</b> {nombrePadre || <span style={{ color: '#cbd5e1' }}>No especificado</span>}</div>
        </div>
        <button
          style={{
            marginTop: 32,
            background: 'linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 32,
            fontWeight: 700,
            fontSize: '1.15rem',
            padding: '14px 38px',
            boxShadow: '0 2px 12px rgba(99,102,241,0.12)',
            cursor: 'pointer',
            transition: 'background .15s, color .15s',
            marginBottom: 10
          }}
          onClick={handleUnirme}
        >
          Unirme a la comunidad
        </button>
        <p style={{ color: '#64748b', fontSize: '0.98rem', marginTop: 18 }}>
          ¿Ya tenés cuenta? Ingresá y sumate con tus datos.<br />¿Nuevo? Solo necesitás un email para sumarte.
        </p>
      </main>
    </div>
  );
}
