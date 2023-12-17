import axios from "axios";
// const token = localStorage.getItem("token");
export const baseURL = `https://library-backend.uz/api`;
export const baseURLImg = `https://library-backend.uz/uploads/images/`;
export const baseMediaUrl = "https://library-backend.uz/uploads/";
const token =
	typeof window !== 'undefined' ? localStorage.getItem('token') : null;

export const apiRoot = axios.create({
  baseURL: `https://library-backend.uz/api`,
  headers: {
    Authorization:token
  },
});

export default apiRoot;
