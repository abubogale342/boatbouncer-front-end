import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import boat from "../../../public/boat.png";
import logo from "../../../public/logo.svg";

function BaseLayout({
  children,
  action,
  prompt,
}: {
  children: React.ReactNode;
  action: String;
  prompt: String;
}) {
  return (
    <div className="h-screen">
      <motion.div className="m-0 flex w-full flex-row items-center p-0">
        <div className="grid h-screen max-h-screen flex-grow grid-cols-1 gap-0">
          <header className="h-fit self-start">
            <div className="flex items-center pb-3 pl-3 pt-3 sm:pl-8 sm:pt-8">
              <Image src={logo} alt="logo" />
            </div>
          </header>
          <div className="mx-4 overflow-y-scroll [-ms-overflow-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden">
            <div className="flex justify-center">
              <motion.div className="h-max w-max">
                <motion.h1
                  className="mb-3 text-3xl font-bold text-gray-900"
                  variants={FADE_DOWN_ANIMATION_VARIANTS}
                >
                  <Balancer>{action}</Balancer>
                </motion.h1>
                <motion.p
                  className="mb-8 text-gray-900"
                  variants={FADE_DOWN_ANIMATION_VARIANTS}
                >
                  <Balancer>{prompt}</Balancer>
                </motion.p>
                {children}
              </motion.div>
            </div>
          </div>
          <footer className="h-fit self-end">
            <div className="flex items-center pb-3 pl-3 pt-3 sm:pb-8 sm:pl-8">
              <p className="text-gray-500">&copy; boatbouncer</p>
            </div>
          </footer>
        </div>
        <div className="hidden md:block md:w-1/2 xl:w-auto">
          <Image
            src={boat}
            alt="Boat Image"
            className="relative hidden h-screen w-full md:block xl:w-auto"
            style={{ objectFit: "cover" }}
            placeholder="blur"
            priority
          />
        </div>
      </motion.div>
    </div>
  );
}

export default BaseLayout;
