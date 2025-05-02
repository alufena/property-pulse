import { Schema, model, models } from 'mongoose';

const UserSchema = new Schema(
    {
        // "google provider" pelo "next auth" permite que contas loguem sem a necessidade de guardar senhas. mas o projeto salvará o user data (email, avatar)
        email: {
            type: String,
            unique: [true, 'Esse e-mail já existe'], // poderia ser apenas um valor boolean como "true", sem estar em array
            required: [true, 'E-mail é obrigatório'],
        },
        username: {
            type: String,
            required: [true, 'Nome de usuário é obrigatório'],
        },
        image: {
            type: String,
        },
        bookmarks: [
            // habilidade futura de salvar imóveis. não será um objeto e sim um array. esse array será de ids de imóveis
            {
                type: Schema.Types.ObjectId,
                ref: 'Property', // será o model que pegará os ids
            },
        ],
    },
    {
        timestamps: true, // cria os campos "createdAt" e "updatedAt"
    }
);

const User = models.User || model('User', UserSchema); // traz para outros arquivos
export default User;
