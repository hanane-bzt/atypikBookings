import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const OwnerBenefitsPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gray-100">
      <Helmet>
        <title>Devenez propriétaire sur AtypikBookings | Louez votre bien</title>
        <meta name="description" content="Générez des revenus en louant votre logement atypique sur AtypikBookings. Grande visibilité, paiements sécurisés et assistance 24/7." />
        <meta name="keywords" content="location saisonnière, hébergement atypique, louer bien immobilier, propriétaires, Airbnb alternatif" />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://atypikbookings.com/owner-benefits" />
      </Helmet>

      <header className="text-center">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          🎉 Devenez propriétaire sur AtypikBookings
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl">
          Rentabilisez votre hébergement atypique en le louant sur AtypikBookings. 
          Cabanes, yourtes, igloos, maisons flottantes... Notre plateforme vous 
          permet de trouver des locataires en toute simplicité et sécurité.
        </p>
      </header>

      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl">
        <article className="p-6 border rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-semibold mb-3">📈 Augmentez vos revenus</h2>
          <p className="text-gray-600">
            Publiez votre bien et commencez à percevoir des revenus en accueillant des voyageurs du monde entier.
          </p>
        </article>

        <article className="p-6 border rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-semibold mb-3">🔍 Grande visibilité</h2>
          <p className="text-gray-600">
            Votre logement sera mis en avant auprès de milliers d'utilisateurs chaque mois.
          </p>
        </article>

        <article className="p-6 border rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-semibold mb-3">💰 Paiements sécurisés</h2>
          <p className="text-gray-600">
            Recevez vos paiements rapidement et en toute sécurité grâce à notre système intégré.
          </p>
        </article>

        <article className="p-6 border rounded-lg shadow-lg bg-white">
          <h2 className="text-2xl font-semibold mb-3">📞 Assistance 24/7</h2>
          <p className="text-gray-600">
            Une équipe dédiée est disponible à tout moment pour vous accompagner et répondre à vos questions.
          </p>
        </article>
      </section>

      <div className="mt-8">
        <Link 
          to="/register" 
          className="bg-primary text-white px-6 py-3 rounded-full shadow-lg text-lg focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50 hover:bg-primary-dark transition"
          aria-label="S'inscrire pour devenir propriétaire"
        >
          🚀 Je deviens hôte dès maintenant
        </Link>
      </div>
    </div>
  );
};

export default OwnerBenefitsPage;
