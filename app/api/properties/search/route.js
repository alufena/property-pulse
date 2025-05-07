import Property from '@/models/Property';
import connectDB from '@/config/database';

export const GET = async (request) => {
    // GET request em /api/properties/search. Next.js (App Router) exige que os métodos HTTP exportados sejam com letras maiúsculas, como GET, POST, etc
    try {
        await connectDB();
        const { searchParams } = new URL(request.url); // pega a query param
        const location = searchParams.get('location');
        const propertyType = searchParams.get('propertyType');
        const locationPattern = new RegExp(location, 'i'); // regex: "i" é para "case insensitivity"
        let query = {
            // coincide "location patterns" em campos do mongodb
            $or: [
                // "$or" operador mongoDB de consulta. busca documentos que correspondam a condições
                { name: locationPattern },
                { description: locationPattern },
                { 'location.street': locationPattern }, // location é um objeto e para encontrar tudo dele, precisa por aspas simples e seus elementos especificados por ponto
                { 'location.city': locationPattern },
                { 'location.state': locationPattern },
                { 'location.zipcode': locationPattern },
            ],
        };
        if (propertyType && propertyType !== 'Todos') {
            // só checa por tipo de imóvel se não for "Todos"
            const typePattern = new RegExp(propertyType, 'i');
            query.type = typePattern;
        }
        const properties = await Property.find(query);
        // console.log(location, propertyType);
        return new Response(
            // JSON.stringify({ message: 'Success' }, { status: 200 })
            JSON.stringify(properties),
            { status: 200 }
        );
    } catch (error) {
        console.log(error);
        return new Response('Something Went Wrong', { status: 500 });
    }
};
