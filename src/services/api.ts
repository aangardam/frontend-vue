import axios from "axios";
import Cookies from "js-cookie";
import router from "../routes";

const API = axios.create({
  baseURL: "http://localhost:3000",
});

API.interceptors.response.use(
  (response) => response,
  (error: unknown) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      Cookies.remove("token");
      Cookies.remove("user");

      if (router.currentRoute.value.name !== "login") {
        void router.replace({ name: "login" });
      }
    }

    return Promise.reject(error);
  },
);

export default API;
