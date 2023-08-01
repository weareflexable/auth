import { axiosApp } from "./config";
import { ApiResponse, PostAuthPayload, PostAuthRequest } from "./types";
import { isMobile } from "react-device-detect";

export const getPaseto = async (supabaseToken: string): Promise<string> => {
  const req: PostAuthRequest = {
    provider: "supabase",
    token: supabaseToken,
    deviceType: isMobile ? "mobile" : "web", // TODO: detect device type from user device
  };      
  const authRes = await axiosApp.post("auth/web2", req);

  return authRes.data.token;
};
