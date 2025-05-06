'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

const PropertySearchForm = () => {
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('Todos');
  const router = useRouter();
  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log(propertyType, location);
    if (location === '' && propertyType === 'Todos') {
      // caso pesquise com o campo vazio e sem selecionar nada, listará tudo
      router.push('/properties');
    } else {
      const query = `?location=${location}&propertyType=${propertyType}`;
      router.push(`/properties/search-results${query}`); // redireciona para página que possui os resultados de pesquisa
    }
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-stretch md:space-x-2 space-y-2 md:space-y-0"
    >
      <div className="w-full">
        <label htmlFor="location" className="sr-only">
          Local
        </label>
        <input
          type="text"
          id="location"
          placeholder="Insira o local (cidade, estado, CEP)"
          className="w-full h-12 px-4 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
          value={location}
          onChange={(e) => setLocation(e.target.value)} // atualiza o state ao escrever nesse campo
        />
      </div>
      <div className="w-full md:w-auto">
        <label htmlFor="property-type" className="sr-only">
          Tipo de imóvel
        </label>
        <select
          id="property-type"
          className="w-full md:w-auto min-w-[180px] h-12 px-4 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
          value={propertyType}
          onChange={(e) => setPropertyType(e.target.value)}
        >
          <option value="Todos">Todos</option>
          <option value="Apartment">Apartamento</option>
          <option value="Studio">Estúdio</option>
          <option value="Condo">Condomínio</option>
          <option value="House">Casa</option>
          <option value="Cabin Or Cottage">Cabana ou chalé</option>
          <option value="Loft">Sótão</option>
          <option value="Room">Quarto</option>
          <option value="Other">Outros</option>
        </select>
      </div>
      <div className="w-full md:w-auto">
        <button
          type="submit"
          className="w-full md:w-auto h-12 px-6 rounded-lg bg-blue-500 text-white hover:bg-blue-600 focus:outline-none focus:ring focus:ring-blue-500"
        >
          Pesquisar
        </button>
      </div>
    </form>
  );
};

export default PropertySearchForm;
