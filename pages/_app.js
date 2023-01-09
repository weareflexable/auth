import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { AuthContextProvider } from "../context/AuthContext";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Flexable | Auth</title>
        <meta name="description" content="Flexable auth-web" />
        <link rel="icon" href="/logos/logo_colored.png" />
      </Head>
      <div className="h-[92vh]">
        <AuthContextProvider>
          <Component {...pageProps} />
        </AuthContextProvider>
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          closeOnClick={true}
          pauseOnHover={true}
          draggable={true}
          dark
        />
      </div>
    </>
  );
}

export default MyApp;
