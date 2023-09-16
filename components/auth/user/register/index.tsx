import React, { useEffect, useState } from "react";
import BaseLayout from "../../base";
import Balancer from "react-wrap-balancer";
import { Google } from "@/components/shared/icons";
import { motion } from "framer-motion";
import Link from "next/link";
import Form from "../form";
import { number } from "yup";

type step = {
  errors: boolean;
  values: boolean;
};

function Register() {
  const [step, setSteps] = useState(1);

  const [mandatoryStep, setMandatoryStep] = useState({
    errors: false,
    values: false,
  });

  function setStep(step: number) {
    setSteps(step);
  }

  function setMandatory(obj: step) {
    setMandatoryStep(obj);
  }

  const initialValues = {
    email: "",
    newPassword: "",
    confirmPassword: "",
    userName: "",
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    phoneNumber: "",
    id: "",
  };

  return (
    <BaseLayout
      action="Sign up"
      prompt="Create your account"
      step={step}
      setStep={setSteps}
      mandatory={mandatoryStep}
    >
      <Form
        type="Create account"
        initialValues={initialValues}
        setMandatory={setMandatory}
        page="register"
        step={step}
        setStep={setStep}
      />
      <div className="mb-8 mt-4 rounded-md border-2 border-gray-300 text-center">
        <button className="flex w-full justify-center gap-3 py-3">
          <Google className="h-6 w-6" />{" "}
          <p className="font-medium text-gray-700">Sign up with Google</p>
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
