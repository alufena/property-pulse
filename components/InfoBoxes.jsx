import InfoBox from './InfoBox';

const InfoBoxes = () => {
  return (
    <section>
      <div className="container-xl lg:container m-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 rounded-lg">
          <InfoBox // tudo é dinâmico agora. passados como "prop" ao invés de estar hardcoded
            heading="Para locatários"
            backgroundColor="bg-gray-100"
            buttonInfo={{
              // objeto dentro um attribute value requer duas chaves. 1ª {} representa que é dinâmico (expressão), 2º {} é o objeto
              text: 'Ver imóveis',
              link: '/properties',
              backgroundColor: 'bg-black',
            }}
          >
            Adicione os imóveis aos favoritos e entre em contato com os
            proprietários.
          </InfoBox>
          <InfoBox
            heading="Para donos de imóveis"
            backgroundColor="bg-blue-100"
            buttonInfo={{
              text: 'Adicionar imóveis',
              link: '/add-property',
              backgroundColor: 'bg-blue-500',
            }}
          >
            Anuncie seus imóveis e alcance potenciais inquilinos. Alugue como
            Airbnb ou por longo prazo.
          </InfoBox>
          {/* <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Para locatários</h2>
            <p className="mt-2 mb-4">
              Adicione os imóveis aos favoritos e entre em contato com os
              proprietários.
            </p>
            <a
              href="/properties.html"
              className="inline-block bg-black text-white rounded-lg px-4 py-2 hover:bg-gray-700"
            >
              Ver imóveis
            </a>
          </div> */}
          {/* <div className="bg-blue-100 p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold">Para donos de imóveis</h2>
            <p className="mt-2 mb-4">
              Anuncie seus imóveis e alcance potenciais inquilinos. Alugue como
              Airbnb ou por longo prazo.
            </p>
            <a
              href="/add-property.html"
              className="inline-block bg-blue-500 text-white rounded-lg px-4 py-2 hover:bg-blue-600"
            >
              Adicionar imóveis
            </a>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default InfoBoxes;
