import { Search } from "lucide-react";
import icon from "../../public/icon.svg";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import Link from "next/link";
import { signOut } from "next-auth/react";
import Icon from "./icons/icon";

export default function Header(props) {
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
        </div>
        {props.email || props.user.email ? (
          <div className="mr-12 flex flex-row items-center gap-6">
            <button className="text-xs font-normal text-gray-500">
              <Search size={24} />
            </button>
            <button className="rounded-lg border-2 border-solid border-gray-200 px-4 py-2 text-base font-medium text-gray-700">
              My Inbox
            </button>

            <DropdownMenu.Root>
              <DropdownMenu.Trigger asChild>
                <button>
                  <img
                    className="h-14 w-14 rounded-full border-2 border-gray-400 text-white"
                    src={props?.user?.image || "/empty-profile-picture.png"}
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
                    <Link href="/favourites">Favourites</Link>
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
    </header>
  );
}
