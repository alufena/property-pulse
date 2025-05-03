// "api route" que pega uma única "property" do db para exibição. a convenção para páginas frontend é "page.jsx" e rotas de api "route.js"

import connectDB from '@/config/database';
import Property from '@/models/Property';

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
