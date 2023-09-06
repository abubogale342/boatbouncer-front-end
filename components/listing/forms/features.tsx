import {
  updateAmenitiesList,
  updateCaptainedList,
  updateFeaturesList,
} from "features/boat/boatSlice";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { amenitiesLists, featureLists } from "./data";
import useFetcher from "@/lib/hooks/use-axios";
import { useEffect } from "react";

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
  const { fetchCategories, data } = useFetcher();

  const updateFeaturesLists = (key: string, value: boolean) => {
    dispatch(updateFeaturesList({ key, value }));
  };

  const updateAmenitiesLists = (key: string, value: boolean) => {
    dispatch(updateAmenitiesList({ key, value }));
  };

  const updateCaptainsLists = (key: string, value: boolean) => {
    dispatch(updateCaptainedList({ key, value }));
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

  const handleFeaturesChange = (checked: boolean) => {
    if (checked) {
      setValues({
        ...values,
        features: ["on"],
      });
    } else {
      if (boatInfo.features.length === 1) {
        setValues({
          ...values,
          features: [],
        });
      } else {
        setValues({
          ...values,
          features: ["on"],
        });
      }
    }
  };

  useEffect(() => {
    fetchCategories("/boat/categories");
  }, []);

  return (
    <div>
      <div className="pl-4">
        <p className="text-xl font-semibold text-gray-900">Features</p>
        <hr className="mb-6 mt-3 h-px border-0 bg-gray-200" />

        <div className="flex flex-row flex-wrap">
          {data?.boatFeaturesEnum.map((feature: string, index: number) => (
            <div
              className="flex flex-row items-center gap-2 rounded pb-2 pr-10"
              key={`${feature} ${index}`}
            >
              <input
                className="appearance-none focus:ring-0"
                type="checkbox"
                onBlur={handleBlur}
                name="features"
                id={`${feature} ${index}`}
                checked={boatInfo.features.includes(feature)}
                onChange={(event) => {
                  handleFeaturesChange(event.target.checked);
                  updateFeaturesLists(feature, event.target.checked);
                }}
              />
              <label
                className="text-sm font-medium text-gray-700"
                htmlFor={`${feature} ${index}`}
              >
                {feature}
              </label>
            </div>
          ))}
        </div>

        {errors.features && touched.features && (
          <p className="my-1 ml-1 text-sm text-orange-700">
            {errors.features as string}
          </p>
        )}
      </div>

      <div className="mt-2 pl-4 pr-4">
        <p className="text-xl font-semibold text-gray-900">Amenities</p>
        <hr className="mb-4 mt-2 h-px border-0 bg-gray-200" />
        <div className="flex flex-row flex-wrap">
          {amenitiesLists.map((amenity) => (
            <div
              className="mb-4 flex flex-row items-center gap-2 pr-10"
              key={amenity.id}
            >
              <input
                className="appearance-none focus:ring-0"
                type="checkbox"
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
                className="text-sm font-medium text-gray-700"
                htmlFor={amenity.id}
              >
                {amenity.id}
              </label>
            </div>
          ))}
        </div>

        {errors.amenities && touched.amenities && (
          <p className="my-1 ml-1 text-sm text-orange-700">
            {errors.amenities as string}
          </p>
        )}
      </div>

      <div className="pl-4 pr-4">
        <p className="text-xl font-semibold text-gray-900">Captained</p>
        <hr className="mb-4 mt-2 h-px border-0 bg-gray-200" />

        <div className="flex flex-row items-center gap-2 pb-4 pr-10">
          <input
            type="checkbox"
            className="appearance-none focus:ring-0"
            onBlur={handleBlur}
            id="captained"
            name="captained"
            checked={values.captained}
            onChange={(event) => {
              handleChange(event);
              updateCaptainsLists("captained", event.target.checked);
            }}
          />
          <label
            className="text-sm  font-medium text-gray-700"
            htmlFor="captained"
          >
            Captained
          </label>
        </div>

        {errors.captained && touched.captained && (
          <p className="ml-1 text-sm text-orange-700">
            {errors.captained as string}
          </p>
        )}
      </div>
    </div>
  );
};

export default FeatureForm;
