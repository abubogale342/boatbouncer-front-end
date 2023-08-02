import {
  updateBasicInfoField,
  updateLocationField,
} from "features/boat/boatSlice";
import dynamic from "next/dynamic";
import { useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

const AddressAutoFill = dynamic(() => import("./searchAutofill"), {
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

  const updateBasicFields = useDebouncedCallback((key, value) => {
    dispatch(updateBasicInfoField({ key, value }));
  }, 500);

  const updateLocationFields = (key: string, value: string) => {
    dispatch(updateLocationField({ key, value }));
  };

  return (
    <div className="mt-6 px-4 lg:w-2/3">
      <p className="text-xl font-semibold text-gray-900">Basic Information</p>
      <hr className="mb-6 mt-3 h-px border-0 bg-gray-200" />
      <div className="mb-4 flex flex-col gap-6 sm:flex-row">
        <div className="flex w-full flex-col">
          <label className="mb-2 text-xs text-gray-700">Boat Name</label>
          {/* border bg-white shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] rounded-lg border-solid border-[#D0D5DD] */}
          <input
            className="h-11 rounded-lg border border-solid border-gray-300 pl-2 text-base text-gray-500 shadow-[0px_1px_2px_0px_rgba(16,24,40,0.05)] focus:border-sky-500  focus:outline-none focus:ring-sky-500"
            placeholder="boatName"
            onBlur={handleBlur}
            name="boatName"
            type="text"
            value={values.boatName}
            onChange={(event) => {
              handleChange(event);
              updateBasicFields(event.target.name, event.target.value);
            }}
          />
          {errors.boatName && touched.boatName && (
            <p className="ml-1 text-sm text-orange-700">
              {errors.boatName as string}
            </p>
          )}
        </div>
        <div className="flex w-full flex-col">
          <label className="mb-2 text-xs text-gray-700">Boat Type</label>
          <input
            className="h-11 rounded-lg border border-solid border-gray-300 pl-2 text-base text-gray-500 focus:border-sky-500  focus:outline-none focus:ring-sky-500"
            placeholder="boat type"
            onBlur={handleBlur}
            name="boatType"
            type="text"
            value={values.boatType}
            onChange={(event) => {
              handleChange(event);
              updateBasicFields(event.target.name, event.target.value);
            }}
          />
          {errors.boatType && touched.boatType && (
            <p className="ml-1 text-sm text-orange-700">
              {errors.boatType as string}
            </p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-6 sm:flex-row">
        <div className="flex w-full flex-col">
          <label className="mb-2 text-xs text-gray-700">Model</label>
          <input
            className="h-11 rounded-lg border border-solid border-gray-300 pl-2 text-base text-gray-500 focus:border-sky-500  focus:outline-none focus:ring-sky-500"
            placeholder="Model"
            type="text"
            onBlur={handleBlur}
            name="model"
            value={values.model}
            onChange={(event) => {
              handleChange(event);
              updateBasicFields(event.target.name, event.target.value);
            }}
          />
          {errors.model && touched.model && (
            <p className="ml-1 text-sm text-orange-700">
              {errors.model as string}
            </p>
          )}
        </div>
        <div className="flex w-full flex-col">
          <label className="mb-2 text-xs text-gray-700">Length (ft.)</label>
          <input
            className="h-11 rounded-lg border border-solid border-gray-300 pl-2 text-base text-gray-500 focus:border-sky-500  focus:outline-none focus:ring-sky-500"
            placeholder="length"
            type="number"
            onBlur={handleBlur}
            name="length"
            value={values.length}
            onChange={(event) => {
              handleChange(event);
              updateBasicFields(event.target.name, event.target.value);
            }}
          />
          {errors.length && touched.length && (
            <p className="ml-1 text-sm text-orange-700">
              {errors.length as string}
            </p>
          )}
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-6 sm:flex-row">
        <div className="flex w-full flex-col">
          <label className="mb-2 text-xs text-gray-700">Manufacturer</label>
          <input
            className="h-11 rounded-lg border border-solid border-gray-300 pl-2 text-base text-gray-500 focus:border-sky-500  focus:outline-none focus:ring-sky-500"
            placeholder="Manufacturer"
            onBlur={handleBlur}
            name="manufacturer"
            value={values.manufacturer}
            onChange={(event) => {
              handleChange(event);
              updateBasicFields(event.target.name, event.target.value);
            }}
          />
          {errors.manufacturer && touched.manufacturer && (
            <p className="ml-1 text-sm text-orange-700">
              {errors.manufacturer as string}
            </p>
          )}
        </div>
        <div className="flex w-full flex-col">
          <label className="mb-2 text-xs text-gray-700">Year</label>
          <input
            className="h-11 rounded-lg border border-solid border-gray-300 pl-2 text-base text-gray-500 focus:border-sky-500  focus:outline-none focus:ring-sky-500"
            placeholder="Year"
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
          {errors.year && touched.year && (
            <p className="ml-1 text-sm text-orange-700">
              {errors.year as string}
            </p>
          )}
        </div>
      </div>
      <hr className="my-6 h-px border-0 bg-gray-200" />
      <div className="flex w-full flex-col">
        <label className="mb-2 text-sm font-medium text-gray-700">
          Description
        </label>
        <textarea
          className="mb-4 rounded-lg border border-solid border-gray-300 pl-2 text-base text-gray-500 focus:border-sky-500  focus:outline-none focus:ring-sky-500"
          placeholder="Enter a description"
          onBlur={handleBlur}
          name="description"
          value={values.description}
          onChange={(event) => {
            handleChange(event);
            updateBasicFields(event.target.name, event.target.value);
          }}
          rows={5}
        />
        {errors.description && touched.description && (
          <p className="ml-1 text-sm text-orange-700">
            {errors.description as string}
          </p>
        )}
      </div>
      <div className="mt-4 flex flex-col gap-6 sm:flex-row">
        <div className="flex w-full flex-col">
          <label className="mb-2 text-xs text-gray-700">Address</label>
          <AddressAutoFill
            name="Address"
            placeholder="Address"
            onBlur={handleBlur}
            onChange={handleChange}
            onUpdate={updateLocationFields}
            values={values}
            setValues={setValues}
          />
        </div>
        <div className="flex w-full flex-col">
          <label className="mb-2 text-xs text-gray-700">Zip Code</label>
          <input
            className="h-11 rounded-lg border border-solid border-gray-300 pl-2 text-base text-gray-500 focus:border-sky-500  focus:outline-none focus:ring-sky-500"
            placeholder="Zip Code"
            onBlur={handleBlur}
            name="zipCode"
            value={values.zipCode}
            autoComplete="postal-code"
            onChange={(event) => {
              handleChange(event);
              updateLocationFields(event.target.name, event.target.value);
            }}
          />
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-6 sm:flex-row">
        <div className="flex w-full flex-col">
          <label className="mb-2 text-xs text-gray-700">City</label>
          <input
            className="h-11 rounded-lg border border-solid border-gray-300 pl-2 text-base text-gray-500 focus:border-sky-500  focus:outline-none focus:ring-sky-500"
            placeholder="City"
            onBlur={handleBlur}
            name="city"
            autoComplete="address-level2"
            value={values.city}
            onChange={(event) => {
              handleChange(event);
              updateLocationFields(event.target.name, event.target.value);
            }}
          />
        </div>
        <div className="flex w-full flex-col">
          <label className="mb-2 text-xs text-gray-700">State</label>
          <input
            className="h-11 rounded-lg border border-solid border-gray-300 pl-2 text-base text-gray-500 focus:border-sky-500  focus:outline-none focus:ring-sky-500"
            placeholder="State"
            onBlur={handleBlur}
            autoComplete="address-level1"
            name="state"
            value={values.state}
            onChange={(event) => {
              handleChange(event);
              updateLocationFields(event.target.name, event.target.value);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BasicInfo;
