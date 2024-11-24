import React, { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { GoogleLogin } from '@react-oauth/google';
import { Helmet } from 'react-helmet'; // Import pour le SEO

import ProfilePage from './ProfilePage';
import { useAuth } from '../../hooks';

const LoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [redirect, setRedirect] = useState(false);
  const auth = useAuth();

  const handleFormData = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const response = await auth.login(formData);
    if (response.success) {
      toast.success(response.message);
      setRedirect(true);
    } else {
      toast.error(response.message || 'Échec de la connexion. Veuillez réessayer.');
    }
  };

  const handleGoogleLogin = async (credential) => {
    const response = await auth.googleLogin(credential);
    if (response.success) {
      toast.success(response.message);
      setRedirect(true);
    } else {
      toast.error(response.message || 'Échec de la connexion avec Google.');
    }
  };

  if (redirect) {
    return <Navigate to={'/'} />;
  }

  if (auth.user) {
    return <ProfilePage />;
  }

  return (
    <>
      {/* Ajout des balises SEO */}
      <Helmet>
        <title>Connexion - AtypikHouse</title>
        <meta
          name="description"
          content="Connectez-vous à votre compte AtypikHouse pour gérer vos réservations et vos propriétés."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Connexion - AtypikHouse" />
        <meta
          property="og:description"
          content="Rejoignez la communauté AtypikHouse et accédez à votre espace personnel."
        />
        <meta property="og:url" content="https://votre-domaine.com/login" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div className="mt-4 flex grow items-center justify-around p-4 md:p-0">
        <div className="mb-40">
          <h1 className="mb-4 text-center text-4xl">Connexion</h1>
          <form className="mx-auto max-w-md" onSubmit={handleFormSubmit}>
            <input
              name="email"
              type="email"
              placeholder="Votre email"
              value={formData.email}
              onChange={handleFormData}
              required
              aria-label="Email"
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
            <button className="primary my-4" type="submit">
              Se connecter
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
            Pas encore de compte ?{' '}
            <Link className="text-black underline" to={'/register'}>
              Inscrivez-vous maintenant
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
