import React, { useState } from "react";
import BaseLayout from "../../base";
import Form from "../form";
import { useSession } from "next-auth/react";

type Props = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

function Update({ handleSubmit }: Props) {
  const { data: session } = useSession();

  const initialValues = session;

  if (!initialValues) return;

  return (
    <BaseLayout
      action="Update Profile"
      prompt="update your account information"
    >
      <Form
        handleSubmit={handleSubmit}
        type="Save Account"
        initialValues={initialValues}
        page="update"
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
