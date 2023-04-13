import { Search } from "lucide-react";
import icon from "../../public/icon.svg";
import avatar from "../../public/empty-profile-picture.png";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Icon from "./icons/icon";
import Image from "next/image";

export default function Header(props: any) {
  return (
    <header>
      <nav className="flex h-16 items-center justify-between">
        <div className="flex flex-row items-center gap-2">
          <Icon
            className={`ml-5 ${
              props?.page ? "fill-white" : "fill-cyan-600"
            } md:ml-12`}
          />
          <p
            className={`${
              props?.page ? "text-white" : "text-cyan-600"
            } font-sans text-xs font-extrabold`}
          >
            Boatbouncer
          </p>
          {props?.children}
        </div>
        {props?.email || props?.user?.email ? (
          <div className="mr-12 flex flex-row items-center justify-between gap-5">
            <button className="text-xs font-normal text-gray-500">
              <Search size={24} />
            </button>
            <button className="hidden rounded-lg border-2 border-solid border-gray-200 px-4 py-2 font-medium text-gray-700 sm:block">
              My Inbox
            </button>

            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <Image
                  className="h-10 w-10 cursor-pointer rounded-full border-2 border-gray-400 text-white"
                  src={props?.user?.image || avatar}
                  alt=""
                  width="40"
                  height="40"
                />
              </DropdownMenu.Trigger>

              <DropdownMenu.Portal>
                <DropdownMenu.Content
                  className="DropdownMenuContent"
                  sideOffset={5}
                >
                  <DropdownMenu.Item className="flex flex-row gap-3 py-3 pl-4 pr-8">
                    <Image
                      className="h-10 w-10 rounded-full border-2 border-gray-400 text-white"
                      src={props?.user?.image || avatar}
                      width="40"
                      height="40"
                      alt=""
                    />
                    <div className="flex flex-col items-start">
                      <p className="text-sm font-medium text-gray-700">
                        {props?.user?.name ||
                          `${props.firstName ?? ""}${
                            props.lastName ? " " + props.lastName : ""
                          }` ||
                          props.user.email}
                      </p>
                      <p className="text-sm text-gray-500">
                        {props.user.email}
                      </p>
                    </div>
                  </DropdownMenu.Item>
                  <hr className="mt-1 h-px border-0 bg-gray-200" />
                  <DropdownMenu.Item className="py-3 pl-4 text-sm text-gray-700">
                    Bookings
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="py-3 pl-4 text-sm text-gray-700">
                    <Link href="/listings">My Listings</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="py-3 pl-4 text-sm text-gray-700">
                    Payments
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="py-3 pl-4 text-sm text-gray-700">
                    <Link href="/favourites">Favourites</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="py-3 pl-4 text-sm text-gray-700">
                    <Link href="/user/update">Edit Profile</Link>
                  </DropdownMenu.Item>
                  <DropdownMenu.Item className="py-3 pl-4 text-sm text-gray-700">
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
    </header>
  );
}