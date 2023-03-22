import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { checkUser, signOut } from "../utils/auth";
import withAuth from "../components/AuthWrapper";
import Link from "next/link";
import supabase from "../utils/supabaseClient";
import { getPlatformPaseto, setPlatformPaseto } from "../src/storage";
import { getPaseto } from "../src/api/platform";
import { useAuthContext } from "../context/AuthContext";
import Redirect from "../components/Redirect";
import Image from "next/image";
import {Flex, Spinner} from '@chakra-ui/react'

const Dashboard = () => {
  const { isAuthenticated, paseto } = useAuthContext();

  // TODO: remove this component
  if (!paseto) {
    return (
    <Flex h={'100%'} minH='100vh' justifyContent={'center'} bg='#121212' alignItems='center'>
      <Spinner size='xl' />
    </Flex>
  )
  }

  // component
  return (
    <div className="h-screen flex flex-col items-center justify-start gap-6 bg-black">
      <div className="mb-24 mt-20">
        <Image
          src="/logos/logo.svg"
          alt="flexable-logo"
          width={200}
          height={200}
        />
      </div>
      <Redirect />
    </div>
  );
};

export default Dashboard;
