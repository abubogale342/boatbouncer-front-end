import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import boat from "../../../public/boat.png";
import logo from "../../../public/logo.svg";

function baseLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative h-screen">
      <header className="absolute top-0 left-8">
        <div className="flex h-20 items-center">
          <Image src={logo} alt="logo" />
        </div>
      </header>

      <motion.div className="flex h-full w-full items-center">
        <div className="mx-4 my-56 flex flex-grow justify-center sm:mx-8">
          {children}
        </div>
        <div className="hidden md:block md:w-1/2 xl:w-auto">
          <Image
            src={boat}
            alt="Boat Image"
            className="hidden h-screen w-full md:block xl:w-auto"
          />
        </div>
      </motion.div>
      <footer className="absolute bottom-0 left-8">
        <div className="flex h-20 items-center">
          <p className="text-gray-500">&copy; boatbouncer</p>
        </div>
      </footer>
    </div>
  );
}

export default baseLayout;
