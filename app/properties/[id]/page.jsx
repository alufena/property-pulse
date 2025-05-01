'use client';

// rota dinâmica, a exemplo "http://localhost:3000/properties/123" onde 123 é o id. relembrando que tudo relacionado a url "properties/" fica dentro da pasta "app/properties". a pasta NÃO poderia ser apenas chamada de id, porque seria literalmente id; o correto é o uso de colchetes entre o nome id, assim torna a página dinâmica. qualquer id colocado carregará essa página. "[id]" no nome da pasta significa que só pode ser "/qualquerid", ou seja, não pode acessar "properties/123/rooms"; uma solução para isso seria um "catch all" (= tudo após o id ainda carregará a página), e para fazer isso: troque o nome da pasta [id] a [...id]. agora "http://localhost:3000/properties/123/rooms" funciona assim como "http://localhost:3000/properties/123/rooms/beds". no cenário atual do projeto não existe necessidade desse catch all, por isso foi removido o ... dentro do colchete

import { useRouter, useSearchParams, usePathname } from 'next/navigation'; // versões antigas do nextjs usam "next/router". 13/14 pra cima usa "next/navigation". "useParams" permite pegar id. "useSearchParams" permite pegar query params

const PropertyPage = () => {
  // será uma única propriedade
  console.log('hello'); // aqui renderiza no lado do servidor (terminal vsc), por ser um server component. um client component é renderizado no browser
  const router = useRouter(); // qualquer hook dá erro se for um server component; resolver isso necessita de um 'use client' no topo do arquivo com aspas duplas ou não
  // const params = useParams(); // permite "useParams.id"
  // const { id } = useParams(); // permite usar apenas "{ id }" (versão desestruturada)
  const searchParams = useSearchParams(); // inicializa o hook
  const name = searchParams.get('name'); // método "get()" do objeto searchParams
  const pathname = usePathname();
  return (
    <div>
      <button onClick={() => router.push('/')} className="bg-blue-500 p-2">
        {/* onClick, onChange ou hooks sempre precisarão ser client component */}
        {/* Voltar à página inicial {id} */}
        {/* Voltar à página inicial {name} */}
        {/* "http://localhost:3000/properties/200?name=brad" */}
        Voltar à página inicial {pathname}
      </button>
    </div>
  );
};

export default PropertyPage;
