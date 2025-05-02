// pasta "app" será tratada como páginas dos componentes e api routes. o uso de "server components" é o padrão e aqui é um desse tipo

import Hero from '@/components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import HomeProperties from '@/components/HomeProperties';

const HomePage = () => {
  console.log(process.env.MONGODB_URI); // acessar variáveis .ENV é por intermédio de "process.env."
  return (
    <>
      <Hero />
      <InfoBoxes />
      <HomeProperties />
    </>
  );
};

export default HomePage;
