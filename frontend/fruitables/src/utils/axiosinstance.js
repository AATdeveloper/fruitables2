import axios from 'axios';
import  Cookies  from 'js-cookie';
import { base_URL } from './baseURL';


const axiosInstance = axios.create({
    baseURL: base_URL,
    withCredentials:true,
});

axiosInstance.interceptors.request.use(
    (config) => {
        const token = Cookies.get('accessToken');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);



export default axiosInstance;