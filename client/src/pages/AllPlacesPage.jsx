import { useState, useEffect } from 'react';
import axiosInstance from '@/utils/axios';
import PlaceCard from '@/components/ui/PlaceCard';
import Spinner from '@/components/ui/Spinner';
import { Helmet } from 'react-helmet';

const AllPlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPlaces = async () => {
      try {
        const { data } = await axiosInstance.get('/api/places');
        setPlaces(data.places);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des lieux :', error);
        setLoading(false);
      }
    };

    fetchPlaces();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <Helmet>
        <title>Nos hébergements - AtypikHouse</title>
        <meta name="description" content="Découvrez tous nos hébergements atypiques disponibles à la location." />
      </Helmet>
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-800 my-10">
          Tous nos hébergements atypiques
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {places.length > 0 ? (
            places.map((place) => <PlaceCard place={place} key={place._id} />)
          ) : (
            <p className="text-gray-600">Aucun hébergement trouvé.</p>
          )}
        </div>
      </div>
    </>
  );
};

export default AllPlacesPage;
