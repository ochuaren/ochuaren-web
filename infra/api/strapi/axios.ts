import { strapiConfig } from "@/config/strapi";
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: strapiConfig.apiUrl,
  headers: {
    Authorization: `Bearer ${strapiConfig.authToken}`,
  },
});

