import { AnimatePresence, motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import Skeleton from "../shared/icons/skeleton";
import useFetcher from "@/lib/hooks/use-axios";
import { useSession } from "next-auth/react";
import { Circle, Plus } from "lucide-react";
import { useEffect, useLayoutEffect, useState } from "react";
import Boat from "../boat";
import {
  resetBoat,
  setBoatInfo,
  setEditableBoat,
} from "features/boat/boatSlice";
import AlertDialogs from "../shared/alertDialog";
import { CircularProgress } from "@mui/material";

const PAGE_SIZE = 10;

const DisplayListings = ({
  addListingsHn,
}: {
  addListingsHn: (status: any) => void;
}) => {
  const { fetchWithAuth, deleteBoat, data, loading, error, dataLength } =
    useFetcher();
  const editableListing = useSelector((state: any) => state.boat.editableBoat);
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const [pageNo, setPageNo] = useState(1);

  useEffect(() => {
    if (!session?.token) return;
    fetchWithAuth(`/boat/listing?pageNo=${pageNo}&size=${PAGE_SIZE}`);
  }, [session?.token, pageNo, dataLength]);

  useLayoutEffect(() => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }, [pageNo]);

  let displayEl = null;

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
    deleteBoat(`/boat/${boat._id}`, boat);
  };

  if (loading || (!data && !error)) {
    displayEl = (
      <div className="my-auto flex w-full items-center justify-center text-cyan-600">
        <CircularProgress color="inherit" size="7.5vh" />
      </div>
    );
  }

  if (!error && !loading && data && data?.length == 0 && pageNo == 1) {
    displayEl = (
      <motion.p className="mx-2 flex h-14 items-center justify-center text-center text-2xl text-red-500">
        You have no listings added.
      </motion.p>
    );
  }

  if (error) {
    displayEl = (
      <p className="mr-4 h-12 items-center justify-center text-3xl text-orange-700">
        Error fetching your listings
      </p>
    );
  }

  if (data && data.length === 0 && pageNo > 1) {
    prevPage();
  }

  if (data && data.length > 0) {
    displayEl = data.map((boat: any) => (
      <Boat
        page="listing"
        key={boat._id}
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
            <button className="my-2 flex flex-row items-center rounded-lg border border-solid border-amber-500 px-3 py-2 text-sm font-medium text-amber-500">
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
    <AnimatePresence>
      <motion.div
        initial={{ y: 10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: -10, opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="mx-4 sm:mx-10 lg:mx-20"
      >
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
        {dataLength > 10 && (
          <div className="mx-6 my-5 flex flex-col items-center justify-between gap-4 sm:flex-row">
            <p className="text-lg">
              Page {pageNo} | ({dataLength} results)
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
                  pageNo * PAGE_SIZE >= dataLength ? "opacity-40" : ""
                }`}
                disabled={pageNo * PAGE_SIZE >= dataLength}
              >
                Next
              </button>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  );
};

export default DisplayListings;
