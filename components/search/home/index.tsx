import { useEffect, useRef, useState } from "react";
import { icons } from "../../shared/locationIcon";
import { SearchBox } from "@mapbox/search-js-react";
import { SearchBoxRetrieveResponse } from "@mapbox/search-js-core";
import { useRouter } from "next/router";
import { SearchIcon } from "lucide-react";
import { SearchBoxRefType } from "@mapbox/search-js-react/dist/components/SearchBox";

const Search = ({ page }: { page?: string }) => {
  const [searchVal, setSearchVal] = useState("");
  const router = useRouter();

  const searchBoxRef = useRef<SearchBoxRefType>();

  const handleChange = (value: string) => setSearchVal(value);

  const handleRetrieve = (res: SearchBoxRetrieveResponse) => {
    let query: any = {};

    const properties = res.features[0].properties;

    if (!properties) return;

    if (properties.feature_type == "place") {
      query.city = properties.name;
      query.state = properties?.context?.region?.name;
    } else if (properties.feature_type == "region") {
      query.state = properties.name;
    } else if (properties.feature_type == "address") {
      query.city = properties?.context?.place?.name;
      query.state = properties?.context?.region?.name;
      query.address = properties.name;
    } else {
      query.address = properties.name;
    }

    if (properties.bbox) query.bbox = JSON.stringify(properties.bbox);
    if (properties.coordinates)
      query.coordinates = JSON.stringify(properties.coordinates);

    router.replace({
      pathname: "/search",
      query,
    });
  };

  useEffect(() => {
    const mapBoxSearchBox =
      document.getElementsByTagName("mapbox-search-box")[0];

    const searchBox = mapBoxSearchBox.firstElementChild;
    const searchInput = searchBox?.getElementsByTagName("input")[0];

    searchInput?.classList.add("mapbox-search-box");
    searchBox?.classList.add("mapbox-search-box");
  }, []);

  return (
    <>
      {process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN && (
        <form
          className="flex w-full items-center"
          action={`/search?address=${searchVal}`}
          method="POST"
          id="searchForm"
        >
          <label className="sr-only">Search</label>
          <div className="relative w-full">
            <SearchBox
              ref={searchBoxRef}
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
            type="button"
            disabled={!searchVal}
            onClick={() => {
              if (!searchBoxRef.current) return;
              searchBoxRef.current.search(searchVal);
            }}
            className={`z-10 hidden shadow-sm drop-shadow-sm md:block ${
              page == "home"
                ? "absolute bottom-1 right-1 h-12 rounded-3xl bg-cyan-600 px-6 py-1 text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                : "ml-2 inline-flex h-11 items-center rounded-lg border border-gray-200 px-3 text-sm font-medium text-gray-700 focus:outline-none"
            }`}
          >
            Search
          </button>
          <button
            type="button"
            disabled={!searchVal}
            onClick={() => {
              if (!searchBoxRef.current) return;
              searchBoxRef.current.search(searchVal);
            }}
            className={`z-10 shadow-sm drop-shadow-sm ${
              page == "home"
                ? "absolute bottom-1.5 right-2 h-11 rounded-full bg-cyan-600 px-2.5 py-1 text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 md:hidden"
                : "ml-2 inline-flex h-11 items-center rounded-lg border border-gray-200 px-3 text-sm font-medium text-gray-700 focus:outline-none"
            }`}
          >
            <SearchIcon />
          </button>
        </form>
      )}
    </>
  );
};

export default Search;
