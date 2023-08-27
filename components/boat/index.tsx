import Image from "next/image";
import FavouriteImage from "../../public/favouriteBoat.svg";
import dayjs from "dayjs";
import { Triangle } from "lucide-react";
import { setActiveId } from "features/bookmark/bookmarkSlice";
import { useDispatch, useSelector } from "react-redux";
import Carousel from "../layout/carousel";

const Boat = ({
  page,
  children,
  boatImg,
  location,
  status,
  start,
  checked,
  currency,
  end,
  renterPrice,
  boatImgs,
  type,
  _id,
  captained,
  pricing,
  boatName,
  markerId,
  peer,
}: {
  page: string;
  children: React.ReactNode;
  boatImg: string | undefined | null;
  checked?: boolean;
  location:
    | {
        address: string;
        city: string;
      }
    | undefined
    | null;
  status?: string;
  currency?: string;
  start?: Date;
  end?: Date;
  renterPrice?: number;
  type?: string;
  _id?: string;
  captained?: boolean;
  pricing?: any;
  boatName?: any;
  boatImgs?: string[];
  markerId?: string;
  peer?: any;
}) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state: any) => state.bookmark.bookmarkInfo);
  const images = boatImgs?.filter((boat: string) => boat);

  return (
    <div
      className={`flex h-full w-full flex-col ${
        page == "bookmarks" && "mr-8"
      } justify-between shadow-sm drop-shadow-sm hover:shadow-lg ${
        id && id == _id
          ? "relative order-first w-full flex-col border-[3px] border-[#219EBC] transition-[border-color] duration-1000 sm:flex-row"
          : "w-full border-zinc-100 transition-[border-color] duration-1000"
      } ${_id && " cursor-pointer "} gap-0 rounded-2xl border border-solid p-2`}
      onClick={() => {
        if (_id) {
          dispatch(setActiveId(_id));
        }
      }}
      onMouseEnter={() => {
        if (markerId) {
          document.getElementById(markerId)?.classList.add("active_div");
        }
      }}
      onMouseLeave={() => {
        if (markerId) {
          document.getElementById(markerId)?.classList.remove("active_div");
        }
      }}
    >
      {id && id == _id && (
        <Triangle className="absolute -right-[22px] bottom-1/2 hidden rotate-90 fill-[#219EBC] text-[#219EBC] sm:block" />
      )}
      {!id && page !== "listing" && (
        <div className={`w-full ${page == "bookmarks" ? "h-24" : "h-full"}`}>
          {boatImg ? <Carousel images={images} page={page} /> : null}
        </div>
      )}

      {page == "listing" && boatImg && (
        <div className="h-full">
          {/* <img
            src={boatImg}
            alt=""
            className={`mx-auto mb-2 w-full rounded-2xl object-cover`}
          /> */}
          <Carousel images={images} page={page} />
        </div>
      )}

      <div className="h-fit p-2">
        <div className="flex flex-row items-center justify-between">
          {page !== "bookmarks" ? (
            <p className="text-xs font-light text-zinc-900">
              {location?.address}, {location?.city}
            </p>
          ) : (
            <p className="order-none flex h-[22px] w-[63px] flex-none grow-0 flex-row items-center justify-center rounded-2xl bg-[#F2F4F7] px-2 py-0.5 text-center text-xs font-medium leading-[18px] text-[#344054]">
              {status}
            </p>
          )}
          {page !== "listing" && (
            <p>
              {/* <span style={{ fontSize: "8px" }} className="text-zinc-400">
                28 Bookings
              </span>
              <span
                className="ml-1 font-sans font-semibold tracking-wide text-zinc-900"
                style={{ fontSize: "10px" }}
              >
                4.5 *
              </span> */}
            </p>
          )}
        </div>
        {page == "bookmarks" && start && (
          <p className="text-xs font-normal text-[#1C1B1F]">
            {dayjs(start).format("dddd, MMMM D, YYYY h:mm A")} -{" "}
            {dayjs(end).format("dddd, MMMM D, YYYY h:mm A")}
          </p>
        )}
        <p className={`max-w-xs pr-2 text-base font-medium text-zinc-900`}>
          {boatName}
        </p>
        {page === "bookmarks" && peer && (
          <div className="flex flex-row gap-1 py-1 text-sm font-normal">
            <p>{peer.firstName}</p> <p>{peer.lastName}</p>
          </div>
        )}
        {page !== "bookmarks" && (
          <ul className="my-2 flex flex-row items-center gap-2 text-xs font-medium">
            <li className="whitespace-nowrap rounded-2xl bg-gray-100 px-2 py-1 text-zinc-700">
              <span>4-8 Hours Rental</span>
            </li>
            <li className="whitespace-nowrap rounded-2xl bg-orange-50 px-2 py-1 text-orange-700">
              <span>{captained ? "Captained" : null}</span>
            </li>
          </ul>
        )}
        {page !== "listing" &&
          page !== "bookmarks" &&
          pricing &&
          pricing.map((price: any) => (
            <p className="inline-block w-1/3 text-zinc-900" key={price.type}>
              <span className="font-bold ">
                {currency == "USD" ? "$" : "€"}
                {price.value}
              </span>{" "}
              <span className="text-xs font-light">
                {price.type === "Per Hour"
                  ? "/ hour"
                  : price.type === "Per Day"
                  ? "/ day"
                  : price.type === "Per Night"
                  ? "/ night"
                  : ""}
              </span>
            </p>
          ))}
        {page === "bookmarks" && (
          <p className="flex flex-row justify-between text-zinc-900">
            <span className="text-lg font-light leading-7 text-[#1C1B1F]">
              ${renterPrice}
            </span>{" "}
            <span className="text-lg font-light leading-7 text-[#1C1B1F]">
              {type === "Per Hour"
                ? dayjs(end).diff(dayjs(start), "hour")
                : dayjs(end).diff(dayjs(start), "day")}{" "}
              {type === "Per Hour" ? "hours" : "days"}
            </span>
          </p>
        )}
        {children}
      </div>
    </div>
  );
};

export default Boat;
