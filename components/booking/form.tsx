import { useState } from "react";
import dayjs from "dayjs";
import { setActiveId } from "features/bookmark/bookmarkSlice";
import useFetcher from "@/lib/hooks/use-axios";
import { useDispatch } from "react-redux";
import Router from "next/router";
import Datepicker from "react-tailwindcss-datepicker";
import { DateValueType } from "react-tailwindcss-datepicker/dist/types";
import DatePicker from "react-datepicker";
import { addHours } from "date-fns";
import { PopoverDirectionType } from "react-tailwindcss-datepicker/dist/types";
import "react-datepicker/dist/react-datepicker.css";
import { useSession } from "next-auth/react";
import { LoadingCircle } from "../shared/icons";
import { poster } from "@/lib/utils";

interface IProps {
  data: any;
  user: any;
}

const BookingForm = ({ data, user }: IProps) => {
  const [pricingType, setPricingType] = useState("Per Hour");
  const { data: session } = useSession();

  const perHourPrice = data.pricing.filter(
    ({ type }: { type: string }) => type == "Per Hour",
  )[0].value;

  const perDayPrice = data.pricing.filter(
    ({ type }: { type: string }) => type == "Per Day",
  )[0].value;

  const dispatch = useDispatch();

  const [value, setValue] = useState<DateValueType>({
    startDate: null,
    endDate: null,
  });

  const [dateError, setDateError] = useState("");
  const [startDate, setStartDate] = useState<Date | null>();
  const [endDate, setEndDate] = useState<Date | null>();
  const [bookingError, setBookingError] = useState("");
  const [booking, setBooking] = useState(false);
  const { fetchWithAuthSync } = useFetcher();

  const handleValueChange = (newValue: DateValueType) => {
    setDateError("");
    setValue(newValue);
    setBookingError("");
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPricingType(event.target.value);
    setBookingError("");
  };

  const filterPassedStartTime = (time: Date) => {
    const currentDate = addHours(new Date(), 2);
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const filterPassedEndTime = (time: Date) => {
    const currentDate = addHours(
      startDate ? new Date(startDate) : new Date(),
      3,
    );
    const selectedDate = new Date(time);

    return currentDate.getTime() < selectedDate.getTime();
  };

  const requestBookingSubmitHn = async (
    event: React.FormEvent<HTMLFormElement>,
  ) => {
    setBookingError("");

    if (!session) {
      Router.push({
        pathname: `/user/login`,
        query: {
          redirect_to: `/boat/${location.href.split("/").pop()}`,
        },
      });

      event.preventDefault();
      return;
    }
    let start;
    let end;

    if (pricingType === "Per Hour") {
      if (startDate && endDate) {
        start = startDate.toISOString().replace("Z", "+00:00");
        end = endDate.toISOString().replace("Z", "+00:00");
        setDateError("");
      } else {
        setDateError("Select Booking DateTime Range");
        event.preventDefault();
        return;
      }
    } else {
      if (value?.startDate && value.endDate) {
        setDateError("");
        start = new Date(value?.startDate).toISOString().replace("Z", "+00:00");
        end = new Date(value?.endDate).toISOString().replace("Z", "+00:00");
      } else {
        event.preventDefault();
        setDateError("Select Booking DateTime Range");
        return;
      }
    }

    event.preventDefault();

    const bookingData = {
      boatId: data._id,
      type: pricingType,
      duration: {
        start,
        end,
      },
      renter: user._id,
      renterPrice: 100,
    };

    setBooking(true);

    try {
      const response = await fetchWithAuthSync("/booking", bookingData);
      dispatch(setActiveId(response.data._id));
      Router.push({ pathname: "/bookmarks" });
      event.preventDefault();
    } catch (error: any) {
      setBooking(false);
      setBookingError(error?.response?.data?.message ?? error.message);
      event.preventDefault();
    }

    event.preventDefault();
  };

  return (
    <div className="w-full rounded-lg border border-gray-200 bg-white p-4 shadow dark:border-gray-700 dark:bg-gray-800 sm:p-6 md:p-8">
      <form className="w-full space-y-6" onSubmit={requestBookingSubmitHn}>
        <h5 className="text-lg font-bold text-gray-900 dark:text-white">
          Book Here
        </h5>
        <div>
          <label
            htmlFor="type"
            className="mb-2 block text-sm font-medium text-gray-900 dark:text-[white]"
          >
            Type
          </label>
          <select
            id="type"
            className="mb-5 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            onChange={handleSelectChange}
            defaultValue={pricingType}
          >
            <option value="Per Hour">Hourly</option>
            <option value="Per Day">Daily</option>
          </select>

          {pricingType === "Per Hour" && (
            <div className="flex flex-col items-center justify-center">
              <DatePicker
                timeFormat="p"
                dateFormat="Pp"
                showTimeSelect
                selected={startDate}
                minDate={new Date()}
                onChange={(date) => {
                  setDateError("");
                  setStartDate(date);
                  setBookingError("");
                }}
                filterTime={filterPassedStartTime}
                placeholderText="Starting Time"
                className="mx-auto mb-5 flex w-full justify-center rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
              {/* <span className="w-4 text-2xl"> ~ </span> */}
              <DatePicker
                timeFormat="p"
                dateFormat="Pp"
                showTimeSelect
                selected={endDate}
                placeholderText="Ending Time"
                minDate={addHours(
                  startDate ? new Date(startDate) : new Date(),
                  2,
                )}
                filterTime={filterPassedEndTime}
                onChange={(date) => {
                  setDateError("");
                  setEndDate(date);
                  setBookingError("");
                }}
                calendarClassName="w-full"
                className="mx-auto flex w-full justify-center rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
              />
            </div>
          )}

          {pricingType === "Per Day" && (
            <Datepicker
              value={value}
              showFooter={true}
              minDate={new Date()}
              primaryColor={"cyan"}
              placeholder={"date range"}
              onChange={handleValueChange}
              displayFormat={"DD/MM/YYYY"}
              popoverDirection={"down" as PopoverDirectionType}
            />
          )}
          <p className="text-center text-red-600">
            {dateError ? "Select Booking DateTime Range" : ""}
          </p>
        </div>

        <br />

        <div className="grid grid-cols-2 items-center text-zinc-800 dark:text-[white]">
          <p className="text-xs font-light">Booking Duration</p>
          <p className="text-end">
            <span className="font-medium">
              {pricingType === "Per Hour"
                ? dayjs(endDate).diff(dayjs(startDate), "hour")
                : dayjs(value?.endDate ?? 0).diff(
                    dayjs(value?.startDate ?? 0),
                    "day",
                  )}{" "}
            </span>{" "}
            <span className="font-light">
              {pricingType === "Per Hour" ? "hours" : "days"}
            </span>
          </p>
          <p className="text-xs font-light">Boat Price</p>
          <p className="text-end font-medium">
            {data.currency == "USD" ? "$" : "€"}
            {pricingType === "Per Hour"
              ? dayjs(endDate).diff(dayjs(startDate), "hour") * perHourPrice
              : dayjs(value?.endDate ?? 0).diff(
                  dayjs(value?.startDate ?? 0),
                  "day",
                ) * perDayPrice}
          </p>
          {/* <p className="text-xs font-light">Captain Price</p>
          <p className="text-end  font-medium">238.0</p> */}

          <hr className="my-1 h-px border-0 bg-gray-200" />
          <hr className="my-1 h-px border-0 bg-gray-200" />

          <p className="text-sm">Booking total</p>
          <p className="text-end  font-medium">
            {data.currency == "USD" ? "$" : "€"}
            {pricingType === "Per Hour"
              ? dayjs(endDate).diff(dayjs(startDate), "hour") * perHourPrice
              : dayjs(value?.endDate ?? 0).diff(
                  dayjs(value?.startDate ?? 0),
                  "day",
                ) * perDayPrice}
          </p>
        </div>
        <button
          type="submit"
          className="flex w-full flex-row items-center justify-center gap-2 rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Request A Booking {booking && <LoadingCircle />}
        </button>
        <p className="text-center text-red-600">
          {bookingError ? bookingError : ""}
        </p>
        <hr className="mb-2 mt-1 h-px border-0 bg-gray-200" />

        <div className="flex flex-col items-start">
          <h5 className="mb-2 text-xs font-bold text-zinc-800 dark:text-white">
            Terms
          </h5>
          <ul className="flex list-inside list-disc flex-col gap-2 text-xs font-light text-zinc-800 dark:text-[white]">
            {/* <li>Fuel Not Included</li> */}
            <li>Security Deposit {data.securityAllowance}</li>
            <li>Cancelation policy</li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
