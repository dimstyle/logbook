import axios, { AxiosError, type InternalAxiosRequestConfig } from "axios";
import type { DefaultResponse } from "../Pages/types/default.js";
import { router } from "@inertiajs/react";

let refreshPromise: Promise<void> | null = null;

const api = axios.create({
    baseURL: "/",
    withCredentials: true,
    headers: {
        Accept: "application/json",
        "X-Requested-With": "XMLHttpRequest"
    }
});

api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError<DefaultResponse>) => {
        const status = error.response?.status;
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        if (originalRequest.url === "/api/auth/refresh"){
            return Promise.reject(error)
        }

        if (!originalRequest || ![401, 419].includes(status ?? 0) || originalRequest._retry) {
            return Promise.reject(error);
        }

        originalRequest._retry = true;

        try {
            if (!refreshPromise) {
                refreshPromise = api.post<DefaultResponse>("/api/auth/refresh").then(() => undefined).catch((refreshError) => {
                    throw refreshError;
                }).finally(() => {
                    refreshPromise = null;
                });
            }

            await refreshPromise;
            return Promise.reject(error);
        } catch (refreshError) {
            return Promise.reject(refreshError);
        }
    }
);

export default api;