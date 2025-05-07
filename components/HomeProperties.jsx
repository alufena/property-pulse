// import properties from '@/properties.json';
import PropertyCard from '@/components/PropertyCard';
import Link from 'next/link';
import { fetchProperties } from '@/utils/requests';

const HomeProperties = async () => {
  // const properties = await fetchProperties();
  const data = await fetchProperties(); // agora é um objeto com ambos "properties" e "total"
  // const recentProperties = properties
  const recentProperties = data.properties
    .sort(() => Math.random() - Math.random())
    .slice(0, 3); // retorna apenas 3 informações do array "properties"
  return (
    <>
      <section className="px-4 py-6">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Últimos imóveis
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {recentProperties === 0 ? (
              <p>Nenhum imóvel encontrado</p>
            ) : (
              recentProperties.map((property) => (
                <PropertyCard key={property._id} property={property} />
              ))
            )}
          </div>
        </div>
      </section>
      {/* envoltado em fragment porque jsx só permite retornar um único parent element */}
      <section className="m-auto max-w-lg my-10 px-6">
        <Link
          href="/properties"
          className="block bg-black text-white text-center py-4 px-6 rounded-xl hover:bg-gray-700"
        >
          Ver todos imóveis
        </Link>
      </section>
    </>
  );
};

export default HomeProperties;
