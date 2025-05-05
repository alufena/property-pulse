import Image from 'next/image';
import Link from 'next/link';
import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaMoneyBill,
  FaMapMarker,
} from 'react-icons/fa';

const PropertyCard = ({ property }) => {
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
  const getBedDisplay = () => (property.beds === 1 ? 'cama' : 'camas');
  const getBathDisplay = () =>
    property.baths === 1 ? 'banheiro' : 'banheiros';
  return (
    <div className="rounded-xl shadow-md relative">
      <Image
        // src="/images/properties/a1.jpg" // adicionado "/" no início da "src". aqui é conteúdo hardcoded
        // src={`/images/properties/${property.images[0]}`} // array de imagens vindo de properties.json
        src={property.images[0]} // exibe as URLs vindas de cloudinary
        alt=""
        className="w-full h-auto rounded-t-xl"
        width={0} // "width", "height" e "sizes" consertam erros relacionados à substituição dessa tag "img" pelo componente "Image"
        height={0}
        sizes="100vw"
      />
      <div className="p-4">
        <div className="text-left md:text-center lg:text-left mb-6">
          <div className="text-gray-600">{property.type}</div>
          <h3 className="text-xl font-bold">{property.name}</h3>
        </div>
        <h3 className="absolute top-[10px] right-[10px] bg-white px-4 py-2 rounded-lg text-blue-500 font-bold text-right md:text-center lg:text-right">
          {/* $4,200/mo */} {/* ${property.rates.monthly} */}
          {/* funciona para alguns, outros não. a função conserta a incosistência */}
          R$ {getRateDisplay()}
        </h3>
        <div className="flex justify-center gap-4 text-gray-500 mb-4">
          <p>
            <FaBed className="inline mr-2" />
            {/* <i className="fa-solid fa-bed"></i> */} {property.beds}
            <span className="md:hidden lg:inline"> {getBedDisplay()}</span>
          </p>
          <p>
            <FaBath className="inline mr-2" />
            {/* <i className="fa-solid fa-bath"> </i>*/} {property.baths}
            <span className="md:hidden lg:inline"> {getBathDisplay()}</span>
          </p>
          <p>
            <FaRulerCombined className="inline mr-2" />
            {/*  <i className="fa-solid fa-ruler-combined"></i> */}
            {property.square_feet}
            <span className="md:hidden lg:inline"> metros quadrados</span>
          </p>
        </div>
        <div className="flex justify-center gap-4 text-green-900 text-sm mb-4">
          {property.rates.nightly && (
            <p>
              <FaMoneyBill className="inline mr-2" />
              {/* <i className="fa-solid fa-money-bill"></i> */} noturno
            </p>
          )}
          {property.rates.weekly && (
            <p>
              <FaMoneyBill className="inline mr-2" />
              {/* <i className="fa-solid fa-money-bill"></i> */} semanal
            </p>
          )}
          {property.rates.monthly && (
            <p>
              <FaMoneyBill className="inline mr-2" />
              {/*  <i className="fa-solid fa-money-bill"></i> */} mensal
            </p>
          )}
        </div>
        <div className="border border-gray-100 mb-5"></div>
        <div className="flex flex-col lg:flex-row justify-between mb-4">
          <div className="flex align-middle gap-2 mb-4 lg:mb-0">
            <FaMapMarker className="text-orange-700 mt-1" />
            {/* <i className="fa-solid fa-location-dot text-lg text-orange-700"></i> */}
            <span className="text-orange-700">
              {property.location.city} {property.location.state}
            </span>
          </div>
          <Link
            // href="property.html"
            href={`/properties/${property._id}`}
            className="h-[36px] bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-center text-sm"
          >
            Mais informações
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PropertyCard;
