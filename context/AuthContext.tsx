import axios from 'axios';
import { useRouter } from 'next/router';
import React,{useState,useContext,createContext, ReactNode, useEffect, useRef} from 'react';
import { clearTimeout } from 'timers';
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
    const eventRef = useRef(null)

  
    
    useEffect(() => {
      if (isAuthenticated && !getPlatformPaseto()) {
        // supabase.auth.signOut()
        // console.log('session',supabase.auth.session())
        getPaseto(supabase.auth.session()).then(paseto=>{
            setPaseto(paseto)
            setPlatformPaseto(paseto)
        });
      }
    }, []);
    
    
    useEffect(() => {
      // checks if user already signed in when they land
      // const user = checkUser();
      // if (user) {
      //   setIsAuthenticated(true);
      // }
      
      let pushingTimeout;
      const { data: authListener } = supabase.auth.onAuthStateChange(
        (event, session) => {
          // updateSupabaseCookie(event, session);

          console.log(session)



          if (event === "SIGNED_IN" || event === 'PASSWORD_RECOVERY') {

            setIsAuthenticated(true);
            
            if(event === 'PASSWORD_RECOVERY'){
              eventRef.current = 'recovery'
              console.log(eventRef)
              router.push('update-password')
              clearTimeout(pushingTimeout)
              return
            }

            // check if 

            getPaseto(session).then(res=>{
              setPlatformPaseto(res)
              setPaseto(res)
              pushingTimeout = setTimeout(()=>{ 
                console.log('signedIn')
               eventRef.current === 'recovery'? null:router.push('/dashboard')  
             },3000)
            }); 
          }
        
         
          if (event === "SIGNED_OUT") {
            setIsAuthenticated(false); 
            localStorage.clear()
          }
        }
        );
        
        return () => {
          // clearTimeout(pushingTimeout)
          authListener?.unsubscribe();
        };
      }, [router]); // try removing deps
  
    // async function updateSupabaseCookie(event, session) {
    //   await axios.post("/api/auth", { event, session });
    // }
  
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


