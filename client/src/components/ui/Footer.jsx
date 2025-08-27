import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <div className="w-full bg-gray-100 py-10 px-4 md:px-8">
      <div className="max-w-screen-xl mx-auto flex flex-col items-center">
        {/* Grille des sections principales */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full text-sm">
          {/* Support */}
          <div className="flex flex-col gap-2">
            <strong className="font-medium text-gray-900">Support</strong>
            {[
              'Help Center',
              'Get help with a safety issue',
              'Air cover',
              'Anti-discrimination',
              'Disability support',
              'Cancellation options',
              'Report neighbourhood concern',
            ].map((item, i) => (
              <p key={i} className="text-gray-700 hover:underline cursor-pointer">
                {item}
              </p>
            ))}
          </div>

          {/* Hosting */}
          <div className="flex flex-col gap-2">
            <strong className="font-medium text-gray-900">Hosting</strong>
            {[
              'AtypikHouse your home',
              'AirCover for Hosts',
              'Hosting resources',
              'Community forum',
              'Hosting responsibly',
            ].map((item, i) => (
              <p key={i} className="text-gray-700 hover:underline cursor-pointer">
                {item}
              </p>
            ))}
          </div>

          {/* AtypikHouse */}
          <div className="flex flex-col gap-2">
            <strong className="font-medium text-gray-900">AtypikHouse</strong>
            {[
              'Newsroom',
              'New features',
              'Careers',
              'Investors',
              'AtypikHouse.org emergency stays',
            ].map((item, i) => (
              <p key={i} className="text-gray-700 hover:underline cursor-pointer">
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* Ligne de séparation */}
        <div className="w-full border-t border-gray-200 my-6" />

        {/* Bas de footer */}
        <div className="w-full flex flex-col gap-6 md:flex-row md:justify-between md:items-center text-sm text-gray-700">
          {/* Langue et icônes */}
          <div className="flex flex-col md:flex-row md:items-center gap-4">
            <div className="flex items-center">
              🌍 English (ENG) <span className="ml-4">€ EUR</span>
            </div>
            <div className="flex gap-4">
              {/* Icônes Réseaux sociaux */}
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" viewBox="0 0 50 50">
                <path d="M41,4H9C6.24,4,4,6.24,4,9v32c0,2.76,2.24,5,5,5h32c2.76,0,5-2.24,5-5V9C46,6.24,43.76,4,41,4z M37,19h-2c-2.14,0-3,0.5-3,2 v3h5l-1,5h-4v15h-5V29h-4v-5h4v-3c0-4,2-7,6-7c2.9,0,4,1,4,1V19z"></path>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" viewBox="0 0 50 50">
                <path d="M 11 4 C 7.134 4 4 7.134 4 11 L 4 39 C 4 42.866 7.134 46 11 46 L 39 46 C 42.866 46 46 42.866 46 39 L 46 11 C 46 7.134 42.866 4 39 4 L 11 4 z M 13.085938 13 L 21.023438 13 L 26.660156 21.009766 L 33.5 13 L 36 13 L 27.789062 22.613281 L 37.914062 37 L 29.978516 37 L 23.4375 27.707031 L 15.5 37 L 13 37 L 22.308594 26.103516 L 13.085938 13 z M 16.914062 15 L 31.021484 35 L 34.085938 35 L 19.978516 15 L 16.914062 15 z"></path>
              </svg>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 cursor-pointer" viewBox="0 0 50 50">
                <path d="M 16 3 C 8.83 3 3 8.83 3 16 L 3 34 C 3 41.17 8.83 47 16 47 L 34 47 C 41.17 47 47 41.17 47 34 L 47 16 C 47 8.83 41.17 3 34 3 L 16 3 z M 37 11 C 38.1 11 39 11.9 39 13 C 39 14.1 38.1 15 37 15 C 35.9 15 35 14.1 35 13 C 35 11.9 35.9 11 37 11 z M 25 14 C 31.07 14 36 18.93 36 25 C 36 31.07 31.07 36 25 36 C 18.93 36 14 31.07 14 25 C 14 18.93 18.93 14 25 14 z M 25 16 C 20.04 16 16 20.04 16 25 C 16 29.96 20.04 34 25 34 C 29.96 34 34 29.96 34 25 C 34 20.04 29.96 16 25 16 z"></path>
              </svg>
            </div>
          </div>

          {/* Lien Mentions légales + autres */}
          <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6">
            <p>&copy; 2025 AtypikHouse. Tous droits réservés.</p>
            <ul className="flex flex-col md:flex-row gap-2 md:gap-6">
              <li className="hover:underline">
                <Link to="/legal">Mentions légales</Link>
              </li>
              <li className="hover:underline cursor-pointer">Confidentialité</li>
              <li className="hover:underline cursor-pointer">Conditions</li>
              <li className="hover:underline cursor-pointer">Plan du site</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
