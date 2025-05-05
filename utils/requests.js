// aqui estarão os GET requests de properties por boa prática (DRY)

const apiDomain = process.env.NEXT_PUBLIC_API_DOMAIN || null; // conserta conflitos durante deploy. a variável "API_DOMAIN" não vai estar disponível até o deploy ocorrer, assim, o fetch é malsucedido; se não tiver disponível, seta para null

async function fetchProperties() {
    // isso não seria permitido em um client component, mas como aqui é um server component. fetch todos "properties"
    try {
        // const res = await fetch('http://localhost:3000/api/properties'); // por ser a partir do servidor, precisa incluir um domínio
        // const res = await fetch(`${process.env.NEXT_PUBLIC_API_DOMAIN}/properties`); // 2ª forma, mais limpa, usando env
        if (!apiDomain) {
            // lida a situação de quando o domínio ainda não estiver disponível
            return [];
        }
        const res = await fetch(`${apiDomain}/properties`, { cache: 'no-store' }); // esse 2º arg "cache" serve para carregar diretamente os dados recém-enviados à página "properties/add", dispensando o uso de F5
        if (!res.ok) {
            throw new Error('Algo deu errado');
        }
        return res.json(); // caso dê certo, retorna a data diretamente dessa função
    } catch (error) {
        console.log(error);
        return [];
    }
}

async function fetchProperty(id) {
    // fetch um único "property"
    try {
        if (!apiDomain) {
            // return [];
            return null; // caso o domínio não esteja pronto ainda, retorna null
        }
        const res = await fetch(`${apiDomain}/properties/${id}`);
        if (!res.ok) {
            throw new Error('Algo deu errado');
        }
        return res.json();
    } catch (error) {
        console.log(error);
        // return [];
        return null;
    }
}

export { fetchProperties, fetchProperty };
