import axios from "axios";

export default axios.create({
  baseURL: `https://punn-api.fs-omc.io/api/`,
  // baseURL: `https://localhost:44368/api/`,
  // baseURL: `https://10.144.66.34/api/`,
});
