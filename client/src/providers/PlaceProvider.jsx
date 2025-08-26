import { createContext } from 'react';
import { useProvidePlaces } from '../../hooks';

const initialState = {
  places: [],
  loading: true,
  setPlaces: () => {},
  setLoading: () => {},
};

export const PlaceContext = createContext(initialState);

export const PlaceProvider = ({ children, initialPlaces = [] }) => {
  const allPlaces = useProvidePlaces(initialPlaces); // 👈 on utilise la prop

  return (
    <PlaceContext.Provider value={allPlaces}>
      {children}
    </PlaceContext.Provider>
  );
};
