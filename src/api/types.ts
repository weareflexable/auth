export interface ApiResponse<T> {
    status: number
    message: string
    // payload: T
    data: T
}

export interface PostAuthPayload {
    token: string
}

export interface PostAuthRequest {
    idToken?:string,
    accessToken?: string
    token?: string
    deviceType: string
    provider: string
}
