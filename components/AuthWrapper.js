import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import React from "react";
import supabase from "../utils/supabaseClient";

const withAuth = (Component) => {
  const AuthenticatedComponent = () => {
    const router = useRouter();
    const [user, setUser] = useState(supabase.auth.user());

    useEffect(() => {
      // const getUser = async () => {
      //   const user = await supabase.auth.user();
      //   // const user = localStorage.getItem("supabase.auth.token");
      //   if (!user) {
      //     router.push("/login");
      //   } else {
      //     setUser(user);
      //   }
      // };
      // getUser();
      if (!user) {
        router.push("/login");
      }
    }, []);

    return !!user ? <Component /> : null; // Render whatever you want while the authentication occurs
  };

  return AuthenticatedComponent;
};

export default withAuth;
