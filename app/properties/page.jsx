// "http://localhost:3000/properties" funciona sem a necessidade de definir rotas (característica SSR). a antiga estrutura de páginas (sem a pasta "app") precisaria criar um componente "properties".jsx

import PropertyCard from '@/components/PropertyCard';
// import properties from '@/properties.json';

async function fetchProperties() {
  // isso não seria permitido em um client component, mas como aqui é um server component
  try {
    // const res = await fetch('http://localhost:3000/api/properties'); // por ser a partir do servidor, precisa incluir um domínio
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`); // 2ª forma, mais limpa, usando env
    if (!res.ok) {
      throw new Error('Algo deu errado');
    }
    return res.json(); // caso dê certo, retorna a data diretamente dessa função
  } catch (error) {
    console.log(error);
  }
}

// mesmo que isso seja um server component, é possível pegar informação e carregar nessa página. caso seja um client component, seria preciso o uso de useFetch hook

const PropertiesPage = async () => {
  const properties = await fetchProperties(); // a variável properties agora contém data do db, que será exibida mais abaixo
  properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // organiza às listagens por data de envio
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
