import React, { useEffect } from 'react';
import { supabase } from './supabaseClient';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Si el usuario ya está autenticado, lo redirige a donde venía
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        const from = location.state?.from;
        if (from) {
          // Si viene de una invitación, siempre redirige al stepwizard con el state de invitación
          if (
            typeof from === 'object' &&
            from.pathname === '/crear-comunidad' &&
            from.state && from.state.desdeInvitacion
          ) {
            navigate('/crear-comunidad', { state: from.state, replace: true });
          } else if (typeof from === 'object' && from.pathname) {
            navigate(from.pathname, { state: from.state, replace: true });
          } else {
            navigate(from, { replace: true });
          }
        } else {
          navigate('/dashboard', { replace: true });
        }
      }
    });
  }, [navigate, location]);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({ provider: 'google' });
    if (error) alert('Error al iniciar sesión: ' + error.message);
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
      <div style={{ background: '#fff', padding: 36, borderRadius: 18, boxShadow: '0 4px 24px rgba(99,102,241,0.10)', maxWidth: 340, width: '100%' }}>
        <h2 style={{ color: '#3b82f6', fontWeight: 900, fontSize: '2rem', marginBottom: 24, textAlign: 'center' }}>
          Iniciar sesión
        </h2>
        <button
          onClick={handleLogin}
          style={{
            background: 'linear-gradient(90deg,#6366f1 0%,#3b82f6 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 8,
            padding: '14px 32px',
            fontWeight: 700,
            fontSize: 18,
            cursor: 'pointer',
            width: '100%',
            boxShadow: '0 2px 8px 0 rgba(99,102,241,0.12)',
            marginBottom: 8,
          }}
        >
          Continuar con Google
        </button>
      </div>
    </div>
  );
}
