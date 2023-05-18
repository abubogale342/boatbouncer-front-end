import Meta from "@/components/layout/meta";
import Map from "@/components/map";
import SearchResults from "@/components/searchResults";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { AnimatePresence, motion } from "framer-motion";
import { Filter } from "lucide-react";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";

export default function Search(props: any) {
  const { data, error, ...user } = props;

  const [searchVal, setSearchVal] = useState("");
  const [checked, setChecked] = useState(false);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSearchVal(event.target.value);
  };

  const handleMapViewChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  let element = null;

  if (data?.data && data?.total > 0) {
    element = <SearchResults boats={data.data} total={data.total} />;
  }

  if (data?.data && data?.total === 0) {
    element = (
      <div className="text-center">
        <h1 className="text-2xl text-gray-700">
          There are no results that match your search
        </h1>
        <h1 className="mt-2 text-gray-700">
          Please try adjusting your search keywords or filters
        </h1>
      </div>
    );
  }

  if (error) {
    element = (
      <div className="text-center">
        <h1 className="text-2xl text-red-800">
          Error occured, wrong happened.
        </h1>
        <h1 className="mt-2 text-red-800">
          Please make sure your internet is working and try again.
        </h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <Meta title="Search" />

      <Header {...user}>
        <Link href="/" className="ml-6 text-sm font-bold text-cyan-600">
          Home
        </Link>
      </Header>
      <hr className="mb-2 mt-1 h-px border-0 bg-gray-200" />

      <div className="mx-4 mt-6 flex flex-col items-center justify-between gap-4 sm:mr-10 sm:mt-3 sm:flex-row sm:gap-20 md:gap-28 lg:gap-60">
        <form
          className="flex w-full items-center"
          action={`/search?query=${searchVal}`}
          method="POST"
        >
          <label htmlFor="voice-search" className="sr-only">
            Search
          </label>
          <div className="relative w-full">
            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
              <svg
                aria-hidden="true"
                className="h-5 w-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="voice-search"
              className="block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pl-10 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500  dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              placeholder="Where would you like to travel ;)"
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="ml-2 inline-flex items-center rounded-lg border border-gray-200  px-3 py-2.5 text-sm font-medium text-gray-700 focus:outline-none"
          >
            Search
          </button>
        </form>

        <div className="ml-auto flex flex-row items-center gap-7">
          <label className="relative hidden w-28 cursor-pointer items-center sm:inline-flex">
            <input
              type="checkbox"
              className="peer sr-only"
              onChange={handleMapViewChange}
            />
            <div className="peer h-6 w-11 rounded-full bg-gray-200 after:absolute after:left-[2px] after:top-[2px] after:h-5 after:w-5 after:rounded-full after:border after:border-gray-300 after:bg-white after:transition-all after:content-[''] peer-checked:bg-blue-600 peer-checked:after:translate-x-full peer-checked:after:border-white peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:border-gray-600 dark:bg-gray-700 dark:peer-focus:ring-blue-800"></div>
            <span className="ml-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Map View
            </span>
          </label>
          <button className="flex flex-row gap-2 rounded-lg border border-gray-300 px-3 py-2.5 text-sm font-medium text-gray-700 dark:text-gray-300">
            <Filter size="20" /> Filters
          </button>
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="my-6 flex flex-col sm:my-12"
        >
          {data && data?.data && data?.data?.length > 0 && checked && (
            <div className="hidden w-full sm:block">
              <Map />
            </div>
          )}
          <div className="flex w-full flex-wrap justify-evenly gap-x-1.5 gap-y-2.5">
            {element}
          </div>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { req, query } = context;
  const { method } = req;

  let session = await getSession({ req });

  if (!session) {
    session = null;
  }

  const myHeaders = new Headers();

  myHeaders.append("Authorization", "Bearer " + session?.token);

  const requestOptions = {
    method: "GET",
    headers: myHeaders,
  };

  let data = null;
  let error = null;

  try {
    data = await fetch(
      `http:${process.env.NEXT_PUBLIC_API_URL}/boat`,
      requestOptions,
    );

    data = await data.json();
    if (!data) {
      error = true;
    }
  } catch (error) {
    error = error;
  }

  return {
    props: {
      ...session,
      data,
      error,
    },
  };
}
