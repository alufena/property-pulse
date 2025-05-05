import { getServerSession } from 'next-auth/next'; // funciona de maneira diferente de getSession/useSession do frontend
import { authOptions } from '@/utils/authOptions';

export const getSessionUser = async () => {
    try {
        const session = await getServerSession(authOptions); // precisa pegar "user" ao dar submit de um novo property; pegar "user" precisa pegar "session"
        if (!session || !session.user) { // se não tiver sesssion, se for null
            return null; // aqui não retorna response e sim ou null ou user
        }
        return {
            // se exise um user, retorna tudo dele (incluído o id)
            user: session.user,
            userId: session.user.id,
        };
    } catch (error) {
        console.error(error);
        return null;
    }
};
