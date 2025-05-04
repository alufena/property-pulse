// aqui é o entrypoint do projeto

import '@/assets/styles/globals.css'; // @ significa AT, ou seja, raiz do diretório
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import AuthProvider from '@/components/AuthProvider';

export const metadata = {
  // as páginas estão server side (react components no servidor), estão sendo renderizadas no server. abaixo são keywords para SEO. fazer isso aqui (layout.jsx) afeta todas as páginas do projeto
  title: 'ImobiFlux encontre o seu aluguel perfeito', // influencia a aba do navegador
  description: 'Encontre o imóvel dos seus sonhos para alugar',
  keywords:
    'rental, find rentals, find properties, aluguel, encontrar aluguéis, encontrar propriedades,',
};

const MainLayout = ({
  children, // as páginas serão exibidas no layout através de uma prop passadas aqui como children
}) => {
  return (
    <AuthProvider>
      {/* envoltado em parênteses para retornar tag html */}
      <html lang="en">
        <body>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </body>
      </html>
    </AuthProvider>
  );
};

export default MainLayout;
