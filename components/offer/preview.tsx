import dayjs from "dayjs";
import { DateType } from "react-tailwindcss-datepicker/dist/types";

const Preview = ({
  boatPrice,
  captainPrice,
  paymentServiceFee,
  departureDate,
  returnDate,
  className,
  source,
  type,
}: {
  boatPrice: string;
  captainPrice: string;
  paymentServiceFee: string;
  departureDate: DateType | undefined;
  returnDate: DateType | undefined;
  className?: string;
  source?: string;
  type?: string;
}) => {
  return (
    <div
      className={
        "my-6 grid grid-cols-1 items-center whitespace-nowrap md:grid-cols-2 md:gap-y-2 " +
        className
      }
    >
      {source && source !== "pay" && (
        <p className="text-xs font-light text-gray-800">Return Date</p>
      )}
      {source && source !== "pay" && (
        <p className="mb-2 font-medium text-gray-800 md:mb-0 md:justify-self-end">
          {departureDate
            ? dayjs(departureDate).format(
                `${
                  type == "Per Day"
                    ? "ddd MMM DD YYYY"
                    : "ddd MMM DD YYYY HH:mm"
                }`,
              )
            : ""}
        </p>
      )}
      {source && source !== "pay" && (
        <p className="text-xs font-light text-gray-800">Departure Date</p>
      )}
      {source && source !== "pay" && (
        <p className="mb-2 font-medium text-gray-800 md:mb-0 md:justify-self-end">
          {returnDate
            ? dayjs(returnDate).format(
                `${
                  type == "Per Day"
                    ? "ddd MMM DD YYYY"
                    : "ddd MMM DD YYYY HH:mm"
                }`,
              )
            : ""}
        </p>
      )}
      <p className="text-xs font-light text-gray-800">Boat Price</p>
      <p className="mb-2 font-medium text-gray-800 md:mb-0 md:justify-self-end">
        {boatPrice}
      </p>
      <p className="text-xs font-light text-gray-800">Captain Price</p>
      <p className="mb-2 font-medium text-gray-800 md:mb-0 md:justify-self-end">
        {captainPrice}
      </p>
      <p className="whitespace-nowrap text-xs font-light text-gray-800">
        Payment Service Fee (non-refundable)
      </p>
      <p className="mb-2 font-medium text-gray-800 md:mb-0 md:justify-self-end">
        {paymentServiceFee}(7.5%)
      </p>
      <p className="text-xs font-light text-gray-800">Local Tax</p>
      <p className="mb-2 font-medium text-gray-800 md:mb-0 md:justify-self-end">
        20.40(10.25%)
      </p>
      <p className="text-sm text-gray-800">Total Payment</p>
      <p className="mb-2 font-medium text-gray-800 md:mb-0 md:justify-self-end">
        $1202.00
      </p>
    </div>
  );
};

export default Preview;
