import { axiosApp } from "./config";
import { ApiResponse, PostAuthPayload, PostAuthRequest } from "./types";
import { isMobile } from "react-device-detect";

export const getPaseto = async (session:any): Promise<string> => {
  console.log('e ey reach',session)
  const req: PostAuthRequest = {
    provider: session.user.app_metadata.provider,
    idToken: session.access_token,
    accessToken: session.provider_token,
    deviceType: isMobile ? "mobile" : "web", // TODO: detect device type from user device
  };      
  console.log('i dey collect', req)
  const authRes = await axiosApp.post("auth/web2", req);

  return authRes.data.token;
};
