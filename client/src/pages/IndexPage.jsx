import { usePlaces } from '../../hooks';
import Spinner from '@/components/ui/Spinner';
import PlaceCard from '@/components/ui/PlaceCard';
import { Helmet } from 'react-helmet';
import { Link as ScrollLink, Element } from 'react-scroll';
import { Link } from 'react-router-dom';

const IndexPage = () => {
  const { places = [], loading = false } = usePlaces() || {};

  if (loading) return <Spinner />;

  const visiblePlaces = places.slice(0, 6); // Afficher 6 max

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>AtypikHouse - Découvrez des habitats uniques</title>
        <meta name="description" content="Découvrez des lieux uniques comme des cabanes dans les arbres, yourtes, et autres hébergements atypiques disponibles à la location." />
        <meta name="keywords" content="locations, habitats atypiques, cabanes, yourtes, voyage, hébergements" />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="AtypikHouse - Habitats uniques" />
        <meta property="og:description" content="Réservez des habitats atypiques uniques : cabanes, yourtes, et bien plus encore !" />
        <meta property="og:url" content="https://votre-domaine.com" />
        <meta property="og:type" content="website" />
      </Helmet>

      {/* HERO */}
      <section id="hero" className="h-screen flex items-center justify-center bg-gray-100 shadow-inner rounded-xl px-4">
        <div className="text-center max-w-3xl">
          <h1 className="text-5xl font-extrabold text-gray-800 mb-4">
            Bienvenue sur <span className="text-red-600">AtypikHouse</span>
          </h1>
          <p className="text-xl text-gray-700">
            Cabanes dans les arbres, yourtes, logements insolites… <br />
            <span className="font-semibold text-gray-800">Découvrez des lieux inoubliables</span> pour vos prochaines escapades.
          </p>
          <p className="text-base text-gray-500 mt-3">
            Cette page présente nos services ainsi qu’une vue d’ensemble des biens disponibles à la location.
          </p>
          <div className="mt-6">
            <ScrollLink
              to="places"
              smooth={true}
              duration={800}
              offset={-60}
              className="inline-block cursor-pointer rounded-full bg-red-500 px-6 py-3 text-white font-semibold shadow hover:bg-red-600 transition duration-300"
            >
              Explorer les hébergements
            </ScrollLink>
          </div>
        </div>
      </section>

      {/* SECTION PLACES */}
      <Element name="places" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-10">
            Nos hébergements atypiques
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
            {visiblePlaces.length > 0 ? (
              visiblePlaces.map((place) => <PlaceCard place={place} key={place._id} />)
            ) : (
              <p className="text-gray-600">Aucun hébergement trouvé.</p>
            )}
          </div>
          {places.length > 6 && (
            <div className="mt-8">
              <Link
                to="/places"
                className="inline-block bg-red-500 text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-red-600 transition"
              >
                Voir plus
              </Link>
            </div>
          )}
        </div>
      </Element>

      {/* SECTION DEVENEZ HOTE */}
      <section  className="py-20 px-6 bg-gradient-to-b from-red-50 to-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Louez votre hébergement atypique
          </h2>
          <p className="text-lg text-gray-600 mb-6">
            Rejoignez AtypikHouse et touchez des voyageurs à la recherche d’expériences uniques.
          </p>
          <Link
            to="/OwnerBenefitsPage"
            className="inline-block bg-primary text-white px-6 py-3 rounded-full font-semibold shadow hover:bg-red-600 transition"
          >
            En savoir plus
          </Link>
        </div>
      </section>


    </>
  );
};

export default IndexPage;