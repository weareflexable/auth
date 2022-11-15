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
import {AuthContextProvider} from '../context/AuthContext'

function MyApp({ Component, pageProps }) {


  return (
    <>
      {/* <Navbar isAuthenticated={isAuthenticated} /> */}
      <div className="h-[92vh]">
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
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
