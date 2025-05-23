'use client'; // usar hook como useStaate implica em por ele como "client component"
import Image from 'next/image';
import logo from '@/assets/images/logo-white.png';
import profileDefault from '@/assets/images/profile.png'; // será exibido a usuários sem foto
import Link from 'next/link';
import { FaGoogle } from 'react-icons/fa';
import { useState, useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';
import { signIn, signOut, useSession, getProviders } from 'next-auth/react';
import UnreadMessageCount from './UnreadMessageCount';

const Navbar = () => {
  const { data: session } = useSession(); // "data: session" significa pegar "data" de "useSession" e renomeiar para "session". sempre que quiser trazer a sessão de uma autenticação em um client side component, traga "useSession()" e o defina
  const profileImage = session?.user?.image;
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // função que dá responsividade e UX ao mobile
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  // const [isLoggedIn, setLoggedIn] = useState(false);
  const [providers, setProviders] = useState(false);
  const menuRef = useRef(null);
  const buttonRef = useRef(null);
  useEffect(() => {
    // serve para fechar o menu de perfil (dropdown) quando o usuário clica fora dele
    const handleClickOutside = (e) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(e.target) &&
        buttonRef.current &&
        !buttonRef.current.contains(e.target)
      ) {
        setIsProfileMenuOpen(false); // se o clique não foi dentro do menu (menuRef) e não foi no botão que abre o menu (buttonRef)
      }
    };
    document.addEventListener('mousedown', handleClickOutside); // Quando o componente é montado, ele escuta cliques (mousedown) em toda a página
    return () => {
      document.removeEventListener('mousedown', handleClickOutside); // Quando o componente é desmontado, ele remove esse ouvinte, para evitar vazamentos de memória ou comportamento inesperado
    };
  }, []);
  const pathname = usePathname();
  // console.log(pathname);
  useEffect(() => {
    const setAuthProviders = async () => {
      const res = await getProviders();
      setProviders(res);
    };
    setAuthProviders();
  }, []);
  // console.log(providers);
  // console.log(session); // exibe um objeto com expires e user object
  // console.log(profileImage); // exibe a url da imagem do avatar
  return (
    <nav className="bg-blue-700 border-b border-blue-500">
      <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        <div className="relative flex h-20 items-center justify-between">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            {/* <!-- Mobile menu button--> */}
            <button
              type="button"
              id="mobile-dropdown-button"
              className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              aria-controls="mobile-menu"
              aria-expanded="false"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)} // torna o botão alternável ao clique. muda o state de F para V
            >
              <span className="absolute -inset-0.5"></span>
              <span className="sr-only">Menu</span>
              <svg
                className="block h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
          <div className="flex flex-1 items-center justify-center md:items-stretch md:justify-start">
            {/* <!-- Logo --> */}
            <Link className="flex flex-shrink-0 items-center" href="/">
              {/* <a className="flex flex-shrink-0 items-center" href="/index.html"> */}
              <Image // trocado img por Image component
                className="h-10 w-auto"
                // src="images/logo-white.png"
                src={logo}
                alt="PropertyPulse"
              />
              <span className="hidden md:block text-white text-2xl font-bold ml-2">
                ImobiFlux
              </span>
            </Link>
            {/* <!-- Desktop Menu Hidden below md screens --> */}
            <div className="hidden md:ml-6 md:block">
              <div className="flex space-x-2">
                <Link
                  href="/"
                  // className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                  className={`${
                    pathname === '/' ? 'bg-black' : ''
                  } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`} // adiciona condicionalmente renderização de links
                >
                  Início
                </Link>
                <Link
                  href="/properties"
                  // className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                  className={`${
                    pathname === '/properties' ? 'bg-black' : ''
                  } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                >
                  Imóveis
                </Link>
                {/* {isLoggedIn && ( */}
                {session && (
                  <Link
                    // href="/add-property.html"
                    href="/properties/add"
                    // className="text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                    className={`${
                      pathname === '/properties/add' ? 'bg-black' : ''
                    } text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2`}
                  >
                    Criar listagem
                  </Link>
                )}
              </div>
            </div>
          </div>
          {/* <!-- Right Side Menu (Logged Out) --> */}
          {/* {!isLoggedIn && ( */}
          {!session && (
            <div className="hidden md:block md:ml-6">
              <div className="flex items-center">
                {providers &&
                  Object.values(providers).map((provider, index) => (
                    <button
                      onClick={() => signIn(provider.id)} // traz o signIn de next auth
                      key={index}
                      className="flex items-center text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2"
                    >
                      {/* <i className="fa-brands fa-google text-white mr-2"></i> */}
                      <FaGoogle className="text-white mr-2" />
                      <span>Entrar ou cadastrar</span>
                    </button>
                  ))}
              </div>
            </div>
          )}
          {/* <!-- Right Side Menu (Logged In) --> */}
          {/* {isLoggedIn && ( */}
          {session && (
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 md:static md:inset-auto md:ml-6 md:pr-0">
              <Link href="/messages" className="relative group">
                <button
                  type="button"
                  className="relative rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                >
                  <span className="absolute -inset-1.5"></span>
                  <span className="sr-only">Ver notificações</span>
                  <svg
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0"
                    />
                  </svg>
                </button>
                <UnreadMessageCount session={session} />
              </Link>
              {/* <!-- Profile dropdown button --> */}
              <div className="relative ml-3">
                <div>
                  <button
                    type="button"
                    ref={buttonRef}
                    className="relative flex rounded-full bg-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                    id="user-menu-button"
                    aria-expanded="false"
                    aria-haspopup="true"
                    onClick={() => setIsProfileMenuOpen((prev) => !prev)}
                  >
                    <span className="absolute -inset-1.5"></span>
                    <span className="sr-only">Open user menu</span>
                    {/* <img */}
                    <Image
                      className="h-8 w-8 rounded-full"
                      // src={profileDefault}
                      src={profileImage || profileDefault}
                      width={40} // 1ª parte do conserto do erro width property aqui e com "height={40}"; a parte final se encontra no arquivo "next.config.mjs"
                      height={40}
                    />
                  </button>
                </div>
                {/* <!-- Profile dropdown --> */}
                {isProfileMenuOpen && (
                  <div
                    id="user-menu"
                    ref={menuRef}
                    className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                    role="menu"
                    aria-orientation="vertical"
                    aria-labelledby="user-menu-button"
                    tabIndex="-1"
                  >
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-0"
                      onClick={() => {
                        setIsProfileMenuOpen(false); // fecha o menu ao clicar em um item antes de redirecionar
                      }}
                    >
                      Sua conta
                    </Link>
                    <Link
                      // href="saved-properties.html"
                      href="/properties/saved"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                      }}
                    >
                      Imóveis salvos
                    </Link>
                    <button
                      // href="#"
                      onClick={() => {
                        setIsProfileMenuOpen(false);
                        signOut();
                      }}
                      className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      role="menuitem"
                      tabIndex="-1"
                      id="user-menu-item-2"
                    >
                      Sair
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
      {/* <!-- Mobile menu, show/hide based on menu state. --> */}
      {/* <div className="hidden" id="mobile-menu"> */}
      {isMobileMenuOpen && ( // condicional
        <div id="mobile-menu">
          <div className="space-y-1 px-2 pb-3 pt-2">
            <Link
              href="/"
              // className="bg-gray-900 text-white block rounded-md px-3 py-2 text-base font-medium"
              className={`${
                pathname === '/' ? 'bg-black' : ''
              } text-white block rounded-md px-3 py-2 text-base font-medium`}
            >
              Início
            </Link>
            <Link
              href="/properties"
              // className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
              className={`${
                pathname === '/properties' ? 'bg-black' : ''
              } text-white block rounded-md px-3 py-2 text-base font-medium`}
            >
              Imóveis
            </Link>
            {/* {isLoggedIn && ( */}
            {session && (
              <Link
                // href="/add-property.html"
                href="/properties/add"
                // className="text-gray-300 hover:bg-gray-700 hover:text-white block rounded-md px-3 py-2 text-base font-medium"
                className={`${
                  pathname === '/properties/add' ? 'bg-black' : ''
                } text-white block rounded-md px-3 py-2 text-base font-medium`}
              >
                Criar listagem
              </Link>
            )}
            {/* {!isLoggedIn && ( */}
            {!session &&
              providers &&
              Object.values(providers).map((provider, index) => (
                <button
                  onClick={() => signIn(provider.id)} // traz o signIn de next auth
                  key={index}
                  className="flex items-center text-white hover:bg-gray-900 hover:text-white rounded-md px-3 py-2 my-4"
                  /* <i className="fa-brands fa-google text-white mr-2"></i> */
                >
                  <FaGoogle className="tex-white mr-2" />
                  <span>Entrar ou cadastrar</span>
                </button>
              ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
