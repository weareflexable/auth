import axios from "axios";

export const axiosApp = axios.create({
    // baseURL: utils.NEXT_PUBLIC_API_URL 
    baseURL: 'https://platform.flexabledats.com/api/v1.0/'
})