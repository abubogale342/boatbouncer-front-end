import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { IncomingMessage } from "http";
import { getSession } from "next-auth/react";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import AddListing from "@/components/listing/add";
import { AnimatePresence, motion } from "framer-motion";
import useGeolocation from "react-hook-geolocation";
import { useDispatch } from "react-redux";
import { updateCoordinateField } from "features/boat/boatSlice";
import DisplayListings from "@/components/listing/display";

export default function Index(props: any) {
  const [enableAddList, setEnableAddList] = useState(false);
  const geolocation = useGeolocation();
  const dispatch = useDispatch();

  const addListingHandler = (status: boolean) => {
    setEnableAddList(status);
  };

  useEffect(() => {
    if (!geolocation.error) {
      dispatch(
        updateCoordinateField({ key: "latitude", value: geolocation.latitude }),
      );

      dispatch(
        updateCoordinateField({
          key: "longitude",
          value: geolocation.longitude,
        }),
      );
    }
  }, [geolocation.latitude, geolocation.longitude]);

  let listingEl = <DisplayListings addListingsHn={addListingHandler} />;

  if (enableAddList) {
    listingEl = <AddListing cancelHn={addListingHandler} />;
  }

  return (
    <Fragment>
      <Header {...props}>
        <Link href="/" className="ml-6 text-sm font-bold text-cyan-600">
          Home
        </Link>
      </Header>
      <hr className="mt-1 h-px border-0 bg-gray-200" />
      <main className="my-4 sm:my-8">{listingEl}</main>
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
