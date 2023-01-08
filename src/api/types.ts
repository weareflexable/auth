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
    token: string
    device_type: string
    provider: string
}
