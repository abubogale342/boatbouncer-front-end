import Boat from "@/components/boat";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { AnimatePresence, motion } from "framer-motion";
import { IncomingMessage } from "http";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { Fragment } from "react";

export default function Index(props: any) {
  return (
    <Fragment>
      <Header {...props}>
        <Link href="/" className="ml-6 text-sm font-bold text-cyan-600">
          Home
        </Link>
      </Header>
      <hr className="mt-1 h-px border-0 bg-gray-200" />
      <AnimatePresence>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="mt-12 mb-12"
        >
          <p className="text-center text-3xl font-medium text-gray-900">
            Favourites
          </p>
          <p className="mb-10 text-center text-gray-500">
            List of your favourite boats
          </p>
          <div className="flex w-full flex-wrap justify-evenly gap-2">
            <Boat page="favourites" boatImg={null} location={null}>
              {""}
            </Boat>
            <Boat page="favourites" boatImg={null} location={null}>
              {""}
            </Boat>
            <Boat page="favourites" boatImg={null} location={null}>
              {""}
            </Boat>
            <Boat page="favourites" boatImg={null} location={null}>
              {""}
            </Boat>
          </div>
        </motion.div>
      </AnimatePresence>
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
