import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'https://api.example.com',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});

axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            console.error('API Error:', error.response.data);
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
