import PropertySearchForm from './PropertySearchForm';

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
      </div>
      <PropertySearchForm />
    </section>
  );
};

export default Hero;
