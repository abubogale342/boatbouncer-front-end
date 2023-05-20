import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { IncomingMessage } from "http";
import { getSession } from "next-auth/react";
import { motion } from "framer-motion";
import { useState } from "react";
import Image from "next/image";
import home from "public/home.svg";
import { HomeIcon } from "@/components/shared/icons/home";

export default function Home(props: any) {
  const [searchVal, setSearchVal] = useState("");

  const handleChange = (event: any) => {
    setSearchVal(event.target.value);
  };

  return (
    <main className="flex min-h-screen flex-col">
      <div className="relative h-screen bg-cover bg-right">
        <div className="absolute right-0 top-0 -z-10">{HomeIcon}</div>
        <Header {...props} page="home"></Header>

        <motion.div className="absolute left-1/2 top-1/2 m-0 w-4/5 -translate-x-1/2 -translate-y-1/2 md:w-2/3">
          <motion.p className="text-center text-4xl font-bold md:text-6xl">
            <span className="text-white">Happiness is a way </span>
            <span className="text-cyan-600">of travel</span>
          </motion.p>

          <motion.p className="home-sub__header  mb-14 mt-2 text-center text-4xl font-bold sm:mt-3 md:text-6xl">
            Not a destination
          </motion.p>

          <form action={`/search?query=${searchVal}`} method="POST">
            <label
              htmlFor="default-search"
              className="sr-only mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Search
            </label>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5 text-gray-500 dark:text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  ></path>
                </svg>
              </div>
              <input
                type="search"
                id="default-search"
                className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-4 pl-10 pr-16 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
                placeholder="Where would you like to travel ..."
                value={searchVal}
                onChange={handleChange}
                required
              />
              <button
                type="submit"
                className="absolute bottom-2.5 right-1 rounded-lg bg-cyan-600 px-4 py-2 text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Search
              </button>
            </div>
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
    },
  };
}
