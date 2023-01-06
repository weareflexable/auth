import { axiosApp } from "./config"
import { ApiResponse, PostAuthPayload, PostAuthRequest } from "./types"

export const getPaseto = async (supabaseToken: string): Promise<string> => {
    const req: PostAuthRequest = {
        provider:'supabase',
        supabaseToken,
        device_type:'web' // TODO: detect device type from user device
    }
    const authRes = await axiosApp.post<ApiResponse<PostAuthPayload>>("auth/supabase", req)

    return authRes.data.payload.token
}