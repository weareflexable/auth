import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { signIn, signInWithProvider } from "../utils/auth";

const Login = () => {
  // todo: states
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // todo: functions
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast.error("One or more fields are missing");
      return;
    }
    setIsSubmitting(true);
    const { error, session } = await signIn({ email, password });
    if (error) {
      setIsSubmitting(false);
      toast.error(error.message);
    }
    if (session) {
      setIsSubmitting(false);
      toast.success("Logged in successfully");
      router.push("/dashboard");
    }
  };
  const handleProviderLogin = async (provider) => {
    setIsSubmitting(true);
    const { error, user } = await signInWithProvider(provider);
    if (error) {
      toast.error(error.message);
    }
    if (user) {
      toast.success("Logged in successfully");
      // router.push("/dashboard");
    }
    setIsSubmitting(false);
  };

  return (
    <>
      <Head>
        <title>Sign In</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-primary h-[30vh] flex items-center justify-center text-white">
        <h1 className="text-6xl">Sign In</h1>
      </div>
      <div className="form-container px-[10%] pt-10 max-w-[800px] mx-auto">
        <form onSubmit={handleSignIn}>
          <div className="rounded-3xl mb-[19px]">
            <input
              type="email"
              placeholder="Email"
              className="border-[1px] border-gray-500 focus:border-primary focus:border-[2px]  rounded-full w-full px-6 py-[7px] outline-none"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="rounded-3xl mb-[19px]">
            <input
              type="password"
              placeholder="Password"
              className="border-[1px] border-gray-500 focus:border-primary focus:border-[2px]  rounded-full w-full px-6 py-[7px] outline-none"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <Link href="/forgot-password">
            <a className="text-sm block w-max ml-auto capitalize mb-[28px]">
              forgot password?
            </a>
          </Link>
          <button
            type="submit"
            className={`${
              isSubmitting || !email || !password ? "bg-gray-500" : "bg-primary"
            } rounded-full w-full px-6 py-[7px] outline-none  text-white capitalize block`}
            disabled={isSubmitting || !email || !password}
          >
            sign in
          </button>
        </form>

        <div className="mt-[28px]">
          <Link href="/register">
            <a className="block rounded-full w-full px-6 py-[7px] outline-none border-primary border-[1px] bg-white text-primary text-center hover:bg-primary hover:text-white">
              sign up
            </a>
          </Link>
          <small className="text-gray-700 my-[20px] block text-center">
            or
          </small>
          <button
            disabled={isSubmitting}
            className="rounded-full w-full px-6 py-[7px] outline-none border-primary border-[1px] bg-white text-primary text-center hover:bg-primary hover:text-white flex items-center gap-5 justify-center"
            onClick={() => handleProviderLogin("google")}
          >
            <img src="google.svg" className="block w-[20px]" />
            Sign in with Google
          </button>
        </div>
      </div>
    </>
  );
};

export default Login;
