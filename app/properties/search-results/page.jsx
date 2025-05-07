'use client';
import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation'; // pega a rota api da url

const SearchResultsPage = () => {
  const searchParams = useSearchParams();
  // console.log(searchParams.get('location'));
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = searchParams.get('location');
  const propertyType = searchParams.get('propertyType');
  useEffect(() => {
    const fetchSearchResults = async () => {
      try {
        const res = await fetch(
          `/api/properties/search?location=${location}&propertyType=${propertyType}`
        );
        if (res.status === 200) {
          const data = await res.json();
          setProperties(data);
        } else {
          setProperties([]);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchSearchResults();
  }, [(location, propertyType)]);
  console.log(properties);
  return <div>SearchResultsPage</div>;
};

export default SearchResultsPage;
