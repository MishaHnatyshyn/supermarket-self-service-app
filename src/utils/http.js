import * as axios from 'axios';
import { API_URL } from './config';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

export const { get } = axiosInstance;
export const { put } = axiosInstance;
export const { post } = axiosInstance;
export const del = axiosInstance.delete;
