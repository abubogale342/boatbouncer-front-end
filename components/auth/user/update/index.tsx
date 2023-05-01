import React, { useState } from "react";
import BaseLayout from "../../base";
import Form from "../form";
import { useSession } from "next-auth/react";
import Link from "next/link";

type Props = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

function Update({ handleSubmit }: Props) {
  const { data: session } = useSession();

  const initialValues = session;

  if (!initialValues) return null;

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
      <div className="mb-8 mt-4 rounded-md border-2 border-gray-300 text-center">
        <Link
          href="/"
          className="flex w-full justify-center gap-3 py-3 font-medium text-gray-700"
        >
          Cancel
        </Link>
      </div>
    </BaseLayout>
  );
}

export default Update;
