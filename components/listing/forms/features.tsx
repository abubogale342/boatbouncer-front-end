import {
  updateAmenitiesList,
  updateFeaturesList,
} from "features/boat/boatSlice";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { amenitiesLists, featureLists } from "./data";

const FeatureForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
  setValues,
}: {
  values: any;
  errors: any;
  touched: any;
  handleChange: any;
  handleBlur: any;
  setValues: any;
}) => {
  const boatInfo = useSelector((state: any) => state.boat.boatInfo);
  const dispatch = useDispatch();

  const updateFeaturesLists = (key: string, value: boolean) => {
    dispatch(updateFeaturesList({ key, value }));
  };

  const updateAmenitiesLists = (key: string, value: boolean) => {
    dispatch(updateAmenitiesList({ key, value }));
  };

  const handleAnemitiesChange = (checked: boolean) => {
    if (checked) {
      setValues({
        ...values,
        amenities: ["on"],
      });
    } else {
      if (boatInfo.amenities.length === 1) {
        setValues({
          ...values,
          amenities: [],
        });
      } else {
        setValues({
          ...values,
          amenities: ["on"],
        });
      }
    }
  };

  return (
    <div>
      <div className="mt-10 pl-4">
        <p className="text-xl font-semibold text-gray-900">Features</p>
        <hr className="my-4 h-px border-0 bg-gray-200" />

        {featureLists.map((feature) => (
          <div
            className="flex flex-row items-center gap-2 pb-4 pr-10"
            key={feature.id}
          >
            <input
              type="checkbox"
              className="border border-solid border-gray-300 text-base text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-sky-500"
              onBlur={handleBlur}
              name="features"
              id={feature.id}
              checked={feature.id === boatInfo.features}
              onChange={(event) => {
                handleChange(event);
                updateFeaturesLists(feature.id, event.target.checked);
              }}
            />
            <label
              className="text-sm  font-medium text-gray-700"
              htmlFor={feature.id}
            >
              {feature.id}
            </label>
          </div>
        ))}

        {errors.features && touched.features && (
          <p className="text-red-500">{errors.features as string}</p>
        )}
      </div>

      <div className="mt-10 pr-4 pl-1">
        <p className="text-xl font-semibold text-gray-900">Amenities</p>
        <hr className="my-4 h-px border-0 bg-gray-200" />

        {amenitiesLists.map((amenity) => (
          <div
            className="flex flex-row items-center gap-2 pb-4 pr-10"
            key={amenity.id}
          >
            <input
              type="checkbox"
              className="border border-solid border-gray-300 text-base text-gray-500 focus:border-sky-500 focus:outline-none focus:ring-sky-500"
              onBlur={handleBlur}
              name="amenities"
              id={amenity.id}
              checked={boatInfo.amenities.includes(amenity.id)}
              onChange={(event) => {
                handleAnemitiesChange(event.target.checked);
                updateAmenitiesLists(amenity.id, event.target.checked);
              }}
            />
            <label
              className="text-sm  font-medium text-gray-700"
              htmlFor={amenity.id}
            >
              {amenity.id}
            </label>
          </div>
        ))}

        {errors.amenities && touched.amenities && (
          <p className="text-red-500">{errors.amenities as string}</p>
        )}
      </div>
    </div>
  );
};

export default FeatureForm;
