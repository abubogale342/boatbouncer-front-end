import { useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { DateRange } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { SingleInputDateTimeRangeField } from "@mui/x-date-pickers-pro/SingleInputDateTimeRangeField";

import { setActiveId } from "features/bookmark/bookmarkSlice";
import useFetcher from "@/lib/hooks/use-axios";
import { useDispatch } from "react-redux";
import Router from "next/router";

interface IProps {
  data: any;
  user: any;
}

const BookingForm = ({ data, user }: IProps) => {
  const [pricingType, setPricingType] = useState("Per Hour");
  const [timeValue, setTimeValue] = useState<DateRange<Dayjs>>(() => [
    dayjs().add(1, "hour"),
    dayjs().add(2, "hour"),
  ]);

  const [dayValue, setDayValue] = useState<DateRange<Dayjs>>([
    dayjs().add(1, "day"),
    dayjs().add(2, "day"),
  ]);
  const { fetchWithAuthSync } = useFetcher();
  const dispatch = useDispatch();

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setPricingType(event.target.value);
  };

  const requestBookingSubmitHn = (event: React.FormEvent<HTMLFormElement>) => {
    let start;
    let end;

    if (pricingType === "Per Hour") {
      start = timeValue[0]?.toDate().toISOString().replace("Z", "+00:00");
      end = timeValue[1]?.toDate().toISOString().replace("Z", "+00:00");
    } else {
      start = dayValue[0]?.toDate().toISOString().replace("Z", "+00:00");
      end = dayValue[1]?.toDate().toISOString().replace("Z", "+00:00");
    }

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

    fetchWithAuthSync("/booking", bookingData)
      .then(async (res) => {
        dispatch(setActiveId(res.data._id));
        Router.push({ pathname: "/bookmarks" });
      })
      .catch((err) => console.log(err));

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
            className="mb-2 block text-sm font-medium text-gray-900"
          >
            Type
          </label>
          <select
            id="type"
            className="mb-3 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-sm text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
            onChange={handleSelectChange}
            defaultValue={pricingType}
          >
            <option value="Per Hour">Hourly</option>
            <option value="Per Day">Daily</option>
          </select>

          {pricingType === "Per Hour" && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <SingleInputDateTimeRangeField
                className="mt-3 w-full"
                disablePast
                label="Time range"
                value={timeValue}
                onChange={(newValue) => setTimeValue(newValue)}
              />
            </LocalizationProvider>
          )}

          {pricingType === "Per Day" && (
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <SingleInputDateRangeField
                disablePast
                label="Day Range"
                className="mt-3 w-full"
                value={dayValue}
                onChange={(newValue) => setDayValue(newValue)}
              />
            </LocalizationProvider>
          )}
        </div>

        <br />

        <div className="grid grid-cols-2 items-center text-zinc-800">
          <p className="text-xs font-light">Booking Duration</p>
          <p className="text-end">
            <span className="font-medium">12</span>{" "}
            <span className="font-light">Hours</span>
          </p>
          <p className="text-xs font-light">Boat Price</p>
          <p className="text-end font-medium">879.0</p>
          <p className="text-xs font-light">Captain Price</p>
          <p className="text-end  font-medium">238.0</p>

          <hr className="my-1 h-px border-0 bg-gray-200" />
          <hr className="my-1 h-px border-0 bg-gray-200" />

          <p className="text-sm">Booking total</p>
          <p className="text-end  font-medium">$1202.00</p>
        </div>
        <button
          type="submit"
          className="w-full rounded-lg bg-cyan-600 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-cyan-700 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        >
          Request A Booking
        </button>
        <hr className="mb-2 mt-1 h-px border-0 bg-gray-200" />

        <div className="flex flex-col items-start">
          <h5 className="mb-2 text-xs font-bold text-zinc-800 dark:text-white">
            Terms
          </h5>
          <ul className="flex list-inside list-disc flex-col gap-2 text-xs font-light text-zinc-800">
            <li>Fuel Not Included</li>
            <li>Security Deposit 1000</li>
            <li>Cancelation policy</li>
          </ul>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;
