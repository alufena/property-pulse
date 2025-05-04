'use client';
import { useState, useEffect } from 'react';

const PropertyAddForm = () => {
  const [mounted, setMounted] = useState(false); // conserta o warning "Did not expect server HTML to contain a <div> in a <div>", ou seja, o client html não coincide com o server html; precisa adicionar um pedaço de state (mounted) e checá-lo com useEffect
  const [fields, setFields] = useState({
    // pedaço de state para o campo "form" que é um objeto que contém todos campos. boa parte terá uma função "handler"
    type: 'Apartment', // tudo aqui reflete diretamente no state
    name: 'Test Property',
    description: '',
    location: {
      // nested properties
      street: '',
      city: 'Test City',
      state: 'Test State',
      zipcode: '',
    },
    beds: '3',
    baths: '2',
    square_feet: '1800',
    amenities: [],
    rates: {
      weekly: '',
      monthly: '2000',
      nightly: '',
    },
    seller_info: {
      name: '',
      email: 'test@test.com',
      phone: '',
    },
    images: [],
  });
  useEffect(() => {
    setMounted(true);
  }, []);
  const handleChange = (e) => {
    // console.log(e.target.name);
    // console.log(e.target.value);
    const { name, value } = e.target;
    if (name.includes('.')) {
      // procura por propriedades aninhadas (rates.weekly)
      const [outerKey, innerKey] = name.split('.');
      // console.log(outerKey, innerKey); // outer é a 1ª parte do nested property e inner é a 2ª parte do nested property (divididos pelo ponto)
      setFields((prevFields) => ({
        // atualiza o state
        ...prevFields,
        [outerKey]: {
          ...prevFields[outerKey],
          [innerKey]: value,
        },
      }));
    } else {
      // caso não seja um nested property
      setFields((prevFields) => ({
        ...prevFields,
        [name]: value,
      }));
    }
  };
  const handleAmenitiesChange = (e) => {
    const { checked, value } = e.target; // pega checked ao invés de name (checkboxes)
    const updatedAmenities = [...fields.amenities]; // clona o array atual
    if (checked) {
      // aciona para todos inputs
      updatedAmenities.push(value); // adiciona "value" para o array
    } else {
      const index = updatedAmenities.indexOf(value); // remove "value" do array
      if (index !== -1) {
        // se "value" não estiver lá, retorna "-1". aqui checa se não tem esse "-1"
        updatedAmenities.splice(index, 1); // remoção
      }
    }
    setFields((prevFields) => ({
      // atualiza o field/state com o array atualizado
      ...prevFields,
      amenities: updatedAmenities,
    }));
  };
  const handleImageChange = (e) => {
    const { files } = e.target; // array "files" é criado ao enviar (submit) o form
    // console.log(files);
    const updatedImages = [...fields.images]; // clona o atual images array dentro do state (vazio por padrão)
    for (const file of files) {
      // adiciona os novos arquivos ao array
      updatedImages.push(file);
    }
    setFields((prevFields) => ({
      // atualiza state do array "images"
      ...prevFields,
      images: updatedImages,
    }));
  };
  /* !!! ESTÁ FALTANDO LOFT (SÓTÃO NO FORM ABAIXO) !!! */
  return (
    mounted && (
      <form>
        <h2 className="text-3xl text-center font-semibold mb-6">
          Adicione seu imóvel
        </h2>
        <div className="mb-4">
          <label htmlFor="type" className="block text-gray-700 font-bold mb-2">
            Tipo
          </label>
          <select
            id="type"
            name="type"
            className="border rounded w-full py-2 px-3"
            required
            value={fields.type}
            onChange={handleChange}
          >
            <option value="Apartment">Apartamento</option>
            <option value="Studio">Estúdio</option>
            <option value="Condo">Condomínio</option>
            <option value="House">Casa</option>
            <option value="Cabin Or Cottage">Cabana ou chalé</option>
            <option value="Room">Quarto</option>
            <option value="Other">Outros</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Nome de exibição
          </label>
          <input
            type="text"
            id="name"
            name="name"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="eg. Beautiful Apartment In Miami"
            required
            value={fields.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 font-bold mb-2"
          >
            Descrição
          </label>
          <textarea
            id="description"
            name="description"
            className="border rounded w-full py-2 px-3"
            rows="4"
            placeholder="Add an optional description of your property"
            value={fields.description}
            onChange={handleChange}
          ></textarea>
        </div>
        <div className="mb-4 bg-blue-50 p-4">
          <label className="block text-gray-700 font-bold mb-2">Local</label>
          <input
            type="text"
            id="street"
            name="location.street"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Rua"
            value={fields.location.street}
            onChange={handleChange}
          />
          <input
            type="text"
            id="city"
            name="location.city"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Cidade"
            required
            value={fields.location.city}
            onChange={handleChange}
          />
          <input
            type="text"
            id="state"
            name="location.state"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="Estado"
            required
            value={fields.location.state}
            onChange={handleChange}
          />
          <input
            type="text"
            id="zipcode"
            name="location.zipcode"
            className="border rounded w-full py-2 px-3 mb-2"
            placeholder="CEP"
            value={fields.location.zipcode}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4 flex flex-wrap">
          <div className="w-full sm:w-1/3 pr-2">
            <label
              htmlFor="beds"
              className="block text-gray-700 font-bold mb-2"
            >
              Camas
            </label>
            <input
              type="number"
              id="beds"
              name="beds"
              className="border rounded w-full py-2 px-3"
              required
              value={fields.beds}
              onChange={handleChange}
            />
          </div>
          <div className="w-full sm:w-1/3 px-2">
            <label
              htmlFor="baths"
              className="block text-gray-700 font-bold mb-2"
            >
              Banheiros
            </label>
            <input
              type="number"
              id="baths"
              name="baths"
              className="border rounded w-full py-2 px-3"
              required
              value={fields.baths}
              onChange={handleChange}
            />
          </div>
          <div className="w-full sm:w-1/3 pl-2">
            <label
              htmlFor="square_feet"
              className="block text-gray-700 font-bold mb-2"
            >
              Metros quadrados
            </label>
            <input
              type="number"
              id="square_feet"
              name="square_feet"
              className="border rounded w-full py-2 px-3"
              required
              value={fields.square_feet}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">
            Cortesias
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
            <div>
              <input
                type="checkbox"
                id="amenity_wifi"
                name="amenities"
                value="Wifi"
                className="mr-2"
                checked={fields.amenities.includes('Wifi')} // "includes" precisa ter o nome coincidido com o que está em value
                onChange={handleAmenitiesChange} // funcionará diferente por lidar com checkboxes
              />
              <label htmlFor="amenity_wifi">Wi-Fi grátis</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_kitchen"
                name="amenities"
                value="Full Kitchen"
                className="mr-2"
                checked={fields.amenities.includes('Full Kitchen')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_kitchen">Cozinha completa</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_washer_dryer"
                name="amenities"
                value="Washer & Dryer"
                className="mr-2"
                checked={fields.amenities.includes('Washer & Dryer')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_washer_dryer">Lavadora e secadora</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_free_parking"
                name="amenities"
                value="Free Parking"
                className="mr-2"
                checked={fields.amenities.includes('Free Parking')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_free_parking">
                Estacionamento gratuito
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_pool"
                name="amenities"
                value="Swimming Pool"
                className="mr-2"
                checked={fields.amenities.includes('Swimming Pool')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_pool">Piscina</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_hot_tub"
                name="amenities"
                value="Hot Tub"
                className="mr-2"
                checked={fields.amenities.includes('Hot Tub')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_hot_tub">Hidromassagem</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_24_7_security"
                name="amenities"
                value="24/7 Security"
                className="mr-2"
                checked={fields.amenities.includes('24/7 Security')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_24_7_security">Segurança 24h</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_wheelchair_accessible"
                name="amenities"
                value="Wheelchair Accessible"
                className="mr-2"
                checked={fields.amenities.includes('Wheelchair Accessible')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_wheelchair_accessible">
                Acessível a cadeirantes
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_elevator_access"
                name="amenities"
                value="Elevator Access"
                className="mr-2"
                checked={fields.amenities.includes('Elevator Access')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_elevator_access">
                Acesso por elevador
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_dishwasher"
                name="amenities"
                value="Dishwasher"
                className="mr-2"
                checked={fields.amenities.includes('Dishwasher')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_dishwasher">Lava-louças</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_gym_fitness_center"
                name="amenities"
                value="Gym/Fitness Center"
                className="mr-2"
                checked={fields.amenities.includes('Gym/Fitness Center')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_gym_fitness_center">Academia</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_air_conditioning"
                name="amenities"
                value="Air Conditioning"
                className="mr-2"
                checked={fields.amenities.includes('Air Conditioning')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_air_conditioning">Ar-condicionado</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_balcony_patio"
                name="amenities"
                value="Balcony/Patio"
                className="mr-2"
                checked={fields.amenities.includes('Balcony/Patio')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_balcony_patio">
                Varanda ou área externa
              </label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_smart_tv"
                name="amenities"
                value="Smart TV"
                className="mr-2"
                checked={fields.amenities.includes('Smart TV')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_smart_tv">TV smart</label>
            </div>
            <div>
              <input
                type="checkbox"
                id="amenity_coffee_maker"
                name="amenities"
                value="Coffee Maker"
                className="mr-2"
                checked={fields.amenities.includes('Coffee Maker')}
                onChange={handleAmenitiesChange}
              />
              <label htmlFor="amenity_coffee_maker">Cafeteira</label>
            </div>
          </div>
        </div>
        <div className="mb-4 bg-blue-50 p-4">
          <label className="block text-gray-700 font-bold mb-2">
            Rates (Leave blank if not applicable)
          </label>
          <div className="flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-4">
            <div className="flex items-center">
              <label htmlFor="weekly_rate" className="mr-2">
                Weekly
              </label>
              <input
                type="number"
                id="weekly_rate"
                name="rates.weekly"
                className="border rounded w-full py-2 px-3"
                value={fields.rates.weekly}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="monthly_rate" className="mr-2">
                Monthly
              </label>
              <input
                type="number"
                id="monthly_rate"
                name="rates.monthly"
                className="border rounded w-full py-2 px-3"
                value={fields.rates.monthly}
                onChange={handleChange}
              />
            </div>
            <div className="flex items-center">
              <label htmlFor="nightly_rate" className="mr-2">
                Nightly
              </label>
              <input
                type="number"
                id="nightly_rate"
                name="rates.nightly"
                className="border rounded w-full py-2 px-3"
                value={fields.rates.nightly}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>
        <div className="mb-4">
          <label
            htmlFor="seller_name"
            className="block text-gray-700 font-bold mb-2"
          >
            Seller Name
          </label>
          <input
            type="text"
            id="seller_name"
            name="seller_info.name."
            className="border rounded w-full py-2 px-3"
            placeholder="Name"
            value={fields.seller_info.name}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="seller_email"
            className="block text-gray-700 font-bold mb-2"
          >
            Seller Email
          </label>
          <input
            type="email"
            id="seller_email"
            name="seller_info.email"
            className="border rounded w-full py-2 px-3"
            placeholder="Email address"
            required
            value={fields.seller_info.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="seller_phone"
            className="block text-gray-700 font-bold mb-2"
          >
            Seller Phone
          </label>
          <input
            type="tel"
            id="seller_phone"
            name="seller_info.phone"
            className="border rounded w-full py-2 px-3"
            placeholder="Phone"
            value={fields.seller_info.phone}
            onChange={handleChange}
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="images"
            className="block text-gray-700 font-bold mb-2"
          >
            Images (Select up to 4 images)
          </label>
          <input
            type="file"
            id="images"
            name="images"
            className="border rounded w-full py-2 px-3"
            accept="image/*"
            multiple
            onChange={handleImageChange}
          />
        </div>
        <div>
          <button
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full w-full focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Add Property
          </button>
        </div>
      </form>
    )
  );
};

export default PropertyAddForm;
