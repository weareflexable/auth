import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { checkUser, signOut } from "../utils/auth";
import { toast } from "react-toastify";
import withAuth from "../components/AuthWrapper";
import Link from "next/link";
import supabase from "../utils/supabaseClient";
import { getPlatformPaseto,setPlatformPaseto } from "../src/storage";
import { getPaseto } from "../src/api/platform";

const Dashboard = () => {
  const router = useRouter();
  const [isAuthenticated,setIsAuthenticated] = useState(false)
  // sign out
  const handleSignOut = async () => {
    const { error } = await signOut();
    if (!error) {
      toast.success("logged out successfully");
      router.push("/login");
    }
  };
  
  useEffect(() => {

    // console.log(getPlatformPaseto())
    console.log(isAuthenticated)
    if (isAuthenticated) {
      console.log('run once')
      // console.log(supabase.auth.session())
      // getPaseto(supabase.auth.session().access_token).then(setPlatformPaseto);
    }
  }, [isAuthenticated]);

  useEffect(() => { 
    const user = checkUser()
    if(user){
      setIsAuthenticated(true)
      // getPaseto(supabase.auth.session().access_token).then(setPlatformPaseto);
    }
    // const paseto = getPlatformPaseto()
    // console.log(paseto)
    // router.push(`https://marketplace.flexabledats.com?${paseto}`)
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

export default Dashboard;
