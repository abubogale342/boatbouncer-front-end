import { AddressAutofill } from "@mapbox/search-js-react";
import { AddressAutofillRetrieveResponse } from "@mapbox/search-js-core";

import { useState } from "react";

const SearchAutofill = ({
  page,
  name,
  placeholder,
  onBlur,
  onChange,
  onUpdate,
  values,
  setValues,
}: {
  page?: string;
  name?: string;
  placeholder?: string;
  onBlur?: any;
  onChange?: any;
  onUpdate?: any;
  values?: any;
  setValues?: any;
}) => {
  const [searchVal, setSearchVal] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchVal(event.target.value);
  };

  const handleRetrieve = (res: AddressAutofillRetrieveResponse) => {
    const feature = res.features[0];
    let place_name = feature.properties.address_line1 ?? "";

    setValues({
      ...values,
      address: place_name,
      zipCode: feature.properties.postcode,
      city: feature.properties.address_level2,
      state: feature.properties.address_level1,
    });

    onUpdate("address", feature.properties.address_line1);
    onUpdate("zipCode", feature.properties.postcode);
    onUpdate("city", feature.properties.address_level2);
    onUpdate("state", feature.properties.address_level1);

    setSearchVal(place_name);
  };

  return (
    <>
      {process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN && (
        <div className="relative w-full">
          <AddressAutofill
            onRetrieve={handleRetrieve}
            accessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
            options={{ country: "US" }}
          >
            <input
              name={name}
              autoComplete="address-line1"
              value={searchVal}
              className="h-11 w-full rounded-lg border border-solid border-gray-300 pl-2 text-base text-gray-500 focus:border-sky-500  focus:outline-none focus:ring-sky-500"
              placeholder={placeholder}
              onBlur={onBlur}
              onChange={(event) => handleChange(event)}
            />
          </AddressAutofill>
        </div>
      )}
    </>
  );
};

export default SearchAutofill;
