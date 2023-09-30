import { Google, LoadingCircle } from "@/components/shared/icons";
import Balancer from "react-wrap-balancer";
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import BaseLayout from "../../base";
import { loginSchema } from "./loginSchema";
import { poster } from "@/lib/utils";
import Router, { useRouter } from "next/router";
import { signIn } from "next-auth/react";

type Props = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

const signInWithGoogleHandler = () => {
  signIn("google", {
    callbackUrl: "/",
  });
};

function Login({ handleSubmit }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const router = useRouter();
  const { query } = router;
  const { redirect_to } = query;

  return (
    <BaseLayout
      action="Login"
      prompt="Welcome back! Please enter your details."
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={async (values, { setSubmitting }) => {
          setIsLoading(true);
          const status = await signIn("credentials", {
            redirect: false,
            email: values.email,
            password: values.password,
            callbackUrl: "/",
          });

          if (status?.ok && status?.url) {
            setErrorMessage("");

            Router.push({
              pathname: redirect_to ? `${redirect_to}` : status?.url,
            });
          } else {
            setIsLoading(false);
            setErrorMessage(status?.error ?? "Unknown error occured");
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
            <fieldset>
              <div className="mb-5 flex flex-col">
                <label htmlFor="useremailInput" className="mb-1">
                  Email
                </label>
                <input
                  className="rounded-md border-gray-300 shadow-sm outline-none drop-shadow-sm"
                  name="email"
                  type="email"
                  id="useremailInput"
                  placeholder="Enter your email"
                  value={values.email}
                  onBlur={handleBlur}
                  onChange={handleChange}
                />
                <p className="ml-1 text-sm text-orange-700">
                  {errors.email && touched.email && errors.email}
                </p>
              </div>
              <div className="flex flex-col">
                <label htmlFor="passwordInput" className="mb-1">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="passwordInput"
                  className="rounded-md border-gray-300 shadow-sm outline-none drop-shadow-sm placeholder:text-3xl"
                  value={values.password}
                  placeholder="......."
                  onBlur={handleBlur}
                  onChange={handleChange}
                  autoComplete="on"
                />
                <p className="ml-1 text-sm text-orange-700">
                  {errors.password && touched.password && errors.password}
                </p>
              </div>
              <div className="flex flex-row justify-between gap-8">
                <div className="my-6 flex flex-row items-center gap-1">
                  <input
                    className="rounded-sm border-gray-300 outline-none"
                    type="checkbox"
                    id="RememberMeInput"
                    onChange={(e) => setRememberMe(e.target.checked)}
                  />
                  <label
                    className="ml-1 text-sm font-medium text-gray-700"
                    htmlFor="RememberMeInput"
                  >
                    Remember for 30 days
                  </label>
                </div>
                <Link
                  href={"/user/password"}
                  type="button"
                  className="text-sm font-medium text-cyan-600"
                >
                  Forgot Password
                </Link>
              </div>
              {errorMessage && (
                <div className="text-center text-red-700">{errorMessage}</div>
              )}

              <div className="cursor-pointer rounded-md bg-cyan-600 text-center hover:bg-cyan-700 active:translate-y-[1.5px]">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="flex w-full flex-row items-center justify-center gap-1 py-3 font-medium text-white"
                >
                  Sign in {isLoading && <LoadingCircle />}
                </button>
              </div>
            </fieldset>
          </form>
        )}
      </Formik>

      <div className="mb-8 mt-4 rounded-md border-2 border-gray-300 text-center">
        <button
          className="flex w-full justify-center py-3"
          onClick={signInWithGoogleHandler}
        >
          <Google className="h-6 w-6" />{" "}
          <p className="ml-2 cursor-pointer font-medium text-gray-700">
            Sign in with Google
          </p>
        </button>
      </div>
      <motion.p className="text-center text-sm text-gray-500">
        <Balancer>
          Don&apos;t have an account?{" "}
          <Link
            href={`/user/register${
              redirect_to ? `?redirect_to=${redirect_to}` : ``
            }`}
            className="font-medium text-cyan-500"
          >
            Sign up
          </Link>
        </Balancer>
      </motion.p>
    </BaseLayout>
  );
}

export default Login;
