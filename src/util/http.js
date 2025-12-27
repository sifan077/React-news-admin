import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

axios.defaults.baseURL = "http://localhost:8000";

// axios请求拦截器
axios.interceptors.request.use(
    config => {
        NProgress.start();
        return config;
    },
    error => {
        NProgress.done();
        return Promise.reject(error);
    }
);

// axios响应拦截器
axios.interceptors.response.use(
    response => {
        NProgress.done();
        return response;
    },
    error => {
        NProgress.done();
        return Promise.reject(error);
    }
);