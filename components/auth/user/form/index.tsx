import React, { useState } from "react";
import { formSchema } from "./schema";
import { Formik } from "formik";
import { motion } from "framer-motion";
import { poster } from "@/lib/utils";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "@/lib/config";
import Router from "next/router";

export const setupRecaptcha = (cb: any) => {
  const recaptcha = new RecaptchaVerifier(
    "recaptcha-container",
    {
      callback: cb,
    },
    auth,
  );

  recaptcha.render();
};

type Props = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  type: String | null | undefined;
  initialValues: {
    email: string;
    newPassword: string;
    confirmPassword: string;
    userName: string;
    firstName: string;
    lastName: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    phoneNumber: string;
  };
  page: String | null | undefined;
};

function Form({ handleSubmit, type, initialValues, page }: Props) {
  const [step, setStep] = useState(1);
  // const { executeRecaptcha } = useGoogleReCaptcha();
  const [errorMessage, setErrorMessage] = useState("");

  const recaptchAfterValidation = async (res: any, credentials: any) => {
    const createdAccount = await poster("user/createAccount", credentials);

    if (createdAccount.code) {
      setErrorMessage(
        createdAccount.response.data?.message ||
          createdAccount.response.data?.errors[0]?.msg,
      );
    } else {
      setErrorMessage("");
      try {
        const phoneNumberRes = await poster("user/sendSms", {
          phoneNumber: credentials.phoneNumber,
          recaptchaToken: res,
        });

        Router.push({
          pathname: "/user/verify",
          query: { ...credentials },
        });
      } catch (error) {
        setErrorMessage("Too many attempts, try later.");
      }
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={formSchema}
      onSubmit={async (values, { setSubmitting }) => {
        let finalValues = Object.assign(
          {},
          {
            firstName: values.firstName,
            lastName: values.lastName,
            userName: values.userName,
            address: values.address,
            phoneNumber: values.phoneNumber,
            state: values.state,
            city: values.city,
            email: values.email,
            zipCode: values.zipCode,
            password: values.confirmPassword,
          },
        );

        if (page === "update") {
        } else if (page === "register") {
          try {
            await setupRecaptcha((args: any) => {
              recaptchAfterValidation(args, finalValues);
            });
          } catch (error) {
            setErrorMessage("error occured, please try again!");
          }
        }
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
        <form onSubmit={handleSubmit} onChange={() => setErrorMessage("")}>
          {step === 1 && (
            <motion.div>
              <div className="mb-5 flex flex-col">
                <label
                  htmlFor="usernameInput"
                  className={`${page === "register" ? "hidden" : ""}`}
                >
                  User name
                </label>
                <input
                  name="userName"
                  className="w-full rounded-md"
                  type="text"
                  id="usernameInput"
                  placeholder="Enter your username"
                  onBlur={handleBlur}
                  value={values.userName}
                  onChange={handleChange}
                />

                {errors.userName && touched.userName && (
                  <p className="text-red-500">{errors.userName}</p>
                )}
              </div>
              <div className="mb-5 grid grid-cols-2">
                <div className="mr-2 flex flex-col">
                  <label
                    htmlFor="firstnameInput"
                    className={`${page === "register" ? "hidden" : ""}`}
                  >
                    First name
                  </label>
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

                  {errors.firstName && touched.firstName && (
                    <p className="text-red-500">{errors.firstName}</p>
                  )}
                </div>
                <div className="ml-2 flex flex-col">
                  <label
                    htmlFor="lastnameInput"
                    className={`${page === "register" ? "hidden" : ""}`}
                  >
                    Last name
                  </label>
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

                  {errors.lastName && touched.lastName && (
                    <p className="text-red-500">{errors.lastName}</p>
                  )}
                </div>
              </div>
              <div className="mb-5 flex flex-col">
                <label
                  htmlFor="phoneNumberInput"
                  className={`${page === "register" ? "hidden" : ""}`}
                >
                  Phone number
                </label>
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

                {errors.phoneNumber && touched.phoneNumber && (
                  <p className="text-red-500">{errors.phoneNumber}</p>
                )}
              </div>
              <div className="mb-5 flex flex-col">
                <label
                  htmlFor="emailInput"
                  className={`${page === "register" ? "hidden" : ""}`}
                >
                  Email
                </label>
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

                {errors.email && touched.email && (
                  <p className="text-red-500">{errors.email}</p>
                )}
              </div>

              <div className="mb-5 grid grid-cols-2">
                <div className="mr-2 flex flex-col">
                  <label
                    htmlFor="passwordInput"
                    className={`${page == "register" ? "hidden" : ""}`}
                  >
                    {page === "update" ? "New Password" : "Password"}
                  </label>
                  <input
                    type="password"
                    name="newPassword"
                    id="newPasswordInput"
                    className="rounded-md"
                    value={values.newPassword}
                    placeholder={`${
                      page === "update" ? "New Password" : "Password"
                    }`}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />

                  {errors.newPassword && touched.newPassword && (
                    <p className="text-red-500  ">{errors.newPassword}</p>
                  )}
                </div>
                <div className="ml-2 flex flex-col">
                  <label
                    htmlFor="passwordInput"
                    className={`${page == "register" ? "hidden" : ""}`}
                  >
                    {page === "update" ? "Confirm Password" : "Retype Password"}
                  </label>
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPasswordInput"
                    className="rounded-md"
                    value={values.confirmPassword}
                    placeholder={`confirm password`}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />

                  {!errors.newPassword &&
                    errors.confirmPassword &&
                    touched.confirmPassword && (
                      <p className="h-fit text-red-500">
                        {errors.confirmPassword}
                      </p>
                    )}
                </div>
              </div>
            </motion.div>
          )}
          {step === 2 && (
            <motion.div>
              <div className="mb-5 grid grid-cols-2 items-end">
                <div className="mr-2 flex flex-col">
                  <label
                    htmlFor="stateInput"
                    className={`${page === "register" ? "hidden" : ""}`}
                  >
                    State
                  </label>
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
                </div>
                <div className="ml-2 flex flex-col">
                  <label
                    htmlFor="zipCodeInput"
                    className={`${page === "register" ? "hidden" : ""}`}
                  >
                    Zip code
                  </label>
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
                </div>
              </div>
              <div className="mb-5 grid grid-cols-2 items-end">
                <div className="mr-2 flex flex-col">
                  <label
                    htmlFor="addressInput"
                    className={`${page === "register" ? "hidden" : ""}`}
                  >
                    Address
                  </label>
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
                </div>
                <div className="ml-2 flex flex-col">
                  <label
                    htmlFor="cityInput"
                    className={`${page === "register" ? "hidden" : ""}`}
                  >
                    City
                  </label>
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
                </div>
              </div>
            </motion.div>
          )}
          {errorMessage && (
            <div className="text-center text-red-500">{errorMessage}</div>
          )}

          <div className="mt-6 flex flex-row gap-6">
            <button
              type="button"
              disabled={step === 1}
              onClick={() => setStep(1)}
              className={`w-full rounded-md py-1 text-center font-medium text-white ${
                step === 1 ? "bg-cyan-200" : "bg-cyan-600"
              }`}
            >
              Prev
            </button>
            <button
              type="button"
              disabled={step === 2 || Object.keys(errors).length > 0}
              onClick={() => setStep(2)}
              className={`w-full rounded-md ${
                step === 2 || Object.keys(errors).length > 0
                  ? "bg-cyan-200"
                  : "bg-cyan-600"
              } py-1 text-center font-medium text-white`}
            >
              Next
            </button>
          </div>

          <div className="mt-6 flex w-full justify-center text-center">
            <div
              id="recaptcha-container"
              className="flex w-full justify-center"
            ></div>
          </div>

          <motion.div
            className={`mt-6 rounded-md text-center ${
              Object.keys(errors).length > 0 ? "bg-cyan-200" : "bg-cyan-600"
            }`}
            // initial={{ opacity: 0, scale: 0.5 }}
            // whileHover={{ scale: Object.keys(errors).length > 0 ? 1 : 1.025 }}
            // whileTap={{ scale: Object.keys(errors).length > 0 ? 1 : 0.75 }}
            // animate={{
            //   opacity: 1,
            //   scale: 1,
            // }}
            // transition={{ duration: 0.25 }}
          >
            <button
              type="submit"
              onClick={() =>
                !(
                  values.confirmPassword &&
                  values.email &&
                  values.firstName &&
                  values.lastName &&
                  values.newPassword &&
                  values.phoneNumber &&
                  values.userName
                ) && setStep(1)
              }
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
