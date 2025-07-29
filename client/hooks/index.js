// import { useState, useEffect, useContext } from 'react';
// import jwt_decode from 'jwt-decode';

// import { UserContext } from '@/providers/UserProvider';
// import { PlaceContext } from '@/providers/PlaceProvider';

// import { getItemFromLocalStorage, setItemsInLocalStorage, removeItemFromLocalStorage } from '@/utils';
// import axiosInstance from '@/utils/axios';

// // USER
// export const useAuth = () => {
//     return useContext(UserContext)
// }

// export const useProvideAuth = () => {
//     const [user, setUser] = useState(null)
//     const [loading, setLoading] = useState(true)

//     useEffect(() => {
//         const storedUser = getItemFromLocalStorage('user');
//         console.log("Stored user from localStorage:", storedUser);
//         if (storedUser) {
//             const parsedUser = JSON.parse(storedUser);
//             console.log("Parsed user:", parsedUser);
//             setUser(parsedUser);
//         }
//         setLoading(false);
//     }, []);

//     const register = async (formData) => {
//         const { name, email, password } = formData;

//         try {
//             const { data } = await axiosInstance.post('user/register', {
//                 name,
//                 email,
//                 password,
//             });
//             if (data.user && data.token) {
//                 setUser(data.user)
//                 // save user and token in local storage
//                 setItemsInLocalStorage('user', data.user)
//                 setItemsInLocalStorage('token', data.token)
//             }
//             return { success: true, message: 'Registration successfull' }
//         } catch (error) {
//             const { message } = error.response.data
//             return { success: false, message }
//         }
//     }

//     const login = async (formData) => {
//         const { email, password } = formData;

//         try {
//             const { data } = await axiosInstance.post('user/login', {
//                 email,
//                 password,
//             });

//             // Vérifiez que l'utilisateur et le token sont bien retournés
//         console.log("User data received: ", data.user);
//         console.log("Token received: ", data.token);

//             if (data.user && data.token) {
//                 console.log("Is Admin: ", data.user.isAdmin);
//                 setUser(data.user)
//                 // save user and token in local storage
//                 setItemsInLocalStorage('user', data.user)
//                 setItemsInLocalStorage('token', data.token)
//             }
//             return { success: true, message: 'Login successfull' }
//         } catch (error) {
//             const { message } = error.response.data
//             return { success: false, message }
//         }
//     }

//     const googleLogin = async (credential) => {
//         const decoded = jwt_decode(credential);
//         try {
//             const { data } = await axiosInstance.post('user/google/login', {
//                 name: `${decoded.given_name} ${decoded.family_name}`,
//                 email: decoded.email,
//             });
//             if (data.user && data.token) {
//                 setUser(data.user)
//                 // save user and token in local storage
//                 setItemsInLocalStorage('user', data.user)
//                 setItemsInLocalStorage('token', data.token)
//             }
//             return { success: true, message: 'Login successfull' }
//         } catch (error) {
//             return { success: false, message: error.message }
//         }
//     }

//     const logout = async () => {
//         try {
//             const { data } = await axiosInstance.get('/user/logout');
//             if (data.success) {
//                 setUser(null);

//                 // Clear user data and token from localStorage when logging out
//                 removeItemFromLocalStorage('user');
//                 removeItemFromLocalStorage('token');
//             }
//             return { success: true, message: 'Logout successfull' }
//         } catch (error) {
//             console.log(error)
//             return { success: false, message: 'Something went wrong!' }
//         }
//     }

//     const uploadPicture = async (picture) => {
//         try {
//             const formData = new FormData()
//             formData.append('picture', picture)
//             const { data } = await axiosInstance.post('/user/upload-picture', formData, {
//                 headers: { 'Content-Type': 'multipart/form-data' }
//             })
//             return data
//         } catch (error) {
//             console.log(error)
//         }
//     }

//     const updateUser = async (userDetails) => {
//         const { name, password, picture } = userDetails;
//         const email = JSON.parse(getItemFromLocalStorage('user')).email
//         try {
//             const { data } = await axiosInstance.put('/user/update-user', {
//                 name, password, email, picture
//             })
//             return data;
//         } catch (error) {
//             console.log(error)
//         }
//     }


//     return {
//         user,
//         setUser,
//         register,
//         login,
//         googleLogin,
//         logout,
//         loading,
//         uploadPicture,
//         updateUser
//     }
// }


// // PLACES
// export const usePlaces = () => {
//     return useContext(PlaceContext)
// }

// export const useProvidePlaces = (prefetched = []) => {
//   const [places, setPlaces] = useState(prefetched);
//   const [loading, setLoading] = useState(prefetched.length === 0);

//   useEffect(() => {
//     if (prefetched.length === 0) {
//       // on ne fait l’appel qu’en l’absence de données SSR
//       (async () => {
//         const { data } = await axiosInstance.get('/api/places');
//         setPlaces(data.places);
//         setLoading(false);
//       })();
//     }
//   }, []);

//   return { places, setPlaces, loading, setLoading };
// };

// client/src/hooks/index.js
import { useState, useEffect, useContext } from 'react';
import jwt_decode from 'jwt-decode';
import axiosInstance from '@/utils/axios';

import { UserContext } from '@/providers/UserProvider';
import { PlaceContext } from '@/providers/PlaceProvider';

import {
  getItemFromLocalStorage,
  setItemsInLocalStorage,
  removeItemFromLocalStorage,
} from '@/utils';

/* ----------------------------------------------------------------------- */
/*                                 USER                                    */
/* ----------------------------------------------------------------------- */

export const useAuth = () => useContext(UserContext);

export const useProvideAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ▶️  Hydrate l’utilisateur si présent en localStorage (uniquement client) */
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedUser = getItemFromLocalStorage('user');
      if (storedUser) setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  /* --- helpers internes ------------------------------------------------- */
  const saveSession = ({ user, token }) => {
    setUser(user);
    setItemsInLocalStorage('user', user);
    setItemsInLocalStorage('token', token);
  };

  /* --- actions ---------------------------------------------------------- */
  const register = async ({ name, email, password }) => {
    try {
      const { data } = await axiosInstance.post('/user/register', {
        name,
        email,
        password,
      });
      if (data.user && data.token) saveSession(data);
      return { success: true, message: 'Inscription réussie' };
    } catch (err) {
      return {
        success: false,
        message: err?.response?.data?.message || 'Erreur serveur',
      };
    }
  };

  const login = async ({ email, password }) => {
    try {
      const { data } = await axiosInstance.post('/user/login', {
        email,
        password,
      });
      if (data.user && data.token) saveSession(data);
      return { success: true, message: 'Connexion réussie' };
    } catch (err) {
      return {
        success: false,
        message: err?.response?.data?.message || 'Erreur serveur',
      };
    }
  };

  const googleLogin = async (credential) => {
    const decoded = jwt_decode(credential);
    try {
      const { data } = await axiosInstance.post('/user/google/login', {
        name: `${decoded.given_name} ${decoded.family_name}`,
        email: decoded.email,
      });
      if (data.user && data.token) saveSession(data);
      return { success: true, message: 'Connexion Google réussie' };
    } catch (err) {
      return { success: false, message: err.message };
    }
  };

  const logout = async () => {
    try {
      await axiosInstance.get('/user/logout');
    } catch {
      /* même si l’API répond mal on “wipe” la session locale */
    } finally {
      setUser(null);
      removeItemFromLocalStorage('user');
      removeItemFromLocalStorage('token');
      return { success: true, message: 'Déconnexion réussie' };
    }
  };

  const uploadPicture = async (picture) => {
    try {
      const formData = new FormData();
      formData.append('picture', picture);
      const { data } = await axiosInstance.post('/user/upload-picture', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  const updateUser = async ({ name, password, picture }) => {
    const email = JSON.parse(getItemFromLocalStorage('user') || '{}').email;
    try {
      const { data } = await axiosInstance.put('/user/update-user', {
        name,
        password,
        email,
        picture,
      });
      return data;
    } catch (err) {
      console.error(err);
      return null;
    }
  };

  return {
    user,
    setUser,
    register,
    login,
    googleLogin,
    logout,
    loading,
    uploadPicture,
    updateUser,
  };
};

/* ----------------------------------------------------------------------- */
/*                                PLACES                                   */
/* ----------------------------------------------------------------------- */

export const usePlaces = () => useContext(PlaceContext);

/**
 * @param {Array} prefetched  – données injectées côté serveur pour éviter
 *                             un 2ᵉ appel HTTP après l’hydratation.
 */
export const useProvidePlaces = (prefetched = []) => {
  const [places, setPlaces] = useState(prefetched);
  const [loading, setLoading] = useState(prefetched.length === 0);

  useEffect(() => {
    if (prefetched.length > 0) return; // déjà peuplé via SSR

    const fetchPlaces = async () => {
      try {
        const { data } = await axiosInstance.get('/api/places');
        setPlaces(data.places);
      } catch (err) {
        console.error('Erreur chargement places :', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaces();
  }, [prefetched.length]);

  return { places, setPlaces, loading, setLoading };
};
