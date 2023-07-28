import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { IncomingMessage } from "http";
import { getSession } from "next-auth/react";
import { motion } from "framer-motion";
import { Suspense, useState } from "react";
import { HomeIcon } from "@/components/shared/icons/home";
import dynamic from "next/dynamic";

const AddressAutoFill = dynamic(() => import("../components/search"), {
  ssr: false,
});

export default function Home(props: any) {
  const [searchVal, setSearchVal] = useState("");

  const handleChange = (event: any) => {
    setSearchVal(event.target.value);
  };

  return (
    <main className="flex flex-col overflow-hidden">
      <div className="relative left-0 right-0 top-0">
        {HomeIcon}
        <div className="absolute left-0 right-0 top-0">
          <Header {...props} page="home"></Header>
        </div>

        <motion.div className="absolute left-1/2 top-1/2 m-0 w-4/5 -translate-x-1/2 -translate-y-1/2 md:w-2/3">
          <motion.p className="text-center text-4xl font-bold md:text-6xl">
            <span className="text-white">Happiness is a way </span>
            <span className="text-cyan-600">of travel</span>
          </motion.p>

          <motion.p className="home-sub__header  mb-14 mt-2 text-center text-4xl font-bold sm:mt-3 md:text-6xl">
            Not a destination
          </motion.p>

          <Suspense fallback="Loading. . .">
            <AddressAutoFill page="home" />
          </Suspense>
        </motion.div>
      </div>
      <Footer />
    </main>
  );
}

export async function getServerSideProps({
  req,
}: {
  req: IncomingMessage | undefined;
}) {
  const session = await getSession({ req });

  return {
    props: {
      ...session,
    },
  };
}
