import axios from "axios";
// const token = localStorage.getItem("token");
export const baseURL = `http://localhost:2002/api`;
export const baseURLImg = `http://localhost:2002`;
const apiRoot = axios.create({
  baseURL: `http://localhost:2002/api`,

});

export default apiRoot;
