import Link from 'next/link';
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from 'react-icons/fa';
import Image from 'next/image';

const FeaturedPropertyCard = ({ property }) => {
  // property prop pego de "FeaturedProperties"
  const getRateDisplay = () => {
    const { rates } = property;
    if (rates.monthly) {
      return `${rates.monthly.toLocaleString()} por mês`;
    } else if (rates.weekly) {
      return `${rates.weekly.toLocaleString()} por semana`;
    } else if (rates.nightly) {
      return `${rates.nightly.toLocaleString()} por noite`;
    }
  };
  return (
    <div className="bg-white rounded-xl shadow-md relative flex flex-col md:flex-row">
      <Image
        src={property.images[0]}
        alt=""
        width={0}
        height={0}
        sizes="100vw"
        className="object-cover rounded-t-xl md:rounded-tr-none md:rounded-l-xl w-full md:w-2/5"
      />
      <div className="p-6">
        <h3 className="text-xl font-bold">{property.name}</h3>
        <div className="text-gray-600 mb-4">{property.type}</div>
        <h3 className="absolute top-[10px] left-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          R$ {getRateDisplay()}
        </h3>
        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className="inline-block mr-2" />
            {property.beds}
            <span className="md:hidden lg:inline"> cama</span>
          </p>
          <p>
            <FaBath className="inline-block mr-2" />
            {property.baths}
            <span className="md:hidden lg:inline"> banheiro</span>
          </p>
          <p>
            <FaRulerCombined className="inline-block mr-2" />
            {property.square_feet}
            <span className="md:hidden lg:inline"> m²</span>
          </p>
        </div>
        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          {property.rates.nightly && (
            <p>
              <FaMoneyBill className="inline mr-2" />
              noturno
            </p>
          )}
          {property.rates.weekly && (
            <p>
              <FaMoneyBill className="inline mr-2" />
              semanal
            </p>
          )}
          {property.rates.monthly && (
            <p>
              <FaMoneyBill className="inline mr-2" />
              mensal
            </p>
          )}
        </div>
        <div className="border border-gray-200 mb-5"></div>
        <div className="flex flex-col lg:flex-row justify-between">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarker className="text-lg text-orange-700" />
            <span className="text-orange-700">
              {property.location.city} {property.location.state}
            </span>
          </div>
          <Link
            // href="property.html"
            href={`/properties/${property._id}`}
            className="inline-block h-[36px] min-w-[120px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm whitespace-nowrap"
          >
            Mais detalhes
          </Link>
        </div>
      </div>
    </div>
  );
};

export default FeaturedPropertyCard;
