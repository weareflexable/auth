import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import Navbar from "../components/Navbar";
import { useState, useEffect } from "react";
import supabase from "../utils/supabaseClient";
import { useRouter } from "next/router";
import { checkUser } from "../utils/auth";
import axios from "axios";
import { getPlatformPaseto, setPlatformPaseto } from "../src/storage";
import { getPaseto } from "../src/api/platform";
import Sidebar from "../components/Sidebar";

function MyApp({ Component, pageProps }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isSidebar, setIsSidebar] = useState(true);
  const router = useRouter();
  useEffect(() => {
    if (isAuthenticated && !getPlatformPaseto()) {
      getPaseto(supabase.auth.session().access_token).then(setPlatformPaseto);
    }
  }, [isAuthenticated]);
  useEffect(() => {
    // checks if user already signed in when they land
    const user = checkUser();
    if (user) {
      setIsAuthenticated(true);
    }

    const { data: authListener } = supabase.auth.onAuthStateChange(
      (event, session) => {
        updateSupabaseCookie(event, session);
        if (event === "SIGNED_IN") {
          setIsAuthenticated(true);
          router.push("/dashboard");
        }
        if (event === "SIGNED_OUT") {
          setIsAuthenticated(false);
        }
      }
    );

    return () => {
      authListener?.unsubscribe();
    };
  }, []);

  async function updateSupabaseCookie(event, session) {
    await axios.post("/api/auth", { event, session });
  }

  return (
    <>
      <Navbar isAuthenticated={isAuthenticated} setIsSidebar={setIsSidebar} />
      {isSidebar && <Sidebar />}
      <div className="h-[100vh]">
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
      </div>
    </>
  );
}

export default MyApp;
