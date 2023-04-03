import Image from "next/image";
import favouriteImage from "../../public/favouriteBoat.svg";

const Boat = () => (
  <div className="flex w-fit flex-col gap-0 rounded-2xl border border-solid border-zinc-100 p-2">
    <Image src={favouriteImage} alt="Image" className="mb-2 rounded-2xl" />
    <div className="p-2">
      <div className="flex flex-row items-center justify-between">
        <p className="text-xs font-light text-zinc-900">KIRKLAND,WA</p>
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
      </div>
      <p className="w-56 text-base font-medium text-zinc-900">
        Sunchaser Party Barge on beautiful lake union
      </p>
      <p className="my-2 flex flex-row items-center gap-2">
        <span className="whitespace-nowrap rounded-2xl bg-gray-100 px-2 py-1 text-zinc-700">
          <li>4-8 Hours Rental</li>
        </span>
        <span className="whitespace-nowrap rounded-2xl bg-orange-50 px-2 py-1 text-orange-700">
          <li>Captioned</li>
        </span>
      </p>
      <p className="text-zinc-900">
        <span className="font-bold ">$315</span>{" "}
        <span className="text-xs font-light">hour</span>
      </p>
    </div>
  </div>
);

export default Boat;
