import { Formik } from "formik";
import { updateBasicInfoField } from "features/boat/boatSlice";
import { useSelector, useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce";

const PricingForm = ({
  values,
  errors,
  touched,
  handleChange,
  handleBlur,
}: {
  values: any;
  errors: any;
  touched: any;
  handleChange: any;
  handleBlur: any;
}) => {
  const boatInfo = useSelector((state: any) => state.boat.boatInfo);
  const dispatch = useDispatch();

  const updateBasicFields = useDebouncedCallback((key, value) => {
    dispatch(updateBasicInfoField({ key, value }));
  }, 500);

  return (
    <div className="mt-4 px-4">
      <p className="text-xl font-semibold text-gray-900">Set Pricing</p>
      <hr className="mb-4 mt-2 h-px border-0 bg-gray-200" />

      <div className="flex flex-col">
        <label className="mb-2 text-xs text-gray-700">Security Allowance</label>
        <div className="flex  flex-row gap-0">
          <input
            className="h-11 w-full rounded-s-lg border border-r-0 border-solid border-gray-300 pl-2 text-base text-gray-500 focus:border-sky-500  focus:outline-none focus:ring-sky-500"
            placeholder="security allowance"
            onBlur={handleBlur}
            name="securityAllowance"
            value={values.securityAllowance}
            onChange={(event) => {
              handleChange(event);
              updateBasicFields(event.target.name, event.target.value);
            }}
          />
          <select className="rounded-e-lg border border-l-0 border-solid border-gray-300 pl-2 text-base focus:border-sky-500  focus:outline-none focus:ring-sky-500">
            <option>USD</option>
            <option>EUR</option>
          </select>
        </div>
        {errors.securityAllowance && touched.securityAllowance && (
          <p className="text-red-500">{errors.securityAllowance as string}</p>
        )}
      </div>
    </div>
  );
};

export default PricingForm;
