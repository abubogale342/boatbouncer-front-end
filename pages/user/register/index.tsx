import React from "react";
import Regsiter from "@/components/auth/user/register";

function index() {
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("I am trying to submit");
  };

  return <Regsiter handleSubmit={submitHandler} />;
}

export default index;
