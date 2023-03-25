import React, { useState } from "react";
import BaseLayout from "../../base";
import { motion } from "framer-motion";
import Balancer from "react-wrap-balancer";
import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import { Google } from "@/components/shared/icons";
import Link from "next/link";

type Props = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

function login({ handleSubmit }: Props) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  return (
    <BaseLayout>
      <motion.div className="w-max">
        <motion.h1
          className="mb-3 text-3xl font-bold text-gray-900"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>Login</Balancer>
        </motion.h1>
        <motion.p
          className="mb-8 text-gray-900"
          variants={FADE_DOWN_ANIMATION_VARIANTS}
        >
          <Balancer>Welcome back! Please enter your details.</Balancer>
        </motion.p>

        <form onSubmit={handleSubmit}>
          <fieldset>
            <div className="mb-5 flex flex-col">
              <label htmlFor="useremailInput">Email</label>
              <input
                className="rounded-md"
                type="email"
                id="emailInput"
                placeholder="Enter your email"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="passwordInput">Password</label>
              <input
                type="password"
                id="passwordInput"
                className="rounded-md placeholder:absolute placeholder:bottom-2 placeholder:text-4xl"
                placeholder="........"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
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
                  className="text-sm font-medium text-gray-700"
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
        <div className="mt-4 mb-8 rounded-md border-2 border-gray-300 text-center">
          <button className="flex w-full justify-center gap-3 py-3">
            <Google className="h-6 w-6" />{" "}
            <p className="font-medium text-gray-700">Sign in with Google</p>
          </button>
        </div>
        <motion.p className="text-center text-sm text-gray-500">
          <Balancer>
            Don't have an account?{" "}
            <Link href="/user/register" className="font-medium text-cyan-500">
              Sign up
            </Link>
          </Balancer>
        </motion.p>
      </motion.div>
    </BaseLayout>
  );
}

export default login;
