import SearchResults from "@/components/searchResults";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { AnimatePresence, motion } from "framer-motion";
import { Filter } from "lucide-react";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { Fragment } from "react";

export default function Search(props: any) {
  const { data, error, ...user } = props;
  console.log("data", data);

  let element = null;

  if (data) {
    element = (
      <div className="ml-4">
        <img src={data.imageUrls[0]} alt="" />
        <h1 className="text-lg font-medium">Description</h1>
        <p>{data.description}</p>
        <h1 className="text-lg font-medium">Amenities</h1>
        <ul className="flex flex-row gap-3">
          {data.amenities.map((item: string, index: number) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
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
    <Fragment>
      <Header {...user}>
        <Link href="/" className="ml-6 text-sm font-bold text-cyan-600">
          Home
        </Link>
      </Header>
      <hr className="mt-1 mb-2 h-px border-0 bg-gray-200" />

      <AnimatePresence>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="my-6 sm:my-12"
        >
          <div className="flex w-full flex-wrap justify-evenly gap-x-1.5 gap-y-2.5">
            {element}
          </div>
        </motion.div>
      </AnimatePresence>
      <Footer />
    </Fragment>
  );
}

export async function getServerSideProps(context: any) {
  const { req, params } = context;

  const session = await getSession({ req });
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
      `http:${process.env.NEXT_PUBLIC_API_URL}/boat/${params.index}`,
      requestOptions,
    );

    data = await data.json();
    if (!data) {
      error = true;
    }
  } catch (error) {
    error = true;
  }

  return {
    props: {
      ...session,
      data,
      error,
    },
  };
}
