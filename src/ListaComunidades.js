import React from 'react';


function ListaComunidades() {
  // MOCK: comunidades de ejemplo
  const comunidades = [
    { nombre: 'Padres 2025', estado: 'activa' },
    { nombre: 'Familia Jardín', estado: 'activa' },
    { nombre: 'Fútbol Amigos', estado: 'inactiva' },
  ];

  return (
    <div>
      <h2>Comunidades</h2>
      <ul>
        {comunidades.map(c => (
          <li key={c.nombre}>{c.nombre}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListaComunidades;
