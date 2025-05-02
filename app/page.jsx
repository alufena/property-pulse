// pasta "app" será tratada como páginas dos componentes e api routes. o uso de "server components" é o padrão

import Hero from '@/components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import Footer from '@/components/Footer';

const HomePage = () => {
  return (
    <>
      <Hero />
      <InfoBoxes />
      <Footer />
    </>
  );
};

export default HomePage;
