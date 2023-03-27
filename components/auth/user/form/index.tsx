import React, { useState, useRef, useEffect } from "react";
import { formSchema } from "./schema";
import { Formik } from "formik";
import { motion } from "framer-motion";

type Props = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  type: String | null | undefined;
  initialValues: {
    email: string;
    password: string;
    userName: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
  };
};

function Form({ handleSubmit, type, initialValues }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [step, setStep] = useState(1);
  const userNameRef = useRef<HTMLInputElement>(null);

  // useEffect(() => {
  //   if (!userNameRef.current) return;
  //   userNameRef.current.focus();
  // }, []);

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={(values, { setSubmitting }) => {
        console.log(JSON.stringify(values, null, 2));
      }}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        handleSubmit,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          {step === 1 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-5 flex flex-col">
                <label htmlFor="usernameInput">User name</label>
                <input
                  ref={userNameRef}
                  name="userName"
                  className="w-full rounded-md"
                  type="text"
                  id="usernameInput"
                  placeholder="Enter your name"
                  onBlur={handleBlur}
                  value={values.userName}
                  onChange={handleChange}
                />
                <p className="text-red-500  ">
                  {errors.userName && touched.userName && errors.userName}
                </p>
              </div>
              <div className="mb-5 flex flex-col">
                <label htmlFor="firstnameInput">First name</label>
                <input
                  name="firstName"
                  className="rounded-md"
                  type="text"
                  id="firstnameInput"
                  placeholder="First name"
                  value={values.firstName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <p className="text-red-500  ">
                  {errors.firstName && touched.firstName && errors.firstName}
                </p>
              </div>
              <div className="mb-5 flex flex-col">
                <label htmlFor="lastnameInput">Last name</label>
                <input
                  name="lastName"
                  className="rounded-md"
                  type="text"
                  id="lastnameInput"
                  placeholder="Last name"
                  value={values.lastName}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <p className="text-red-500  ">
                  {errors.lastName && touched.lastName && errors.lastName}
                </p>
              </div>
              <div className="mb-5 flex flex-col justify-between gap-5 sm:flex-row">
                <div className="flex flex-col">
                  <label htmlFor="addressInput">Address</label>
                  <input
                    name="address"
                    className="rounded-md"
                    type="text"
                    id="addressInput"
                    placeholder="address"
                    value={values.address}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <p className="text-red-500  ">
                    {errors.address && touched.address && errors.address}
                  </p>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="cityInput">City</label>
                  <input
                    name="city"
                    className="rounded-md"
                    type="text"
                    id="cityInput"
                    placeholder="city"
                    value={values.city}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <p className="text-red-500  ">
                    {errors.city && touched.city && errors.city}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="mb-5 flex flex-col justify-between gap-5 sm:flex-row">
                <div className="flex flex-col">
                  <label htmlFor="stateInput">State</label>
                  <input
                    name="state"
                    className="rounded-md"
                    type="text"
                    id="stateInput"
                    placeholder="state"
                    value={values.state}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <p className="text-red-500  ">
                    {errors.state && touched.state && errors.state}
                  </p>
                </div>
                <div className="flex flex-col">
                  <label htmlFor="zipCodeInput">Zip code</label>
                  <input
                    name="zipCode"
                    className="rounded-md"
                    type="text"
                    id="zipCodeInput"
                    placeholder="zipCode"
                    value={values.zipCode}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <p className="text-red-500  ">
                    {errors.zipCode && touched.zipCode && errors.zipCode}
                  </p>
                </div>
              </div>
              <div className="mb-5 flex flex-col">
                <label htmlFor="phoneNumberInput">Phone number</label>
                <input
                  name="phoneNumber"
                  className="rounded-md"
                  type="tel"
                  id="phoneNumberInput"
                  placeholder="phone number"
                  value={values.phoneNumber}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <p className="text-red-500  ">
                  {errors.phoneNumber &&
                    touched.phoneNumber &&
                    errors.phoneNumber}
                </p>
              </div>
              <div className="mb-5 flex flex-col">
                <label htmlFor="emailInput">Email</label>
                <input
                  className="rounded-md"
                  name="email"
                  type="email"
                  id="emailInput"
                  placeholder="Enter your email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <p className="text-red-500  ">
                  {errors.email && touched.email && errors.email}
                </p>
              </div>
              <div className="flex flex-col">
                <label htmlFor="passwordInput" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="passwordInput"
                  className="rounded-md placeholder:text-3xl"
                  value={values.password}
                  placeholder="......."
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <p className="text-red-500  ">
                  {errors.password && touched.password && errors.password}
                </p>
              </div>
            </motion.div>
          )}
          {errorMessage && <div>{errorMessage}</div>}
          <div className="mt-6 flex flex-row gap-6">
            <button
              type="button"
              disabled={
                step === 1 ||
                !!errors.email ||
                !!errors.password ||
                !!errors.phoneNumber
              }
              onClick={() => setStep(1)}
              className={`w-full rounded-md py-1 text-center font-medium text-white ${
                step === 1 ||
                !!errors.email ||
                !!errors.password ||
                !!errors.phoneNumber
                  ? "bg-cyan-200"
                  : "bg-cyan-600"
              }`}
            >
              Prev
            </button>
            <button
              type="button"
              disabled={
                step === 2 ||
                !!errors.userName ||
                !!errors.firstName ||
                !!errors.lastName
              }
              onClick={() => setStep(2)}
              className={`w-full rounded-md ${
                step === 2 ||
                !!errors.userName ||
                !!errors.firstName ||
                !!errors.lastName
                  ? "bg-cyan-200"
                  : "bg-cyan-600"
              } py-1 text-center font-medium text-white`}
            >
              Next
            </button>
          </div>
          <motion.div
            className={`mt-6 rounded-md text-center ${
              Object.keys(errors).length > 0 ? "bg-cyan-200" : "bg-cyan-600"
            }`}
            initial={{ opacity: 0, scale: 0.5 }}
            whileHover={{ scale: Object.keys(errors).length > 0 ? 1 : 1.025 }}
            whileTap={{ scale: Object.keys(errors).length > 0 ? 1 : 0.75 }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
            transition={{ duration: 0.5 }}
          >
            <button
              type="submit"
              className={`w-full py-3 font-medium text-white`}
              disabled={Object.keys(errors).length > 0}
            >
              {type}
            </button>
          </motion.div>
        </form>
      )}
    </Formik>
  );
}

export default Form;
