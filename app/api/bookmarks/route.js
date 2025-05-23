import connectDB from '@/config/database';
import User from '@/models/User';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic'; // corrige problema de deploy que acontece nessa rota que usa "SSR"

export const GET = async () => {
    // GET request em "/api/bookmarks"
    try {
        await connectDB();
        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required', { status: 401 });
        }
        const { userId } = sessionUser;
        const user = await User.findOne({ _id: userId });
        const bookmarks = await Property.find({ _id: { $in: user.bookmarks } }); // pega bookmarks de users em seu próprio array no mongodb e vê se tem um imóvel que coincide com o _id no model Property
        return new Response(JSON.stringify(bookmarks), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Something Went Wrong', { status: 500 });
    }
};

export const POST = async (request) => {
    try {
        await connectDB();
        const { propertyId } = await request.json(); // pega property
        const sessionUser = await getSessionUser(); // pega user
        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required', { status: 401 });
        }
        const { userId } = sessionUser;
        const user = await User.findOne({ _id: userId }); // procura por user no mongodb. poderia ser findById no lugar desse findOne
        let isBookmarked = user.bookmarks.includes(propertyId); // checa se imóvel já está salvado
        let message;
        if (isBookmarked) {
            user.bookmarks.pull(propertyId); // se o imóvel já está salvo, remove ele
            message = 'Imóvel excluído';
            isBookmarked = false;
        } else {
            user.bookmarks.push(propertyId); // se não está salvo, adiciona
            message = 'Imóvel salvo';
            isBookmarked = true;
        }
        await user.save(); // salva ao mongodb à coleção user
        return new Response(JSON.stringify({ message, isBookmarked }), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new Response('Algo deu errado', { status: 500 });
    }
};
