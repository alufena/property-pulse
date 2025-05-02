import { Schema, model, models } from 'mongoose';

const PropertySchema = new Schema(
    {
        owner: {
            type: Schema.Types.ObjectId,
            ref: 'User', // referência a user collection. assim, qualquer listagem de imóvel está conectada ao "owner". relação fundamental para que o dono delete ou atualize um imóvel
            required: true,
        },
        name: {
            // está similar aos campos existentes de "properties.json"
            type: String,
            required: true,
        },
        type: {
            type: String,
            required: true,
        },
        description: {
            type: String,
        },
        location: {
            street: {
                type: String,
            },
            city: {
                type: String,
            },
            state: {
                type: String,
            },
            zipcode: {
                type: String,
            },
        },
        beds: {
            type: Number,
            required: true,
        },
        baths: {
            type: Number,
            required: true,
        },
        square_feet: {
            type: Number,
            required: true,
        },
        amenities: [
            {
                type: String,
            },
        ],
        rates: {
            nightly: {
                type: Number,
            },
            weekly: {
                type: Number,
            },
            monthly: {
                type: Number,
            },
        },
        seller_info: {
            name: {
                type: String,
            },
            email: {
                type: String,
            },
            phone: {
                type: String,
            },
        },
        images: [
            // array de strings
            {
                type: String,
            },
        ],
        is_featured: {
            type: Boolean,
            default: false, // valor padrão será F
        },
    },
    {
        timestamps: true,
    }
);

const Property = models.Property || model('Property', PropertySchema); // traz para outros arquivos
export default Property;
