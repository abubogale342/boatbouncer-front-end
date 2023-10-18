import { returnClass } from "@/components/shared/styles/input";
import {
  updateBasicInfoField,
  updateLocationField,
} from "features/boat/boatSlice";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

const AddressAutoFill = dynamic(async () => await import("./searchAutofill"), {
  suspense: true,
  ssr: false,
});

const BasicInfo = ({
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
  const dispatch = useDispatch();
  const currentDate = new Date();
  const year = currentDate.getFullYear();

  const updateBasicFields = useDebouncedCallback(
    (key: string, value: string) => {
      dispatch(updateBasicInfoField({ key, value }));
    },
    500,
  );

  const updateLocationFields = (key: string, value: string) => {
    dispatch(updateLocationField({ key, value }));
  };

  return (
    <div className="w-full px-4">
      <p className="text-xl font-semibold text-gray-900">Basic Information</p>
      <hr className="mb-6 mt-3 h-px border-0 bg-gray-200" />
      <div className="mb-8 flex flex-col items-center gap-6 sm:flex-row">
        <div className="relative h-11 w-full">
          <input
            className={returnClass(!!(errors.boatName && touched.boatName))[0]}
            placeholder=" "
            onBlur={handleBlur}
            name="boatName"
            type="text"
            value={values.boatName}
            onChange={(event) => {
              handleChange(event);
              updateBasicFields(event.target.name, event.target.value);
            }}
          />
          <label
            className={returnClass(!!(errors.boatName && touched.boatName))[1]}
          >
            Boat Name
          </label>
          {errors.boatName && touched.boatName && (
            <p className="ml-1 text-sm text-orange-700">
              {errors.boatName as string}
            </p>
          )}
        </div>

        {/* <div className="relative h-11 w-full">
          <input
            className={returnClass(!!(errors.boatType && touched.boatType))[0]}
            placeholder=" "
            onBlur={handleBlur}
            name="boatType"
            type="text"
            value={values.boatType}
            onChange={(event) => {
              handleChange(event);
              updateBasicFields(event.target.name, event.target.value);
            }}
          />
          <label
            className={returnClass(!!(errors.boatType && touched.boatType))[1]}
          >
            Boat Type
          </label>

          {errors.boatType && touched.boatType && (
            <p className="ml-1 text-sm text-orange-700">
              {errors.boatType as string}
            </p>
          )}
        </div> */}
      </div>

      <div className="mb-8 flex flex-col items-center gap-6 sm:flex-row">
        <div className="relative h-11 w-full">
          <input
            className={returnClass(!!(errors.model && touched.model))[0]}
            placeholder=" "
            type="text"
            onBlur={handleBlur}
            name="model"
            value={values.model}
            onChange={(event) => {
              handleChange(event);
              updateBasicFields(event.target.name, event.target.value);
            }}
          />
          <label className={returnClass(!!(errors.model && touched.model))[1]}>
            Model
          </label>
          {errors.model && touched.model && (
            <p className="ml-1 text-sm text-orange-700">
              {errors.model as string}
            </p>
          )}
        </div>
        <div className="relative h-11 w-full">
          <input
            className={returnClass(!!(errors.length && touched.length))[0]}
            placeholder=" "
            type="number"
            onBlur={handleBlur}
            name="length"
            value={values.length}
            onChange={(event) => {
              handleChange(event);
              updateBasicFields(event.target.name, event.target.value);
            }}
          />
          <label
            className={returnClass(!!(errors.length && touched.length))[1]}
          >
            Length (ft.)
          </label>
          {errors.length && touched.length && (
            <p className="ml-1 text-sm text-orange-700">
              {errors.length as string}
            </p>
          )}
        </div>
      </div>

      <div className="mb-8 flex flex-col items-center gap-6 sm:flex-row">
        <div className="relative h-11 w-full">
          <input
            className={returnClass(!!(errors.length && touched.length))[0]}
            placeholder=" "
            onBlur={handleBlur}
            name="manufacturer"
            value={values.manufacturer}
            onChange={(event) => {
              handleChange(event);
              updateBasicFields(event.target.name, event.target.value);
            }}
          />
          <label
            className={
              returnClass(!!(errors.manufacturer && touched.manufacturer))[1]
            }
          >
            Manufacturer
          </label>
          {errors.manufacturer && touched.manufacturer && (
            <p className="ml-1 text-sm text-orange-700">
              {errors.manufacturer as string}
            </p>
          )}
        </div>
        <div className="relative h-11 w-full">
          <input
            className={returnClass(!!(errors.year && touched.year))[0]}
            placeholder=" "
            onBlur={handleBlur}
            type="number"
            min={year - 150}
            max={year}
            name="year"
            value={values.year}
            onChange={(event) => {
              handleChange(event);
              updateBasicFields(event.target.name, event.target.value);
            }}
          />
          <label className={returnClass(!!(errors.year && touched.year))[1]}>
            Year
          </label>
          {errors.year && touched.year && (
            <p className="ml-1 text-sm text-orange-700">
              {errors.year as string}
            </p>
          )}
        </div>
      </div>

      <hr className="mb-8 mt-8 h-px border-0 bg-gray-200" />

      <div className="relative mb-6 w-full">
        <textarea
          className={`${
            returnClass(!!(errors.year && touched.year))[0]
          } description-text px-[14px] py-[10px]`}
          placeholder=" "
          onBlur={handleBlur}
          name="description"
          value={values.description}
          onChange={(event) => {
            handleChange(event);
            updateBasicFields(event.target.name, event.target.value);
          }}
          rows={5}
        />
        <label className={returnClass(!!(errors.year && touched.year))[1]}>
          Add description
        </label>
        {errors.description && touched.description && (
          <p className="ml-1 text-sm text-orange-700">
            {errors.description as string}
          </p>
        )}
      </div>

      <div className="mb-6 flex flex-col gap-6 sm:flex-row">
        <AddressAutoFill
          name="address"
          placeholder=" "
          onBlur={handleBlur}
          onChange={handleChange}
          onUpdate={updateLocationFields}
          values={values}
          value={values.address}
          setValues={setValues}
          errors={errors}
          touched={touched}
        />

        <div className="relative h-11 w-full">
          <input
            className={returnClass(!!(errors.year && touched.year))[0]}
            placeholder=" "
            onBlur={handleBlur}
            name="zipCode"
            value={values.zipCode}
            autoComplete="postal-code"
            onChange={(event) => {
              handleChange(event);
              updateLocationFields(event.target.name, event.target.value);
            }}
          />
          <label className={returnClass()[1]}>Zip Code</label>
        </div>
      </div>

      <div className="mb-6 flex flex-col gap-6 sm:flex-row">
        <div className="relative h-11 w-full">
          <input
            className={returnClass()[0]}
            placeholder=" "
            onBlur={handleBlur}
            name="city"
            autoComplete="address-level2"
            value={values.city}
            onChange={(event) => {
              handleChange(event);
              updateLocationFields(event.target.name, event.target.value);
            }}
          />
          <label className={returnClass()[1]}>City</label>
        </div>
        <div className="relative h-11 w-full">
          <input
            className={returnClass()[0]}
            placeholder=" "
            onBlur={handleBlur}
            autoComplete="address-level1"
            name="state"
            value={values.state}
            onChange={(event) => {
              handleChange(event);
              updateLocationFields(event.target.name, event.target.value);
            }}
          />
          <label className={returnClass()[1]}>State</label>
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
