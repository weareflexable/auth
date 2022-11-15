import "../styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import {AuthContextProvider} from '../context/AuthContext'

function MyApp({ Component, pageProps }) {


  return (
    <>
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
