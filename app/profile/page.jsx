'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import profileDefault from '@/assets/images/profile.png';
import { useState, useEffect } from 'react';
import Spinner from '@/components/Spinner';
import { toast } from 'react-toastify';

const ProfilePage = () => {
  const { data: session } = useSession();
  const profileImage = session?.user?.image;
  const profileName = session?.user?.name;
  const profileEmail = session?.user?.email;
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchUserProperties = async (userId) => {
      // "fetchUserProperties" será chamado se uma sessão com data estiver disponível
      if (!userId) {
        // se não existe um usuário...
        return;
      }
      try {
        // se existe um usuário...
        const res = await fetch(`/api/properties/user/${userId}`); // fetch request
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data); // envia de volta a data de properties
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false); //
      }
    };
    if (session?.user?.id) {
      // pega user properties quando session está alcançável
      fetchUserProperties(session.user.id);
    }
  }, [session]);
  const handleDeleteProperty = async (propertyId) => {
    // console.log(propertyId);
    const confirmed = window.confirm(
      'Você tem certeza de que deseja excluir esse imóvel?'
    );
    if (!confirm) return;
    try {
      const res = await fetch(`/api/properties/${propertyId}`, {
        method: 'DELETE',
      });
      if (res.status === 200) {
        const updatedProperties = properties.filter(
          (property) => property._id !== propertyId
        ); // remove property do state (UI)
        setProperties(updatedProperties);
        // alert('Imóvel deletado');
        toast.success('Imóvel deletado');
      } else {
        // alert('Não foi possível deletar o imóvel');
        toast.error('Não foi possível deletar o imóvel');
      }
    } catch (error) {
      console.log(error);
      // alert('Não foi possível deletar o imóvel');
      toast.error('Não foi possível deletar o imóvel');
    }
  };
  return (
    <section className="bg-blue-50">
      <div className="container m-auto py-24">
        <div className="bg-white px-6 py-8 mb-4 shadow-md rounded-md border m-4 md:m-0">
          <h1 className="text-3xl font-bold mb-4">Seu perfil</h1>
          <div className="flex flex-col md:flex-row">
            <div className="md:w-1/4 mx-20 mt-10">
              <div className="mb-4">
                <Image
                  className="h-32 w-32 md:h-48 md:w-48 rounded-full mx-auto md:mx-0"
                  // src="/images/profile.png"
                  src={profileImage || profileDefault}
                  width={200}
                  height={200}
                  alt="User"
                />
              </div>
              <h2 className="text-2xl mb-4">
                <span className="font-bold block">Nome: </span> {profileName}
              </h2>
              <h2 className="text-2xl">
                <span className="font-bold block">E-mail: </span> {profileEmail}
              </h2>
            </div>
            <div className="md:w-3/4 md:pl-4">
              <h2 className="text-xl font-semibold mb-4">Suas listagens</h2>
              {!loading && properties.length === 0 && (
                <p>Nenhuma listagem de imóvel</p>
              )}
              {loading ? (
                <Spinner loading={loading} />
              ) : (
                properties.map((property) => (
                  <div key={property._id} className="mb-10">
                    {/* <a href="/property.html"> */}
                    <Link href={`/properties/${property._id}`}>
                      <Image
                        className="h-32 w-full rounded-md object-cover"
                        // src="/images/properties/b1.jpg"
                        src={property.images[0]}
                        width={500}
                        height={100}
                        priority={true}
                      />
                    </Link>
                    <div className="mt-2">
                      <p className="text-lg font-semibold break-words whitespace-pre-wrap">
                        {property.name}
                      </p>
                      <p className="text-gray-600 break-words whitespace-pre-wrap">
                        Endereço: {property.location.street}{' '}
                        {property.location.city} {property.location.state}
                      </p>
                    </div>
                    <div className="mt-2">
                      <Link
                        // href="/add-property.html"
                        href={`/properties/${property._id}/edit`}
                        className="bg-blue-500 text-white px-3 py-3 rounded-md mr-2 hover:bg-blue-600"
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => handleDeleteProperty(property._id)}
                        className="bg-red-500 text-white px-3 py-2 rounded-md hover:bg-red-600"
                        type="button"
                      >
                        Deletar
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfilePage;
