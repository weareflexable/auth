import axios from "axios";

export const axiosApp = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_API_URL
    baseURL: 'https://platform.flexabledats.com/api/v1.0/'
})