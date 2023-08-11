import { Formik } from "formik";
import {
  updateBasicInfoField,
  updateCurrency,
  updatePricing,
  updateSecurityAllowance,
} from "features/boat/boatSlice";
import { useSelector, useDispatch } from "react-redux";
import { returnClass } from "@/components/shared/styles/input";
import { DollarSign, EuroIcon } from "lucide-react";

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

  const updatePricingCurrency = (value: string) => {
    dispatch(updateCurrency(value));
  };

  const updatePricingDetail = (
    type: string,
    action: boolean,
    value?: number,
    min?: number,
  ) => {
    dispatch(updatePricing({ type, action, value, min }));
  };

  return (
    <div className="mt-4 px-4">
      <p className="text-xl font-semibold text-gray-900">Set Pricing</p>
      <hr className="mb-6 mt-3 h-px border-0 bg-gray-200" />

      <div className="relative mb-8 w-full">
        <select
          id="currency"
          name="currency"
          className={returnClass()[0]}
          // defaultValue={values.currency}
          value={values.currency}
          onChange={(event) => {
            handleChange(event);
            updatePricingCurrency(event.target.value);
          }}
        >
          <option>Select Category</option>
          <option>USD</option>
          <option>EUR</option>
        </select>
        <label className={returnClass()[1]}>currency</label>
        {errors.currency && touched.currency && (
          <p className="ml-1 text-sm text-orange-700">
            {errors.currency as string}
          </p>
        )}
      </div>

      {["Per Hour", "Per Day", "Per Night"].map((perTime, index) => (
        <div className="mb-8 flex w-full flex-row items-end gap-6" key={index}>
          <div className="flex w-1/2 flex-col">
            <div className="flex flex-row items-center gap-2 pb-4 pr-10">
              <input
                id={perTime.split(" ").join("")}
                name={perTime.split(" ").join("")}
                type="checkbox"
                className="appearance-none focus:ring-0"
                onBlur={handleBlur}
                checked={
                  !!boatInfo.pricing.filter(
                    (value: any) => value.type === perTime,
                  )[0]
                }
                onChange={(event) => {
                  updatePricingDetail(perTime, event.target.checked);
                }}
              />
              <label
                className="text-sm  font-medium text-gray-700"
                htmlFor={perTime.split(" ").join("")}
              >
                {perTime}
              </label>
            </div>
            <div className="relative h-11 w-full">
              <div
                className={`text-blue-gray-500 absolute left-3 top-2/4 z-10 grid h-5 w-5 -translate-y-2/4 place-items-center ${
                  !!boatInfo.pricing.filter(
                    (value: any) => value.type === perTime,
                  )[0]
                    ? "opacity-70"
                    : "opacity-40"
                }`}
              >
                {values.currency === "USD" ? <DollarSign /> : <EuroIcon />}
              </div>
              <input
                disabled={
                  !boatInfo.pricing.filter(
                    (value: any) => value.type === perTime,
                  )[0]
                }
                type="number"
                id={`${perTime.split(" ").join("")}Price`}
                name={`${perTime.split(" ").join("")}Price`}
                onChange={(event) =>
                  updatePricingDetail(
                    perTime,
                    true,
                    Number(event.target.value),
                    boatInfo.pricing.filter(
                      (value: any) => value.type === perTime,
                    )[0]?.min,
                  )
                }
                value={
                  !!boatInfo.pricing.filter(
                    (value: any) => value.type === perTime,
                  )[0]
                    ? boatInfo.pricing.filter(
                        (value: any) => value.type === perTime,
                      )[0]?.value ?? ""
                    : ""
                }
                className={`${returnClass()[0]} pl-10 text-xl`}
                placeholder=" "
              />
              <label
                className={`${
                  returnClass()[1]
                } before:content[''] after:content[''] before:ml-0 before:mr-0 before:rounded-none after:ml-0 after:mr-0 after:rounded-none focus:rounded-s-none`}
              ></label>
            </div>
          </div>
          <div className="flex w-1/2 flex-col">
            <div className="flex flex-row items-center gap-2 pb-4 pr-10">
              Minimum
            </div>
            <div className="relative h-11 w-full">
              <input
                id={`${perTime.split(" ").join("")}Min`}
                name={`${perTime.split(" ").join("")}Min`}
                disabled={
                  !boatInfo.pricing.filter(
                    (value: any) => value.type === perTime,
                  )[0]
                }
                className={`${returnClass()[0]} text-xl`}
                onChange={(event) =>
                  updatePricingDetail(
                    perTime,
                    true,
                    boatInfo.pricing.filter(
                      (value: any) => value.type === perTime,
                    )[0]?.value,
                    Number(event.target.value),
                  )
                }
                value={
                  !!boatInfo.pricing.filter(
                    (value: any) => value.type === perTime,
                  )[0]
                    ? boatInfo.pricing.filter(
                        (value: any) => value.type === perTime,
                      )[0]?.min
                    : ""
                }
                type="number"
                min={1}
                placeholder=" "
              />
              <label
                className={`${
                  returnClass()[1]
                } before:content[''] after:content[''] before:ml-0 before:mr-0 before:rounded-none after:ml-0 after:mr-0 after:rounded-none focus:rounded-s-none`}
              ></label>
            </div>
          </div>
        </div>
      ))}

      {/* security allowance */}
      <div className="flex w-full flex-row">
        <div className="relative flex w-full flex-row gap-0">
          <input
            className={`${
              returnClass()[0]
            } rounded-e-none focus:rounded-e-none`}
            placeholder=" "
            type="number"
            onBlur={handleBlur}
            name="securityAllowance"
            value={values.securityAllowance}
            onChange={(event) => {
              handleChange(event);
              dispatch(updateSecurityAllowance(event.target.value));
            }}
          />
          <label className={`${returnClass()[1]}`}>Security Allowance</label>
        </div>
        <div className="relative w-24">
          <select
            id="currency"
            name="currency"
            className={`${
              returnClass()[0]
            } w-fit rounded-s-none before:rounded-none after:rounded-none focus:rounded-s-none`}
            defaultValue={values.currency}
          >
            <option>USD</option>
            <option>EUR</option>
          </select>
          <label
            className={`${
              returnClass()[1]
            } before:content[''] after:content[''] before:ml-0 before:mr-0 before:rounded-none after:ml-0 after:mr-0 after:rounded-none focus:rounded-s-none`}
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
