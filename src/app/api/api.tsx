import axios from "axios";
// const token = localStorage.getItem("token");
export const baseURL = `https://library-backend.uz/api`;
export const baseURLImg = `https://library-backend.uz/uploads/images/`;
const apiRoot = axios.create({
  baseURL: `https://library-backend.uz/api`,
  headers: {
    Authorization:
      localStorage.getItem("token") || sessionStorage.getItem("token"),
  },
});

export default apiRoot;
