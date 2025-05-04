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

export const POST = async (request) => {
    try {
        const formData = await request.formData();
        const amenities = formData.getAll('amenities'); // acessa todos os valores de amenities. por ser um array, usa-se getAll() ao invés de get()
        const images = formData.getAll('images').filter((image) => image.name !== ''); // por mais que seja requirido enviar uma imagem, caso o usuário mesmo assim não enviar, o formulário enviará uma string vazia e isso causará um erro no "cloudinary". método filter() conserta isso
        // console.log(formData.get('name'));
        // console.log(amenities, images);
        const propertyData = { // cria objeto "propertyData" para o mongodb  
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
            images // já está vindo mais acima, fora desse objeto
        }
        console.log(propertyData);
        return new Response(JSON.stringify({ message: 'Success' }), {
            status: 200,
        }); // teste de uma resposta bem-sucedida
    } catch (error) {
        return new Response('Failed to add property', { status: 500 });
    }
};
