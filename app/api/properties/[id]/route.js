// "api route" que pega uma única "property" do db para exibição. a convenção para páginas frontend é "page.jsx" e rotas de api "route.js"

import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

export const GET = async (request, { params }) => {
    // GET request. endpoint: /api/properties/:id; "params" para pegar ID da url
    try {
        await connectDB();
        // const properties = await Property.find({});
        const property = await Property.findById(params.id);
        if (!property)
            return new Response('Imóvel não encontrado', { status: 404 });
        return new Response(JSON.stringify(property), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Algo deu errado', { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    // GET request. endpoint: /api/properties/:id; "params" para pegar ID da url
    try {
        const propertyId = params.id;
        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.userId) {
            // checa por sessão
            return new Response('User ID is required', { status: 401 });
        }
        const { userId } = sessionUser;
        await connectDB();
        const property = await Property.findById(propertyId);
        if (!property)
            return new Response('Imóvel não encontrado', { status: 404 });
        if (property.owner.toString() !== userId) {
            // verifica elegibilidade do imóvel com usuário para deletar
            return new Response('Algo deu errado', { status: 401 });
        }
        await property.deleteOne(); // caso seja o dono do imóvel, permita deletar
        return new Response('Imóvel deletado', { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Algo deu errado', { status: 500 });
    }
};
