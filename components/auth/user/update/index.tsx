import React, { useState, useEffect } from "react";
import BaseLayout from "../../base";
import Form from "../form";
import { useSession } from "next-auth/react";
import Link from "next/link";
import useFetcher from "@/lib/hooks/use-axios";
import { AxiosResponse } from "axios";
import Skeleton from "@/components/shared/icons/skeleton";
import Image from "next/image";
import { LoadingCircle, LoadingSpinner } from "@/components/shared/icons";
import { CircularProgress } from "@mui/material";

type Props = {
  handleSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
};

function Update({ handleSubmit }: Props) {
  const { data: session } = useSession();
  const [initialValues, setInitialValues] = useState(null);
  const [step, setSteps] = useState(1);
  const [refresh, setRefresh] = useState(false);
  const { fetchWithAuthSync } = useFetcher();

  function setStep(step: number) {
    setSteps(step);
  }

  function triggerRefreshHn() {
    setRefresh((r) => !r);
  }

  useEffect(() => {
    if (!session?.token) return;

    fetchWithAuthSync("/user/current")
      .then((res: AxiosResponse) => {
        setInitialValues(res.data);
      })
      .catch(() => {
        setInitialValues(null);
      });
  }, [session?.token, refresh]);

  let formEl = (
    <div className="flex h-[30vh] w-full items-center justify-center text-cyan-600">
      <CircularProgress color="inherit" size="12.5vh" />
    </div>
  );

  if (initialValues) {
    formEl = (
      <Form
        handleSubmit={handleSubmit}
        type="Save Account"
        initialValues={initialValues}
        page="update"
        step={step}
        setStep={setStep}
        triggerRefresh={triggerRefreshHn}
      />
    );
  }

  return (
    <BaseLayout
      action="Update Profile"
      prompt="update your account information"
      step={step}
      setStep={setSteps}
    >
      {formEl}
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
