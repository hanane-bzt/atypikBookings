// // import { createContext } from 'react';

// // import { useProvidePlaces } from '../../hooks';

// // const initialState = {
// //   places: [],
// //   setPlaces: () => {},
// //   loading: true,
// //   setLoading: () => {},
// // };

// // export const PlaceContext = createContext(initialState);

// // export const PlaceProvider = ({ children }) => {
// //   const allPlaces = useProvidePlaces();

// //   return (
// //     <PlaceContext.Provider value={allPlaces}>{children}</PlaceContext.Provider>
// //   );
// // };

// import { createContext } from 'react';
// import { useProvidePlaces } from '../../hooks';

// const isBrowser = typeof window !== 'undefined';
// const initialState = {
//   /** 🟢 On récupère les données injectées par le SSR si présentes */
//   places   : isBrowser ? window.__INITIAL_DATA__?.places ?? [] : [],
//   loading  : false,
//   setPlaces: () => {},
//   setLoading: () => {}
// };

// export const PlaceContext = createContext(initialState);

// export const PlaceProvider = ({ children }) => {
//   const allPlaces = useProvidePlaces(initialState.places); // 👈 on passe le cache au hook
//   return (
//     <PlaceContext.Provider value={allPlaces}>
//       {children}
//     </PlaceContext.Provider>
//   );
// };
// import { createContext } from 'react';
// import { useProvidePlaces } from '../../hooks';

// const initialState = {
//   places: [],
//   loading: true,
//   setPlaces: () => {},
//   setLoading: () => {},
// };

// export const PlaceContext = createContext(initialState);

// export const PlaceProvider = ({ children, initialPlaces = [] }) => {
//   const allPlaces = useProvidePlaces(initialPlaces); // 👈 données injectées

//   return (
//     <PlaceContext.Provider value={allPlaces}>
//       {children}
//     </PlaceContext.Provider>
//   );
// };
import { createContext } from 'react';
import { useProvidePlaces } from '../../hooks';

const isBrowser = typeof window !== 'undefined';

// ⚠️ On récupère les places injectées par le SSR si on est dans le navigateur
const initialState = {
  places: isBrowser ? window.__INITIAL_DATA__?.places ?? [] : [],
  loading: false,
  setPlaces: () => {},
  setLoading: () => {},
};

export const PlaceContext = createContext(initialState);

export const PlaceProvider = ({ children }) => {
  const allPlaces = useProvidePlaces(initialState.places); // 👈 données injectées

  return (
    <PlaceContext.Provider value={allPlaces}>
      {children}
    </PlaceContext.Provider>
  );
};
