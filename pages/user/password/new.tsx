import { Formik } from "formik";
import * as Yup from "yup";
import { motion } from "framer-motion";
import { returnClass } from "@/components/shared/styles/input";
import { useState } from "react";
import BaseLayout from "@/components/auth/base";
import Router, { useRouter } from "next/router";
import { poster } from "@/lib/utils";
import { LoadingCircle } from "@/components/shared/icons";
import { signIn } from "next-auth/react";
import { CheckCircle2 } from "lucide-react";
const lowerLetterRegex = /(?=.*?[a-z])/; // Password should contain a lower case letter
const upperLetterRegex = /(?=.*?[A-Z])/; // Password should contain an upper case letter
const numberRegex = /(?=.*[0-9])/; // Password should contain number
const specialCharRegex = /(?=.*[!@#$%^&*])(?=.{8,})/; // Password should contain one of these symbols (!@#$%^&*).

const Index = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [success, setSuccess] = useState(false);
  const [resetting, setResetting] = useState(false);
  const router = useRouter();
  const { query } = router;
  const { encryption } = query;

  return (
    <>
      <BaseLayout action="Reset Password" prompt="Create new password">
        <Formik
          initialValues={{ newPassword: "", confirmPassword: "" }}
          validationSchema={Yup.object().shape({
            newPassword: Yup.string()
              .min(8, "Password should be at least 8 characters")
              .max(60, "Password should not be greater than 60!")
              .matches(
                lowerLetterRegex,
                "Password should contain a lowercase letter",
              )
              .matches(
                upperLetterRegex,
                "Password should contain an uppercase letter",
              )
              .matches(numberRegex, "Password should contain a number")
              .matches(
                specialCharRegex,
                "Password should contain a special character",
              )
              .required("Password is required"),
            confirmPassword: Yup.string()
              .required("Confirmation password is required!")
              .oneOf([Yup.ref("newPassword"), ""], "Passwords must match"),
          })}
          onSubmit={async (values, { setSubmitting }) => {
            setResetting(true);
            try {
              const resetPassword = await poster("user/changePassword", {
                newPassword: values.newPassword,
                encryption: encryption,
              });

              if (resetPassword.email) {
                setSuccess(true);

                const status = await signIn("credentials", {
                  redirect: false,
                  email: resetPassword.email,
                  password: values.newPassword,
                  callbackUrl: "/",
                });

                if (status?.ok && status?.url) {
                  setErrorMessage("");

                  Router.push({
                    pathname: status?.url,
                  });
                } else {
                  setResetting(false);
                  setSuccess(false);
                  setErrorMessage("Error while logging in, please refresh");
                }

                setSuccess(false);
                setResetting(false);
              }
            } catch (error: any) {
              setErrorMessage(
                error?.message ?? "Error occured while resetting",
              );
              setResetting(false);
              setSuccess(false);
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
            <form onSubmit={handleSubmit} onChange={handleChange}>
              <div className="relative mb-7 flex min-w-[240px] flex-col">
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
                  New Password
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
                  Confirm Password
                </label>

                {!errors.newPassword &&
                  errors.confirmPassword &&
                  touched.confirmPassword && (
                    <p className="ml-1 h-fit text-xs text-orange-700">
                      {errors.confirmPassword}
                    </p>
                  )}
              </div>

              {errorMessage && (
                <div className="text-center text-orange-700">
                  {errorMessage}
                </div>
              )}

              <motion.div className={`mt-4 rounded-md text-center`}>
                <button
                  type="submit"
                  onClick={() => {}}
                  className={`flex w-full flex-row-reverse items-center justify-center gap-2 rounded-md bg-cyan-600 py-3 font-medium  text-white hover:bg-cyan-700 active:translate-y-[1.5px]`}
                  disabled={Object.keys(errors).length > 0}
                >
                  <span>{success && <CheckCircle2 />}</span>
                  <span>{resetting && <LoadingCircle />}</span>
                  <span>
                    {/* {accountStatus.error && !accountStatus.loading && (
                  <XCircle color="red" />
                )} */}
                  </span>
                  <span className="flex items-center justify-center gap-1">
                    Reset Password
                    {/* {type}
                  
                {recaptchaLoader && <LoadingCircle />} */}
                  </span>
                </button>
              </motion.div>
            </form>
          )}
        </Formik>
      </BaseLayout>
    </>
  );
};

export default Index;
