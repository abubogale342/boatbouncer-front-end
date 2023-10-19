import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import useFetcher from "@/lib/hooks/use-axios";
import { useSession } from "next-auth/react";
import { Circle, Plus } from "lucide-react";
import { useEffect, useState } from "react";
import Boat from "../boat";
import {
  resetBoat,
  setBoatInfo,
  setEditableBoat,
} from "features/boat/boatSlice";
import AlertDialogs from "../shared/alertDialog";
import { CircularProgress } from "@mui/material";
import { authGetter } from "@/lib/utils";
import Router from "next/router";
import { setActiveIds } from "features/bookmark/bookmarkSlice";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import Link from "next/link";

const PAGE_SIZE = 10;

const DisplayListings = ({
  addListingsHn,
}: {
  addListingsHn: (status: any) => void;
}) => {
  const {
    fetchWithAuthWCancellation,
    deleteBoat,
    data,
    Axios,
    loading,
    error,
    fetchWithAuthSync,
  } = useFetcher();
  const [favorites, setFavorites] = useState<string[]>([]);
  const editableListing = useSelector((state: any) => state.boat.editableBoat);
  const [chargesEnabled, setchargesEnabled] = useState<Boolean>(true);
  const { data: session } = useSession();
  const dispatch = useDispatch();

  const [pageNo, setPageNo] = useState(1);
  const router = useRouter();

  useEffect(() => {
    const getFavorites = async () => {
      try {
        const favorites = await authGetter(Axios, "boat/favorites");
        if (favorites.total == 0) return;

        const favoriteIds = favorites.data.map(
          (favorite: any) => favorite.boat._id,
        );

        setFavorites(favoriteIds);
      } catch (error) {}
    };

    if (!session?.token) return;
    getFavorites();
  }, [session?.token]);

  useEffect(() => {
    if (!session?.token) return;
    fetchWithAuthWCancellation(
      `/boat/listing?pageNo=${pageNo}&size=${PAGE_SIZE}`,
    );
  }, [session?.token, pageNo]);

  useEffect(() => {
    if (!session?.token) return;

    fetchWithAuthSync("/user/current")
      .then((res: AxiosResponse) => {
        setchargesEnabled(res.data.chargesEnabled);
      })
      .catch(() => {
        setchargesEnabled(false);
      });
  }, [session?.token]);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pageNo]);

  let displayEl = (
    <div className="my-auto mb-3 flex w-full items-center justify-center text-cyan-600">
      <CircularProgress color="inherit" size="7.5vh" />
    </div>
  );

  const nextPage = () => {
    setPageNo((page) => page + 1);
  };

  const prevPage = () => {
    setPageNo((page) => page - 1);
  };

  const editListingHandler = (boat: any) => {
    let boatFields = {
      ...boat,
      securityAllowance: boat.securityAllowance.split(" ")[0],
    };

    dispatch(setEditableBoat(boatFields));
    dispatch(setBoatInfo(boatFields));
    addListingsHn(true);
  };

  const addNewListingHn = () => {
    if (editableListing) {
      dispatch(resetBoat());
    }

    addListingsHn(true);
  };

  const deleteBoatHandler = (boat: any) => {
    dispatch(resetBoat());
    if (data.length - (1 % 10) === 0) {
      if (pageNo > 1) setPageNo((pageNo) => pageNo - 1);
    }
    deleteBoat(`/boat/${boat._id}`, boat);
  };

  const getPaymentHn = () => {
    fetchWithAuthSync("/user/stripAccount", {})
      .then((res: AxiosResponse) => {
        router.replace(res.data.url);
      })
      .catch(() => {});
  };

  if (!error && !loading && data && data?.length == 0 && pageNo == 1) {
    displayEl = (
      <motion.p className="flex h-12 items-center justify-start text-center text-2xl font-semibold text-orange-400">
        You have no listings added.
      </motion.p>
    );
  }

  if (error) {
    displayEl = (
      <p className="mb-3 items-center justify-start text-3xl text-orange-700">
        Error fetching your listings
      </p>
    );
  }

  if (data && data.length === 0 && pageNo > 1) {
    prevPage();
  }

  const bookingClickHn = (boat: any) => {
    dispatch(setActiveIds(boat._id));
    Router.push({
      pathname: "/bookings",
      query: { type: "owner" },
    });
  };

  if (data && data.length > 0) {
    displayEl = data.map((boat: any) => (
      <Boat
        page="listing"
        boatId={boat._id}
        key={boat._id}
        favorite={favorites.includes(boat._id)}
        boatImg={boat.imageUrls[0]}
        boatImgs={boat.imageUrls}
        boatName={boat.boatName}
        location={boat.location}
        captained={boat.captained}
      >
        <div className="flex flex-col items-start gap-2">
          <div className="flex flex-row gap-2">
            <button
              onClick={() => editListingHandler(boat)}
              className="my-2 rounded-lg border border-solid border-cyan-600 px-3 py-2 text-sm font-medium text-cyan-600"
            >
              Edit Listing
            </button>
            <button
              onClick={() => bookingClickHn(boat)}
              className="my-2 flex flex-row items-center rounded-lg border border-solid border-amber-500 px-3 py-2 text-sm font-medium text-amber-500"
            >
              Bookings <Circle size="20" className="ml-2" />
            </button>
          </div>
          <AlertDialogs
            prompt="Yes, delete boat"
            data={boat}
            confirmHandler={deleteBoatHandler}
            description={
              "This action cannot be undone. This will permanently delete your listing information from our servers."
            }
          >
            <button className="my-2 px-3 text-sm font-medium text-gray-500 sm:py-2">
              Delete Listing
            </button>
          </AlertDialogs>
        </div>
      </Boat>
    ));
  }

  return (
    <div className="mx-4 sm:mx-10 lg:mx-20">
      {!chargesEnabled && !error && !loading && data && data?.length >= 1 && (
        <div className="mb-3 flex flex-row flex-wrap text-base font-medium italic text-orange-400 sm:text-lg md:text-xl lg:text-2xl xl:text-3xl">
          <p>
            Your boats will not be visible unless you add a method to get
            payments.{" "}
            <Link onClick={getPaymentHn} href="" className="underline">
              Add Here
            </Link>{" "}
          </p>
          {/* <button onClick={getPaymentHn} className="italic underline">
            
          </button> */}
          <p></p>
        </div>
      )}
      <div className="flex flex-row items-center justify-between">
        <p className="text-xl font-medium text-gray-900 sm:text-3xl">
          My Listings
        </p>
        <button
          onClick={addNewListingHn}
          className="flex flex-row items-center gap-2 rounded-lg bg-cyan-600 px-3 py-2 font-inter text-sm font-medium text-white shadow-sm drop-shadow-sm hover:bg-cyan-700 active:translate-y-[1.5px] sm:gap-2 sm:px-3"
        >
          <Plus size="20" /> Add New Listing
        </button>
      </div>
      <p className="mb-6 mt-1 text-gray-500">
        Track, manage and forecast your Listings.
      </p>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
        {displayEl}
      </div>
      {data?.length > 10 && (
        <>
          <hr className="mb-2 mt-5" />
          <div className="mx-6 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-lg">
              Page {pageNo} | ({data?.length} results)
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
                  pageNo * PAGE_SIZE >= data?.length ? "opacity-40" : ""
                }`}
                disabled={pageNo * PAGE_SIZE >= data?.length}
              >
                Next
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default DisplayListings;
