import Image from "next/image";
import FavouriteImage from "../../public/favouriteBoat.svg";
import dayjs from "dayjs";
import { Triangle } from "lucide-react";
import { setActiveId } from "features/bookmark/bookmarkSlice";
import { useDispatch, useSelector } from "react-redux";

const Boat = ({
  page,
  children,
  boatImg,
  location,
  status,
  start,
  end,
  renterPrice,
  type,
  _id,
}: {
  page: string;
  children: React.ReactNode;
  boatImg: string | undefined | null;
  location:
    | {
        address: string;
        city: string;
      }
    | undefined
    | null;
  status?: string;
  start?: Date;
  end?: Date;
  renterPrice?: number;
  type?: string;
  _id?: string;
}) => {
  const dispatch = useDispatch();
  const { id } = useSelector((state: any) => state.bookmark.bookmarkInfo);

  return (
    <div
      className={`mx-2 flex h-fit flex-col ${
        page === "listing" ? "sm:flex-row" : ""
      } ${
        id && id == _id
          ? "relative order-first w-full flex-col border-[3px] border-[#219EBC] transition-[border-color] duration-1000 sm:flex-row"
          : "border-zinc-100 transition-[border-color] duration-1000"
      } ${
        _id && " cursor-pointer "
      } gap-0 rounded-2xl border border-solid p-2 sm:ml-5 md:ml-10`}
      onClick={() => {
        if (_id) {
          dispatch(setActiveId(_id));
        }
      }}
    >
      {id && id == _id && (
        <Triangle className="absolute -right-[22px] bottom-1/2 hidden rotate-90 fill-[#219EBC] text-[#219EBC] sm:block" />
      )}
      {!id &&
        (boatImg ? (
          <img
            src={boatImg}
            alt=""
            className="mx-auto mb-2 h-auto max-w-xs rounded-2xl sm:h-auto sm:w-auto"
          />
        ) : (
          <Image
            src={FavouriteImage}
            alt=""
            className="mx-auto mb-2 h-auto max-w-xs rounded-2xl sm:h-auto sm:w-auto"
          />
        ))}

      <div className="p-2">
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
              <span style={{ fontSize: "8px" }} className="text-zinc-400">
                28 Bookings
              </span>
              <span
                className="ml-1 font-sans font-semibold tracking-wide text-zinc-900"
                style={{ fontSize: "10px" }}
              >
                4.5 *
              </span>
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
          Sunchaser Party Barge on beautiful lake union
        </p>
        {page !== "bookmarks" && (
          <ul className="my-2 flex flex-row items-center gap-2 text-xs font-medium">
            <li className="whitespace-nowrap rounded-2xl bg-gray-100 px-2 py-1 text-zinc-700">
              <span>4-8 Hours Rental</span>
            </li>
            <li className="whitespace-nowrap rounded-2xl bg-orange-50 px-2 py-1 text-orange-700">
              <span>Captioned</span>
            </li>
          </ul>
        )}
        {page !== "listing" && page !== "bookmarks" && (
          <p className="text-zinc-900">
            <span className="font-bold ">$315</span>{" "}
            <span className="text-xs font-light">hour</span>
          </p>
        )}
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
