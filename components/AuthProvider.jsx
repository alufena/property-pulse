'use client'; // corrige o erro "Unhandled Runtime Error. Error: React Context is unavailable in Server Components"

import { SessionProvider } from 'next-auth/react';

const AuthProvider = ({ children }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default AuthProvider;
