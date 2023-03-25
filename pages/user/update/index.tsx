import React from "react";
import Profile from "@/components/auth/user/update";

function index() {
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("I am trying to submit");
  };

  return <Profile handleSubmit={submitHandler} />;
}

export default index;
