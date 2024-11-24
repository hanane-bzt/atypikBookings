import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet'; // Import pour le SEO

import axiosInstance from '@/utils/axios';

import AccountNav from '@/components/ui/AccountNav';
import Perks from '@/components/ui/Perks';
import PhotosUploader from '@/components/ui/PhotosUploader';
import Spinner from '@/components/ui/Spinner';

const PlacesFormPage = () => {
  const { id } = useParams();
  const [redirect, setRedirect] = useState(false);
  const [loading, setLoading] = useState(false);
  const [addedPhotos, setAddedPhotos] = useState([]);

  const [formData, setFormData] = useState({
    title: '',
    address: '',
    description: '',
    perks: [],
    extraInfo: '',
    checkIn: '',
    checkOut: '',
    maxGuests: 10,
    price: 500,
    type: '',
  });

  const {
    title,
    address,
    description,
    perks,
    extraInfo,
    maxGuests,
    price,
    type,
  } = formData;

  const isValidPlaceData = () => {
    if (title.trim() === '') {
      toast.error('Le titre ne peut pas être vide.');
      return false;
    } else if (address.trim() === '') {
      toast.error("L'adresse ne peut pas être vide.");
      return false;
    } else if (addedPhotos.length < 5) {
      toast.error('Veuillez ajouter au moins 5 photos.');
      return false;
    } else if (description.trim() === '') {
      toast.error('La description ne peut pas être vide.');
      return false;
    } else if (maxGuests < 1) {
      toast.error('Le nombre minimum de personnes doit être au moins de 1.');
      return false;
    }

    return true;
  };

  const handleFormData = (e) => {
    const { name, value, type } = e.target;
    if (type !== 'checkbox') {
      setFormData({ ...formData, [name]: value });
      return;
    }

    if (type === 'checkbox') {
      const currentPerks = [...perks];
      let updatedPerks = [];
      if (currentPerks.includes(name)) {
        updatedPerks = currentPerks.filter((perk) => perk !== name);
      } else {
        updatedPerks = [...currentPerks, name];
      }
      setFormData({ ...formData, perks: updatedPerks });
    }
  };

  useEffect(() => {
    if (!id) {
      return;
    }
    setLoading(true);
    axiosInstance.get(`/places/${id}`).then((response) => {
      const { place } = response.data;
      for (let key in formData) {
        if (place.hasOwnProperty(key)) {
          setFormData((prev) => ({
            ...prev,
            [key]: place[key],
          }));
        }
      }
      setAddedPhotos([...place.photos]);
      setLoading(false);
    });
  }, [id]);

  const preInput = (header, description) => (
    <>
      <h2 className="mt-4 text-2xl">{header}</h2>
      <p className="text-sm text-gray-500">{description}</p>
    </>
  );

  const savePlace = async (e) => {
    e.preventDefault();

    if (!isValidPlaceData()) return;

    const placeData = { ...formData, addedPhotos };
    if (id) {
      await axiosInstance.put('/places/update-place', { id, ...placeData });
    } else {
      await axiosInstance.post('/places/add-places', placeData);
    }
    toast.success('Le lieu a été enregistré avec succès.');
    setRedirect(true);
  };

  if (redirect) {
    return <Navigate to={'/account/places'} />;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      {/* SEO - Balises meta */}
      <Helmet>
        <title>
          {id ? 'Modifier le lieu' : 'Ajouter un nouveau lieu'} - AtypikHouse
        </title>
        <meta
          name="description"
          content={`${
            id ? 'Modifier les détails du lieu.' : 'Ajouter un nouveau lieu à votre compte.'
          }`}
        />
      </Helmet>

      <div className="p-4">
        <AccountNav />
        <form onSubmit={savePlace}>
          {preInput('Titre', 'Un titre accrocheur pour votre lieu.')}
          <input
            type="text"
            name="title"
            value={title}
            onChange={handleFormData}
            placeholder="Titre, par exemple : Mon charmant appartement"
          />

          {preInput('Adresse', "L'adresse de ce lieu")}
          <input
            type="text"
            name="address"
            value={address}
            onChange={handleFormData}
            placeholder="Adresse"
          />

          {preInput('Photos', 'Ajoutez plusieurs photos pour mieux présenter votre lieu.')}
          <PhotosUploader addedPhotos={addedPhotos} setAddedPhotos={setAddedPhotos} />

          {preInput('Description', 'Une description détaillée du lieu.')}
          <textarea
            value={description}
            name="description"
            onChange={handleFormData}
          />

          {preInput('Équipements', 'Sélectionnez tous les équipements disponibles.')}
          <Perks selected={perks} handleFormData={handleFormData} />

          {preInput('Informations supplémentaires', 'Règles de la maison, etc.')}
          <textarea
            value={extraInfo}
            name="extraInfo"
            onChange={handleFormData}
          />

          {preInput('Type de lieu', 'Sélectionnez le type de votre lieu.')}
          <select
            name="type"
            value={type}
            onChange={handleFormData}
            required
          >
            <option value="">Sélectionner un type</option>
            <option value="Treehouse">Cabane dans les arbres</option>
            <option value="Yurt">Yourte</option>
            <option value="Boat">Bateau</option>
            <option value="Cave">Grotte</option>
            <option value="Igloo">Igloo</option>
            <option value="Other">Autre</option>
          </select>

          {preInput(
            'Capacité et Prix',
            'Spécifiez la capacité maximale et le prix par nuit.'
          )}
          <div className="grid gap-2 sm:grid-cols-2 md:grid-cols-4">
            <div>
              <h3 className="-mb-1 mt-2">Capacité maximale</h3>
              <input
                type="number"
                name="maxGuests"
                value={maxGuests}
                onChange={handleFormData}
                placeholder="1"
                min="1"
              />
            </div>
            <div>
              <h3 className="-mb-1 mt-2">Prix par nuit (€)</h3>
              <input
                type="number"
                name="price"
                value={price}
                onChange={handleFormData}
                placeholder="500"
                min="1"
              />
            </div>
          </div>
          <button
            type="submit"
            className="mx-auto my-4 flex rounded-full bg-primary px-20 py-3 text-xl font-semibold text-white"
          >
            Enregistrer
          </button>
        </form>
      </div>
    </>
  );
};

export default PlacesFormPage;
