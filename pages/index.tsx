import Feature from "@/components/home/feature";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { IncomingMessage } from "http";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import homePic from "../public/home.png";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Balancer from "react-wrap-balancer";
import Image from "next/image";

export default function Home(props: any) {
  const searchPlaceHandler = (event: any) => {
    event.preventDefault();
  };

  return (
    <main>
      <div
        className="relative h-screen bg-cover bg-right"
        style={{ backgroundImage: `url("/home.svg")` }}
      >
        <Header {...props} page="home"></Header>

        <motion.div className="absolute top-1/2 left-1/2 m-0 w-4/5 -translate-x-1/2 -translate-y-1/2 md:w-2/3">
          <motion.p className="text-center text-4xl font-bold md:text-6xl">
            <span className="text-white">Happiness is a way </span>
            <span className="text-cyan-600">of travel</span>
          </motion.p>

          <motion.p className="home-sub__header  mb-14 mt-2 text-center text-4xl font-bold sm:mt-3 md:text-6xl">
            Not a destination
          </motion.p>
          <form
            className="relative mx-auto h-12 w-4/5"
            onSubmit={searchPlaceHandler}
          >
            <Search size={24} className="absolute top-1/3 left-4" />
            <input
              className="h-12 w-full rounded-3xl border-none pr-4 pl-14 outline-slate-400 placeholder:pl-0 md:h-14 md:pr-44"
              placeholder="Where would you like to travel"
              required
            />
            <button
              type="submit"
              className="absolute top-1 right-1 hidden h-10 w-fit rounded-3xl bg-cyan-600 py-3 px-6 text-xs font-medium text-white sm:block md:top-2"
            >
              Start Looking
            </button>
          </form>
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
    }, // will be passed to the page component as props
  };
}
