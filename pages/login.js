import React from "react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import { toast } from "react-toastify";
import { signIn, signInWithProvider } from "../utils/auth";
import { getPlatformPaseto, setPlatformPaseto } from "../src/storage";
import { getPaseto } from "../src/api/platform";
import supabase from "../utils/supabaseClient";

const Login = () => {
  // todo: states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { redirect_to } = router.query;

  // todo: functions
  const handleSignIn = async (e) => {
    localStorage.setItem("redirect_to", redirect_to);
    e.preventDefault();
    if (!email || !password) {
      toast.error("One or more fields are missing");
      return;
    }
    setIsSubmitting(true);
    const { error, session } = await signIn({ email, password });
    console.log("login session", session);
    if (error) {
      setIsSubmitting(false);
      toast.error(error.message);
    }
    if (session) {
      setIsSubmitting(false);
      // getPaseto(supabase.auth.session().access_token).then(setPlatformPaseto);
      // const paseto = getPlatformPaseto();
      toast.success("Logged in successfully");
      router.push(`/dashboard`);
    }
  };

  const handleProviderLogin = async (provider) => {
    localStorage.setItem("redirect_to", redirect_to);
    setIsSubmitting(true);
    // this redirects whenever it's succesful
    setIsSubmitting(true);
    const { error, user } = await signInWithProvider(provider);

    // everything from here downwards is proving to be very useless, because logic
    // _app.js is disrupting the entire flow

    // if (error) {
    //   setIsSubmitting(false);
    //   toast.error(error.message);
    // }
    // if (user) {
    //   setIsSubmitting(false);
    //   const paseto = getPlatformPaseto()
    //   toast.success("Logged in successfully");
    //   router.push(`/https://localhost:3002/bookings/${paseto}`);
    setIsSubmitting(false);
  };
  // };

  function handleRegister() {
    localStorage.setItem("redirect_to", redirect_to);
    router.push("/register");
  }

  return (
    <>
      <Head>
        <title>Flexable | Login</title>
        <meta name="description" content="Flexable login" />
        <link rel="icon" href="/logos/logo_colored.png" />
      </Head>
      <div className=" flex flex-col lg:flex-row h-screen">
        <div className="flex flex-col md:pb-8 bg-[#242525] lg:w-1/2 items-center justify-start">
          <div className="hidden lg:block">
            <Image
              src="/logos/logo.svg"
              alt="flexable-logo"
              width={200}
              height={200}
            />
          </div>
          <div className="-mt-4 lg:hidden block">
            <Image
              src="/logos/logo.svg"
              alt="flexable-logo"
              width={200}
              height={200}
            />
          </div>
          <div className="flex flex-col lg:mt-32 -mt-2 text-center lg:text-left">
            <h3 className="lg:text-5xl text-4xl text-white font-semibold font-figtree lg:mb-2">
              Sign In &
            </h3>
            <h1 className="lg:text-6xl text-5xl text-[#A6A6A7] font-semibold font-figtree text-center lg:text-left">
              Get access to:
            </h1>
            <div className="flex lg:mt-4 mb-12 lg:mb-0 mt-6">
              <div className="flex flex-col mr-12 text-[#A6A6A7] font-figtree lg:text-left text-center">
                <div className="flex">
                  <Image
                    src="/checkmark.svg"
                    alt="check-icon"
                    width={15}
                    height={15}
                  />
                  <span className="ml-1.5">Night life</span>
                </div>
                <div className="flex">
                  <Image
                    src="/checkmark.svg"
                    alt="check-icon"
                    width={15}
                    height={15}
                  />
                  <span className="ml-1.5">Restaurants</span>
                </div>
              </div>
              <div className="flex flex-col text-[#A6A6A7] font-figtree">
                <div className="flex">
                  <Image
                    src="/checkmark.svg"
                    alt="check-icon"
                    width={15}
                    height={15}
                  />
                  <span className="ml-1.5">Memberships</span>
                </div>
                <div className="flex">
                  <Image
                    src="/checkmark.svg"
                    alt="check-icon"
                    width={15}
                    height={15}
                  />
                  <span className="ml-1.5">Events & more</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col flex-grow bg-black lg:w-1/2 text-center lg:text-left items-center justify-center ">
          <h1 className="text-3xl font-figtree text-white font-semibold lg:mt-0 mb-8 mt-8">
            Login
          </h1>
          <button
            className="bg-transparent font-figtree border-2 border-[#2A2B2A] text-[#AB4DF7] rounded-3xl w-80 h-10 md:mt-4 mb-6"
            onClick={() => handleProviderLogin("google")}
          >
            Continue with Google
          </button>
          <span className="font-figtree font-bold text-[#6E6E6F] mb-8">OR</span>
          <form onSubmit={handleSignIn}>
            <input
              className="form-input rounded-sm shadow-sm mb-4 w-[95%] md:w-full pl-2 h-12 bg-transparent border-2 text-[#6E6E6F] font-figtree border-[#2A2B2A] "
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              className="form-input rounded-sm shadow-sm w-[95%] md:w-full pl-2 h-12 bg-transparent border-2 text-[#6E6E6F] font-figtree border-[#2A2B2A]"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <button
              className="btn btn-primary mt-8 bg-[#AB4DF7] font-figtree font-semibold w-[95%] md:w-full h-10 rounded-3xl"
              type="submit"
            >
              Login
            </button>
            <div className="flex mt-2 justify-center">
              <p className="font-figtree text-white">No account?</p>

              <p className="text-[#AB4DF7] font-figtree ml-1.5">
                <Link href="/register">Sign up</Link>
              </p>
            </div>
            <div className="flex justify-center mt-1.5 mb-16">
              <p className="font-figtree text-[#AB4DF7]">
                <Link href="/forgot-password">Forgot password?</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
