import { useNavigate } from "react-router-dom";
import UseAuth from "./UseAuth";
import { useEffect } from "react";
import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'https://draw-master-class-server.vercel.app',
});

const UseAxios = () => {
    const { logoutUser } = UseAuth();
    const navigate = useNavigate();
    
    useEffect(() => {
        axiosSecure.interceptors.request.use((config) => {
            const token = localStorage.getItem('access-token');
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        });

        axiosSecure.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response && (error.response.status === 401 || error.response.status === 403)) {
                    await logoutUser();
                    navigate('/login');
                }
                return Promise.reject(error);
            }
        );
    }, [logoutUser, navigate]);
    return[axiosSecure];
};

export default UseAxios;