import GoogleProvider from 'next-auth/providers/google';
import connectDB from '@/config/database';
import User from '@/models/User';

export const authOptions = {
    providers: [ // posto aqui porque será usado em outras partes do projeto
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    // permite adicionar uma conta de google ao logar/registrar
                    prompt: 'consent',
                    access_type: 'offline',
                    response_type: 'code',
                },
            },
        }),
    ],
    callbacks: {
        async signIn({ profile }) {
            // invocado em um login bem-sucedido
            await connectDB(); // conecta ao db
            const userExists = await User.findOne({ email: profile.email }); // checa se o usuário existe. método findOne() acessa o usuário pelo email com "profile"
            if (!userExists) {
                // se usuário não existe, adiciona ao db
                const username = profile.name.slice(0, 20); // diminui a extensão do nome do usuário. nomes longos podem trazer problemas
                await User.create({
                    // salva o usuário
                    email: profile.email,
                    username,
                    image: profile.picture,
                });
            }
            return true; // V para permitir que o sign in continue
        },
        async session({ session }) {
            // modifica o objeto "session"
            const user = await User.findOne({ email: session.user.email }); // pega user do db
            session.user.id = user._id.toString(); // atribui o id de usuário à sessão
            return session;
        },
    },
};
