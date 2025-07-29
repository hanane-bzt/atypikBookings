import { usePlaces } from '../../hooks';
import Spinner from '@/components/ui/Spinner';
import PlaceCard from '@/components/ui/PlaceCard';
import { Helmet } from 'react-helmet'; // Import pour le SEO

const IndexPage = () => {
  const allPlaces = usePlaces();

  // ✅ Sécurisation de l'accès aux données
  const { places = [], loading = false } = allPlaces || {};

  if (loading) {
    return <Spinner />;
  }
  console.log("places", places);

  return (
    <>
      {/* Ajout des balises meta pour le SEO */}
      <Helmet>
        <title>AtypikHouse - Découvrez des habitats uniques</title>
        <meta
          name="description"
          content="Découvrez des lieux uniques comme des cabanes dans les arbres, yourtes, et autres hébergements atypiques disponibles à la location."
        />
        <meta
          name="keywords"
          content="locations, habitats atypiques, cabanes, yourtes, voyage, hébergements"
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="AtypikHouse - Habitats uniques" />
        <meta
          property="og:description"
          content="Réservez des habitats atypiques uniques : cabanes, yourtes, et bien plus encore !"
        />
        <meta property="og:url" content="https://votre-domaine.com" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* Contenu principal */}
      <div className="grid grid-cols-1 justify-items-center px-4 py-32 md:grid-cols-2 md:gap-0 lg:grid-cols-3 lg:gap-2 xl:grid-cols-4 xl:gap-10">
        {places.length > 0 ? (
          places.map((place) => (
            <PlaceCard place={place} key={place._id} />
          ))
        ) : (
          <div
            className="absolute left-1/2 right-1/2 top-40 flex w-full -translate-x-1/2 transform flex-col p-10 md:w-1/2"
            role="alert"
            aria-label="No results found"
          >
            <h1 className="text-3xl font-semibold">Aucun résultat trouvé !</h1>
            <p className="text-lg font-semibold">
              Désolé, nous n'avons pas trouvé le lieu que vous recherchez.
            </p>
            <button className="mt-4 w-32 rounded-full bg-primary p-2 text-white">
              <a href="/" className="flex items-center justify-center gap-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="h-5 w-5"
                >
                  <line x1="19" y1="12" x2="5" y2="12"></line>
                  <polyline points="12 19 5 12 12 5"></polyline>
                </svg>
                Retour
              </a>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default IndexPage;



//----------------

// import React, { useState, useEffect } from 'react';
// import { usePlaces } from '../../hooks';
// import Spinner from '@/components/ui/Spinner';
// import PlaceCard from '@/components/ui/PlaceCard';

// const IndexPage = () => {
//   const allPlaces = usePlaces();
//   // const { places, loading } = allPlaces;
//   const { places = [], loading = false } = allPlaces || {};
//   console.log("✅ Places reçues:", places);

//   const [currentPage, setCurrentPage] = useState(1);
//   const [placesPerPage] = useState(12); // Vous pouvez ajuster ce nombre selon vos besoins

//   // Get current places
//   const indexOfLastPlace = currentPage * placesPerPage;
//   const indexOfFirstPlace = indexOfLastPlace - placesPerPage;
//   const currentPlaces = places.slice(indexOfFirstPlace, indexOfLastPlace);

//   // Change page
//   const paginate = (pageNumber) => setCurrentPage(pageNumber);

//   useEffect(() => {
//     // Reset to first page when places change (e.g., after filtering)
//     setCurrentPage(1);
//   }, [places]);

//   if (loading) {
//     return <Spinner />;
//   }

//   return (
//     <div className="px-4 py-38  bg-gray-100">
//       <div className="grid grid-cols-1 justify-items-center md:grid-cols-2 md:gap-0 lg:grid-cols-3 lg:gap-2 xl:grid-cols-4 xl:gap-10">
//         {currentPlaces.length > 0 ? (
//           currentPlaces.map((place) => (
//             <PlaceCard place={place} key={place._id} />
//           ))
//         ) : (
//           <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-90 z-50">
//             <div className="text-center p-8 bg-white shadow-lg rounded-lg">
//               <h1 className="text-3xl font-semibold mb-4">Result not found!</h1>
//               <p className="text-lg font-semibold mb-6">
//                 Sorry, we couldn&#39;t find the place you&#39;re looking for.
//               </p>
//               <button className="rounded-full bg-primary p-2 text-white hover:bg-primary-dark transition duration-300">
//                 <a href="/" className="flex items-center justify-center gap-1">
//                   <svg
//                     xmlns="http://www.w3.org/2000/svg"
//                     width="16"
//                     height="16"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     stroke="currentColor"
//                     strokeWidth="2"
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     className="h-5 w-5"
//                   >
//                     <line x1="19" y1="12" x2="5" y2="12"></line>
//                     <polyline points="12 19 5 12 12 5"></polyline>
//                   </svg>
//                   Go back
//                 </a>
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//       {places.length > placesPerPage && (
//         <Pagination
//           placesPerPage={placesPerPage}
//           totalPlaces={places.length}
//           paginate={paginate}
//           currentPage={currentPage}
//         />
//       )}
//     </div>
//   );
// };