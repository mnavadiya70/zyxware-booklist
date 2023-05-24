import axios from "axios";

const axiosHelper = axios.create({
  baseURL: "http://private-anon-0bf01ad3e8-bookstore.apiary-mock.com/",
});

export default axiosHelper;
