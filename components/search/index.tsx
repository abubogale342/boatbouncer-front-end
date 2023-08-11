import { useState } from "react";

import { icons } from "../shared/locationIcon";
import { SearchBox } from "@mapbox/search-js-react";
import { SearchBoxRetrieveResponse } from "@mapbox/search-js-core";
import { useRouter } from "next/router";

const Search = ({ page }: { page?: string }) => {
  const [searchVal, setSearchVal] = useState("");
  const router = useRouter();

  const handleChange = (value: string) => {
    setSearchVal(value);
  };

  const handleRetrieve = (res: SearchBoxRetrieveResponse) => {
    let query: any = {};

    const properties = res.features[0].properties;

    if (properties.feature_type == "place") {
      query.city = properties.name;
    } else if (properties.feature_type == "region") {
      query.state = properties.name;
    } else {
      if (properties.name) query.address = properties.name;
    }

    router.replace({
      pathname: "/search",
      query,
    });
  };

  return (
    <>
      {process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN && (
        <form
          className="flex w-full items-center"
          action={`/search?address=${searchVal}`}
          method="POST"
          id="searchForm"
        >
          <label htmlFor="voice-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <SearchBox
              accessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
              placeholder="Where would you like to travel ;)"
              onRetrieve={handleRetrieve}
              theme={{
                icons: icons,
                variables: {
                  padding: "0.75rem 1.75rem",
                  borderRadius: "8px",
                },
              }}
              options={{
                country: "US",
                language: "en",
                limit: 5,
              }}
              value={searchVal}
              onChange={handleChange}
            />
            <p className="absolute right-0 top-0 z-10 h-10 w-10 rounded-full"></p>
          </div>
          <button
            type="submit"
            disabled={!searchVal}
            className={`z-10 ${
              page == "home"
                ? "absolute bottom-1 right-1 rounded-lg bg-cyan-600 px-4 py-1 text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
