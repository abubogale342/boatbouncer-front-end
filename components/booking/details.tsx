import dayjs from "dayjs";

const Details = ({ info }: { info: any }) => {
  const {
    type,
    duration: { start, end },
    status,
  } = info;
  return (
    <div className="flex flex-col">
      <p className="mt-2 text-xs font-light leading-4 text-[#333333]">Boat</p>
      <p className="text-sm font-normal leading-5 text-[#1C1B1F]">
        Sunchaser Party Barge on beautiful lake union
      </p>
      <p className="mt-2 text-xs font-light leading-4 text-[#333333]">
        Captain
      </p>
      <p className="text-sm font-normal leading-5 text-[#1C1B1F]">Included</p>

      <p className="mt-2 text-xs font-light leading-4 text-[#333333]">
        Durations
      </p>
      <p className="text-sm font-normal leading-5 text-[#1C1B1F]">
        {type === "Per Hour"
          ? dayjs(end).diff(dayjs(start), "hour")
          : dayjs(end).diff(dayjs(start), "day")}{" "}
        {type === "Per Hour" ? "hours" : "days"}
      </p>
      <p className="mt-2 text-xs font-light leading-4 text-[#333333]">
        Departure Date
      </p>
      <p className="text-sm font-normal leading-5 text-[#1C1B1F]">
        {dayjs(start).format(
          `dddd, MMMM D, YYYY ${type === "Per Day" ? "" : "h:mm A"}`,
        )}
      </p>
      <p className="mt-2 text-xs font-light leading-4 text-[#333333]">
        Return Date
      </p>
      <p className="text-sm font-normal leading-5 text-[#1C1B1F]">
        {dayjs(start).format(
          `dddd, MMMM D, YYYY ${type === "Per Day" ? "" : "h:mm A"}`,
        )}
      </p>
      <p className="mt-2 text-xs font-light leading-4 text-[#333333]">Status</p>
      <p className="px-2 py-[2px] text-sm font-normal leading-5 text-[#1C1B1F]">
        {status}
      </p>
    </div>
  );
};

export default Details;
