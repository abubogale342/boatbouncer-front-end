import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import Boat from "../boat";
import useFetcher from "@/lib/hooks/use-axios";
import Skeleton from "../shared/icons/skeleton";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { authGetter } from "@/lib/utils";
const PAGE_SIZE = 10;

const SearchResults = ({
  boats,
  total,
  checked,
}: {
  boats: any;
  total?: number;
  checked?: boolean;
}) => {
  const [pageNo, setPageNo] = useState(1);
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState<string[]>([]);

  const { fetchWithAuth, data, loading, error, Axios } = useFetcher();

  useEffect(() => {
    if (!session?.token) return;
    fetchWithAuth(`/boat?pageNo=${pageNo}&size=${PAGE_SIZE}`);
  }, [session?.token, pageNo]);

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const favorites = await authGetter(Axios, "boat/favorites");

        if (favorites.total == 0) return;

        const favoriteIds = favorites.data.map(
          (favorite: any) => favorite.boat._id,
        );

        setFavorites(favoriteIds);
      } catch (error: any) {}
    };

    if (!session?.token) return;
    getFavorites();
  }, [session?.token]);

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pageNo]);

  const nextPage = () => {
    setPageNo((page) => page + 1);
  };

  const prevPage = () => {
    setPageNo((page) => page - 1);
  };

  let element = <></>;

  if (pageNo === 1) {
    element = boats.map((boat: any) => (
      <Link key={boat._id} href={`/boat/${boat._id}`} target="_blank">
        <Boat
          page="search"
          favorite={favorites.includes(boat._id)}
          checked={checked}
          boatImg={boat.imageUrls[0]}
          boatImgs={boat.imageUrls}
          location={boat.location}
          pricing={boat.pricing}
          boatName={boat.boatName}
          currency={boat.currency}
          captained={boat.captained}
          markerId={boat._id}
          boatId={boat._id}
        >
          {""}
        </Boat>
      </Link>
    ));
  }

  if (pageNo !== 1 && loading) {
    element = <Skeleton />;
  }

  if (pageNo !== 1 && !loading && data) {
    element = data.map((boat: any) => (
      <Link key={boat._id} href={`/boat/${boat._id}`} target="_blank">
        <Boat
          page="search"
          boatImg={boat.imageUrls[0]}
          boatImgs={boat.imageUrls}
          location={boat.location}
          pricing={boat.pricing}
          boatName={boat.boatName}
          currency={boat.currency}
          captained={boat.captained}
          markerId={boat._id}
        >
          {""}
        </Boat>
      </Link>
    ));
  }

  if (error) {
    element = (
      <p className="mr-4 h-12 items-center justify-center text-3xl text-red-500">
        Error occured while fetching boats
      </p>
    );
  }

  return (
    <Fragment>
      <div
        className={`grid w-full gap-6 pb-2.5 ${
          checked
            ? "overflow-y-scroll [-ms-overflow-y-style:'none'] [scrollbar-width:'none'] lg:grid-cols-2 [&::-webkit-scrollbar]:hidden"
            : "grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4"
        }`}
      >
        {element}
      </div>
      {total && total > 10 && (
        <>
          <hr className="h-px w-full bg-black" />
          <div className="mx-6 my-5 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-lg">
              Page {pageNo} | ({total} results)
            </p>
            <div className="flex items-center gap-3">
              <button
                onClick={prevPage}
                className={`rounded-lg border px-5 py-1.5 text-lg font-medium ${
                  pageNo === 1 ? "opacity-40" : ""
                }`}
                disabled={pageNo === 1}
              >
                Previous
              </button>
              <button
                onClick={nextPage}
                className={`rounded-lg border px-5 py-1.5 text-lg font-medium ${
                  pageNo * PAGE_SIZE >= total ? "opacity-40" : ""
                }`}
                disabled={pageNo * PAGE_SIZE >= total}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </Fragment>
  );
};

export default SearchResults;
