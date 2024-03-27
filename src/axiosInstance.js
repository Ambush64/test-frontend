import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:5000'
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
    config => {
        // Get the token from localStorage
        const token = localStorage.getItem('token');

        // Add token to headers if it exists
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    error => {
        // Handle request errors
        return Promise.reject(error);
    }
);

export default axiosInstance;
