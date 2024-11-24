import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'; // Import pour le SEO

import axiosInstance from '@/utils/axios';

import AccountNav from '@/components/ui/AccountNav';
import InfoCard from '@/components/ui/InfoCard';
import Spinner from '@/components/ui/Spinner';

const PlacesPage = () => {
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPlaces = async () => {
      try {
        const { data } = await axiosInstance.get('places/user-places');
        setPlaces(data);
        setLoading(false);
      } catch (error) {
        console.error('Erreur lors de la récupération des lieux :', error);
        setLoading(false);
      }
    };
    getPlaces();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {/* SEO - Balises meta */}
      <Helmet>
        <title>Mes lieux - AtypikHouse</title>
        <meta
          name="description"
          content="Gérez vos lieux et propriétés ajoutées à AtypikHouse. Ajoutez, modifiez ou supprimez vos annonces facilement."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Mes lieux - AtypikHouse" />
        <meta
          property="og:description"
          content="Accédez à vos lieux ajoutés sur AtypikHouse et gérez vos annonces en toute simplicité."
        />
        <meta property="og:url" content="https://votre-domaine.com/account/places" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div>
        <AccountNav />
        <div className="text-center">
          <Link
            className="inline-flex gap-1 rounded-full bg-primary px-6 py-2 text-white"
            to={'/account/places/new'}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="h-6 w-6"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4.5v15m7.5-7.5h-15"
              />
            </svg>
            Ajouter un nouveau lieu
          </Link>
        </div>
        <div className="mx-4 mt-4">
          {places.length > 0 ? (
            places.map((place) => <InfoCard place={place} key={place._id} />)
          ) : (
            <div className="text-center text-gray-500">
              <p>Aucun lieu ajouté pour l'instant.</p>
              <p>
                Cliquez sur le bouton ci-dessus pour ajouter votre premier lieu !
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default PlacesPage;
