import Feature from "@/components/home/feature";
import Footer from "@/components/shared/footer";
import { IncomingMessage } from "http";
import { getSession, signOut, useSession } from "next-auth/react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import homePic from "../public/home.png";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import Balancer from "react-wrap-balancer";
import Image from "next/image";
import icon from "../public/icon.svg";
import { Fragment } from "react";
import { Camera } from "lucide-react";

export default function Home() {
  const { data: session, status } = useSession();
  console.log("session", session);

  const searchPlaceHandler = (event: any) => {
    event.preventDefault();
  };

  return (
    <main>
      <div
        className="relative h-screen bg-cover bg-right"
        style={{ backgroundImage: `url("/home.svg")` }}
      >
        <nav className="flex h-16 items-center justify-between">
          <Image src={icon} alt="logo" className="ml-5 md:ml-24" />
          {session ? (
            <div className="mr-12 flex flex-row items-center gap-6">
              <button className="text-xs font-normal text-gray-500">
                <Search size={24} />
              </button>
              <button className="rounded-lg border-2 border-gray-600 px-4 py-1  text-white">
                My Inbox
              </button>

              <DropdownMenu.Root>
                <DropdownMenu.Trigger asChild>
                  <button>
                    <img
                      className="h-14 w-14 rounded-full border-2 border-gray-600 text-white"
                      src={session?.picture || session?.image}
                      alt="Profile"
                    />
                  </button>
                </DropdownMenu.Trigger>

                <DropdownMenu.Portal>
                  <DropdownMenu.Content
                    className="DropdownMenuContent"
                    sideOffset={5}
                  >
                    <DropdownMenu.Item className="DropdownMenuItem">
                      Bookings
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="DropdownMenuItem">
                      My Listings
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="DropdownMenuItem">
                      Payments
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="DropdownMenuItem">
                      Favourites
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="DropdownMenuItem">
                      <Link href="/user/update">Edit Profile</Link>
                    </DropdownMenu.Item>
                    <DropdownMenu.Item className="DropdownMenuItem">
                      <button onClick={() => signOut()}>Log out</button>
                    </DropdownMenu.Item>
                    <DropdownMenu.Arrow className="DropdownMenuArrow" />
                  </DropdownMenu.Content>
                </DropdownMenu.Portal>
              </DropdownMenu.Root>
            </div>
          ) : (
            <div className="flex flex-row items-center">
              <Link
                href="/user/login"
                className=" mr-8 text-xs font-normal text-gray-500"
              >
                Login
              </Link>
              <Link
                href="/user/register"
                className="mr-3 rounded-md bg-yellow-500 px-4 py-2 text-xs  font-normal text-white md:mr-24"
              >
                Create Account
              </Link>
            </div>
          )}
        </nav>

        <motion.div className="absolute top-1/2 left-1/2 m-0 w-4/5 -translate-x-1/2 -translate-y-1/2 md:w-2/3">
          <motion.p className="text-center text-4xl font-bold md:text-6xl">
            <span className="text-white">Happiness is a way </span>
            <span className="text-cyan-600">of travel</span>
          </motion.p>

          <motion.p className="home-sub__header mt-2 text-center text-4xl font-bold sm:mt-3 md:text-6xl">
            Not a destination
          </motion.p>
          <form
            className="relative mx-auto mt-14 w-4/5"
            onSubmit={searchPlaceHandler}
          >
            <Search size={24} className="absolute top-4 left-4" />
            <input
              className="h-12 w-full rounded-3xl border-none pr-4 pl-14 outline-slate-400 placeholder:pl-0 md:h-14 md:pr-44"
              placeholder="Where would you like to travel ;)"
            />
            <button
              type="button"
              className="absolute top-1 right-1 hidden w-fit rounded-3xl bg-cyan-600 py-3 px-6 md:block"
            >
              Start Looking
            </button>
            {/* <button>View Map</button> */}
          </form>
        </motion.div>
      </div>
      {/* <Footer></Footer> */}
    </main>
  );
}

// export async function getServerSideProps({
//   req,
// }: {
//   req: IncomingMessage | undefined;
// }) {
//   const session = await getSession({ req });

//   return {
//     props: {
//       session,
//     },
//   };
// }
