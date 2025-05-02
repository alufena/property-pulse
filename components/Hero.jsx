const Hero = () => {
  return (
    <section className="bg-blue-700 py-20 mb-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center">
        <div className="text-center">
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl md:text-6xl">
            Encontre o imóvel dos seus sonhos para alugar
          </h1>
          <p className="my-4 text-xl text-white">
            Ache o imóvel perfeito que atenda as suas necessidades
          </p>
        </div>
        <form className="mt-3 mx-auto max-w-2xl w-full flex flex-col md:flex-row items-stretch md:space-x-2 space-y-2 md:space-y-0">
          <div className="w-full">
            <label htmlFor="location" className="sr-only">
              Local
            </label>
            <input
              type="text"
              id="location"
              placeholder="Insira o local (cidade, estado, CEP)"
              className="w-full h-12 px-4 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
            />
          </div>
          <div className="w-full md:w-auto">
            <label htmlFor="property-type" className="sr-only">
              Tipo de imóvel
            </label>
            <select
              id="property-type"
              className="w-full md:w-auto min-w-[180px] h-12 px-4 rounded-lg bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-500"
            >
              <option value="All">Todos</option>
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
      </div>
    </section>
  );
};

export default Hero;
