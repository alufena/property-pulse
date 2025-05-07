const Message = ({ message }) => {
  // message prop
  return (
    <div>
      <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
        <h2 className="text-xl mb-4">
          <span className="font-bold">Consulta sobre propriedade: </span>
          {message.property.name}
        </h2>
        <p className="text-gray-700">{message.body}</p>
        <ul className="mt-4">
          <li>
            <strong>Nome: </strong>
            {message.sender.username}
          </li>

          <li>
            <strong>E-mail: </strong>
            <a href={`mailto:${message.email}`} className="text-blue-500">
              {message.email}
            </a>
          </li>
          <li>
            <strong>Telefone: </strong>
            <a href={`tel:${message.phone}`} className="text-blue-500">
              {message.phone}
            </a>
          </li>
          <li>
            <strong>Recebido em: </strong>
            {new Date(message.createdAt).toLocaleString('pt-br')}
          </li>
        </ul>
        <button className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md">
          Marcar como visto
        </button>
        <button className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md">
          Excluir
        </button>
      </div>
    </div>
  );
};

export default Message;
