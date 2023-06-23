import axios from 'axios';
import { config } from '../config';

const productsApi = axios.create({
  baseURL: config.VITE_API_URL,
});

export default productsApi;
