import axios from 'axios';
import { useRouter } from 'next/router';
import React,{useState,useContext,createContext, ReactNode, useEffect} from 'react';
import { getPaseto } from '../src/api/platform';
import { getPlatformPaseto, setPlatformPaseto } from '../src/storage';
import {checkUser} from '../utils/auth'
import supabase from '../utils/supabaseClient';

const AuthContext = createContext<Values|undefined>(undefined);

type Values = {
    isAuthenticated: boolean,
    setIsAuthenticated: (isAuthenticate:boolean)=>void,
    paseto: any
}

interface AuthContextProviderProps{
    children: ReactNode
}

const AuthContextProvider = ({children}:AuthContextProviderProps)=>{
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [paseto, setPaseto] = useState(null)
  
    
    useEffect(() => {
      // console.log(supabase.auth.session().access_token)
      if (isAuthenticated && !getPlatformPaseto()) {
        getPaseto(supabase.auth.session().access_token).then(paseto=>{
            setPaseto(paseto)
            setPlatformPaseto(paseto)
        });
      }
    }, [isAuthenticated]);
    
    
    useEffect(() => {
      // checks if user already signed in when they land
      const user = checkUser();
      if (user) {
        setIsAuthenticated(true);
      }
      
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          updateSupabaseCookie(event, session);
          if (event === "SIGNED_IN") {
            setIsAuthenticated(true);
            // getPaseto(supabase.auth.session().access_token).then(res=>{
            //   setPlatformPaseto(res)
            //   router.push('/dashboard') 
            // }); 
          }
          if (event === "SIGNED_OUT") {
            setIsAuthenticated(false); 
          }
        }
        );
        
        return () => {
          authListener?.unsubscribe();
        };
      }, [router]); // try removing deps
  
    async function updateSupabaseCookie(event, session) {
      await axios.post("/api/auth", { event, session });
    }
  
    const values: Values = {
        isAuthenticated,
        paseto,
        setIsAuthenticated
    }

    return(
        <AuthContext.Provider value={values}>
            {children}
        </AuthContext.Provider>
    )
}


const useAuthContext = ()=>{
    const context = useContext(AuthContext);

    if(context === undefined){
        throw new Error('Context is not being used under its provider')
    }

    return context
}

export {useAuthContext, AuthContextProvider }