import { Fragment } from "react";
import Boat from "../boat";

const Lists = ({
  bookmarks,
  userType,
  idExists,
}: {
  bookmarks: any;
  userType: string;
  idExists: boolean;
}) => {
  let element = <></>;

  element = bookmarks.map((boat: any, index: number) => (
    <Boat
      page="bookmarks"
      key={index}
      boatImg={boat.boatId.imageUrls[0]}
      boatImgs={boat.boatId.imageUrls}
      location={boat.boatId.location}
      status={boat.status}
      start={boat.duration.start}
      end={boat.duration.end}
      renterPrice={boat.renterPrice}
      type={boat.type}
      peer={userType == "renter" ? boat.renter : boat.owner}
      _id={boat.boatId._id}
      idExists={idExists}
    >
      {""}
    </Boat>
  ));

  return <Fragment>{element}</Fragment>;
};

export default Lists;
