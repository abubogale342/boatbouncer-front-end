import React, { useState, useRef } from "react";
import { formRegisterSchema, formUpdateSchema } from "./schema";
import { Formik } from "formik";
import { motion } from "framer-motion";
import { poster } from "@/lib/utils";
import { RecaptchaVerifier } from "firebase/auth";
import { auth } from "@/lib/config";
import Router from "next/router";
import useFetcher from "@/lib/hooks/use-axios";
import { LoadingCircle } from "@/components/shared/icons";
import { ArrowLeft, ArrowRight, CheckCircle2, XCircle } from "lucide-react";

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

type step = {
  errors: boolean;
  values: boolean;
};

type Props = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  type: String | null | undefined;
  initialValues: {
    email?: string;
    newPassword?: string;
    confirmPassword?: string;
    userName?: string;
    firstName?: string;
    lastName?: string;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    phoneNumber?: string;
    id?: string | undefined | null;
  };
  page: String | null | undefined;
  setStep?: (step: number) => void;
  step?: number;
  triggerRefresh?: () => void;
  setMandatory?: (obj: step) => void;
};

function Form({
  handleSubmit,
  type,
  initialValues,
  page,
  setStep,
  step,
  triggerRefresh,
  setMandatory,
}: Props) {
  const submitFormRef = useRef<HTMLButtonElement | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const { updateUser } = useFetcher();
  const [accountStatus, setAccountStatus] = useState({
    loading: false,
    error: false,
    success: false,
  });

  const accountRef = useRef<HTMLFormElement | null>(null);

  const reset = (timer: number) => {
    setTimeout(() => {
      setAccountStatus({ loading: false, error: false, success: false });
    }, timer);
  };

  const recaptchAfterValidation = async (res: any, credentials: any) => {
    if (submitFormRef.current) {
      submitFormRef.current.style.display = "none";
    }
    const createdAccount = await poster("user/createAccount", credentials);

    if (createdAccount.code) {
      setErrorMessage(
        createdAccount.response?.data?.message ||
          createdAccount.response.data?.errors[0]?.msg,
      );
      if (submitFormRef.current) {
        submitFormRef.current.style.display = "block";
      }
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
      validationSchema={
        page === "update" ? formUpdateSchema : formRegisterSchema
      }
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
            ...(values.confirmPassword && { password: values.confirmPassword }),
          },
        );

        if (page === "update") {
          if (accountRef.current) {
            accountRef.current.scrollIntoView({
              behavior: "smooth",
              block: "center",
              inline: "start",
            });
          }
          setAccountStatus({ loading: true, error: false, success: false });

          if (!finalValues.password) {
            delete finalValues.password;
          }
          const updateAccount = await updateUser(
            `user/${initialValues.id}`,
            finalValues,
          );

          if (updateAccount.status == 200) {
            setAccountStatus({ loading: false, error: false, success: true });
            triggerRefresh?.();
            reset(1500);
          } else {
            setAccountStatus({ loading: false, error: true, success: false });
            reset(1500);
          }
        } else if (page === "register") {
          try {
            setupRecaptcha((args: any) => {
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
        <form
          ref={accountRef}
          onSubmit={handleSubmit}
          onChange={() => {
            setErrorMessage("");
            setMandatory?.({
              values: !!(
                values.confirmPassword &&
                values.email &&
                values.firstName &&
                values.lastName &&
                values.newPassword &&
                values.phoneNumber &&
                values.userName
              ),
              errors: Object.keys(errors).length > 0,
            });
          }}
        >
          {step === 1 && (
            <motion.div
              animate={{ x: [100, 0] }}
              transition={{ duration: 0.25 }}
            >
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
            <motion.div
              animate={{ x: [-100, 0] }}
              transition={{ duration: 0.25 }}
            >
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

          <div className="mt-6 flex w-full justify-center text-center">
            <div
              id="recaptcha-container"
              className="flex w-full justify-center"
            ></div>
          </div>

          <>
            <button
              type="button"
              disabled={step === 1}
              onClick={() => setStep?.(1)}
              className={`${step === 1 ? "hidden" : ""} w-full`}
            >
              <ArrowLeft />
            </button>
            <button
              type="button"
              disabled={step === 2}
              onClick={() => setStep?.(2)}
              className={`${
                step === 2 ? "hidden " : ""
              } flex w-full justify-end`}
            >
              <ArrowRight />
            </button>
          </>

          <motion.div
            className={`mt-6 rounded-md text-center ${
              Object.keys(errors).length > 0 ? "bg-cyan-200" : "bg-cyan-600"
            }`}
          >
            <button
              type="submit"
              ref={submitFormRef}
              onClick={() =>
                !(
                  values.confirmPassword &&
                  values.email &&
                  values.firstName &&
                  values.lastName &&
                  values.newPassword &&
                  values.phoneNumber &&
                  values.userName
                ) && setStep?.(1)
              }
              className={`flex w-full flex-row-reverse items-center justify-center gap-2 py-3 font-medium text-white`}
              disabled={Object.keys(errors).length > 0}
            >
              <span>
                {!accountStatus.error && accountStatus.loading && (
                  <LoadingCircle />
                )}
              </span>
              <span>
                {accountStatus.error && !accountStatus.loading && (
                  <XCircle color="red" />
                )}
              </span>
              <span>
                {!accountStatus.error &&
                  !accountStatus.loading &&
                  accountStatus.success && <CheckCircle2 />}
              </span>
              {type}
            </button>
          </motion.div>
        </form>
      )}
    </Formik>
  );
}

export default Form;
