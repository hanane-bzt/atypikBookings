import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet'; // Import pour le SEO

import AccountNav from '../components/ui/AccountNav';
import AddressLink from '../components/ui/AddressLink';
import BookingDates from '../components/ui/BookingDates';
import PlaceGallery from '../components/ui/PlaceGallery';
import Spinner from '../components/ui/Spinner';
import axiosInstance from '../utils/axios';

const SingleBookedPlace = () => {
  const { id } = useParams();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(false);

  const getBookings = async () => {
    try {
      setLoading(true);
      const { data } = await axiosInstance.get('/bookings');

      // Filtrer les données pour récupérer la réservation actuelle
      const filteredBooking = data.booking.filter(
        (booking) => booking._id === id
      );

      setBooking(filteredBooking[0]);
    } catch (error) {
      console.error('Erreur : ', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBookings();
  }, [id]);

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {/* SEO - Balises meta */}
      <Helmet>
        <title>
          {booking?.place?.title
            ? `Réservation - ${booking.place.title}`
            : 'Détails de la réservation'} - AtypikHouse
        </title>
        <meta
          name="description"
          content={`Consultez les détails de votre réservation pour ${
            booking?.place?.title || 'un lieu unique'
          }.`}
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Détails de la réservation - AtypikHouse" />
        <meta
          property="og:description"
          content="Consultez vos informations de réservation sur AtypikHouse."
        />
        <meta property="og:url" content={`https://votre-domaine.com/bookings/${id}`} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div>
        <AccountNav />
        {booking?.place ? (
          <div className="p-4">
            <h1 className="text-3xl">{booking.place.title}</h1>

            <AddressLink
              className="my-2 block"
              placeAddress={booking.place?.address}
            />
            <div className="my-6 flex flex-col items-center justify-between rounded-2xl bg-gray-200 p-6 sm:flex-row">
              <div>
                <h2 className="mb-4 text-2xl md:text-2xl">
                  Informations sur votre réservation
                </h2>
                <BookingDates booking={booking} />
              </div>
              <div className="mt-5 w-full rounded-2xl bg-primary p-6 text-white sm:mt-0 sm:w-auto">
                <div className="hidden md:block">Prix total</div>
                <div className="flex justify-center text-3xl">
                  <span>{booking.price}€</span>
                </div>
              </div>
            </div>
            <PlaceGallery place={booking.place} />
          </div>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-semibold">Aucune donnée disponible</h1>
            <p className="text-gray-600">
              Nous n'avons pas pu trouver les détails de cette réservation.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default SingleBookedPlace;
