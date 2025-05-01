// rota dinâmica, a exemplo "http://localhost:3000/properties/123" onde 123 é o id. relembrando que tudo relacionado a url "properties/" fica dentro da pasta "app/properties". a pasta NÃO poderia ser apenas chamada de id, porque seria literalmente id; o correto é o uso de colchetes entre o nome id, assim torna a página dinâmica. qualquer id colocado carregará essa página. "[id]" no nome da pasta significa que só pode ser "/qualquerid", ou seja, não pode acessar "properties/123/rooms"; uma solução para isso seria um "catch all" (= tudo após o id ainda carregará a página), e para fazer isso: troque o nome da pasta [id] a [...id]. agora "http://localhost:3000/properties/123/rooms" funciona assim como "http://localhost:3000/properties/123/rooms/beds". no cenário atual do projeto não existe necessidade desse catch all, por isso foi removido o ... dentro do colchete

const PropertyPage = () => {
  // será uma única propriedade
  return <div>PropertyPage</div>;
};

export default PropertyPage;
