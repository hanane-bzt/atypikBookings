// import React from 'react';
// import { TailSpin } from 'react-loader-spinner';

// const Spinner = () => {
//   return (
//     <div className="absolute inset-1/2 flex flex-col items-center justify-center">
//       <TailSpin
//         height={100}
//         width={200}
//         color="#f5385d"
//         radius="1"
//         visible={true}
//       />
//     </div>
//   );
// };

// export default Spinner;






import React from 'react';

const Spinner = () => {
  return (
    <div className="absolute inset-1/2 flex flex-col items-center justify-center">
      <div
        className="h-12 w-12 animate-spin rounded-full border-4 border-gray-300 border-t-[#f5385d]"
        role="status"
        aria-label="Chargement"
      ></div>
      <span className="mt-2 text-sm text-gray-500">Chargement...</span>
    </div>
  );
};

export default Spinner;
