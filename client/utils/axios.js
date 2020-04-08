import axios from 'axios';
import LocalStorageService from './localStorageService';
import Router from 'next/router'
import api from './api';

const localStorageService = LocalStorageService.getService();


// Add token in header
axios.interceptors.request.use(
    config => {
        const token = localStorageService.getAccessToken();
        if(token) {
            config.headers['Authorization'] = `${token}`;
        }
        return config;
    }, error => {
        Promise.reject(error);
    }
)

axios.interceptors.response.use(
    (response) => response,
    (error) => {
        const originalRequest = error.config;

        if(error.response.status === 401 && originalRequest.url.includes('/auth/token')) {
            Router.push('/login');
            return Promise.reject(error);
        }

        if(error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const refreshToken = localStorageService.getRefreshToken();

            // Get token
            return axios.post(api.refresh, {
                "refresh_token": refreshToken
            }).then(res => {
                // Repeat request
                if(res.status === 201) {
                    localStorageService.setToken(res.data);
                    axios.defaults.headers.common['Authorization'] = localStorageService.getAccessToken();
                    return axios(originalRequest);
                }
            });
        }

        return Promise.reject(error);


    }
)

export default axios;