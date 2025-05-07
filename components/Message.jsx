'use client';

import { useState, useEffect } from 'react';
import { toast } from 'react-toastify';
import { useGlobalContext } from '@/context/GlobalContext';

const Message = ({ message }) => {
  // message prop
  const [isRead, setIsRead] = useState(message.read);
  const [isDeleted, setIsDeleted] = useState(false);
  const { setUnreadCount } = useGlobalContext();
  const handleDeleteClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'DELETE', // exclui no mongodb (backend), mas não reflete automaticamente na página, pois precisa recarregá-la (F5). o certo é atualizar um pedaço de state
      });
      if (res.status === 200) {
        setIsDeleted(true);
        setUnreadCount((prevCount) => prevCount - 1);
        toast.success('Mensagem excluída');
      }
    } catch (error) {
      console.log(error);
      toast.error('Algo deu errado');
    }
  };
  if (isDeleted) {
    return null;
  }
  const handleReadClick = async () => {
    try {
      const res = await fetch(`/api/messages/${message._id}`, {
        method: 'PUT',
      });
      if (res.status === 200) {
        const { read } = await res.json();
        setIsRead(read); // local state
        setUnreadCount((prevCount) => (read ? prevCount - 1 : prevCount + 1)); // agora ao marcar uma mensagem como lida ou não lida, o número no navbar será automaticamente renovado. agora tudo está conectado
        if (read) {
          toast.success('Marcado como lido');
        } else {
          toast.success('Marcado como novo');
        }
      }
    } catch (error) {
      console.log(error);
      toast.error('Algo deu errado');
    }
  };
  return (
    <div>
      <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
        {!isRead && (
          <div className="absolute top-2 right-2 bg-yellow-500 text-white px-2 py-1 rounded-md">
            Novo
          </div>
        )}
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
        <button
          onClick={handleReadClick}
          className={`mt-4 mr-3 ${
            isRead ? 'bg-gray-300' : 'bg-blue-500 text-white'
          } py-1 px-3 rounded-md`}
        >
          {isRead ? 'Marcar como novo' : 'Marcar como lido'}
        </button>
        <button
          onClick={handleDeleteClick}
          className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default Message;
