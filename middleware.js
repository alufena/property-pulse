export { default } from 'next-auth/middleware'; // vem da documentação oficial de nexta uth

export const config = {
    matcher: ['/properties/add', '/profile', '/properties/saved', '/messages'], // esse array coincide urls que serão protegidas. todas elas precisam iniciar com "/". agora tentar acessar "http://localhost:3000/properties/add" enquanto deslogado não funcionará mais
};
