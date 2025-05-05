import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';
import cloudinary from '@/config/cloudinary';

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

export const POST = async (request) => {
    try {
        await connectDB();
        // const session = await getServerSession(authOptions); // foram transferidas para o arquivo utils/getSessionUser.js
        // if (!session) {
        //     return new Response('Algo deu errado', { status: 401 });
        // }
        // const userId = session.user.id;
        // const { userId } = await getSessionUser(); // retorna ambos "user" e "user id"; funciona, mas ainda precisa lidar com a situação de não existir um "session"
        const sessionUser = await getSessionUser(); // agora em qualquer rota que precisar pegar user já logado basta trazer  "const sessionUser" , ifstatement abaixo e userId desestruturado com sessionUser
        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required', { status: 401 });
        }
        const { userId } = sessionUser;
        const formData = await request.formData();
        const amenities = formData.getAll('amenities'); // acessa todos os valores de amenities; por ser um array, usa getAll() ao invés de get()
        const images = formData // isso não funcionará com a validação de mongodb porque images precisa ser um array de strings
            .getAll('images')
            .filter((image) => image.name !== ''); // por mais que seja requirido enviar uma imagem, caso o usuário mesmo assim não enviar, o formulário enviará uma string vazia e isso causará um erro no "cloudinary". método filter() conserta isso
        // console.log(formData.get('name'));
        // console.log(amenities, images);
        const propertyData = {
            // cria objeto "propertyData" para o mongodb
            type: formData.get('type'),
            name: formData.get('name'),
            description: formData.get('description'),
            location: {
                street: formData.get('location.street'),
                city: formData.get('location.city'),
                state: formData.get('location.state'),
                zipcode: formData.get('location.zipcode'),
            },
            beds: formData.get('beds'),
            baths: formData.get('baths'),
            square_feet: formData.get('square_feet'),
            amenities, // está vindo mais acima em "const amenities = formData.getAll('amenities')"
            rates: {
                weekly: formData.get('rates.weekly'),
                monthly: formData.get('rates.monthly'),
                nightly: formData.get('rates.nightly'),
            },
            seller_info: {
                name: formData.get('rates.name'),
                email: formData.get('rates.email'),
                phone: formData.get('rates.phone'),
            },
            owner: userId, // pega o usuário
            // images, // já está vindo mais acima, fora desse objeto. não será mais aqui e sim adicionado depois do upload
        };

        const imageUploadPromises = []; // upload de imagens ao cloudinary. o processo fica o seguinte: seleciona as imagens vindas do form, transforma em um "array buffer", pega a informação disso, faz upload para "cloudinary" que dá a resposta de volta com uma URL, coloca essa URL no array "images" e finalmente, envia para o mongodb. pode ser múltiplas URLs (múltiplos arquivos, max 4)
        for (const image of images) {
            const imageBuffer = await image.arrayBuffer();
            const imageArray = Array.from(new Uint8Array(imageBuffer)); // converte em um unit 8 array (array de 8bits unsigned integers), ou seja, transforma em um formato que pode ser processado
            const imageData = Buffer.from(imageArray);
            const imageBase64 = imageData.toString('base64'); // converte a imagem para base64. agora temos um formato possível de upload ao cloudinary
            const result = await cloudinary.uploader.upload(
                // faz request de upload ao cloudinary
                `data:image/png;base64,${imageBase64}`,
                {
                    folder: 'propertypulse' // pasta criada no site oficial da api
                }
            );
            imageUploadPromises.push(result.secure_url); // entrega urls
            const uploadedImages = await Promise.all(imageUploadPromises); // espera por todas imagens serem enviadas
            propertyData.images = uploadedImages; // adiciona as imagens enviadas ao objeto propertyData
        }
        // console.log(propertyData);
        const newProperty = new Property(propertyData);
        await newProperty.save(); // salva ao DB sem images (por enquanto)
        return Response.redirect(
            `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
        ); // mongo salva "id" com "_id", por isso o uso dele assim aqui
        // return new Response(JSON.stringify({ message: 'Success' }), {
        //     // teste de uma resposta bem-sucedida
        //     status: 200,
        // });
    } catch (error) {
        return new Response('Failed to add property', { status: 500 });
    }
};
