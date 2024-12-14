import "../styles/globals.css";
import { AuthContextProvider } from "../context/AuthContext";
import Head from "next/head";
import {ChakraProvider} from '@chakra-ui/react'
import theme from '../theme'
import {
  GoogleReCaptchaProvider,
} from 'react-google-recaptcha-v3';
import envUtils from "../utils/envVars";

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
        <GoogleReCaptchaProvider reCaptchaKey={envUtils.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}> 
          <AuthContextProvider>
            <Component {...pageProps} />
          </AuthContextProvider>
        </GoogleReCaptchaProvider>
        </ChakraProvider>
      </div>
    </>
  );
}

export default MyApp;
