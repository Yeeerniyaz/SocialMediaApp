import axios from "axios";

const instance = axios.create({
  baseURL: "http://192.168.43.127:5000",
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = window.localStorage.getItem("token");
  return config;
});

export default instance;
