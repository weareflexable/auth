import { axiosApp } from "./config";
import { ApiResponse, PostAuthPayload, PostAuthRequest } from "./types";
import { isMobile } from "react-device-detect";

export const getPaseto = async (session:any): Promise<string> => {
  const provider = session?.user?.app_metadata.provider

  let reqPayload;

  if (provider === 'google'){
    reqPayload ={
      provider: session?.user?.app_metadata.provider,
      idToken: session.access_token,
      accessToken: session.provider_token,
      deviceType: isMobile ? "mobile" : "web", // TODO: detect device type from user device
    };      
  }
  if( provider === 'apple'){
    reqPayload={
      provider: session?.user?.app_metadata.provider,
      idToken: session.access_token,
      deviceType: isMobile ? "mobile" : "web", // TODO: detect device type from user device
    };      
  }
  if (provider === 'email'){
    reqPayload={
      provider: 'supabase',
      token: session.access_token,
      deviceType: isMobile ? "mobile" : "web", // TODO: detect device type from user device
    };    
  }


  const authRes = await axiosApp.post("auth/web2", reqPayload);

  return authRes.data.token;
};

