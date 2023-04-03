import React from "react";
import Regsiter from "@/components/auth/user/register";
import { getSession } from "next-auth/react";
import { IncomingMessage } from "http";

function index() {
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("I am trying to submit");
  };

  return <Regsiter handleSubmit={submitHandler} />;
}

export default index;

export async function getServerSideProps({
  req,
}: {
  req: IncomingMessage | undefined;
}) {
  const session = await getSession({ req });

  if (session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }

  return {
    props: {}, // will be passed to the page component as props
  };
}
