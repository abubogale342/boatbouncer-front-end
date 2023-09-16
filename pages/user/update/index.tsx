import React from "react";
import Profile from "@/components/auth/user/update";
import { IncomingMessage } from "http";
import { getSession } from "next-auth/react";
import Meta from "@/components/layout/meta";

function Index() {
  return (
    <div className="h-screen overflow-hidden">
      <Meta title="update profile" />
      <Profile />
    </div>
  );
}

export default Index;

export async function getServerSideProps({
  req,
}: {
  req: IncomingMessage | undefined;
}) {
  const session = await getSession({ req });

  if (!session) {
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
