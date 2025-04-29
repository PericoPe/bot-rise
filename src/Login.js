import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Login() {
  // Comic art: Hey-Jack superhéroe
  const heyJackEmoji = "🦸‍♂️";
  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)' }}>
      <div style={{ background: '#fff', padding: 36, borderRadius: 24, boxShadow: '0 8px 32px 0 rgba(99,102,241,0.14)', maxWidth: 380, width: '100%', position: 'relative', border: '4px solid #6366f1' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 18 }}>
          <span style={{ fontSize: 46 }}>{heyJackEmoji}</span>
          <h1 style={{ color: '#6366f1', fontWeight: 900, fontSize: '2.1rem', letterSpacing: '-1px', margin: 0 }}>Hey-Jack</h1>
        </div>
        {/* Burbuja tipo comic */}        <div style={{ background: '#fffbe7', borderRadius: 18, boxShadow: '0 2px 12px rgba(245,158,11,0.10)', padding: '18px 24px', marginBottom: 22, color: '#f59e0b', fontWeight: 700, fontSize: 18, border: '2px solid #f59e0b', position: 'relative' }}>
          <span style={{ position: 'absolute', left: -14, top: 16, fontSize: 32 }}>🗨️</span>
          ¡Hola! Soy tu superhéroe para organizar colectas y cumpleaños por WhatsApp. <br/>La web solo sirve para crear tu colecta, después todo lo seguimos juntos por WhatsApp.
        </div>
        <button
          style={{
            background: 'linear-gradient(90deg,#6366f1 0%,#f59e0b 100%)',
            color: '#fff',
            border: 'none',
            borderRadius: 12,
            padding: '16px 28px',
            fontWeight: 900,
            fontSize: 20,
            cursor: 'pointer',
            width: '100%',
            boxShadow: '0 2px 12px 0 rgba(99,102,241,0.12)',
            marginBottom: 8,
            letterSpacing: '-0.5px',
            textShadow: '0 1px 4px #f8fafc',
            marginTop: 12
          }}          onClick={() => window.location.href = '/crear-comunidad'}        >
          ¡Crear colecta con Hey-Jack!
        </button>
        <div style={{ marginTop: 26, color: '#64748b', fontSize: 15, textAlign: 'center' }}>
          <b>¿Cómo sigue?</b> Cuando termines, Hey-Jack te va a contactar por WhatsApp para ayudarte con todo.
        </div>
      </div>
    </div>
  );
}
