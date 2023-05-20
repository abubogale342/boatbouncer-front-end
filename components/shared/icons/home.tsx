import Image from "next/image";
import home from "public/home.png";

export const HomeIcon = (
  <Image
    alt=""
    priority
    placeholder="blur"
    src={home}
    className="h-screen w-screen"
    style={{ objectFit: "cover", objectPosition: "right" }}
  />
);
