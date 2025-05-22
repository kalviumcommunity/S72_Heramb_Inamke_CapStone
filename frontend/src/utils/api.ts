import axios, { AxiosError, InternalAxiosRequestConfig, AxiosResponse } from 'axios';
import { toast } from 'react-hot-toast';

// Add Vite environment type
interface ImportMetaEnv {
  VITE_API_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

export interface ApiError {
  message: string;
  status: number;
  data?: any;
}

export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Request interceptor
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  (error: AxiosError<ApiError>) => {
    const errorMessage = error.response?.data?.message || 'An error occurred';
    const status = error.response?.status;

    // Handle different error status codes
    switch (status) {
      case 401:
        // Handle unauthorized
        localStorage.removeItem('token');
        window.location.href = '/login';
        break;
      case 403:
        // Handle forbidden
        toast.error('You do not have permission to perform this action');
        break;
      case 404:
        // Handle not found
        toast.error('The requested resource was not found');
        break;
      case 500:
        // Handle server error
        toast.error('Server error occurred. Please try again later');
        break;
      default:
        // Handle other errors
        toast.error(errorMessage);
    }

    return Promise.reject(error);
  }
);

// API methods with proper typing
export const apiClient = {
  get: async <T>(url: string, config?: InternalAxiosRequestConfig): Promise<ApiResponse<T>> => {
    const response = await api.get<T>(url, config);
    return {
      data: response.data,
      status: response.status,
      message: 'Success',
    };
  },

  post: async <T>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<ApiResponse<T>> => {
    const response = await api.post<T>(url, data, config);
    return {
      data: response.data,
      status: response.status,
      message: 'Success',
    };
  },

  put: async <T>(url: string, data?: any, config?: InternalAxiosRequestConfig): Promise<ApiResponse<T>> => {
    const response = await api.put<T>(url, data, config);
    return {
      data: response.data,
      status: response.status,
      message: 'Success',
    };
  },

  delete: async <T>(url: string, config?: InternalAxiosRequestConfig): Promise<ApiResponse<T>> => {
    const response = await api.delete<T>(url, config);
    return {
      data: response.data,
      status: response.status,
      message: 'Success',
    };
  },
};

export default apiClient; 