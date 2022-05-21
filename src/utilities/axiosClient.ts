// import { useCookies } from "react-cookie";
// import Axios, { AxiosRequestConfig } from "axios";
import Axios from "axios";

// const headers = {
//   Authorization: `Bearer ${cookies.jwt}`,
// };

// const useAuthRequestInterceptor = (config: AxiosRequestConfig) => {
//   const [cookies] = useCookies(["jwt"]);
//   if (cookies.jwt) {
//     console.log(cookies.jwt);
//     config.headers!.authorization = `${cookies.jwt}`;
//   }
//   config.headers!.Accept = "application/json";
//   return config;
// };

const axios = Axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  // baseURL: process.env.REACT_APP_BASE_URL_EMULATOR,
});

// axios.interceptors.request.use(useAuthRequestInterceptor);
// axios.interceptors.response.use(
//   (response) => {
//     return response.data;
//   },
//   (error) => {
//     const message = error.response?.data?.message || error.message;

//     // useNotificationStore.getState().addNotification({
//     //   type: "error",
//     //   title: "Error",
//     //   message,
//     // });

//     return Promise.reject(message);
//   }
// );

export default axios;
