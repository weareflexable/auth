import Link from "next/link";
import supabase from "../utils/supabaseClient";
import { useRouter } from "next/router";
import { signOut } from "../utils/auth";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar({ isAuthenticated, setIsSidebar }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const router = useRouter();
  // todo: functions

  // sign out
  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) {
      toast.success("logged out successfully");
      router.push("/login");
    }
  };

  return (
    <>
      <header className="bg-black h-[8vh] z-[50] w-full fixed">
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 ">
            <div className="flex-shrink-0">
              <Link href="/">
                <a href="#" title="" className="flex">
                  <h1 className="text-2xl font-bold text-white">Flexable</h1>
                </a>
              </Link>
            </div>

            <button
              onClick={() => setIsSidebar((prev) => !prev)}
              type="button"
              className="inline-flex p-2 text-white transition-all duration-200 rounded-md lg:hidden  hover:text-secondary"
            >
              {/* <!-- Menu open: "hidden", Menu closed: "block" --> */}
              <svg
                className="block w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 8h16M4 16h16"
                ></path>
              </svg>

              {/* <!-- Menu open: "block", Menu closed: "hidden" --> */}
              <svg
                className="hidden w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>

            <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
              <Link href="/dashboard">
                <a
                  title=""
                  className="uppercase text-base text-white transition-all duration-200 hover:text-opacity-80"
                >
                  {" "}
                  Home{" "}
                </a>
              </Link>

              <a
                href="#"
                title=""
                className="uppercase text-base text-white transition-all duration-200 hover:text-opacity-80"
              >
                {" "}
                Night Life{" "}
              </a>

              <a
                href="#"
                title=""
                className="uppercase text-base text-white transition-all duration-200 hover:text-opacity-80"
              >
                {" "}
                Restaurants{" "}
              </a>

              <a
                href="#"
                title=""
                className="uppercase text-base text-white transition-all duration-200 hover:text-opacity-80"
              >
                {" "}
                Greek Life{" "}
              </a>
            </div>

            {isAuthenticated ? (
              <button
                onClick={handleSignOut}
                className="hidden lg:inline-flex items-center justify-center px-5 py-[1px] text-base transition-all duration-200  hover:text-white focus:text-black focus:bg-yellow-300 font-semibold text-gray-600  rounded-full"
                role="button"
              >
                {" "}
                Sign Out
              </button>
            ) : (
              <Link href="/register">
                <a
                  title=""
                  className="hidden lg:inline-flex items-center justify-center px-5 py-1 text-base transition-all duration-200  hover:opacity-[100%] focus:text-black focus:bg-yellow-300  text-secondary opacity-[80%] rounded-full "
                  role="button"
                >
                  {" "}
                  Join Now{" "}
                </a>
              </Link>
            )}
          </div>
        </div>
      </header>
    </>
  );
}
