import { AnimatePresence, motion } from "framer-motion";
import Carousel from "@/components/layout/carousel";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { CheckCircle2 } from "lucide-react";
import { getSession } from "next-auth/react";
import { Fragment } from "react";
import Link from "next/link";
import BookingForm from "@/components/booking/form";
import Meta from "@/components/layout/meta";

export default function Search(props: any) {
  const { data, error, ...user } = props;

  let element = null;

  if (data) {
    element = (
      <div
        className={`mx-4 grid w-full grid-cols-1 gap-6 sm:mx-6 ${
          data.owner === user._id ? "" : "md:mx-6 md:grid-cols-[4fr_3fr]"
        }`}
      >
        <div>
          <Carousel images={data?.imageUrls} />
          {data.owner === user._id && (
            <p className="mt-1 text-center text-lg italic">
              Note: Since you are creator of this boat, you can&apos;t book for
              yourself
            </p>
          )}

          <br />
          <h1 className="mb-1 text-lg font-bold">Description</h1>
          <p className="text-lg text-gray-500">{data.description}</p>
          <br />
          <h1 className="mb-1 text-lg font-bold">Amenities</h1>
          <ul className="flex flex-row flex-wrap gap-5">
            {data?.amenities?.map((item: string, index: number) => (
              <span
                key={index}
                className="flex flex-row items-center gap-2 text-lg text-gray-500"
              >
                <CheckCircle2 />
                <li key={index}>{item}</li>
              </span>
            ))}
          </ul>
        </div>
        {data.owner !== user._id && (
          <div className="mx-auto w-full sm:block">
            <BookingForm data={data} user={user} />
          </div>
        )}
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
      <Meta
        title={data ? data.boatName : "boat"}
        description={data?.description}
      />

      <Header {...user}>
        <Link href="/" className="ml-6 text-sm font-bold text-cyan-600">
          Home
        </Link>
      </Header>
      <hr className="mb-2 mt-1 h-px border-0 bg-gray-200" />

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
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { req, params } = context;

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
      `${process.env.NEXT_PUBLIC_API_URL}/boat/${params.index}`,
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
