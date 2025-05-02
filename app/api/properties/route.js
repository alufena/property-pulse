import connectDB from "@/config/database";

export const GET = async (request) => {
    // lida automaticamente diferentes requests. pode mudar "GET" para outros tipos ou criar um novo "export const"
    try {
        await connectDB();
        // return new Response('test', { status: 200 });
        return new Response(JSON.stringify({ message: 'test' }), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Algo deu errado', { status: 500 });
    }
};
