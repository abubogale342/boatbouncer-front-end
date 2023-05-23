import { FADE_DOWN_ANIMATION_VARIANTS } from "@/lib/constants";
import Balancer from "react-wrap-balancer";
import { motion } from "framer-motion";
import Image from "next/image";
import React from "react";
import boat from "../../../public/boat.png";
import logo from "../../../public/logo.svg";
import logo2 from "../../../public/Boat Bouncer Logo 1.png";
import { BoatImg } from "@/components/shared/icons/logo";
import { ArrowLeft, ArrowRight } from "lucide-react";
import Link from "next/link";

function BaseLayout({
  children,
  action,
  prompt,
  step,
  setStep,
}: {
  children: React.ReactNode;
  action: String;
  prompt: String;
  step?: number;
  setStep?: (step: number) => void;
}) {
  return (
    <div className="h-screen overflow-hidden">
      <motion.div className="m-0 flex w-full flex-row items-center p-0">
        <div className="grid h-screen max-h-screen flex-grow grid-cols-1 gap-0">
          <div className="flex flex-col gap-0  overflow-y-scroll [-ms-overflow-y-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden">
            <header className="h-fit self-start">
              <div className="flex items-center pb-3 pl-3 pt-3 sm:pl-8 sm:pt-8">
                <Link
                  href="/"
                  className="flex flex-row items-center gap-[10px]"
                >
                  <Image
                    className={`ml-5 rounded-full md:ml-12`}
                    src={logo2}
                    width={35}
                    height={35}
                    alt=""
                  />{" "}
                  <p className="flex items-center text-xs font-extrabold leading-[15px] text-[#219EBC]">
                    Boatbouncer
                  </p>
                  {/* <Image src={logo} alt="logo" /> */}
                </Link>
              </div>
            </header>
            <div className="mx-4 overflow-y-scroll [-ms-overflow-y-style:'none'] [scrollbar-width:'none'] [&::-webkit-scrollbar]:hidden">
              <div className="flex justify-center">
                <motion.div className="h-max w-max">
                  <motion.h1
                    className="mb-3 flex flex-row justify-between text-3xl font-bold text-gray-900"
                    variants={FADE_DOWN_ANIMATION_VARIANTS}
                  >
                    <Balancer>{action}</Balancer>
                    {(action == "Sign up" || action == "Update Profile") && (
                      <>
                        <button
                          type="button"
                          disabled={step === 1}
                          onClick={() => setStep?.(1)}
                          className={`${step === 1 ? "hidden" : ""}`}
                        >
                          <ArrowLeft />
                        </button>
                        <button
                          type="button"
                          disabled={step === 2}
                          onClick={() => setStep?.(2)}
                          className={`${step === 2 ? "hidden " : ""}`}
                        >
                          <ArrowRight />
                        </button>
                      </>
                    )}
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
          </div>
          <footer className="h-fit self-end">
            <div className="flex items-center pb-3 pl-3 pt-3 sm:pb-8 sm:pl-8">
              <p className="text-gray-500">&copy; boatbouncer</p>
            </div>
          </footer>
        </div>
        <div className="hidden overflow-x-clip md:block md:w-1/2 xl:w-auto">
          <div className="relative hidden h-screen w-full md:block xl:w-auto">
            {BoatImg}
          </div>
        </div>
      </motion.div>
    </div>
  );
}

export default BaseLayout;
