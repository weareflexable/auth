import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import supabase from "../utils/supabaseClient";
import { useRouter } from "next/router";
import { checkUser } from "../utils/auth";
import axios from "axios";

function MyApp({ Component, pageProps }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        updateSupabaseCookie(event, session);

        if (event === "SIGNED_IN") {
          setIsAuthenticated(true);
        }
        if (event === "SIGNED_OUT") {
          setIsAuthenticated(false);
        }
      }
    );

    // checks if user already signed in when they land
    const user = checkUser();
    if (user) {
      setIsAuthenticated(true);
    }

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  async function updateSupabaseCookie(event, session) {
    // await fetch("/api/auth", {
    //   method: "POST",
    //   headers: new Headers({ "Content-Type": "application/json" }),
    //   credentials: "same-origin",
    //   body: JSON.stringify({ event, session }),
    // });

    await axios.post("/api/auth", { event, session });
  }

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} />
      <Component {...pageProps} />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
        dark
      />
    </>
  );
}

export default MyApp;
