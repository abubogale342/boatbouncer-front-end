import Lists from "@/components/booking/lists";
import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import { AnimatePresence, motion } from "framer-motion";
import { getSession, useSession } from "next-auth/react";
import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import useFetcher from "@/lib/hooks/use-axios";
import Details from "@/components/booking/details";
import AlertDialogs from "@/components/shared/alertDialog";
import Link from "next/link";
import Offer from "@/components/offer";
import Preview from "@/components/offer/preview";
import Meta from "@/components/layout/meta";
import Pay from "@/components/pay";
import Chat from "@/components/chat";
import { AxiosResponse } from "axios";
import { useRouter } from "next/router";
import { CircularProgress } from "@mui/material";
import { resetId, resetIds } from "features/bookmark/bookmarkSlice";

export default function Bookmarks(props: any) {
  const { ...user } = props;
  const { data: session } = useSession();
  const { id } = useSelector((state: any) => state.bookmark.bookmarkInfo);
  const { ids } = useSelector((state: any) => state.bookmark.bookmarkInfo);
  const [bookmarks, setBookmarks] = useState<any>();
  const {
    cancelBooking,
    acceptOffer,
    fetchWithAuth,
    data,
    loading,
    error,
    fetchWithAuthSync,
  } = useFetcher();
  const router = useRouter();
  const { query } = router;
  const { type } = query;

  const [bookingTab, setBookingTab] = useState(type ? "owner" : "renter");
  const [refresh, setRefresh] = useState(false);
  const [chargesEnabled, setchargesEnabled] = useState<Boolean>(false);
  const dispatch = useDispatch();

  let element = null;

  const setRefreshHn = () => {
    setRefresh((r) => !r);
  };

  useEffect(() => {
    if (!session?.token) return;

    fetchWithAuth(`/booking${bookingTab === "owner" ? "" : "?isRenter=true"}`);
  }, [bookingTab, session?.token, refresh]);

  useEffect(() => {
    if (!id) return;
    if (!session?.token) return;
    let bookmark = data && data.filter((d: any) => d._id === id);
    if (bookmark) {
      setBookmarks(bookmark[0]);
    }
  }, [id, data, session?.token]);

  useEffect(() => {
    if (bookingTab === "renter") return;
    if (!session?.token) return;

    fetchWithAuthSync("/user/current")
      .then((res: AxiosResponse) => {
        setchargesEnabled(res.data.chargesEnabled);
      })
      .catch(() => {
        setchargesEnabled(false);
      });
  }, [bookingTab, session?.token]);

  const cancelBookingHn = () => {
    cancelBooking(
      `/booking/cancel/${id}${bookingTab === "owner" ? "" : "?isRenter=true"}`,
      bookmarks,
    );
  };

  const acceptOfferHn = (offerId: string) => {
    acceptOffer(`/offer/accept/${offerId}`).then((response: any) => {
      setRefreshHn();
    });
  };

  const getPaymentHn = () => {
    fetchWithAuthSync("/user/stripAccount", {})
      .then((res: AxiosResponse) => {
        router.replace(res.data.url);
      })
      .catch(() => {});
  };

  if (data?.length > 0) {
    element = (
      <Lists
        bookmarks={ids ? data?.filter((d: any) => d.boatId._id == ids) : data}
        userType={bookingTab}
      />
    );
  }

  if (data && data?.length === 0) {
    element = (
      <div className="h-60 w-full">
        <h1 className="whitespace-nowrap text-center text-2xl text-gray-700">
          You have no active request
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
        <h1 className="mt-2 text-center text-red-800">
          Please make sure your internet is working and try again.
        </h1>
      </div>
    );
  }

  if (loading) {
    element = (
      <div className="h-60 w-full">
        <div className="flex h-full w-full items-center justify-center">
          <CircularProgress color="inherit" size="12.5vh" />
        </div>
      </div>
    );
  }

  console.log("bookmarks", bookmarks);

  return (
    <div className="flex min-h-screen flex-col">
      <Meta title="bookmarks" />
      <Header {...user}>
        <Link href="/" className="ml-6 text-sm font-bold text-cyan-600">
          Home
        </Link>
      </Header>
      <hr className="mb-2 mt-1 h-px border-0 bg-gray-200" />

      <div className="mx-4 sm:mb-6 sm:ml-12">
        <p className="mb-1 text-3xl font-medium text-gray-900">Bookings</p>
        <p className=" text-gray-500">
          Track, manage bookings as renter and owner at one place.
        </p>
        <div className="after:block after:h-px after:w-full after:bg-gray-300 after:content-['']">
          <div className="relative mt-6 flex items-center gap-4">
            <button
              onClick={() => {
                setBookingTab("owner");
              }}
              className={`p-2 text-sm font-medium leading-5 ${
                bookingTab === "owner"
                  ? "border border-b-[#219EBC] bg-[#F9F5FF] text-[#219EBC]"
                  : "text-[#667085]"
              }`}
            >
              As Owner
            </button>
            <button
              onClick={() => {
                setBookingTab("renter");
              }}
              className={`p-2 text-sm font-medium leading-5 ${
                bookingTab === "renter"
                  ? "border border-b-[#219EBC] bg-[#F9F5FF] text-[#219EBC]"
                  : "text-[#667085]"
              }`}
            >
              As Renter
            </button>
            {data && bookingTab == "owner" && (
              <button
                onClick={() => {
                  dispatch(resetIds());
                }}
                className={`${
                  ids ? "opacity-100" : "opacity-0"
                } absolute bottom-0.5 right-0 cursor-pointer rounded-lg border border-gray-300 bg-cyan-600 px-3 py-2 text-center text-white transition-all duration-1000 hover:bg-cyan-700 active:translate-y-[1.5px]`}
              >
                View All
              </button>
            )}
          </div>
        </div>
      </div>

      <AnimatePresence>
        <motion.div
          initial={{ y: 10, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -10, opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`mt-4 flex w-full flex-row gap-x-4 gap-y-6 sm:mt-0 ${
            id ? "flex-col sm:flex-row" : ""
          }`}
        >
          <div
            className={`mb-4 flex h-fit w-full flex-wrap justify-center gap-x-3 gap-y-3 ${
              id
                ? "mx-4 sm:ml-12 sm:min-w-[320px] sm:max-w-[50%] md:max-w-[40%] lg:max-w-sm xl:max-w-md "
                : "mx-4 grid grid-cols-1 sm:ml-12 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            }`}
          >
            {element}
          </div>
          {id && bookmarks && (
            <div className="flex w-full flex-col sm:mr-5 md:mr-10">
              <div className="flex flex-row gap-3 border-b border-solid border-b-slate-200 bg-[#219EBC] px-6 py-2.5 sm:mx-0 sm:rounded-[16px_16px_0px_0px]">
                Profile Picture User Name
              </div>
              <div className="flex w-full flex-col items-start gap-8 lg:mb-5 lg:flex-row lg:gap-2">
                <div className="xl:[45%] flex w-full flex-col bg-[#F8FAFC] lg:w-[52.5%] xl:max-w-xl">
                  <div className="p-6">
                    <p className="font-medium text-[#1C1B1F]">
                      Booking Information
                    </p>
                    <Details info={bookmarks} />
                  </div>
                  <div className="mt-16 flex w-full flex-col sm:mx-0">
                    <p className="flex flex-col items-start gap-2 bg-[#023047] px-6 py-4">
                      <span className="font-medium text-white">
                        {bookmarks?.offerId ? "Your Offer" : "No offer yet"}
                      </span>
                    </p>
                    {bookmarks?.offerId && (
                      <Preview
                        {...bookmarks?.offerId}
                        type={bookmarks.type}
                        className="bg-white px-4"
                      />
                    )}
                    {bookmarks.status !== "Completed" && (
                      <div className="flex h-[68px] flex-row items-start justify-center gap-2 rounded-[0px_0px_16px_16px] bg-[#FFB703] py-4">
                        <AlertDialogs
                          prompt="Yes, Cancel booking"
                          data={JSON.stringify(id)}
                          confirmHandler={cancelBookingHn}
                          description={
                            "This action cannot be undone, but we have plenty of options. so, feel free to look for other boats"
                          }
                        >
                          <button className="box-border flex h-9 flex-row items-center justify-center gap-2 rounded-lg border border-solid border-white bg-white px-[14px] py-2 shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
                            <p className="whitespace-nowrap text-sm font-medium leading-5 text-[#219EBC]">
                              Cancel Booking
                            </p>
                          </button>
                        </AlertDialogs>
                        {bookingTab === "owner" &&
                          bookmarks.owner &&
                          user._id === bookmarks.owner._id &&
                          !bookmarks?.offerId &&
                          chargesEnabled && (
                            <Offer
                              bookId={bookmarks._id}
                              type={bookmarks.type}
                              boatPrice=""
                              captainPrice=""
                              paymentServiceFee=""
                              departureDate={null}
                              returnDate={null}
                              offerType="create"
                              setRefreshHn={setRefreshHn}
                            >
                              <button className="box-border flex h-9 flex-row items-center justify-center gap-2 rounded-lg border border-solid border-white bg-white px-[14px] py-2 shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
                                <p className="whitespace-nowrap text-sm font-medium leading-5 text-[#219EBC]">
                                  Create an Offer
                                </p>
                              </button>
                            </Offer>
                          )}

                        {bookingTab === "owner" &&
                          bookmarks.owner &&
                          user._id === bookmarks.owner._id &&
                          !bookmarks?.offerId &&
                          !chargesEnabled && (
                            <button
                              onClick={getPaymentHn}
                              className="box-border flex h-9 flex-row items-center justify-center gap-2 rounded-lg border border-solid border-white bg-white px-[14px] py-2 shadow-[0px_1px_2px_rgba(16,24,40,0.05)]"
                            >
                              <p className="whitespace-nowrap text-sm font-medium leading-5 text-[#219EBC]">
                                Get Payment
                              </p>
                            </button>
                          )}

                        {bookingTab === "owner" &&
                          bookmarks.owner &&
                          user._id === bookmarks.owner._id &&
                          bookmarks?.offerId && (
                            <Offer
                              bookId={bookmarks._id}
                              type={bookmarks.type}
                              {...bookmarks.offerId}
                              offerType="update"
                              setRefreshHn={setRefreshHn}
                            >
                              <button className="box-border flex h-9 flex-row items-center justify-center gap-2 rounded-lg border border-solid border-white bg-white px-[14px] py-2 shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
                                <p className="whitespace-nowrap text-sm font-medium leading-5 text-[#219EBC]">
                                  Edit Offer
                                </p>
                              </button>
                            </Offer>
                          )}
                        {bookingTab === "renter" &&
                          bookmarks?.renter &&
                          user._id === bookmarks.renter._id &&
                          bookmarks?.offerId &&
                          (bookmarks.offerId.status === "Processing" ? (
                            <Pay bookmarks={bookmarks}>
                              <button className="box-border flex h-9 flex-row items-center justify-center gap-2 rounded-lg border border-solid border-white bg-white px-[14px] py-2 shadow-[0px_1px_2px_rgba(16,24,40,0.05)]">
                                <p className="whitespace-nowrap text-sm font-medium leading-5 text-[#219EBC]">
                                  Pay to complete
                                </p>
                              </button>
                            </Pay>
                          ) : (
                            <button
                              onClick={() =>
                                acceptOfferHn(bookmarks.offerId._id)
                              }
                              className="box-border flex h-9 flex-row items-center justify-center gap-2 rounded-lg border border-solid border-white bg-white px-[14px] py-2 shadow-[0px_1px_2px_rgba(16,24,40,0.05)]"
                            >
                              <p className="whitespace-nowrap text-sm font-medium leading-5 text-[#219EBC]">
                                Accept an Offer
                              </p>
                            </button>
                          ))}
                      </div>
                    )}
                  </div>
                </div>
                <div className="xl:[55%] lg:min-h-parent flex h-fit w-full lg:w-[47.5%] lg:pt-0">
                  <Chat
                    bookmarks={bookmarks}
                    user={user}
                    bookingTab={bookingTab}
                  />
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  );
}

export async function getServerSideProps(context: any) {
  const { req } = context;

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
