import Image from "next/image";
import { useState } from "react";
import Swipe from "react-easy-swipe";
import { AiFillLeftCircle, AiFillRightCircle } from "react-icons/ai";

/**
 * Carousel component for nextJS and Tailwind.
 * Using external library react-easy-swipe for swipe gestures on mobile devices (optional)
 *
 * @param images - Array of images with src and alt attributes
 * @returns React component
 */
export default function Carousel({ images }: { images: any }) {
  const [currentSlide, setCurrentSlide] = useState(0);

  const handleNextSlide = () => {
    let newSlide = currentSlide === images.length - 1 ? 0 : currentSlide + 1;
    setCurrentSlide(newSlide);
  };

  const handlePrevSlide = () => {
    let newSlide = currentSlide === 0 ? images.length - 1 : currentSlide - 1;
    setCurrentSlide(newSlide);
  };

  return (
    <div className="relative">
      <AiFillLeftCircle
        onClick={handlePrevSlide}
        className="absolute inset-y-1/2 left-4 z-20 m-auto cursor-pointer text-5xl text-white opacity-90 sm:left-5"
      />

      <div className="relative m-auto flex h-[50vh] w-full overflow-hidden">
        <Swipe
          onSwipeLeft={handleNextSlide}
          onSwipeRight={handlePrevSlide}
          className="relative z-10 h-full w-full"
        >
          {images.map((image: string, index: number) => {
            if (index === currentSlide) {
              return (
                <Image
                  key={index}
                  src={image}
                  alt=""
                  fill
                  object-fit="contain"
                  className="animate-fadeIn"
                />
              );
            }
          })}
        </Swipe>
      </div>

      <AiFillRightCircle
        onClick={handleNextSlide}
        className="absolute inset-y-1/2 right-4 z-20 m-auto cursor-pointer text-5xl text-white opacity-90 sm:right-5"
      />

      <div className="absolute inset-x-1/2 bottom-4 z-20">
        <div className="relative flex w-fit justify-center rounded-full bg-white p-2">
          {images.map((_: any, index: number) => {
            return (
              <div
                className={
                  index === currentSlide
                    ? "mx-2 h-3 w-3 cursor-pointer rounded-full bg-gray-900"
                    : "mx-2 h-3 w-3 cursor-pointer rounded-full bg-gray-300"
                }
                key={index}
                onClick={() => {
                  setCurrentSlide(index);
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}
