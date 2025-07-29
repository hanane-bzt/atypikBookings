// client/src/pages/PlacePage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet';

import axiosInstance from '@/utils/axios';
import Spinner from '@/components/ui/Spinner';
import AddressLink from '@/components/ui/AddressLink';
import BookingWidget from '@/components/ui/BookingWidget';
import PlaceGallery from '@/components/ui/PlaceGallery';
import PerksWidget from '@/components/ui/PerksWidget';

const isBrowser = typeof window !== 'undefined';       // <── détecte SSR / browser
const API_BASE_URL = import.meta.env.VITE_BASE_URL;

export default function PlacePage() {
  const { id } = useParams();

  /* ---------------- état ---------------- */
  const [place,   setPlace]   = useState(null);
  const [loading, setLoading] = useState(false);
  const [rating,  setRating]  = useState(0);
  const [comment, setComment] = useState('');
  const [reply,   setReply]   = useState({});
  const [replyVisible, setReplyVisible] = useState({});

  /* ----------- infos utilisateur -------- */
  const storedUser = isBrowser
    ? JSON.parse(window.localStorage.getItem('user') || 'null')
    : null;
  const userName = storedUser?.name || 'Utilisateur inconnu';
  const hasToken = isBrowser && window.localStorage.getItem('token');

  /* ------------- chargement place -------------- */
  useEffect(() => {
    if (!id) return;
    setLoading(true);

    (async () => {
      try {
        const { data } = await axiosInstance.get(`${API_BASE_URL}/api/places/${id}`);
        setPlace(data.place);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    })();
  }, [id]);

  /* -------------- avis & réponses -------------- */
  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!hasToken) return;

    try {
      const { data } = await axiosInstance.post(
        `${API_BASE_URL}/api/places/${id}/reviews`,
        { rating, comment },
        { headers: { Authorization: `Bearer ${hasToken}` } }
      );

      setPlace((prev) => ({
        ...prev,
        reviews: [...prev.reviews, data.data.at(-1)],
      }));
      setRating(0);
      setComment('');
    } catch (err) {
      console.error(err);
    }
  };

  const handleReplySubmit = async (reviewId) => {
    if (!hasToken) return;

    try {
      const { data } = await axiosInstance.post(
        `${API_BASE_URL}/api/places/${id}/reviews/${reviewId}/reply`,
        { comment: reply[reviewId], userName },
        { headers: { Authorization: `Bearer ${hasToken}` } }
      );

      setPlace((prev) => ({
        ...prev,
        reviews: prev.reviews.map((r) => (r._id === reviewId ? data.data : r)),
      }));
      setReply((p) => ({ ...p, [reviewId]: '' }));
      setReplyVisible((p) => ({ ...p, [reviewId]: false }));
    } catch (err) {
      console.error(err);
    }
  };

  /* -------------- rendering -------------- */
  if (loading) return <Spinner />;
  if (!place)  return null;

  return (
    <>
      {/* SEO */}
      <Helmet>
        <title>{place.title} - AtypikHouse</title>
        <meta
          name="description"
          content={`Découvrez ${place.title}, situé à ${place.address}. Hébergement unique pour un séjour inoubliable.`}
        />
        <meta property="og:title" content={place.title} />
        <meta
          property="og:description"
          content={`Réservez ${place.title} sur AtypikHouse. Parfait pour ${place.maxGuests} invités.`}
        />
        <meta property="og:url"  content={`https://votre-domaine.com/places/${id}`} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="mt-4 overflow-x-hidden px-8 pt-20">
        <h1 className="text-3xl">{place.title}</h1>

        <AddressLink placeAddress={place.address} />
        <PlaceGallery place={place} />

        <div className="mb-8 mt-8 grid grid-cols-1 gap-8 md:grid-cols-[2fr_1fr]">
          {/* description */}
          <div>
            <h2 className="my-4 text-2xl font-semibold">Description</h2>
            <p>{place.description}</p>
            <p className="mt-2">Capacité max : {place.maxGuests} personnes</p>
            <PerksWidget perks={place.perks} />
          </div>

          {/* réservation */}
          <BookingWidget place={place} />
        </div>

        {/* extraInfo */}
        <section className="-mx-8 border-t bg-white px-8 py-8">
          <h2 className="mt-4 text-2xl font-semibold">Informations supplémentaires</h2>
          <p className="mb-4 mt-2 text-sm leading-5 text-gray-700">{place.extraInfo}</p>
        </section>

        {/* avis */}
        <section className="mt-8">
          <h2 className="text-2xl font-semibold">Avis</h2>

          {/* liste avis + réponses */}
          <div className="mt-4">
            {place.reviews?.length ? (
              place.reviews.map((review) => (
                <div key={review._id} className="mb-4 rounded border p-4">
                  <div className="flex items-center">
                    <span className="font-semibold">
                      {review.user?.name || userName}
                    </span>
                    <span className="ml-4">Note : {review.rating} / 5</span>
                  </div>

                  <p>{review.comment}</p>

                  {review.replies?.map((rep) => (
                    <div key={rep._id} className="mt-4 ml-4 border-l-2 pl-4">
                      <span className="font-semibold">{rep.user?.name}</span> : {rep.comment}
                    </div>
                  ))}

                  {hasToken && (
                    <>
                      <button
                        className="mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                        onClick={() =>
                          setReplyVisible((p) => ({ ...p, [review._id]: !p[review._id] }))
                        }
                      >
                        Répondre
                      </button>

                      {replyVisible[review._id] && (
                        <form
                          className="mt-4"
                          onSubmit={(e) => {
                            e.preventDefault();
                            handleReplySubmit(review._id);
                          }}
                        >
                          <textarea
                            rows={2}
                            className="w-full rounded border p-2"
                            placeholder="Répondre à cet avis"
                            value={reply[review._id] || ''}
                            onChange={(e) =>
                              setReply((p) => ({ ...p, [review._id]: e.target.value }))
                          }
                          />
                          <button
                            type="submit"
                            className="mt-2 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
                          >
                            Envoyer
                          </button>
                        </form>
                      )}
                    </>
                  )}
                </div>
              ))
            ) : (
              <p>Aucun avis pour l’instant.</p>
            )}
          </div>

          {/* formulaire nouveau commentaire */}
          <h2 className="mt-8 text-2xl font-semibold">Laisser un avis</h2>
          {hasToken ? (
            <form onSubmit={handleReviewSubmit}>
              <label className="block font-semibold">
                Note
                <select
                  required
                  value={rating}
                  onChange={(e) => setRating(e.target.value)}
                  className="mt-1 block w-full rounded border p-2"
                >
                  <option value="">Sélectionnez une note</option>
                  {[1, 2, 3, 4, 5].map((n) => (
                    <option key={n} value={n}>{n} étoile{n > 1 && 's'}</option>
                  ))}
                </select>
              </label>

              <label className="mt-4 block font-semibold">
                Commentaire
                <textarea
                  required
                  rows={4}
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="mt-1 block w-full rounded border p-2"
                />
              </label>

              <button
                type="submit"
                className="mt-4 rounded bg-blue-500 px-4 py-2 text-white hover:bg-blue-700"
              >
                Envoyer
              </button>
            </form>
          ) : (
            <p className="italic">Veuillez vous connecter pour laisser un avis.</p>
          )}
        </section>
      </div>
    </>
  );
}
