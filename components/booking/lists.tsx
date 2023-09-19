import useWindowSize from "@/lib/hooks/use-window-size";
import Boat from "../boat";
import { Fragment, useEffect, useState } from "react";

import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { resetId, setActiveId } from "features/bookmark/bookmarkSlice";
import { useDispatch, useSelector } from "react-redux";

const MOBILE_PER_PAGE = 1;
const DESKTOP_PER_PAGE = 4;

const Lists = ({
  bookmarks,
  userType,
  idExists,
}: {
  bookmarks: any;
  userType: string;
  idExists: boolean;
}) => {
  const [index, setIndex] = useState(0);
  const { isMobile, isDesktop } = useWindowSize();
  const dispatch = useDispatch();
  const { id } = useSelector((state: any) => state.bookmark.bookmarkInfo);

  const scrollBookmarkHn = (drxn: string) => {
    if (isMobile) {
      if (drxn === "left") {
        if (index - 1 < 0) {
          setIndex(bookmarks.length - 1);
          dispatch(setActiveId(bookmarks[bookmarks.length - 1].boatId._id));
        } else {
          setIndex((index) => index - 1);
          dispatch(setActiveId(bookmarks[index - 1].boatId._id));
        }
      }

      if (drxn === "right") {
        if (index + 1 === bookmarks.length - 1) {
          setIndex(0);
          dispatch(setActiveId(bookmarks[0].boatId._id));
        } else {
          setIndex((index) => index + 1);
          dispatch(setActiveId(bookmarks[index + 1].boatId._id));
        }
      }
    }

    if (isDesktop) {
      if (bookmarks.length > index * DESKTOP_PER_PAGE + DESKTOP_PER_PAGE) {
        if (drxn == "right") setIndex((index) => index + 1);
        if (drxn == "left" && index > 0) setIndex((index) => index - 1);
      } else {
        if (drxn == "left" && index > 0) setIndex((index) => index - 1);
      }
    }
  };

  let element = <></>;

  useEffect(() => {
    if (!isMobile) return;
    setIndex(0);
  }, [isMobile]);

  useEffect(() => {
    if (!isDesktop) return;
    setIndex(0);
  }, [isDesktop]);

  element =
    bookmarks[index] &&
    (id
      ? [
          ...(isMobile
            ? [bookmarks[index]]
            : bookmarks.slice(
                index * DESKTOP_PER_PAGE,
                index * DESKTOP_PER_PAGE + DESKTOP_PER_PAGE,
              )),
        ]
      : bookmarks
    ).map((boat: any, index: number) => (
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

  return (
    <Fragment>
      {element}
      {bookmarks &&
        id &&
        bookmarks?.length &&
        ((isMobile && bookmarks.length > 1) ||
          (isDesktop && bookmarks.length > 4)) && (
          <div className="mr-10 flex flex-row items-center justify-center gap-6">
            <AiFillLeftCircle
              onClick={() => scrollBookmarkHn("left")}
              size={36}
              color="#219EBC"
            />
            <AiFillRightCircle
              size={36}
              onClick={() => scrollBookmarkHn("right")}
              color="#219EBC"
            />
          </div>
        )}
    </Fragment>
  );
};

export default Lists;
