// "http://localhost:3000/properties" funciona sem a necessidade de definir rotas (característica SSR). a antiga estrutura de páginas (sem a pasta "app") precisaria criar um componente "properties".jsx

import PropertyCard from '@/components/PropertyCard';
import properties from '@/properties.json';

const PropertiesPage = () => {
  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>Nenhum imóvel encontrado</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              // <div>{property.name}</div>
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default PropertiesPage;
