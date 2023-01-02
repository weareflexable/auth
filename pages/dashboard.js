import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { checkUser, signOut } from "../utils/auth";
import { toast } from "react-toastify";
import withAuth from "../components/AuthWrapper";
import Link from "next/link";
import supabase from "../utils/supabaseClient";
import { getPlatformPaseto, setPlatformPaseto } from "../src/storage";
import { getPaseto } from "../src/api/platform";
import { useAuthContext } from "../context/AuthContext";
import Redirect from "../components/Redirect";
import Image from "next/image";

const Dashboard = () => {
  const { isAuthenticated, paseto } = useAuthContext();

  if (!paseto) {
    return <div>loading...</div>;
  }

  // component
  return (
    <div className="h-screen flex flex-col items-center justify-start gap-6 bg-black">
      <div className="mb-24 mt-20">
        <Image
          src="/logos/FlexableLogoWhite.svg"
          alt="flexable-logo"
          width={200}
          height={200}
        />
      </div>
      <Redirect />
    </div>
  );
};

export default Dashboard;
