import { SearchBox } from "@mapbox/search-js-react";
import { SearchBoxRetrieveResponse } from "@mapbox/search-js-core";

import { useState } from "react";

const Search = ({ page }: { page?: string }) => {
  const [searchVal, setSearchVal] = useState("");
  // const [feature, setFeature] = useState<string | undefined>();

  const handleChange = (value: string) => {
    setSearchVal(value);
  };

  const handleRetrieve = (res: SearchBoxRetrieveResponse) => {
    const feature = res.features[0];
    // setFeature(feature.properties.address);
    setSearchVal(feature.properties.address);
  };

  return (
    <>
      {process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN && (
        <form
          className="flex w-full items-center"
          action={`/search?query=${searchVal}`}
          method="POST"
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

            <SearchBox
              options={{ country: "us" }}
              theme={{
                variables: {
                  borderRadius: "8px",
                  padding: "16px 40px 16px 64px",
                },
              }}
              accessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
              onChange={handleChange}
              onRetrieve={handleRetrieve}
              value={searchVal}
            />
          </div>
          <button
            type="submit"
            className={`${
              page == "home"
                ? "absolute bottom-2 right-1 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                : "ml-2 inline-flex items-center rounded-lg border border-gray-200  px-3 py-2.5 text-sm font-medium text-gray-700 focus:outline-none"
            }`}
          >
            Search
          </button>
        </form>
      )}
    </>
  );
};

export default Search;
