import Boat from "@/components/boat";
import Meta from "@/components/layout/meta";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { AnimatePresence, motion } from "framer-motion";
import { IncomingMessage } from "http";
import { getSession } from "next-auth/react";
import Link from "next/link";

export default function Index(props: any) {
  return (
    <div className="flex min-h-screen flex-col">
      <Meta title="favorites" />
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
          className="mb-12 mt-12"
        >
          <p className="text-center text-3xl font-medium text-gray-900">
            Favourites
          </p>
          <p className="mb-10 text-center text-gray-500">
            List of your favourite boats
          </p>
          <div className="mx-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {/* <Boat page="favourites" boatImg={null} location={null}>
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
            </Boat> */}
          </div>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
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
