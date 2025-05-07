import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

export const POST = async (request) => {
    // POST request em /api/messages
    try {
        await connectDB();
        const { email, phone, message, name, recipient, property } = await request.json();
        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.user) {
            // return new Response('User ID is required', { status: 401 });
            return new Response(JSON.stringify({ message: 'Entre para enviar uma mensagem' }), { status: 401 })
        }
        const { user } = sessionUser; // pega id junto com tudo de user; nesse caso pega user
        if (user.id === recipient) {
            // evita de mandar mensagem a si mesmo
            return new Response(JSON.stringify({ message: 'Algo deu errado' }), {
                status: 400,
            }); // "response" como string é vista na aba network do browser e como objeto o response é reutilizado no projeto
        }
        const newMessage = new Message({
            sender: user.id,
            recipient, // "recipient" até "name" vem de body
            property,
            email,
            phone,
            name,
            body: message, // a mensagem é body no model schema message
        });
        await newMessage.save();
        return new Response(JSON.stringify({ message: 'Message Sent' }), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new Response('Something Went Wrong', { status: 500 });
    }
};
