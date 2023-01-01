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
    <div className="flex flex-col lg:flex-row md:flex-row h-screen">
      <div className="flex flex-col bg-[#242525] lg:w-3/5 md:w-1/2 items-center justify-start">
        <div
          className="-mt-8
         hidden lg:block"
        >
          <Image
            src="/logos/FlexableLogoWhite.svg"
            alt="flexable-logo"
            width={200}
            height={200}
          />
        </div>
        <div className="-mt-4 lg:hidden block">
          <Image
            src="/logos/FlexableLogoWhite.svg"
            alt="flexable-logo"
            width={150}
            height={150}
          />
        </div>
        <div className="flex flex-col lg:mt-32 -mt-2 text-center lg:text-left">
          <h3 className="lg:text-5xl text-4xl text-white font-semibold font-figtree lg:mb-2">
            Sign up &
          </h3>
          <h1 className="lg:text-7xl text-6xl text-[#A6A6A7] font-semibold font-figtree text-center lg:text-left">
            Forget Queues
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
                <span className="ml-1.5">Restaurant</span>
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
                <span className="ml-1.5">Community</span>
              </div>
              <div className="flex">
                <Image
                  src="/checkmark.svg"
                  alt="check-icon"
                  width={15}
                  height={15}
                />
                <span className="ml-1.5">Exclusive access</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-col bg-black lg:w-2/5 md:w-1/2 text-center lg:text-left items-center justify-center h-screen">
        <h1 className="text-3xl font-figtree text-white font-semibold lg:mt-0 mb-8 md:mt-4">
          Sign Up
        </h1>
        <form onSubmit={handleSignUp}>
          <input
            className="form-input rounded-sm shadow-sm mb-4 w-full pl-2 h-12 bg-transparent border-2 text-[#6E6E6F] font-figtree border-[#2A2B2A]"
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
            className="btn btn-primary mt-8 bg-[#1AFAA6] font-figtree font-semibold w-full h-10 rounded-3xl"
            type="submit"
            disabled={isSubmitting || !email || !password || !retypedPassword}
          >
            Sign Up
          </button>
          <div className="flex mt-2 justify-center">
            <p className="font-figtree text-white">Already hhave an account?</p>

            <p className="text-[#1AFAA6] font-figtree ml-1.5">
              <Link href="/login">Login</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
