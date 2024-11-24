import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Navigate, useParams } from 'react-router-dom';
import { Helmet } from 'react-helmet'; // Import pour le SEO

import AccountNav from '@/components/ui/AccountNav';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';

import PlacesPage from './PlacesPage';
import { useAuth } from '../../hooks';
import { LogOut, Mail, PenSquare, Text } from 'lucide-react';
import EditProfileDialog from '@/components/ui/EditProfileDialog';

const ProfilePage = () => {
  const auth = useAuth();
  const { user, logout } = auth;
  const [redirect, setRedirect] = useState(null);

  let { subpage } = useParams();
  if (!subpage) {
    subpage = 'profile';
  }

  const handleLogout = async () => {
    const response = await logout();
    if (response.success) {
      toast.success('Déconnexion réussie.');
      setRedirect('/');
    } else {
      toast.error('Erreur lors de la déconnexion. Veuillez réessayer.');
    }
  };

  if (!user && !redirect) {
    return <Navigate to={'/login'} />;
  }

  if (redirect) {
    return <Navigate to={redirect} />;
  }

  return (
    <>
      {/* SEO - Balises meta */}
      <Helmet>
        <title>Profil - AtypikHouse</title>
        <meta
          name="description"
          content="Gérez votre profil utilisateur sur AtypikHouse. Consultez vos informations personnelles et vos annonces."
        />
        <meta name="robots" content="index, follow" />
        <meta property="og:title" content="Profil - AtypikHouse" />
        <meta
          property="og:description"
          content="Accédez à votre espace personnel pour gérer vos informations et vos lieux sur AtypikHouse."
        />
        <meta property="og:url" content="https://votre-domaine.com/account/profile" />
        <meta property="og:type" content="website" />
      </Helmet>

      <div>
        <AccountNav />
        {subpage === 'profile' && (
          <div className="m-4 flex flex-col items-center gap-8 rounded-[10px] p-4 sm:h-1/5 sm:flex-row sm:items-stretch lg:gap-28 lg:pl-32 lg:pr-20">
            {/* Avatar */}
            <div className="flex h-40 w-40 justify-center rounded-full bg-gray-200 p-4 sm:h-72 sm:w-72 md:h-96 md:w-96">
              <Avatar>
                {user.picture ? (
                  <AvatarImage src={user.picture} />
                ) : (
                  <AvatarImage
                    src="https://res.cloudinary.com/rahul4019/image/upload/v1695133265/pngwing.com_zi4cre.png"
                    className="object-cover"
                  />
                )}
                <AvatarFallback>{user.name.slice(0, 1)}</AvatarFallback>
              </Avatar>
            </div>

            {/* Informations utilisateur */}
            <div className="flex grow flex-col items-center gap-10 sm:items-start sm:justify-around sm:gap-0">
              <div className="flex flex-col items-center gap-2 sm:items-start">
                <div className="flex items-center gap-2">
                  <Text height="18" width="18" />
                  <div className="text-xl">
                    <span>Nom : </span>
                    <span className="text-gray-600">{user.name}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Mail height="18" width="18" />
                  <div className="text-xl">
                    <span>Email : </span>
                    <span className="text-gray-600">{user.email}</span>
                  </div>
                </div>
              </div>

              {/* Boutons d'action */}
              <div className="flex w-full justify-around sm:justify-end sm:gap-5 md:gap-10">
                <EditProfileDialog />
                <Button variant="secondary" onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Déconnexion
                </Button>
              </div>
            </div>
          </div>
        )}
        {subpage === 'places' && <PlacesPage />}
      </div>
    </>
  );
};

export default ProfilePage;
