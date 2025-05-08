// pasta "app" será tratada como páginas dos componentes e api routes. o uso de "server components" é o padrão e aqui é um desse tipo

import Hero from '@/components/Hero';
import InfoBoxes from '@/components/InfoBoxes';
import HomeProperties from '@/components/HomeProperties';
import FeaturedProperties from '@/components/FeaturedProperties';
// import connectDB from '@/config/database';

const HomePage = () => {
  // console.log(process.env.MONGODB_URI); // acessar variáveis .ENV é por intermédio de "process.env."
  // await connectDB();
  return (
    <>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </>
  );
};

export default HomePage;
