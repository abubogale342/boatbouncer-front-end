import Image from "next/image";

const DynamicImage = ({ image }: { image: string }) => {
  return (
    <Image
      src={image}
      fill
      alt=""
      className="animate-fadeIn relative mx-auto h-full w-fit max-w-[100%] object-cover md:block xl:w-auto"
    />
  );
};

export default DynamicImage;
