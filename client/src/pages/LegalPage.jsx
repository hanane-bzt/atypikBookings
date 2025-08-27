import { Helmet } from 'react-helmet-async';

const LegalPage = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 py-10 bg-gray-100">
      <Helmet>
        <title>Mentions légales & Politique de confidentialité | AtypikBookings</title>
        <meta name="description" content="Mentions légales, conditions générales d'utilisation et politique de confidentialité d'AtypikBookings." />
        <link rel="canonical" href="https://atypikbookings.com/legal" />
      </Helmet>

      {/* Hero */}
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold text-primary mb-4">
          Mentions légales & Confidentialité
        </h1>
        <p className="text-gray-600 text-lg max-w-2xl mx-auto">
          Transparence, sécurité et confiance : tout ce que vous devez savoir sur l'utilisation de notre plateforme.
        </p>
      </div>

      {/* Sections légales */}
      <div className="grid gap-8 max-w-5xl mx-auto">
        <section className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">1. Éditeur du site</h2>
          <p className="text-gray-600">
            Ce site est édité par la société <strong>AtypikBookings</strong>, SARL au capital de 5 000 €, 
            immatriculée au RCS de Paris sous le numéro 123 456 789.
          </p>
          <p className="text-gray-600 mt-2">Adresse : 123 rue de l'Aventure, 75000 Paris</p>
          <p className="text-gray-600">Email : <a href="mailto:contact@atypikbookings.com" className="text-primary underline">contact@atypikbookings.com</a></p>
        </section>

        <section className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">2. Hébergeur</h2>
          <p className="text-gray-600">
            Le site est hébergé par <strong>Vercel, Inc.</strong><br />
            Adresse : 340 S Lemon Ave #4133, Walnut, CA 91789, USA
          </p>
        </section>

        <section className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">3. Conditions Générales d’Utilisation (CGU)</h2>
          <p className="text-gray-600">
            L’utilisation du site AtypikBookings implique l’acceptation pleine et entière des conditions générales d’utilisation. Ces dernières peuvent être modifiées à tout moment.
          </p>
        </section>

        <section className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">4. Propriété intellectuelle</h2>
          <p className="text-gray-600">
            Tous les éléments du site (textes, images, logos, etc.) sont la propriété exclusive d’AtypikBookings, sauf indication contraire.
          </p>
        </section>

        <section className="bg-white shadow-lg rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">5. Politique de confidentialité</h2>
          <p className="text-gray-600">
            Les données personnelles collectées via le site sont utilisées uniquement pour améliorer l’expérience utilisateur. Elles sont traitées dans le respect du RGPD.
          </p>
          <p className="text-gray-600 mt-2">
            Vous disposez d’un droit d’accès, de rectification ou de suppression de vos données. Contactez-nous à : <a href="mailto:contact@atypikbookings.com" className="text-primary underline">contact@atypikbookings.com</a>
          </p>
        </section>
      </div>

      {/* Footer */}
      <footer className="text-sm text-gray-500 text-center mt-16">
        © {new Date().getFullYear()} AtypikBookings. Tous droits réservés.
      </footer>
    </div>
  );
};

export default LegalPage;
