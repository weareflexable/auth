import React from "react";
import Login from "./login";
import AuthContextProvider from '../context/AuthContext'

const Home = () => {
  return(
    // <AuthContextProvider>
      <Login />
    // </AuthContextProvider>
  ) 
};

export default Home;
