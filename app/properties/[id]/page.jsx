'use client'; // client component porque precisa de useEffect e outros hooks

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { fetchProperty } from '@/utils/requests';
import PropertyHeaderImage from '@/components/PropertyHeaderImage';
import Link from 'next/link';
import PropertyDetails from '@/components/PropertyDetails';
import { FaArrowLeft } from 'react-icons/fa';
import Spinner from '@/components/Spinner';
import PropertyImages from '@/components/PropertyImages';
import BookmarkButton from '@/components/BookmarkButton';
import ShareButtons from '@/components/ShareButtons';
import PropertyContactForm from '@/components/PropertyContactForm';

const PropertyPage = () => {
  const { id } = useParams();
  const [property, setProperty] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPropertyData = async () => {
      if (!id) return; // certifica de dar prosseguimento com um id existente
      try {
        const property = await fetchProperty(id);
        setProperty(property);
      } catch (error) {
        console.error('Algo deu errado: ', error);
      } finally {
        // sempre inicia
        setLoading(false);
      }
    };
    if (property === null) {
      // invoca se a property for null. caso contrário, toda vez que property mudar, a função se inicia e causa um loop infinito
      fetchPropertyData();
    }
  }, [id, property]);
  if (!property && !loading) {
    return (
      <h1 className="text-center text-2xl font-bold mt-10">
        Imóvel não encontrado
      </h1>
    );
  }
  return (
    <>
      {loading && <Spinner loading={loading} />}
      {!loading && property && (
        <>
          <PropertyHeaderImage image={property.images[0]} />
          <section>
            <div className="container m-auto py-6 px-6">
              <Link
                href="/properties"
                className="text-blue-500 hover:text-blue-600 flex items-center"
              >
                {/* <i className="fas fa-arrow-left mr-2"></i>  */}
                <FaArrowLeft className="mr-2" />
                Voltar
              </Link>
            </div>
          </section>
          {/* <!-- Property Info --> */}
          <section className="bg-blue-50">
            <div className="container m-auto py-10 px-6">
              <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
                <PropertyDetails property={property} />
                <aside className="space-y-4">
                  <ShareButtons property={property} />
                  <BookmarkButton property={property} />
                  <PropertyContactForm property={property} />
                </aside>
              </div>
            </div>
          </section>
          <PropertyImages images={property.images} />
        </>
      )}
    </>
  );
};

export default PropertyPage;
