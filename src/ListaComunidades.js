import React, { useEffect, useState } from 'react';
import { supabase } from './supabaseClient';

function ListaComunidades() {
  const [comunidades, setComunidades] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchComunidades() {
      const { data, error } = await supabase
        .from('communities')
        .select('*');
      if (error) {
        setError(error.message);
        setComunidades([]);
      } else {
        setComunidades(data);
        setError(null);
      }
      setLoading(false);
    }
    fetchComunidades();
  }, []);

  if (loading) return <div>Cargando comunidades...</div>;
  if (error) return <div>Error: {error}</div>;
  if (comunidades.length === 0) return <div>No hay comunidades registradas.</div>;

  return (
    <div>
      <h2>Comunidades</h2>
      <ul>
        {comunidades.map(c => (
          <li key={c.id}>{c.nombre}</li>
        ))}
      </ul>
    </div>
  );
}

export default ListaComunidades;
