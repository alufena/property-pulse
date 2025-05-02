import connectDB from '@/config/database';
import Property from '@/models/Property';

export const GET = async (request) => {
    // lida automaticamente diferentes requests. pode mudar "GET" para outros tipos ou criar um novo "export const". a rota tratada é "/api/properties"
    try {
        await connectDB();
        const properties = await Property.find({}); // método "find()" com um objeto vazio significa pegar todas propriedades de "Property"
        // return new Response('test', { status: 200 });
        // return new Response(JSON.stringify({ message: 'test' }), { status: 200 });
        return new Response(JSON.stringify(properties), { status: 200 }); // "http://localhost:3000/api/properties" agora pega a informação do DB. precisando agora trazer para o frontend
    } catch (error) {
        console.log(error);
        return new Response('Algo deu errado', { status: 500 });
    }
};
