import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const isServer = typeof window === 'undefined';

const Wrapper = isServer ? 'div' : motion.div;

const WrapperLink = ({ to, children, ...props }) =>
  isServer ? (
    <a href={to} {...props}>
      {children}
    </a>
  ) : (
    <Link to={to} {...props}>
      {children}
    </Link>
  );

const PlaceCard = ({ place }) => {
  const {
    _id: placeId,
    photos = [],
    address = 'Adresse non disponible',
    title = 'Titre non disponible',
    price = 'N/A',
  } = place;

  return (
    <Wrapper
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ scale: 1.02 }}
      className="w-full max-w-sm bg-white rounded-xl shadow-md hover:shadow-xl transition-transform transform"
    >
      <WrapperLink to={`/place/${placeId}`} className="block">
        <div className="h-48 w-full overflow-hidden rounded-t-xl">
          <img
            src={photos[0] || '/default.jpg'}
            alt={`Photo de ${title}`}
            className="h-full w-full object-cover"
            {...(!isServer && { loading: 'lazy' })}
          />
        </div>

        <div className="p-4">
          <h2 className="text-lg font-semibold text-gray-800 truncate">{address}</h2>
          <h3 className="text-sm text-gray-500 truncate">{title}</h3>

          <div className="mt-2">
            <span className="text-primary font-semibold">{price}€</span>{' '}
            <span className="text-sm text-gray-600">/ nuit</span>
          </div>
        </div>
      </WrapperLink>
    </Wrapper>
  );
};

export default PlaceCard;
