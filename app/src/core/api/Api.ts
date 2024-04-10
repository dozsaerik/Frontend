import axios, {AxiosInstance, AxiosRequestConfig} from 'axios';

const BASE_URL = 'http://localhost:8080/api';

export const public_api: AxiosInstance = axios.create({
    baseURL: BASE_URL
});

const api: AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

api.interceptors.request.use(
    config => {
        const token = localStorage.getItem('token')
        if (token && !config.url?.endsWith('login')) {
            config.headers['Authorization'] = 'Bearer ' + token
        }
        return config
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    response => {
        return response
    },
    async function (error) {
        const originalRequest = error.config

        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true

            try {
                const refreshToken = localStorage.getItem('refresh_token')
                const response = await api.post('/token/refresh', {
                    refresh_token: refreshToken
                });

                if (response.status === 201) {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem("refresh_token", response.data.refresh_token);
                    return api(originalRequest);
                }
            } catch (_error) {
                return Promise.reject(error)
            }
        }
    }
)
export default api