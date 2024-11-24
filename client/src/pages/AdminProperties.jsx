import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet'; // Import pour le SEO

const AdminProperties = () => {
  const [places, setPlaces] = useState([]);
  const [editingPlaceId, setEditingPlaceId] = useState(null);
  const [editedPlace, setEditedPlace] = useState({});
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios
      .get(`${API_BASE_URL}/api/admin/places`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => setPlaces(response.data.data))
      .catch((error) => console.error('Erreur lors de la récupération des propriétés :', error));
  }, [API_BASE_URL]);

  const handleEditPlace = (place) => {
    setEditingPlaceId(place._id);
    setEditedPlace({ ...place });
  };

  const handleSavePlace = (placeId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir sauvegarder les modifications ?')) return;

    const token = localStorage.getItem('token');
    axios
      .put(`${API_BASE_URL}/api/admin/places/${placeId}`, editedPlace, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        setPlaces((prevPlaces) =>
          prevPlaces.map((place) =>
            place._id === placeId ? response.data.data : place
          )
        );
        setEditingPlaceId(null);
      })
      .catch((error) => console.error('Erreur lors de la sauvegarde :', error));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedPlace((prevPlace) => ({ ...prevPlace, [name]: value }));
  };

  const handleDeletePlace = (placeId) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer cette propriété ?')) return;

    const token = localStorage.getItem('token');
    axios
      .delete(`${API_BASE_URL}/api/admin/places/${placeId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setPlaces((prevPlaces) => prevPlaces.filter((place) => place._id !== placeId));
      })
      .catch((error) => console.error('Erreur lors de la suppression :', error));
  };

  return (
    <>
      {/* SEO - Balises meta */}
      <Helmet>
        <title>Gestion des Propriétés - AtypikHouse</title>
        <meta
          name="description"
          content="Gérez les propriétés disponibles sur AtypikHouse. Modifiez, ajoutez ou supprimez les propriétés facilement."
        />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>

      <div className="container mx-auto mt-8 p-4">
        <h2 className="text-2xl font-bold mb-4">Gestion des Propriétés</h2>

        {places.length > 0 ? (
          places.map((place) => (
            <div key={place._id} className="mb-8 p-4 border rounded">
              {editingPlaceId === place._id ? (
                <div>
                  <input
                    type="text"
                    name="title"
                    value={editedPlace.title}
                    onChange={handleInputChange}
                    className="p-2 border rounded mb-2 w-full"
                    placeholder="Titre"
                  />
                  <input
                    type="text"
                    name="address"
                    value={editedPlace.address}
                    onChange={handleInputChange}
                    className="p-2 border rounded mb-2 w-full"
                    placeholder="Adresse"
                  />
                  <textarea
                    name="description"
                    value={editedPlace.description}
                    onChange={handleInputChange}
                    className="p-2 border rounded mb-2 w-full"
                    placeholder="Description"
                  />
                  <input
                    type="number"
                    name="price"
                    value={editedPlace.price}
                    onChange={handleInputChange}
                    className="p-2 border rounded mb-2 w-full"
                    placeholder="Prix par nuit (€)"
                  />
                  <input
                    type="number"
                    name="maxGuests"
                    value={editedPlace.maxGuests}
                    onChange={handleInputChange}
                    className="p-2 border rounded mb-2 w-full"
                    placeholder="Nombre maximum d'invités"
                  />
                  <button
                    onClick={() => handleSavePlace(place._id)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-700 mr-2"
                  >
                    Enregistrer
                  </button>
                  <button
                    onClick={() => setEditingPlaceId(null)}
                    className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-700"
                  >
                    Annuler
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="text-xl font-semibold">{place.title}</h3>
                  <p>Adresse : {place.address}</p>
                  <p>Description : {place.description}</p>
                  <p>Prix : {place.price} € par nuit</p>
                  <p>Nombre maximum d'invités : {place.maxGuests}</p>
                  <button
                    onClick={() => handleEditPlace(place)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700 mr-2"
                  >
                    Modifier
                  </button>
                  <button
                    onClick={() => handleDeletePlace(place._id)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Supprimer
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p className="text-center">Aucune propriété disponible.</p>
        )}
      </div>
    </>
  );
};

export default AdminProperties;
