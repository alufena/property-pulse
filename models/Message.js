import { Schema, model, models } from 'mongoose';

const MessageSchema = new Schema(
    {
        // tudo aqui será definido automaticamente baseado na sessão de usuário e do dono do imóvel
        sender: {
            // será a pessoa que envia a mensagem de contato
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        recipient: {
            // será o dono do imóvel
            type: Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        property: {
            type: Schema.Types.ObjectId,
            ref: 'Property`',
            required: true,
        },
        name: {
            type: String,
            required: [true, 'Nome é obrigatório'],
        },
        email: {
            type: String,
            required: [true, 'E-mail é obrigatório'],
        },
        phone: {
            type: String,
        },
        body: {
            type: String,
        },
        read: {
            type: Boolean,
            default: false,
        },
    },
    {
        // arg separado
        timestamps: true,
    }
);

const Message = models.Message || model('Message', MessageSchema);

export default Message;
