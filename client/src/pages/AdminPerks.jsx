import React, { useEffect, useState } from 'react';
import axios from 'axios';

const basePerks = [
  // Base perks avec icônes déjà configurées
  {
    name: 'wifi',
    icon: <i className="fas fa-wifi"></i>, // Exemple avec Font Awesome
  },
  {
    name: 'parking',
    icon: <i className="fas fa-parking"></i>,
  },
  {
    name: 'tv',
    icon: <i className="fas fa-tv"></i>,
  },
  {
    name: 'pets',
    icon: <i className="fas fa-paw"></i>,
  },
];

const AdminPerks = () => {
  const [perks, setPerks] = useState([]);
  const [newPerk, setNewPerk] = useState('');
  const API_BASE_URL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const token = localStorage.getItem('token');

    axios
      .get(`${API_BASE_URL}/api/admin/perks`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((response) => {
        const fetchedPerks = response.data.data;
        const perksWithIcons = fetchedPerks.map((perk) => {
          const foundPerk = basePerks.find((p) => p.name === perk.name);
          return foundPerk ? { ...perk, icon: foundPerk.icon } : perk;
        });
        setPerks(perksWithIcons);
      })
      .catch((error) => console.error('Erreur lors de la récupération des perks :', error));
  }, [API_BASE_URL]);

  const handleAddPerk = () => {
    if (!newPerk.trim()) {
      alert('Le nom du perk est obligatoire.');
      return;
    }

    const token = localStorage.getItem('token');

    axios
      .post(
        `${API_BASE_URL}/api/admin/perks`,
        { name: newPerk },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then((response) => {
        setPerks([...perks, { name: newPerk, icon: null }]);
        setNewPerk('');
      })
      .catch((error) => console.error('Erreur lors de l’ajout du perk :', error));
  };

  const handleDeletePerk = (perkName) => {
    if (!window.confirm('Êtes-vous sûr de vouloir supprimer ce perk ?')) {
      return;
    }

    const token = localStorage.getItem('token');

    axios
      .delete(`${API_BASE_URL}/api/admin/perks/${perkName}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => {
        setPerks(perks.filter((perk) => perk.name !== perkName));
      })
      .catch((error) => console.error('Erreur lors de la suppression du perk :', error));
  };

  return (
    <div className="container mx-auto mt-8 p-4">
      <h2 className="text-2xl font-bold mb-4">Gestion des Perks</h2>

      {/* Formulaire d'ajout de perk */}
      <div className="mb-4">
        <input
          type="text"
          placeholder="Nom du perk..."
          value={newPerk}
          onChange={(e) => setNewPerk(e.target.value)}
          className="p-2 border rounded mr-2"
        />
        <button
          onClick={handleAddPerk}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Ajouter
        </button>
      </div>

      {/* Liste des perks */}
      <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
        <thead>
          <tr>
            <th className="px-4 py-2 text-center">Nom</th>
            <th className="px-4 py-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {perks.length > 0 ? (
            perks.map((perk) => (
              <tr key={perk.name} className="border-t">
                <td className="px-4 py-2 text-center flex items-center justify-center">
                  {perk.icon && <span className="mr-2">{perk.icon}</span>}
                  <span>{perk.name}</span>
                </td>
                <td className="px-4 py-2 text-center">
                  <button
                    onClick={() => handleDeletePerk(perk.name)}
                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700"
                  >
                    Supprimer
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="2" className="px-4 py-2 text-center">
                Aucun perk disponible.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AdminPerks;
