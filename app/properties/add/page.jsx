// rota para "http://localhost:3000/properties/add". uma "nested route" é criada através de uma nova pasta intitulada do nome da página e com o arquivo "page.jsx" dentro dela

import PropertyAddForm from '@/components/PropertyAddForm';

const PropertyAddPage = () => {
  return (
    <section className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <PropertyAddForm />
        </div>
      </div>
    </section>
  );
};

export default PropertyAddPage;
