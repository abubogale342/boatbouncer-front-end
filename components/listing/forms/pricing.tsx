import { Formik } from "formik";
import { updateBasicInfoField } from "features/boat/boatSlice";
import { useSelector, useDispatch } from "react-redux";
import { useDebouncedCallback } from "use-debounce";
import { returnClass } from "@/components/shared/styles/input";

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
      <hr className="mb-6 mt-3 h-px border-0 bg-gray-200" />

      <div className="flex w-full flex-row">
        <div className="relative flex w-full flex-row gap-0">
          <input
            className={`${
              returnClass()[0]
            } rounded-e-none focus:rounded-e-none`}
            placeholder=" "
            onBlur={handleBlur}
            name="securityAllowance"
            value={values.securityAllowance}
            onChange={(event) => {
              handleChange(event);
              updateBasicFields(event.target.name, event.target.value);
            }}
          />
          <label className={returnClass()[1]}>Security Allowance</label>
        </div>
        <div className="relative w-24">
          <select
            className={`${
              returnClass()[0]
            } w-fit rounded-s-none focus:rounded-s-none`}
          >
            <option>USD</option>
            <option>EUR</option>
          </select>
          <label
            className={`${
              returnClass()[1]
            } rounded-s-none focus:rounded-s-none`}
          ></label>
        </div>
      </div>
      {errors.securityAllowance && touched.securityAllowance && (
        <p className="ml-1 text-sm text-orange-700">
          {errors.securityAllowance as string}
        </p>
      )}
    </div>
  );
};

export default PricingForm;
