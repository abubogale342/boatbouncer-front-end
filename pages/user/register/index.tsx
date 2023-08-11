import React from "react";
import Register from "@/components/auth/user/register";
import { getSession } from "next-auth/react";
import { IncomingMessage } from "http";
import Meta from "@/components/layout/meta";

function index() {
  const submitHandler = (event: React.FormEvent<HTMLFormElement>) => {
    console.log("I am trying to submit");
  };

  return (
    <div className="h-screen overflow-hidden">
      <Meta title="register" />
      <Register handleSubmit={submitHandler} />;
    </div>
  );
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
