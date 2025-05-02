import mongoose from 'mongoose';

let connected = false;
const connectDB = async () => {
    // objetos mongoose são assíncronos (retornam promise)
    mongoose.set('strictQuery', true); // certifica que somente os campos especificados no schema serão salvos no DB
    // não é criado um "express backend" porque está sendo usado "nextjs api routes", que trabalha similar a funções "serverless" (pegam e inserem data)
    if (connected) {
        // se o db já está conectado, não conecta novamente
        console.log('MongoDB já está conectado');
        return;
    }
    try {
        // conecta ao mongoDB. poderá ser usado em qualquer server component, embora o app é criado por "restful endpoints" (api routes que terão funções conectadas ao DB)
        await mongoose.connect(process.env.MONGODB_URI);
        connected = true;
        console.log('MongoDB conectado');
    } catch (error) {
        console.log(error);
    }
};

export default connectDB;
