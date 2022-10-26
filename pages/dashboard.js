import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { signOut } from "../utils/auth";
import { toast } from "react-toastify";
import withAuth from "../components/AuthWrapper";
import Link from "next/link";
import supabase from "../utils/supabaseClient";
import { getPlatformPaseto } from "../src/storage";

const Dashboard = () => {
  const router = useRouter();
  // sign out
  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) {
      toast.success("logged out successfully");
      router.push("/login");
    }
  };

  useEffect(() => {
    // get paseto
    // add paseto to route parameter when you want to push
    console.log(getPlatformPaseto())
    router.push('https://localhost:3002/bookings')
  }, []);

  // component
  return (
    <div className="min-h-[90vh] flex items-center justify-center gap-6 flex-col bg-gray-300">
      <h1 className="px-5 py-2 rounded-lg bg-gray-800 text-white shadow-lg">
        Dashboard
      </h1>
    </div>
  );
};

export default withAuth(Dashboard);
