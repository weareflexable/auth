import React from "react";
import Link from "next/link";
import { FaHandshake } from "react-icons/fa";
import Services from "../components/Services";

const Home = () => {
  return (
    <>
      <main className="relative h-full flex flex-col before:absolute before:top-0 before:right-0 before:left-0 before:bottom-0 after:absolute after:top-0 after:right-0 after:left-0 after:bottom-0 before:bg-[url('/dj.jpg')] before:bg-center before:bg-no-repeat before:bg-cover  before:z-[-2] after:z-[-1]  after:backdrop-grayscale-[90%] justify-center after:backdrop-brightness-[60%]">
        <div className=" flex items-center pt-16 md:pt-32 px-6 flex-col ">
          <p className="uppercase font-head text-center leading-[150%]  max-w-[600px]  w-5/6 text-gray-500 lg:text-xl">
            Flexable partners with popular venues to get you in: with line skips
            at your favorite bar, with same-day bookings at your favorite
            restaurants, and even party passes at Greek houses.
          </p>
          <h1 className="text-white font-bold text-4xl text-center leading-[130%] md:text-5xl mt-6 mb-36 w-4/6 md:w-3/6 bg-gradient-to-r from-white text-transparent via-red-300  to-pink-900 bg-clip-text py-2">
            So-where are you flexing tonight?
          </h1>
          <div className="flex flex-col md:flex-row gap-5">
            <Link href="/register">
              <a className=" capitalize px-6 py-2 bg-gradient-to-r from-black to-primary text-secondary border-2 border-white rounded-md  flex items-center justify-center gap-3 ">
                I'm a customer
              </a>
            </Link>
            <Link href="/register">
              <a className=" capitalize px-6 py-2 text-secondary border-2 border-white rounded-md  flex items-center justify-center gap-3">
                I'm a venue owner
              </a>
            </Link>
          </div>
        </div>
        s
      </main>

      <Services />
    </>
  );
};

export default Home;
