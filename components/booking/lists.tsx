import { Fragment } from "react";
import Boat from "../boat";

const Lists = ({
  bookmarks,
  userType,
}: {
  bookmarks: any;
  userType: string;
}) => {
  let element = <></>;

  element = bookmarks.map((boat: any, index: number) => (
    <Boat
      page="bookmarks"
      key={index}
      boatImg={boat.imageUrls}
      location={boat.location}
      status={boat.status}
      start={boat.duration.start}
      end={boat.duration.end}
      renterPrice={boat.renterPrice}
      type={boat.type}
      peer={userType == "renter" ? boat.renter : boat.owner}
      _id={boat._id}
    >
      {""}
    </Boat>
  ));

  return <Fragment>{element}</Fragment>;
};

export default Lists;
