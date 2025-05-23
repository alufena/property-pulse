// "api route" que pega uma única "property" do db para exibição. a convenção para páginas frontend é "page.jsx" e rotas de api "route.js"

import connectDB from '@/config/database';
import Property from '@/models/Property';
import { getSessionUser } from '@/utils/getSessionUser';

export const GET = async (request, { params }) => {
    // GET request. endpoint: /api/properties/:id; "params" para pegar ID da url
    try {
        await connectDB();
        // const properties = await Property.find({});
        const property = await Property.findById(params.id);
        if (!property)
            return new Response('Imóvel não encontrado', { status: 404 });
        return new Response(JSON.stringify(property), { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Algo deu errado', { status: 500 });
    }
};

export const DELETE = async (request, { params }) => {
    // GET request. endpoint: /api/properties/:id; "params" para pegar ID da url
    try {
        const propertyId = params.id;
        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.userId) {
            // checa por sessão
            return new Response('User ID is required', { status: 401 });
        }
        const { userId } = sessionUser;
        await connectDB();
        const property = await Property.findById(propertyId);
        if (!property)
            return new Response('Imóvel não encontrado', { status: 404 });
        if (property.owner.toString() !== userId) {
            // verifica elegibilidade do imóvel com usuário para deletar
            return new Response('Algo deu errado', { status: 401 });
        }
        await property.deleteOne(); // caso seja o dono do imóvel, permita deletar
        return new Response('Imóvel deletado', { status: 200 });
    } catch (error) {
        console.log(error);
        return new Response('Algo deu errado', { status: 500 });
    }
};

export const PUT = async (request, { params }) => {
    // PUT rest para /api/properties/:id
    try {
        await connectDB();
        const sessionUser = await getSessionUser();
        if (!sessionUser || !sessionUser.userId) {
            return new Response('User ID is required', { status: 401 });
        }
        const { id } = params;
        const { userId } = sessionUser;
        const formData = await request.formData();
        const amenities = formData.getAll('amenities');
        const existingProperty = await Property.findById(id); // pega "property" para atualização
        if (!existingProperty) {
            return new Response('Property does not exist', { status: 404 });
        }
        if (existingProperty.owner.toString() !== userId) {
            // checa posse de "property"
            return new Response('Unauthorized', { status: 401 });
        }
        const propertyData = {
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
            amenities,
            rates: {
                weekly: formData.get('rates.weekly'),
                monthly: formData.get('rates.monthly'),
                nightly: formData.get('rates.nightly'),
            },
            seller_info: {
                name: formData.get('seller_info.name'),
                email: formData.get('seller_info.email'),
                phone: formData.get('seller_info.phone'),
            },
            owner: userId,
        };
        // const newProperty = new Property(propertyData);
        // await newProperty.save();
        const updatedProperty = await Property.findByIdAndUpdate(id, propertyData); // atualiza property no mongodb
        // return Response.redirect(
        //     `${process.env.NEXTAUTH_URL}/properties/${newProperty._id}`
        // );
        return new Response(JSON.stringify(updatedProperty), {
            status: 200,
        });
    } catch (error) {
        return new Response('Failed to add property', { status: 500 });
    }
};
