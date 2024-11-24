import React from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet'; // Import pour le SEO

const NotFoundPage = () => {
  return (
    <>
      {/* SEO - Balises meta */}
      <Helmet>
        <title>404 - Page non trouvée | AtypikHouse</title>
        <meta
          name="description"
          content="La page que vous recherchez n'existe pas ou a été déplacée. Retournez à l'accueil pour continuer votre exploration."
        />
        <meta name="robots" content="noindex, follow" />
        <meta property="og:title" content="404 - Page non trouvée" />
        <meta
          property="og:description"
          content="Erreur 404 - La page demandée n'existe pas ou a été déplacée. Cliquez pour retourner à l'accueil."
        />
        <meta property="og:url" content="https://votre-domaine.com/404" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="px-2 pt-40">
        <div className="text-center">
          <p
            className="text-base font-semibold text-black"
            role="alert"
            aria-label="Erreur 404"
          >
            404
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-black sm:text-5xl">
            Oups ! Nous ne trouvons pas la page que vous recherchez.
          </h1>
          <p className="mt-4 text-base leading-7 text-gray-600">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
          <div className="mt-4 flex items-center justify-center gap-x-3">
            <Link to="/">
              <button
                className="rounded-[10px] bg-gray-900 p-2 px-20 hover:bg-gray-700"
                aria-label="Retour à l'accueil"
              >
                <span className="font-semibold text-white">Accueil</span>
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFoundPage;
