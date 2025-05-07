// "http://localhost:3000/properties" funciona sem a necessidade de definir rotas (característica SSR). a antiga estrutura de páginas (sem a pasta "app") precisaria criar um componente "properties".jsx. mesmo que isso seja um server component, é possível pegar informação e carregar nessa página. caso seja um client component, seria preciso o uso de useFetch hook

// import properties from '@/properties.json';
// import { fetchProperties } from '@/utils/requests';
import PropertySearchForm from '@/components/PropertySearchForm';
import Properties from '@/components/Properties';

const PropertiesPage = async () => {
  // const properties = await fetchProperties(); // a variável properties agora contém data do db, que será exibida mais abaixo. fetch ocorria aqui como server side component, mas agora passará a ocorrer no component "Properties" como client side
  // properties.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)); // organiza às listagens por data de envio
  return (
    <>
      <section className="bg-blue-700 py-4">
        <div className="max-w-7xl mx-auto px-4 flex flex-col items-start sm:px-6 lg:px-8">
          <PropertySearchForm />
        </div>
      </section>
      <Properties />
    </>
  );
};

export default PropertiesPage;
