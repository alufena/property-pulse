import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

export const PUT = async (request, { params }) => {
    // PUT request em /api/messages/:id; atualiza o campo de notificação se é o usuário correto
    try {
        await connectDB();
        const { id } = params; // id está disponível graças ao nome da pasta [id]
        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.user) {
            return (
                new Response('User ID is required'),
                {
                    status: 401,
                }
            );
        }
        const { userId } = sessionUser;
        const message = await Message.findById(id);
        if (!message) return new Response('Message Not Found', { status: 404 });
        if (message.recipient.toString() !== userId) {
            // checa se é dono da mensagem
            return new Response('Algo deu errado', { status: 401 });
        }
        message.read = !message.read; // atualiza mensagem a lido ou não lido dependendo do estado atual
        await message.save();
        return new Response(JSON.stringify(message), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Algo deu errado', { status: 500 });
    }
};

export const DELETE = async (request, { params }) => { // DELETE request no mesmo endpoint
    try {
        await connectDB();
        const { id } = params;
        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.user) {
            return (
                new Response('User ID is required'),
                {
                    status: 401,
                }
            );
        }
        const { userId } = sessionUser;
        const message = await Message.findById(id);
        if (!message) return new Response('Message Not Found', { status: 404 });
        if (message.recipient.toString() !== userId) {
            return new Response('Algo deu errado', { status: 401 });
        }
        // message.read = !message.read;
        await message.deleteOne();
        return new Response('Mensagem excluída', { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Algo deu errado', { status: 500 });
    }
};