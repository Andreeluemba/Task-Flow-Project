import axios, { type AxiosInstance, type AxiosError, type InternalAxiosRequestConfig } from 'axios';
import type { ApiError } from '../types';

// Get environment variables with fallbacks
const getApiUrl = (): string => {
    // Check if we're in a Vite environment (browser)
    if (typeof import.meta !== 'undefined' && import.meta.env) {
        return import.meta.env.VITE_API_URL || 'http://localhost:3000/api';
    }

    // Fallback for Node.js environment (testing) - check if process exists
    if (typeof globalThis !== 'undefined' && 'process' in globalThis) {
        const nodeProcess = (globalThis as any).process;
        return nodeProcess?.env?.VITE_API_URL || 'http://localhost:3000/api';
    }

    // Final fallback
    return 'http://localhost:3000/api';
};

// Create axios instance with base configuration
const api: AxiosInstance = axios.create({
    baseURL: getApiUrl(),
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config: InternalAxiosRequestConfig) => {
        const token = localStorage.getItem('token');
        if (token && config.headers) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling and token refresh
api.interceptors.response.use(
    (response) => {
        return response;
    },
    async (error: AxiosError) => {
        const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

        // Handle 401 errors (unauthorized)
        if (error.response?.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            try {
                // Try to refresh token
                const refreshToken = localStorage.getItem('refreshToken');
                if (refreshToken) {
                    const response = await axios.post(
                        `${getApiUrl()}/auth/refresh`,
                        { refreshToken }
                    );

                    const { token } = response.data;
                    localStorage.setItem('token', token);

                    // Retry original request with new token
                    if (originalRequest.headers) {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                    }
                    return api(originalRequest);
                }
            } catch (refreshError) {
                // Refresh failed, redirect to login
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                window.location.href = '/login';
                return Promise.reject(refreshError);
            }
        }

        // Handle other errors
        const apiError: ApiError = {
            message: (error.response?.data as any)?.message || error.message || 'Erro desconhecido',
            status: error.response?.status || 500,
            field: (error.response?.data as any)?.field,
        };

        return Promise.reject(apiError);
    }
);

export default api;