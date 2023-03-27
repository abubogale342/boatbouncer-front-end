import { Google } from "@/components/shared/icons";
import Balancer from "react-wrap-balancer";
import { Formik } from "formik";
import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

import BaseLayout from "../../base";
import { loginSchema } from "./loginSchema";

type Props = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

function Login({ handleSubmit }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!emailRef.current) return;
    emailRef.current.focus();
  }, []);

  return (
    <BaseLayout
      action="Login"
      prompt="Welcome back! Please enter your details."
    >
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={loginSchema}
        onSubmit={(values, { setSubmitting }) => {
          alert(JSON.stringify(values, null, 2));
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
            <fieldset>
              <div className="mb-5 flex flex-col">
                <label htmlFor="useremailInput">Email</label>
                <input
                  ref={emailRef}
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
                <label htmlFor="passwordInput">Password</label>
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
              <div className="flex flex-row justify-between gap-8">
                <div className="my-6 flex flex-row items-center gap-1">
                  <input
                    className="rounded-sm"
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
                <button className="text-sm font-medium text-cyan-600">
                  Forgot Password
                </button>
              </div>
              {errorMessage && <div>{errorMessage}</div>}

              <div className="rounded-md bg-cyan-600 text-center">
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-3 font-medium text-white"
                >
                  Sign in
                </button>
              </div>
            </fieldset>
          </form>
        )}
      </Formik>

      <div className="mt-4 mb-8 rounded-md border-2 border-gray-300 text-center">
        <button className="flex w-full justify-center py-3">
          <Google className="h-6 w-6" />{" "}
          <p className="ml-2 font-medium text-gray-700">Sign in with Google</p>
        </button>
      </div>
      <motion.p className="text-center text-sm text-gray-500">
        <Balancer>
          Don&apos;t have an account?{" "}
          <Link href="/user/register" className="font-medium text-cyan-500">
            Sign up
          </Link>
        </Balancer>
      </motion.p>
    </BaseLayout>
  );
}

export default Login;
