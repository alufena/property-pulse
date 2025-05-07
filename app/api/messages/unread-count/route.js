import connectDB from '@/config/database';
import Message from '@/models/Message';
import { getSessionUser } from '@/utils/getSessionUser';

export const dynamic = 'force-dynamic';

export const GET = async (request) => {
    // endpoint: /api/messages/unread-count
    try {
        await connectDB();
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
        const count = await Message.countDocuments({
            // método "countDocuments()" crucial passado as suas condições
            recipient: userId,
            read: false,
        });
        return new Response(JSON.stringify(count), {
            status: 200,
        });
    } catch (error) {
        console.log(error);
        return new Response('Algo deu errado', { status: 500 });
    }
};
