import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { Helmet } from 'react-helmet'; // Import pour le SEO

import { useAuth } from '../../hooks';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [redirect, setRedirect] = useState(false);
  const auth = useAuth();

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const response = await auth.register(formData);
    if (response.success) {
      toast.success('Inscription réussie ! Vous pouvez maintenant vous connecter.');
      setRedirect(true);
    } else {
      toast.error(response.message || "Erreur lors de l'inscription.");
    }
  };

  const handleGoogleLogin = async (credential) => {
    const response = await auth.googleLogin(credential);
    if (response.success) {
      toast.success('Connexion avec Google réussie.');
      setRedirect(true);
    } else {
      toast.error('Échec de la connexion avec Google.');
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <>
      {/* SEO - Balises meta */}
      <Helmet>
        <title>Inscription - AtypikHouse</title>
        <meta
          name="description"
          content="Créez un compte sur AtypikHouse pour réserver des hébergements uniques et gérer vos annonces."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Inscription - AtypikHouse" />
        <meta
          property="og:description"
          content="Rejoignez la communauté AtypikHouse et accédez à des hébergements uniques à louer ou à proposer."
        />
        <meta property="og:url" content="https://votre-domaine.com/register" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="mt-4 flex grow items-center justify-around p-4 md:p-0">
        <div className="mb-40">
          <h1 className="mb-4 text-center text-4xl">Inscription</h1>
          <form className="mx-auto max-w-md" onSubmit={handleFormSubmit}>
            <input
              name="name"
              type="text"
              placeholder="Nom complet"
              value={formData.name}
              onChange={handleFormData}
              required
              aria-label="Nom complet"
            />
            <input
              name="email"
              type="email"
              placeholder="votre@email.com"
              value={formData.email}
              onChange={handleFormData}
              required
              aria-label="Adresse email"
            />
            <input
              name="password"
              type="password"
              placeholder="Mot de passe"
              value={formData.password}
              onChange={handleFormData}
              required
              aria-label="Mot de passe"
            />
            <button className="primary my-2" type="submit">
              S'inscrire
            </button>
          </form>

          <div className="mb-4 flex w-full items-center gap-4">
            <div className="h-0 w-1/2 border-[1px]"></div>
            <p className="small -mt-1">ou</p>
            <div className="h-0 w-1/2 border-[1px]"></div>
          </div>

          {/* Bouton de connexion Google */}
          <div className="flex h-[50px] justify-center">
            <GoogleLogin
              onSuccess={(credentialResponse) => {
                handleGoogleLogin(credentialResponse.credential);
              }}
              onError={() => {
                toast.error('Échec de la connexion avec Google.');
              }}
              text="continue_with"
              width="350"
            />
          </div>

          <div className="py-2 text-center text-gray-500">
            Déjà membre ?{' '}
            <Link className="text-black underline" to={'/login'}>
              Connectez-vous ici
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default RegisterPage;
