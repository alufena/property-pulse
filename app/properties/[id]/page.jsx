'use client'; // client component porque precisa de useEffect e outros hooks

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchProperty } from '@/utils/requests';

const page = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return; // certifica de dar prosseguimento com um id existente
      try {
        const property = await fetchProperty(id);
        setProperty(property);
      } catch (error) {
        console.error('Algo deu errado: ', error);
      } finally {
        // sempre inicia
        setLoading(false);
      }
    };
    if (property === null) {
      // invoca se a property for null. caso contrário, toda vez que property mudar, a função se inicia e causa um loop infinito
      fetchPropertyData();
    }
  }, [id, property]);
  return <div>PropertyPage</div>;
};

export default page;
