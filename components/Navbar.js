import Link from "next/Link";
import supabase from "../utils/supabaseClient";
import { useRouter } from "next/router";
import { signOut } from "../utils/auth";
import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Navbar({ isAuthenticated }) {
  const [navbarOpen, setNavbarOpen] = React.useState(false);
  const router = useRouter();
  console.log("waa", isAuthenticated);
  // todo: functions

  // sign out
  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) {
      toast.success("logged out successfully");
      router.push("/login");
    }
  };

  const checkSession = async () => {
    const session = await supabase.auth.session();
    console.log(session);
  };
  console.log(isAuthenticated);
  return (
    <>
      <header className="bg-primary">
        <div className="px-4 mx-auto sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-[8vh]">
            <div className="flex-shrink-0">
              <Link href="/">
                <a href="#" title="" className="flex">
                  {/* <img
                  className="w-auto h-8"
                  src="https://cdn.rareblocks.xyz/collection/celebration/images/logo.svg"
                  alt=""
                /> */}
                  <h1 className="text-2xl font-bold text-white">Flexable</h1>
                </a>
              </Link>
            </div>

            <button
              type="button"
              className="inline-flex p-2 text-white transition-all duration-200 rounded-md lg:hidden focus:bg-gray-100 hover:bg-gray-100"
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
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
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>

            <div className="hidden lg:flex lg:items-center lg:justify-center lg:space-x-10">
              <a
                href="#"
                title=""
                className="text-base text-white transition-all duration-200 hover:text-opacity-80"
              >
                {" "}
                Features{" "}
              </a>

              <a
                href="#"
                title=""
                className="text-base text-white transition-all duration-200 hover:text-opacity-80"
              >
                {" "}
                Solutions{" "}
              </a>

              <a
                href="#"
                title=""
                className="text-base text-white transition-all duration-200 hover:text-opacity-80"
              >
                {" "}
                Resources{" "}
              </a>

              <a
                href="#"
                title=""
                className="text-base text-white transition-all duration-200 hover:text-opacity-80"
              >
                {" "}
                Pricing{" "}
              </a>
            </div>

            {isAuthenticated ? (
              <button
                onClick={handleSignOut}
                className="hidden lg:inline-flex items-center justify-center px-5 py-1 text-base transition-all duration-200 hover:bg-secondary hover:text-white focus:text-black focus:bg-yellow-300 font-semibold text-primary bg-white rounded-full"
                role="button"
              >
                {" "}
                Sign Out
              </button>
            ) : (
              <Link href="/register">
                <a
                  title=""
                  className="hidden lg:inline-flex items-center justify-center px-5 py-1 text-base transition-all duration-200 hover:bg-secondary hover:text-white focus:text-black focus:bg-yellow-300 font-semibold text-primary bg-white rounded-full"
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
