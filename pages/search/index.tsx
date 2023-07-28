import Meta from "@/components/layout/meta";
import Map from "@/components/map";
import SearchResults from "@/components/searchResults";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { AddressAutofill } from "@mapbox/search-js-react";
import { AnimatePresence, motion } from "framer-motion";
import { Filter } from "lucide-react";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { ChangeEvent, useState } from "react";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const AddressAutoFill = dynamic(
  () => import("../../components/search").then((mod) => mod.Search),
  {
    ssr: false,
  },
);

export default function Search(props: any) {
  const { data, error, ...user } = props;

  const [checked, setChecked] = useState(false);

  const handleMapViewChange = (event: ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };

  let element = null;

  if (data?.data && data?.total > 0) {
    element = (
      <SearchResults boats={data.data} total={data.total} checked={checked} />
    );
  }

  if (!data || (data?.data && data?.total === 0)) {
    element = (
      <div className="py-10 text-center">
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
    <div className="relative flex min-h-screen w-full flex-col">
      <Meta title="Search" />

      <div className="sticky left-0 right-0 top-0 z-10 bg-white pb-2 shadow-md">
        <Header {...user}>
          <Link href="/" className="ml-6 text-sm font-bold text-cyan-600">
            Home
          </Link>
        </Header>
        <hr className="mb-2 mt-1 h-px border-0 bg-gray-200" />

        <div className="mx-4 mt-6 flex flex-col items-center justify-between gap-4 sm:mr-10 sm:mt-3 sm:flex-row sm:gap-20 md:gap-28 lg:gap-60">
          <Suspense fallback="Loading. . .">
            <AddressAutoFill page={props?.page} />
          </Suspense>
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
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="around my-0 flex w-full flex-row-reverse"
        >
          {data && data?.data && data?.data?.length > 0 && checked && (
            <div className="hidden w-full sm:block lg:w-[33vw]">
              <Map />
            </div>
          )}
          <div
            className={`mt-3 w-full ${
              data && data?.data && data?.data?.length > 0 && checked
                ? "hidden lg:block lg:w-[67vw]"
                : "lg:w-[100vw]"
            }`}
          >
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
      `${process.env.NEXT_PUBLIC_API_URL}/boat?address=${query.query}`,
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
