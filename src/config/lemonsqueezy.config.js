import axios from 'axios';
import { config } from 'dotenv';

config();

const baseURL = 'https://api.lemonsqueezy.com/v1';
const token = process.env.LEMONSQUEEZY_TOKEN;

const lemonSqueezyAxiosInstance = axios.create({
  baseURL,
});

lemonSqueezyAxiosInstance.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default lemonSqueezyAxiosInstance;
