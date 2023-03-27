import React, { useState } from "react";
import BaseLayout from "../../base";
import Form from "../form";

type Props = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

function Update({ handleSubmit }: Props) {
  const initialValues = {
    email: "testemail@gmail.com",
    password: "QAZ@wedfrc12",
    userName: "Test user",
    firstName: "Mark",
    lastName: "John",
    address: "Seattle",
    city: "SF",
    state: "WA",
    zipCode: "98116",
    phoneNumber: "251913345678",
  };

  return (
    <BaseLayout
      action="Update Profile"
      prompt="update your account information"
    >
      <Form
        handleSubmit={handleSubmit}
        type="Save Account"
        initialValues={initialValues}
      />
      <div className="mt-4 mb-8 rounded-md border-2 border-gray-300 text-center">
        <button className="flex w-full justify-center gap-3 py-3">
          <p className="font-medium text-gray-700">Cancel</p>
        </button>
      </div>
    </BaseLayout>
  );
}

export default Update;
