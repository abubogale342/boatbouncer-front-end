import useWindowSize from "@/lib/hooks/use-window-size";
import Boat from "../boat";
import { Fragment, useEffect, useRef, useState } from "react";

import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import { setActiveId } from "features/bookmark/bookmarkSlice";
import { useDispatch, useSelector } from "react-redux";

const DESKTOP_PER_PAGE = 4;

const Lists = ({
  bookmarks,
  userType,
}: {
  bookmarks: any;
  userType: string;
}) => {
  const [index, setIndex] = useState(0);
  const { isMobile, isDesktop } = useWindowSize();
  const dispatch = useDispatch();
  const { id } = useSelector((state: any) => state.bookmark.bookmarkInfo);
  const bookmarksRef = useRef<HTMLDivElement | null>(null);

  const scrollBookmarkHn = (drxn: string) => {
    if (isMobile) {
      if (drxn === "left") {
        if (index - 1 < 0) {
          setIndex(bookmarks.length - 1);
          dispatch(setActiveId(bookmarks[bookmarks.length - 1]._id));
        } else {
          setIndex((index) => index - 1);
          dispatch(setActiveId(bookmarks[index - 1]._id));
        }
      }

      if (drxn === "right") {
        if (index + 1 === bookmarks.length - 1) {
          setIndex(0);
          dispatch(setActiveId(bookmarks[0]._id));
        } else {
          setIndex((index) => index + 1);
          dispatch(setActiveId(bookmarks[index + 1]._id));
        }
      }
    }

    if (isDesktop) {
      if (bookmarks.length > index * DESKTOP_PER_PAGE + DESKTOP_PER_PAGE) {
        if (drxn == "right") {
          setIndex((index) => index + 1);
          dispatch(setActiveId(bookmarks[(index + 1) * DESKTOP_PER_PAGE]._id));
        }
        if (drxn == "left" && index > 0) {
          setIndex((index) => index - 1);
          dispatch(setActiveId(bookmarks[(index - 1) * DESKTOP_PER_PAGE]._id));
        }
      } else {
        if (drxn == "left" && index > 0) {
          setIndex((index) => index - 1);
          dispatch(setActiveId(bookmarks[(index - 1) * DESKTOP_PER_PAGE]._id));
        }
      }
    }

    bookmarksRef.current?.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  let element = <></>;

  useEffect(() => {
    if (!isMobile) return;

    const findIndex = bookmarks?.findIndex(
      (bookmark: any) => bookmark._id == id,
    );

    if (findIndex && findIndex !== -1) {
      setIndex(findIndex);
    } else {
      setIndex(0);
    }
  }, [isMobile]);

  useEffect(() => {
    if (!isMobile) return;
    if (!id) return;

    const findIndex = bookmarks?.findIndex(
      (bookmark: any) => bookmark._id == id,
    );

    if (findIndex && findIndex !== -1) {
      setIndex(findIndex);
    }
  }, [id]);

  useEffect(() => {
    if (!isDesktop) return;
    if (!id) return;

    const findIndex = bookmarks?.findIndex(
      (bookmark: any) => bookmark._id == id,
    );

    if (findIndex && findIndex !== -1) {
      setIndex(Math.floor(findIndex / DESKTOP_PER_PAGE));
    }
  }, [id]);

  useEffect(() => {
    if (!isDesktop) return;

    const findIndex = bookmarks?.findIndex(
      (bookmark: any) => bookmark._id == id,
    );

    if (findIndex && findIndex !== -1) {
      setIndex(Math.floor(findIndex / DESKTOP_PER_PAGE));
    } else {
      setIndex(0);
    }
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
        boatName={boat.boatId.boatName}
        location={boat.boatId.location}
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
              className="cursor-pointer"
              color="#219EBC"
              size={36}
            />
            <AiFillRightCircle
              onClick={() => scrollBookmarkHn("right")}
              className="cursor-pointer"
              color="#219EBC"
              size={36}
            />
          </div>
        )}
    </Fragment>
  );
};

export default Lists;
