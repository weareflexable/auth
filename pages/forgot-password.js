import React, { useState } from "react";
import Head from "next/head";
import Link from "next/link";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { createRecovery } from "../utils/auth";

const ForgotPassword = () => {
  // todo: states
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  // todo: functions
  const handleSignIn = async (e) => {
    e.preventDefault();
    if (!email) {
      toast.error("Must provide an email");
      return;
    }
    setIsSubmitting(true);
    const { error } = await createRecovery(email);
    if (error) {
      setIsSubmitting(false);
      toast.error(error.message);
    } else {
      setIsSubmitting(false);
      toast.success("Check your email inbox");
      router.push("/");
    }
  };

  return (
    <>
      <Head>
        <title>Forgot Password</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-primary h-[30vh] flex items-center justify-center text-white">
        <h1 className="text-6xl">Forgot Password</h1>
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

          <button
            type="submit"
            className={`${
              isSubmitting || !email ? "bg-gray-500" : "bg-primary"
            } rounded-full w-full px-6 py-[7px] outline-none  text-white capitalize block`}
            disabled={isSubmitting || !email}
          >
            Submit
          </button>
        </form>

        <div className="mt-[28px]">
          <small className="text-gray-700 my-[20px] block text-center">
            or
          </small>
          <Link href="/login">
            <a className="block rounded-full w-full px-6 py-[7px] outline-none border-primary border-[1px] bg-white text-primary text-center hover:bg-primary hover:text-white">
              sign in
            </a>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
