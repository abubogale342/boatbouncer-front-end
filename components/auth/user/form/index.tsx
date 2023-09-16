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
import { CheckCircle2, XCircle } from "lucide-react";
import PhoneInput, { isPossiblePhoneNumber } from "react-phone-number-input";
import "react-phone-number-input/style.css";
import startsWith from "lodash.startswith";
import { returnClass } from "@/components/shared/styles/input";

type step = {
  errors: boolean;
  values: boolean;
};

type Props = {
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
  const [recaptchaLoader, setRecaptchaLoader] = useState(false);
  const [Recaptcha, setRecaptcha] = useState<RecaptchaVerifier | null>(null);
  const accountRef = useRef<HTMLFormElement | null>(null);

  const reset = (timer: number) => {
    setTimeout(() => {
      setAccountStatus({ loading: false, error: false, success: false });
    }, timer);
  };

  const setupRecaptcha = (cb: any) => {
    const recaptcha = new RecaptchaVerifier(
      "recaptcha-container",
      {
        callback: cb,
      },
      auth,
    );

    recaptcha
      .render()
      .then(() => {
        setTimeout(() => {
          setRecaptchaLoader(false);
        }, 1000);
      })
      .catch(() => {
        setErrorMessage("unable to render recaptcha");
      });
    // setRecaptchaLoader(false);

    setRecaptcha(recaptcha);
  };

  const recaptchAfterValidation = async (res: any, credentials: any) => {
    try {
      setRecaptchaLoader(true);
      await poster("user/createAccount", credentials);

      const smsResponse = await poster("user/sendSms", {
        phoneNumber: credentials.phoneNumber,
        recaptchaToken: res,
      });

      if (
        smsResponse._id ||
        smsResponse.phoneNumber == credentials.phoneNumber
      ) {
        if (submitFormRef.current) {
          submitFormRef.current.style.display = "none";
        }

        Router.push({
          pathname: "/user/verify",
          query: { ...credentials, recaptchaToken: res },
        });
      }
    } catch (error: any) {
      setRecaptchaLoader(false);
      setErrorMessage(error.message);
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
          Recaptcha?.clear();
          try {
            setRecaptchaLoader(true);
            const isValidUser = await poster(
              "/user/validateUserForm",
              finalValues,
            );
            if (isValidUser) {
              setupRecaptcha((args: any) => {
                recaptchAfterValidation(args, finalValues);
              });

              setErrorMessage("");
            }
          } catch (error: any) {
            setRecaptchaLoader(false);
            setErrorMessage(error.message);
          }
        }
      }}
    >
      {({
        values,
        errors,
        touched,
        setValues,
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
          className="relative"
        >
          {step === 1 && (
            <motion.div
              animate={{ x: [100, 0] }}
              transition={{ duration: 0.25 }}
            >
              <div className="relative mb-7 h-11 w-full">
                <input
                  type="text"
                  name="userName"
                  className={
                    returnClass(!!(errors.userName && touched.userName))[0]
                  }
                  placeholder=" "
                  onBlur={handleBlur}
                  value={values.userName}
                  onChange={handleChange}
                />
                <label
                  className={`${
                    returnClass(!!(errors.userName && touched.userName))[1]
                  }`}
                >
                  Username
                </label>

                {errors.userName && touched.userName && (
                  <p className="ml-1 text-xs text-orange-700">
                    {errors.userName}
                  </p>
                )}
              </div>

              <div className="mb-7 grid w-full grid-cols-2 gap-2">
                <div className="relative h-11 w-full">
                  <input
                    type="text"
                    name="firstName"
                    className={
                      returnClass(!!(errors.firstName && touched.firstName))[0]
                    }
                    placeholder=" "
                    value={values.firstName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <label
                    className={`${
                      returnClass(!!(errors.firstName && touched.firstName))[1]
                    }`}
                  >
                    First name
                  </label>

                  {errors.firstName && touched.firstName && (
                    <p className="text-xs text-orange-700">
                      {errors.firstName}
                    </p>
                  )}
                </div>
                <div className="relative h-11 w-full">
                  <input
                    type="text"
                    name="lastName"
                    className={
                      returnClass(!!(errors.lastName && touched.lastName))[0]
                    }
                    placeholder=" "
                    value={values.lastName}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
                  <label
                    className={`${
                      returnClass(!!(errors.lastName && touched.lastName))[1]
                    }`}
                  >
                    Last name
                  </label>

                  {errors.lastName && touched.lastName && (
                    <p className="ml-1 text-xs text-orange-700">
                      {errors.lastName}
                    </p>
                  )}
                </div>
              </div>

              <div className="relative mb-7 flex h-11 flex-col">
                <PhoneInput
                  type="tel"
                  name="phoneNumber"
                  placeholder="phone number"
                  defaultCountry="US"
                  value={values.phoneNumber}
                  onBlur={handleBlur}
                  onChange={(value) => {
                    setValues({ ...values, phoneNumber: value });
                  }}
                />

                {errors.phoneNumber && touched.phoneNumber && (
                  <p className="ml-1 text-xs text-orange-700">
                    {errors.phoneNumber}
                  </p>
                )}
              </div>

              <div className="relative mb-7 flex flex-col">
                <input
                  className={returnClass(!!(errors.email && touched.email))[0]}
                  name="email"
                  type="email"
                  placeholder=" "
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <label
                  className={`${
                    returnClass(!!(errors.email && touched.email))[1]
                  }`}
                >
                  Email
                </label>

                {errors.email && touched.email && (
                  <p className="ml-1 text-xs text-orange-700">{errors.email}</p>
                )}
              </div>

              <div className="relative mb-7 flex flex-col">
                <input
                  type="password"
                  name="newPassword"
                  className={
                    returnClass(
                      !!(errors.newPassword && touched.newPassword),
                    )[0]
                  }
                  value={values.newPassword}
                  placeholder=" "
                  onBlur={handleBlur}
                  onChange={handleChange}
                  autoComplete="on"
                />
                <label
                  className={`${
                    returnClass(
                      !!(errors.newPassword && touched.newPassword),
                    )[1]
                  }`}
                >
                  {page === "update" ? "New Password" : "Password"}
                </label>

                {errors.newPassword && touched.newPassword && (
                  <p className="ml-1 text-xs text-orange-700">
                    {errors.newPassword}
                  </p>
                )}
              </div>

              <div className="relative mb-5 flex flex-col">
                <input
                  type="password"
                  name="confirmPassword"
                  className={
                    returnClass(
                      !!(errors.confirmPassword && touched.confirmPassword),
                    )[0]
                  }
                  value={values.confirmPassword}
                  placeholder=" "
                  onBlur={handleBlur}
                  onChange={handleChange}
                  autoComplete="on"
                />
                <label
                  className={`${
                    returnClass(
                      !!(errors.confirmPassword && touched.confirmPassword),
                    )[1]
                  }`}
                >
                  {page === "update" ? "Confirm Password" : "Re-type Password"}
                </label>

                {!errors.newPassword &&
                  errors.confirmPassword &&
                  touched.confirmPassword && (
                    <p className="ml-1 h-fit text-xs text-orange-700">
                      {errors.confirmPassword}
                    </p>
                  )}
              </div>
            </motion.div>
          )}

          {errorMessage && (
            <div className="text-center text-orange-700">{errorMessage}</div>
          )}

          <div className="flex w-full justify-center text-center">
            <div
              id="recaptcha-container"
              className="flex w-full justify-center"
            ></div>
          </div>

          <motion.div className={`mt-4 rounded-md text-center`}>
            <button
              type="submit"
              ref={submitFormRef}
              onClick={() => {
                if (page === "update") {
                  // add something later
                } else {
                  !(
                    values.confirmPassword &&
                    values.email &&
                    values.firstName &&
                    values.lastName &&
                    values.newPassword &&
                    values.phoneNumber &&
                    values.userName
                  ) && setStep?.(1);
                }
              }}
              className={`flex w-full flex-row-reverse items-center justify-center gap-2 rounded-md bg-cyan-600 py-3 font-medium  text-white hover:bg-cyan-700 active:translate-y-[1.5px]`}
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
              <span className="flex items-center justify-center gap-1">
                {type}
                {recaptchaLoader && <LoadingCircle />}
              </span>
            </button>
          </motion.div>
        </form>
      )}
    </Formik>
  );
}

export default Form;
