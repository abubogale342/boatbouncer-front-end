import { AddressAutofill } from "@mapbox/search-js-react";
import { AddressAutofillRetrieveResponse } from "@mapbox/search-js-core";

import { useState } from "react";
import { returnClass } from "@/components/shared/styles/input";
import { icons } from "@/components/shared/locationIcon";

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
    <div className="w-full">
      {process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN && (
        <AddressAutofill
          onRetrieve={handleRetrieve}
          accessToken={process.env.NEXT_PUBLIC_MAPBOX_API_TOKEN}
          options={{ country: "US" }}
          theme={{
            variables: {
              borderRadius: "8px",
              padding: "16px 40px 16px 24px",
            },
            icons: icons,
          }}
        >
          <div className="relative h-11">
            <input
              name={name}
              autoComplete="address-line1"
              value={searchVal}
              className={returnClass()[0]}
              placeholder=" "
              onBlur={onBlur}
              onChange={(event) => handleChange(event)}
            />
            <label className={returnClass()[1]}>Address</label>
          </div>
        </AddressAutofill>
      )}
    </div>
  );
};

export default SearchAutofill;
