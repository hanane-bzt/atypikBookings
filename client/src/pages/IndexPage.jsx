import { usePlaces } from '../../hooks';
import Spinner from '@/components/ui/Spinner';
import PlaceCard from '@/components/ui/PlaceCard';
import { Helmet } from 'react-helmet'; // Import pour le SEO

const IndexPage = () => {
  const allPlaces = usePlaces();
  const { places, loading } = allPlaces;

  if (loading) {
    return <Spinner />;
  }

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
            className="absolute left-1/2 right-1/2 top-40 flex  w-full -translate-x-1/2 transform flex-col p-10  md:w-1/2"
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
