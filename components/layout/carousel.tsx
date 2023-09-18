import { useState } from "react";
import Swipe from "react-easy-swipe";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";
import DynamicImage from "./image";

/**
 * Carousel component for nextJS and Tailwind.
 * Using external library react-easy-swipe for swipe gestures on mobile devices (optional)
 *
 * @param images - Array of images with src and alt attributes
 * @returns React component
 */
export default function Carousel({
  images,
  page,
}: {
  images: any;
  page?: string;
}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  // const url = buildUrl()

  const handleNextSlide = (event: any) => {
    event.preventDefault();
    let newSlide = currentSlide === images.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  const handlePrevSlide = (event: any) => {
    event.preventDefault();
    let newSlide = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };

  return (
    <div className="relative">
      <div
        className={`group relative m-auto flex ${
          page == "search" || page == "listing" || page == "favorite"
            ? "h-56"
            : page == "bookmarks"
            ? "h-32"
            : "h-[82.5vh]"
        } w-full overflow-hidden rounded-lg shadow-sm drop-shadow-sm`}
      >
        {page !== "bookmarks" && (
          <AiFillLeftCircle
            onClick={handlePrevSlide}
            className={`absolute inset-y-1/2 left-4 z-20 m-auto cursor-pointer transition-all ${
              page == "search" || page == "listing" || page == "favorite"
                ? "left-2.5 text-3xl opacity-0 group-hover:opacity-75 sm:left-2.5"
                : "left-4 text-5xl opacity-90 sm:left-5"
            } text-white`}
          />
        )}

        <Swipe
          onSwipeLeft={handleNextSlide}
          onSwipeRight={handlePrevSlide}
          className="relative z-10 h-full w-full"
        >
          {images &&
            images?.length &&
            images.length > 0 &&
            images.map((image: string, index: number) => {
              if (index === currentSlide) {
                return <DynamicImage image={image} key={index} />;
              }
            })}
        </Swipe>

        {page !== "bookmarks" && (
          <AiFillRightCircle
            onClick={handleNextSlide}
            className={`absolute inset-y-1/2 transition-all ${
              page == "search" || page == "listing" || page == "favorite"
                ? "right-2.5 text-3xl opacity-0 group-hover:opacity-75 sm:right-2.5"
                : "right-4 text-5xl opacity-90 sm:right-5"
            } z-20 m-auto cursor-pointer text-white `}
          />
        )}
      </div>
    </div>
  );
}
