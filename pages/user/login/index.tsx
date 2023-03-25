import React from "react";
import Login from "@/components/auth/user/login";

function index() {
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(event);
  };

  return <Login handleSubmit={submitHandler} />;
}

export default index;
