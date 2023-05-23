import { AddressAutofill } from "@mapbox/search-js-react";
import { ChangeEvent, useState } from "react";

const Search = () => {
  const [searchVal, setSearchVal] = useState("");

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchVal(event.target.value);
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
            <AddressAutofill
              accessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
            >
              <input
                type="text"
                name="address"
                id="voice-search"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Where would you like to travel ;)"
                autoComplete="address-line2"
                onChange={handleChange}
                required
              />
            </AddressAutofill>
          </div>
          <button
            type="submit"
            className="ml-2 inline-flex items-center rounded-lg border border-gray-200  px-3 py-2.5 text-sm font-medium text-gray-700 focus:outline-none"
          >
            Search
          </button>
        </form>
      )}
    </>
  );
};

export default Search;
