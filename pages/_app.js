import "../styles/globals.css";
import { AuthContextProvider } from "../context/AuthContext";
import Head from "next/head";
import {ChakraProvider} from '@chakra-ui/react'
import theme from '../theme'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Flexable | Auth</title>
        <meta name="description" content="Flexable auth-web" />
        <link rel="icon" href="/logos/logo_colored.png" />
      </Head>
      <div className="h-[92vh]">
        <ChakraProvider theme={theme}>
          <AuthContextProvider>
            <Component {...pageProps} />
          </AuthContextProvider>
        </ChakraProvider>
      </div>
    </>
  );
}

export default MyApp;
