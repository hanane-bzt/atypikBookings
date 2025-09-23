
import { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Slide, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Layout from './components/ui/Layout';
import IndexPage from './pages/IndexPage';
import RegisterPage from './pages/RegisterPage';
import OwnerBenefitsPage from './pages/OwnerBenefitsPage';
import LoginPage from './pages/LoginPage';
import ProfilePage from './pages/ProfilePage';
import PlacesPage from './pages/PlacesPage';
import AllPlacesPage from './pages/AllPlacesPage';
import BookingsPage from './pages/BookingsPage';
import PlacesFormPage from './pages/PlacesFormPage';
import PlacePage from './pages/PlacePage';
import SingleBookedPlace from './pages/SingleBookedPlace';
import NotFoundPage from './pages/NotFoundPage';
import LegalPage from './pages/LegalPage';

import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminEquipments from './pages/AdminPerks';
import AdminProperties from './pages/AdminProperties';
import AdminComments from './pages/AdminComments';

import axiosInstance from './utils/axios';
import { UserProvider } from './providers/UserProvider';
import { PlaceProvider } from './providers/PlaceProvider';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { getItemFromLocalStorage } from './utils';
import ProtectedAdminRoute from './components/ui/ProtectedAdminRoute';

function App({ initialPlaces = [], initialUser = null, initialBookings = [], initialPerks = [] }) {
  const location = useLocation();

  // 🔄 Si SSR n’a pas injecté les données, on tente de récupérer côté client
  useEffect(() => {
    if (typeof window !== 'undefined') {
      axiosInstance.defaults.headers.common['Authorization'] =
        `Bearer ${getItemFromLocalStorage('token')}`;
    }
  }, []);

  return (
    <GoogleOAuthProvider clientId={import.meta.env.VITE_GOOGLE_CLIENT_ID}>
      <UserProvider initialUser={initialUser}>
        <PlaceProvider initialPlaces={initialPlaces}>
          <Routes location={location}>
            <Route path="/" element={<Layout />}>
              <Route index element={<IndexPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route path="/places" element={<AllPlacesPage />} />
              <Route path="/account" element={<ProfilePage />} />
              <Route path="/account/places" element={<PlacesPage />} />
              <Route path="/account/places/new" element={<PlacesFormPage />} />
              <Route path="/account/places/:id" element={<PlacesFormPage />} />
              <Route path="/place/:id" element={<PlacePage />} />
              <Route path="/account/bookings" element={<BookingsPage />} />
              <Route path="/OwnerBenefitsPage" element={<OwnerBenefitsPage />} />
              <Route path="/legal" element={<LegalPage />} />
              <Route
                path="/account/bookings/:id"
                element={<SingleBookedPlace />}
              />
              <Route path="/admin/dashboard" element={<ProtectedAdminRoute><AdminDashboard /></ProtectedAdminRoute>} />
              <Route path="/admin/users" element={<ProtectedAdminRoute><AdminUsers /></ProtectedAdminRoute>} />
              <Route path="/admin/equipments" element={<ProtectedAdminRoute><AdminEquipments /></ProtectedAdminRoute>} />
              <Route path="/admin/properties" element={<ProtectedAdminRoute><AdminProperties /></ProtectedAdminRoute>} />
              <Route path="/admin/comments" element={<ProtectedAdminRoute><AdminComments /></ProtectedAdminRoute>} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
          <ToastContainer autoClose={2000} transition={Slide} />
        </PlaceProvider>
      </UserProvider>
    </GoogleOAuthProvider>
  );
}

export default App;
