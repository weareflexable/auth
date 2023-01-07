import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Image from "next/image";
import Head from "next/head";
import { toast } from "react-toastify";
import { signUp } from "../utils/auth";

const Register = () => {
  // todo: states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [retypedPassword, setRetypedPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  // todo: functions
  const handleSignUp = async (e) => {
    e.preventDefault();
    if (!email || !password || !retypedPassword) {
      return toast.error("please fill all the fields");
    }
    // if password is too short
    if (password.toString().length < 7) {
      return toast.error("password must be at leas 7 chars");
    }
    // if passwords do not match
    if (password !== retypedPassword) {
      return toast.error("passwords do not match");
    }

    const { error, session } = await signUp({ email, password });
    if (error) {
      toast.error(error.message);
    } else {
      setEmail("");
      setPassword("");
      setRetypedPassword("");
      toast.dark("Sign Up Successful. Please check your email inbox");
    }
  };

  return (
    <>
      <Head>
        <title>Flexable | Signup</title>
        <meta name="description" content="Flexable login" />
        <link rel="icon" href="/logos/logo_colored.png" />
      </Head>
      <div className="flex flex-col lg:flex-row h-screen">
        <div className="flex flex-col bg-[#242525] md:pb-8 lg:w-1/2 items-center justify-start">
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
              Sign up &
            </h3>
            <h1 className="lg:text-6xl text-5xl text-[#A6A6A7] font-semibold font-figtree text-center lg:text-left">
              Get access to:
            </h1>
            <div className="flex lg:mt-4 mb-12 lg:mb-0 mt-6 lg:justify-start justify-center ">
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
                  <span className="ml-1.5">Events & More</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex flex-col bg-black lg:w-1/2 text-center lg:text-left items-center justify-center md:justify-start lg:justify-center flex-grow">
          <h1 className="text-3xl font-figtree text-white font-semibold lg:mt-0 mb-8 md:mt-24 mt-8">
            Sign Up
          </h1>
          <form
            onSubmit={handleSignUp}
            className="flex flex-col justify-center lg:w-[400px] md:w-[400px] w-[95%]"
          >
            <input
              className="form-input rounded-sm shadow-sm mb-4 pl-2 h-12 bg-transparent border-2 text-[#6E6E6F] font-figtree border-[#2A2B2A]"
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <input
              className="form-input rounded-sm shadow-sm mb-4 w-full pl-2 h-12 bg-transparent border-2 text-[#6E6E6F] font-figtree border-[#2A2B2A]"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
            <input
              className="form-input rounded-sm shadow-sm w-full pl-2 h-12 bg-transparent border-2 text-[#6E6E6F] font-figtree border-[#2A2B2A]"
              type="password"
              id="confirm_password"
              placeholder="Confirm Password"
              value={retypedPassword}
              onChange={(e) => setRetypedPassword(e.target.value)}
            />
            <button
              className="btn btn-primary mt-8 bg-[#AB4DF7] font-figtree font-semibold w-full h-10 rounded-3xl"
              type="submit"
            >
              Sign Up
            </button>
            <div className="flex mt-2 justify-center mb-16">
              <p className="font-figtree text-white">
                Already have an account?
              </p>

              <p className="text-[#AB4DF7] font-figtree ml-1.5">
                <Link href="/login">Login</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
