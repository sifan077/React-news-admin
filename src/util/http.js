import axios from "axios";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

axios.defaults.baseURL = "http://localhost:8000";
axios.defaults.timeout = 10000;

axios.interceptors.request.use(
  (config) => {
    NProgress.start();
    return config;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    NProgress.done();
    return response;
  },
  (error) => {
    NProgress.done();
    return Promise.reject(error);
  }
);

export default axios;
