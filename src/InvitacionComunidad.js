import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';


export default function InvitacionComunidad() {
  const { id } = useParams(); // id de la comunidad
  const location = useLocation();
  const navigate = useNavigate();
  // MOCK: comunidad de ejemplo
  const comunidad = {
    institucion: id.split('-')[2]?.replace(/-/g, ' ').toUpperCase() || 'INSTITUCIÓN',
    sala: id.split('-')[4]?.replace(/-/g, ' ').toUpperCase() || 'SALA',
    division: id.split('-')[5]?.replace(/-/g, ' ').toUpperCase() || 'DIVISIÓN',
    tipoComunidad: 'Padres & Madres',
    apodo: '',
  };
  const query = new URLSearchParams(location.search);
  const nombrePadre = query.get('nombrePadre') || '';


  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(120deg, #f8fafc 0%, #e0e7ff 100%)', fontFamily: 'Inter, Rubik, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ background: '#fff', borderRadius: 18, boxShadow: '0 4px 24px rgba(99,102,241,0.10)', padding: 40, maxWidth: 400, width: '90vw', textAlign: 'center' }}>
        <h2 style={{ color: '#6366f1', fontWeight: 900, fontSize: 26, marginBottom: 8 }}>
          ¡{nombrePadre || 'Alguien'} te invita a unirte!
        </h2>
        <div style={{ color: '#64748b', fontSize: 17, marginBottom: 24 }}>
          {nombrePadre || 'Alguien'} te invita a participar de la comunidad <b>{comunidad.institucion}</b>, sala <b>{comunidad.sala}</b>, división <b>{comunidad.division}</b>.<br /><br />
          Sumate para organizar colectas de cumpleaños y otras ocasiones especiales.
        </div>
        <button
          style={{ background: '#6366f1', color: '#fff', border: 'none', borderRadius: 32, fontWeight: 700, fontSize: 18, padding: '12px 32px', cursor: 'pointer', marginTop: 10 }}
          onClick={() => navigate('/crear-comunidad', { state: {
            desdeInvitacion: true,
            tipoComunidad: comunidad.tipoComunidad,
            institucion: comunidad.institucion,
            sala: comunidad.sala,
            division: comunidad.division,
            apodo: comunidad.apodo || '',
            nombrePadre: nombrePadre || '',
          } })}
        >
          Unirme
        </button>
      </div>
    </div>
  );
}
