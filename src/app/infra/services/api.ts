import axios, { AxiosInstance } from "axios";

export const apiInstance: AxiosInstance = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL_API,
    timeout: 1000,
});