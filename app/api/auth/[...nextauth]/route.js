// Este arquivo define o endpoint de autenticação da API usando NextAuth. Como estamos usando o App Router (Next.js 13+), a rota é definida dentro da pasta [...nextauth]/route.js. O objeto de configuração (authOptions) é importado separadamente de 'utils/authOptions.js'. Isso permite reaproveitar essa configuração em outros lugares, como para obter sessões no servidor.

import { authOptions } from '@/utils/authOptions';
import NextAuth from 'next-auth/next';

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
