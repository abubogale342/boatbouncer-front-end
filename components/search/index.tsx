// import { AddressAutofill, AddressMinimap } from "@mapbox/search-js-react";
import {
  AddressAutofillRetrieveResponse,
  AddressAutofillFeatureSuggestion,
} from "@mapbox/search-js-core";

// import { ChangeEvent, useCallback, useState } from "react";

// const Search = ({ page }: { page?: string }) => {
//   const [searchVal, setSearchVal] = useState("");
//   const [showFormExpanded, setShowFormExpanded] = useState(false);
//   const [showMinimap, setShowMinimap] = useState(false);
//   const [feature, setFeature] = useState();

//   const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
//     setSearchVal(event.target.value);
//   };

//   const handleRetrieve = (res: AddressAutofillRetrieveResponse) => {
//     const feature = res.features[0];
//     console.log("feature", feature);
//   };

//   return (
//     <>
//       {process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN && (
//         <form
//           className="flex w-full items-center"
//           action={`/search?query=${searchVal}`}
//           method="POST"
//         >
//           <label htmlFor="voice-search" className="sr-only">
//             Search
//           </label>
//           <div className="relative w-full">
//             <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
//               <svg
//                 aria-hidden="true"
//                 className="h-5 w-5 text-gray-500 dark:text-gray-400"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//                 xmlns="http://www.w3.org/2000/svg"
//               >
//                 <path
//                   fillRule="evenodd"
//                   d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
//                   clipRule="evenodd"
//                 ></path>
//               </svg>
//             </div>
//             <AddressAutofill
//               accessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
//               onRetrieve={handleRetrieve}
//             >
//               <input
//                 type="text"
//                 name="address"
//                 id="voice-search"
//                 className={`${
//                   page == "home"
//                     ? "block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 pr-16 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                     : "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
//                 }`}
//                 placeholder="Where would you like to travel ;)"
//                 autoComplete="address-line2"
//                 value={searchVal}
//                 onChange={handleChange}
//                 required
//               />
//             </AddressAutofill>
//           </div>
//           <button
//             type="submit"
//             className={`${
//               page == "home"
//                 ? "absolute bottom-2.5 right-1 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                 : "ml-2 inline-flex items-center rounded-lg border border-gray-200  px-3 py-2.5 text-sm font-medium text-gray-700 focus:outline-none"
//             }`}
//           >
//             Search
//           </button>
//         </form>
//       )}
//     </>
//   );
// };

// export default Search;

import React, { useState, useCallback, useEffect } from "react";
import {
  AddressAutofill,
  AddressMinimap,
  useConfirmAddress,
  config,
} from "@mapbox/search-js-react";

export default function AutofillCheckoutDemo({ page }: { page: string }) {
  const [showFormExpanded, setShowFormExpanded] = useState(false);
  const [showMinimap, setShowMinimap] = useState(false);
  const [feature, setFeature] =
    useState<AddressAutofillFeatureSuggestion | null>();
  const [showValidationText, setShowValidationText] = useState(false);
  const [token, setToken] = useState("");
  const [value, setValue] = useState<string | undefined>("");

  useEffect(() => {
    const accessToken = process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN;
    if (!accessToken) return;
    setToken(accessToken);
    config.accessToken = accessToken;
  }, []);

  const { formRef, showConfirm } = useConfirmAddress({
    minimap: true,
    skipConfirmModal: (feature) =>
      ["exact", "high"].includes(feature.properties.match_code.confidence),
  });

  const handleChange = (value: string | undefined) => {
    setValue(value);
  };

  const handleRetrieve = useCallback(
    (res: AddressAutofillRetrieveResponse) => {
      const feature = res.features[0];
      console.log("feature", feature);
      setFeature(feature);
      setShowMinimap(true);
      setShowFormExpanded(true);
    },
    [setFeature, setShowMinimap],
  );

  const handleSubmit = useCallback(
    async (e: React.SyntheticEvent) => {
      e.preventDefault();
    },
    [showConfirm],
  );

  return (
    <>
      <form
        ref={formRef}
        className="flex w-full items-center"
        onSubmit={handleSubmit}
      >
        <label htmlFor="voice-search" className="sr-only">
          Search
        </label>
        <div className="relative w-full">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <svg
              aria-hidden="true"
              className="h-5 w-5 text-gray-500 dark:text-gray-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></path>
            </svg>
          </div>
          <AddressAutofill
            options={{ country: "us" }}
            accessToken={token}
            onRetrieve={handleRetrieve}
          >
            <input
              type="text"
              name="address"
              id="mapbox-autofill"
              className={`${
                page == "home"
                  ? "block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 pr-16 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                  : "block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              }`}
              placeholder="Where would you like to travel ;)"
              autoComplete="address-line2"
              required
            />
          </AddressAutofill>
        </div>
        <button
          type="submit"
          className={`${
            page == "home"
              ? "absolute bottom-2.5 right-1 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              : "ml-2 inline-flex items-center rounded-lg border border-gray-200  px-3 py-2.5 text-sm font-medium text-gray-700 focus:outline-none"
          }`}
        >
          Search
        </button>
      </form>
    </>
  );
}
