import React from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { requireAuth } from './auth';
import { supabase } from './supabaseClient';

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

import { useEffect } from 'react';

export default function BienvenidaMiembro() {
  const navigate = useNavigate();
  const { id } = useParams();
  const query = useQuery();
  const institucion = query.get('institucion') || '';
  const sala = query.get('sala') || '';
  const division = query.get('division') || '';
  // Mejor fallback: si no está en la query, muestra 'El organizador/a'
  const nombrePadre = query.get('nombrePadre') || localStorage.getItem('nombrePadre') || 'El organizador/a';



  const handleUnirme = async () => {
    const { data: { session } } = await supabase.auth.getSession();
    if (!session) {
      // Redirige a login y guarda la ruta y parámetros originales
      navigate('/login', {
        state: {
          from: {
            pathname: '/crear-comunidad',
            state: {
              pasoInicial: 2,
              institucion,
              sala,
              division,
              nombrePadre,
              desdeInvitacion: true
            }
          }
        }
      });
    } else {
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
    }
  };



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
            .bienvenida-card {
              padding: 18px 6px !important;
              font-size: 1.01rem !important;
            }
            .bienvenida-title {
              font-size: 1.3rem !important;
              margin-top: 18px !important;
            }
          }
        `}</style>
      </header>
      <div style={{ height: 64 }} />
      <div style={{ minHeight: 'calc(100vh - 64px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ maxWidth: 480, width: '100%', background: '#fff', borderRadius: 24, boxShadow: '0 8px 32px 0 rgba(99,102,241,0.16)', padding: '52px 40px 36px 40px', textAlign: 'center', position: 'relative' }}>
          <span style={{ position: 'absolute', left: 22, top: 22, fontSize: 32 }}>🎁</span>
          <h2 style={{ color: '#3b82f6', fontWeight: 900, fontSize: '2rem', marginBottom: 18, letterSpacing: '-1px' }}>¡Te invitaron a una comunidad!</h2>
          <p style={{ color: '#6366f1', fontWeight: 600, fontSize: '1.15rem', marginBottom: 24 }}>
            <b>{nombrePadre}</b> te está invitando a participar de la comunidad de <b>{institucion}</b>, sala o grado <b>{sala}</b> y división <b>{division}</b>.<br />
            Es para agilizar y simplificar los regalos grupales, colectas y la organización.
          </p>
          <button onClick={handleUnirme} style={{ background: 'linear-gradient(90deg, #6366f1 0%, #3b82f6 100%)', color: '#fff', border: 'none', borderRadius: 32, padding: '14px 38px', fontWeight: 800, fontSize: '1.13rem', cursor: 'pointer', boxShadow: '0 2px 12px rgba(99,102,241,0.09)', marginTop: 18 }}>
            Unirme a la comunidad
          </button>
        </div>
      </div>
    </div>
  );
}
