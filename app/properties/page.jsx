// "http://localhost:3000/properties" funciona sem a necessidade de definir rotas (característica SSR). a antiga estrutura de páginas (sem a pasta "app") precisaria criar um componente properties.jsx

import Link from 'next/link';

const PropertiesPage = () => {
  return (
    <div>
      <h1 className="text-3xl">Propriedades</h1>
      <Link href="/">Voltar à página inicial</Link>
    </div>
  );
};

export default PropertiesPage;
