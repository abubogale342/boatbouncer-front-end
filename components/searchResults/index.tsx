import { Fragment, useEffect, useLayoutEffect, useState } from "react";
import Boat from "../boat";
import useFetcher from "@/lib/hooks/use-axios";
import Skeleton from "../shared/icons/skeleton";
import { useSession } from "next-auth/react";
import Link from "next/link";
const PAGE_SIZE = 10;

const SearchResults = ({ boats, total }: { boats: any; total: number }) => {
  const [pageNo, setPageNo] = useState(1);
  const { data: session } = useSession();

  const { fetchWithAuth, data, loading, error } = useFetcher();

  useEffect(() => {
    if (!session?.token) return;
    fetchWithAuth(`/boat?pageNo=${pageNo}&size=${PAGE_SIZE}`);
  }, [session?.token, pageNo]);

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
      <Link key={boat._id} href={`/boat/${boat._id}`}>
        <Boat page="" boatImg={boat.imageUrls} location={boat.location}>
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
      <Boat
        key={boat._id}
        page=""
        boatImg={boat.imageUrls}
        location={boat.location}
      >
        {""}
      </Boat>
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
      {element}
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
    </Fragment>
  );
};

export default SearchResults;