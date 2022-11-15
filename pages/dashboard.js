import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { checkUser, signOut } from "../utils/auth";
import { toast } from "react-toastify";
import withAuth from "../components/AuthWrapper";
import Link from "next/link";
import supabase from "../utils/supabaseClient";
import { getPlatformPaseto,setPlatformPaseto } from "../src/storage";
import { getPaseto } from "../src/api/platform";
import { useAuthContext } from "../context/AuthContext";
import Redirect from '../components/Redirect'

const Dashboard = () => {
  const {isAuthenticated, paseto} = useAuthContext()


  if(!paseto){
    return <div>loading...</div>
  }

  // component
  return (
    <div className="min-h-[90vh] flex items-center justify-center gap-6 flex-col bg-gray-300">
      <h1 className="px-5 py-2 rounded-lg bg-gray-800 text-white shadow-lg">
        Dashboard
        <Redirect/>
      </h1>
    </div>
  );
};

export default Dashboard;
