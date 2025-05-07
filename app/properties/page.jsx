// "http://localhost:3000/properties" funciona sem a necessidade de definir rotas (característica SSR). a antiga estrutura de páginas (sem a pasta "app") precisaria criar um componente "properties".jsx. mesmo que isso seja um server component, é possível pegar informação e carregar nessa página. caso seja um client component, seria preciso o uso de useFetch hook

import PropertyCard from '@/components/PropertyCard';
// import properties from '@/properties.json';
import { fetchProperties } from '@/utils/requests';
import PropertySearchForm from '@/components/PropertySearchForm';

const PropertiesPage = async () => {
  const properties = await fetchProperties(); // a variável properties agora contém data do db, que será exibida mais abaixo
  properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // organiza às listagens por data de envio
  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
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
    </>
  );
};

export default PropertiesPage;
