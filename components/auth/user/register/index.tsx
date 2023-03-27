import React from "react";
import BaseLayout from "../../base";
import Balancer from "react-wrap-balancer";
import { Google } from "@/components/shared/icons";
import { motion } from "framer-motion";
import Link from "next/link";
import Form from "../form";

type Props = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

function Register({ handleSubmit }: Props) {
  const initialValues = {
    email: "",
    password: "",
    userName: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
  };

  return (
    <BaseLayout action="Sign up" prompt="Create your account">
      <Form
        handleSubmit={handleSubmit}
        type="Create account"
        initialValues={initialValues}
      />
      <div className="mt-4 mb-8 rounded-md border-2 border-gray-300 text-center">
        <button className="flex w-full justify-center gap-3 py-3">
          <Google className="h-6 w-6" />{" "}
          <p className="font-medium text-gray-700">Sign in with Google</p>
        </button>
      </div>
      <motion.p className="text-center text-sm text-gray-500">
        <Balancer>
          Already have an account?{" "}
          <Link href="/user/login" className="font-medium text-cyan-500">
            Login
          </Link>
        </Balancer>
      </motion.p>
    </BaseLayout>
  );
}

export default Register;
