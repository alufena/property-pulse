import connectDB from '@/config/database';
import Property from '@/models/Property';

export const GET = async (request, { params }) => {
    // GET request com endpoint /api/properties/user/:userId. objeto params permite pegar o user id dinâmico vindo da url
    try {
        await connectDB();
        const userId = params.userId; // "userId" porque é assim que está chamada a pasta
        if (!userId) {
            return new Response('User ID is required', { status: 400 });
        }
        const properties = await Property.find({ owner: userId }); // certifica de pegar apenas as listagens do dono
        return new Response(JSON.stringify(properties), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Algo deu errado', { status: 500 });
    }
};
