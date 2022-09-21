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
      <nav className="top-0 z-50 w-full flex flex-wrap items-center justify-between px-[10%] py-3 navbar-expand-lg shadow bg-gray-700 text-white ">
        <Link href="/">
          <a>Home</a>
        </Link>
        {!isAuthenticated && (
          <div className="flex gap-5">
            <Link href="/login">
              <a>Sign In</a>
            </Link>
            <Link href="/register">
              <a>Sign Up</a>
            </Link>
          </div>
        )}
        {isAuthenticated && (
          <button className="capitalize" onClick={handleSignOut}>
            sign out
          </button>
        )}
      </nav>
    </>
  );
}
