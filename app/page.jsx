// pasta "app" será tratada como páginas dos componentes e api routes

// export const metadata = {
//   title: 'Test', // agora só a "home page" tem esse título, ao invés de usar só o que está definido globalmente em layout
// };

import Link from 'next/link';

const HomePage = () => {
  return (
    <div>
      <h1 className="text-3xl">
        {/* classes tailwind */}
        Bem-vindo
      </h1>
      {/* <a href="/properties">Exibir propriedades</a> */}
      {/* um link mas com "full reload" com spinner perceptível. uma boa prática seria usar o component link */}
      <Link href="/properties">Exibir propriedades</Link>
      {/* usa "Link" ao invés de tag "a". não tem o prop "to" como em react router, usa-se "href". dessa maneira é muito mais rápido */}
    </div>
  );
};

export default HomePage;
