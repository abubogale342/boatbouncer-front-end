import Boat from "@/components/boat";
import Meta from "@/components/layout/meta";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { authGetter } from "@/lib/utils";
import { CircularProgress } from "@mui/material";
import { AnimatePresence, motion } from "framer-motion";
import { IncomingMessage } from "http";
import { getSession, useSession } from "next-auth/react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Index(props: any) {
  // const { data, error } = props;
  const [data, setData] = useState<any>();
  const [error, setError] = useState(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const { data: session } = useSession();

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const favorites = await authGetter("boat/favorites");
        if (favorites.total == 0) return;
        setError(null);
        setData(favorites);

        const favoriteIds = favorites.data.map(
          (favorite: any) => favorite.boat._id,
        );

        setFavorites(favoriteIds);
      } catch (error: any) {
        setError(error.message);
      }
    };

    if (!session?.token) return;
    getFavorites();
  }, [session?.token]);

  let element = (
    <div className="my-auto flex w-full items-center justify-center text-cyan-600">
      <CircularProgress color="inherit" size="7.5vh" />
    </div>
  );

  if (data?.data && data?.total > 0) {
    element = data.data.map((d: any, index: number) => (
      <Boat
        key={index}
        page="favorite"
        favorite={favorites.includes(d.boat._id)}
        boatImg={d.boat.imageUrls[0]}
        boatImgs={d.boat.imageUrls}
        boatName={d.boat.boatName}
        boatId={d.boat._id}
        location={d.boat.location}
      >
        {""}
      </Boat>
    ));
  }

  if (data?.data && data?.total == 0) {
    element = (
      <motion.p className="flex h-14 items-center justify-start text-center text-2xl text-red-500">
        You have no favorite boat
      </motion.p>
    );
  }

  if (error) {
    element = (
      <div className="text-center">
        <h1 className="text-2xl text-red-800">
          Error occured, sth wrong happened.
        </h1>
        <h1 className="mt-2 text-red-800">
          Please make sure your internet is working and try again.
        </h1>
      </div>
    );
  }

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
          className="mx-4 my-4 sm:mx-10 sm:my-8 lg:mx-20"
        >
          <p className="text-start text-3xl font-medium text-gray-900">
            Favourites
          </p>
          <p className="mb-6 text-start text-gray-500">
            List of your favourite boats
          </p>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {element}
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
    },
  };
}
