import React from "react";
import Link from "next/link";

const Services = () => {
  return (
    <section className="relative before:absolute before:top-0 before:right-0 before:left-0 before:bottom-0 after:absolute after:top-0 after:right-0 after:left-0 after:bottom-0  before:bg-center before:bg-no-repeat before:bg-cover  before:z-[-2] after:z-[-1]  after:backdrop-grayscale-[90%] before:bg-[url('/party.jpg')] auto min-h-[92vh] flex flex-col justify-center after:backdrop-brightness-[5%] py-24">
      <h2 className="uppercase text-white text-2xl md:text-3xl lg:text-4xl text-center font-bold">
        dont wait, just flex
      </h2>
      <div className="flex flex-col md:flex-row md:justify-between mx-auto text-white max-w-[1000px] px-10 mt-16 font-heading  lg:gap-6 md:gap-3">
        <div className="flex flex-col items-center  w-max md:w-full py-10 px-6">
          <h2 className="uppercase text-lg lg:text-xl font-heading">
            night life
          </h2>
          <p className="uppercase mt-5 mb-6 text-gray-400 font-light text-sm lg:text-md">
            feel like vip
          </p>
          <p className="grow uppercase text-center text-gray-400 font-light text-sm max-w-[220px] leading-[150%] ">
            click to learn more about how we are bringing real world value to
            your night out.
          </p>
          <Link href="/">
            <a className="px-4 py-2 text-white uppercase border-[1px] border-white text-[10px] mt-6">
              flex up
            </a>
          </Link>
        </div>
        <hr className="md:h-[158px] md:w-[1px] h-[1px] w-[158px] border-0 bg-gray-800 my-3 self-center" />
        <div className=" flex flex-col items-center  w-max md:w-full  py-10 px-6">
          <h2 className="uppercase text-lg lg:text-xl font-heading">
            restaurants
          </h2>
          <p className="uppercase mt-5 mb-6 text-gray-400 font-light text-sm lg:text-md">
            always get a table
          </p>
          <p className="grow uppercase text-center text-gray-400 font-light text-sm max-w-[220px] leading-[150%] ">
            click to learn more about how we are giving last minute restaurant
            goers more utility.
          </p>
          <Link href="/">
            <a className="px-4 py-2 text-white uppercase border-[1px] border-white text-[10px] mt-6">
              flex up
            </a>
          </Link>
        </div>
        <hr className="md:h-[158px] md:w-[1px] h-[1px] w-[158px] border-0 bg-gray-800 my-3 self-center" />
        <div className=" flex flex-col items-center  w-max md:w-full py-10 px-6">
          <h2 className="uppercase text-lg lg:text-xl font-heading">
            night life
          </h2>
          <p className="uppercase mt-5 mb-6 text-gray-400 font-light text-sm lg:text-md">
            feel like vip
          </p>
          <p className="uppercase text-center text-gray-400 font-light text-sm max-w-[220px] leading-[150%] ">
            click to learn more about how we are exporting greek coolness to
            everyday students who couldn&apos;t make the cut.
          </p>
          <Link href="/">
            <a className="px-4 py-2 text-white uppercase border-[1px] border-white text-[10px] mt-6">
              flex up
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Services;
