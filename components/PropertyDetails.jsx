import {
  FaBed,
  FaBath,
  FaRulerCombined,
  FaTimes,
  FaCheck,
  FaMapMarker,
} from 'react-icons/fa';

const PropertyDetails = ({ property }) => {
  const amenityTranslations = {
    Wifi: 'Wi-Fi grátis',
    'Full Kitchen': 'Cozinha completa',
    'Washer & Dryer': 'Lavadora e secadora',
    'Free Parking': 'Estacionamento gratuito',
    'Swimming Pool': 'Piscina',
    'Hot Tub': 'Hidromassagem',
    '24/7 Security': 'Segurança 24h',
    'Wheelchair Accessible': 'Acessível a cadeirantes',
    'Elevator Access': 'Acesso por elevador',
    Dishwasher: 'Lava-louças',
    'Gym/Fitness Center': 'Academia',
    'Air Conditioning': 'Ar-condicionado',
    'Balcony/Patio': 'Varanda ou área externa',
    'Smart TV': 'TV smart',
    'Coffee Maker': 'Cafeteira',
  };
  const getTypeDisplay = () => {
    const types = {
      Apartment: 'Apartamento',
      Studio: 'Estúdio',
      Condo: 'Condomínio',
      House: 'Casa',
      'Cabin Or Cottage': 'Cabana ou chalé',
      Loft: 'Sótão',
      Room: 'Quarto',
      Other: 'Outros',
    };
    return types[property.type] || property.type;
  };
  return (
    <main>
      <div className="bg-white p-6 rounded-lg shadow-md text-center md:text-left">
        <div className="text-gray-500 mb-4">{getTypeDisplay()}</div>
        <h1 className="text-3xl font-bold mb-4 break-words whitespace-pre-wrap">
          {property.name}
        </h1>
        <div className="text-gray-500 mb-4 flex align-middle justify-center md:justify-start">
          {/* <i className="fa-solid fa-location-dot text-lg text-orange-700 mr-2"></i> */}
          <FaMapMarker className="text-lg text-orange-700 mr-2" />
          <p className="text-orange-700 break-words whitespace-pre-wrap max-w-xs md:max-w-sm lg:max-w-md">
            {property.location.street}, {property.location.city},{' '}
            {property.location.state}
          </p>
        </div>
        <h3 className="text-lg font-bold my-6 bg-gray-800 text-white p-2">
          Preços e opções
        </h3>
        <div className="flex flex-col md:flex-row justify-around">
          <div className="flex items-center justify-center mb-4 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Mês</div>
            <div className="text-2xl font-bold text-blue-500">
              {property.rates.monthly ? (
                `R$ ${property.rates.monthly.toLocaleString()}`
              ) : (
                <FaTimes className="text-red-700" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Semana</div>
            <div className="text-2xl font-bold text-blue-500">
              {property.rates.weekly ? (
                `R$ ${property.rates.weekly.toLocaleString()}`
              ) : (
                <FaTimes className="text-red-700" />
              )}
            </div>
          </div>
          <div className="flex items-center justify-center mb-4 border-b border-gray-200 md:border-b-0 pb-4 md:pb-0">
            <div className="text-gray-500 mr-2 font-bold">Noite</div>
            <div className="text-2xl font-bold text-blue-500">
              {property.rates.nightly ? (
                `R$ ${property.rates.nightly.toLocaleString()}`
              ) : (
                <FaTimes className="text-red-700" />
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Descrição e detalhes</h3>
        <div className="flex justify-center gap-4 text-blue-500 mb-4 text-xl space-x-9">
          <p>
            {/* <i className="fa-solid fa-bed"></i> */}
            <FaBed className="inline-block mr-2" />
            {property.beds}
            <span className="hidden sm:inline"> cama</span>
          </p>
          <p>
            {/* <i className="fa-solid fa-bath"></i> */}
            <FaBath className="inline-block mr-2" />
            {property.baths}
            <span className="hidden sm:inline"> banheiro</span>
          </p>
          <p>
            {/* <i className="fa-solid fa-ruler-combined"></i> */}
            <FaRulerCombined className="inline-block mr-2" />
            {property.square_feet}
            <span className="hidden sm:inline"> m²</span>
          </p>
        </div>
        <p className="text-gray-500 mb-4 break-words whitespace-pre-wrap">
          {property.description}
        </p>
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <h3 className="text-lg font-bold mb-6">Cortesias</h3>
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-2">
          {property.amenities.map((amenity, index) => (
            <li key={index} className="flex items-center">
              <FaCheck className="text-green-600 mr-2" />
              <span>{amenityTranslations[amenity] || amenity}</span>
            </li>
          ))}
        </ul>
      </div>
      {/* <div className="bg-white p-6 rounded-lg shadow-md mt-6">
        <div id="map"></div>
      </div> */}
    </main>
  );
};

export default PropertyDetails;
