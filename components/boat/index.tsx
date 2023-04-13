import Image from "next/image";
import FavouriteImage from "../../public/favouriteBoat.svg";

const Boat = ({
  page,
  children,
  boatImg,
  location,
}: {
  page: string;
  children: React.ReactNode | String | string | undefined | null;
  boatImg: string | undefined | null;
  location:
    | {
        address: string;
        city: string;
      }
    | undefined
    | null;
}) => {
  return (
    <div
      className={`flex w-fit flex-col ${
        page === "listing" ? "sm:flex-row" : ""
      }   gap-0 rounded-2xl border border-solid border-zinc-100 p-2`}
    >
      {boatImg ? (
        <img
          src={boatImg}
          alt=""
          className="mb-2 h-auto max-w-xs rounded-2xl sm:h-auto sm:w-auto"
        />
      ) : (
        <Image
          src={FavouriteImage}
          alt=""
          className="mb-2 h-auto max-w-xs rounded-2xl sm:h-auto sm:w-auto"
        />
      )}

      <div className="p-2">
        <div className="flex flex-row items-center justify-between">
          <p className="text-xs font-light text-zinc-900">
            {location?.address}, {location?.city}
          </p>
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
        <p className={`max-w-xs pr-2 text-base font-medium text-zinc-900`}>
          Sunchaser Party Barge on beautiful lake union
        </p>
        <ul className="my-2 flex flex-row items-center gap-2 text-xs font-medium">
          <li className="whitespace-nowrap rounded-2xl bg-gray-100 px-2 py-1 text-zinc-700">
            <span>4-8 Hours Rental</span>
          </li>
          <li className="whitespace-nowrap rounded-2xl bg-orange-50 px-2 py-1 text-orange-700">
            <span>Captioned</span>
          </li>
        </ul>
        {page !== "listing" && (
          <p className="text-zinc-900">
            <span className="font-bold ">$315</span>{" "}
            <span className="text-xs font-light">hour</span>
          </p>
        )}
        {children}
      </div>
    </div>
  );
};

export default Boat;
