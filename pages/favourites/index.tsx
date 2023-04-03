import Boat from "@/components/boat";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { IncomingMessage } from "http";
import { getSession } from "next-auth/react";
import { Fragment } from "react";

export default function Index(props: any) {
  return (
    <Fragment>
      <Header {...props} />
      <hr className="mt-1 h-px border-0 bg-gray-200" />
      <main className="mt-12 mb-12">
        <p className="text-center text-3xl font-medium text-gray-900">
          Favourites
        </p>
        <p className="mb-10 text-center text-gray-500">
          List of your favourite boats
        </p>
        <div className="flex w-full flex-wrap justify-evenly gap-6">
          <Boat />
          <Boat />
          <Boat />
          <Boat />
        </div>
      </main>
      <Footer />
    </Fragment>
  );
}

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
    props: {
      ...session,
    }, // will be passed to the page component as props
  };
}
