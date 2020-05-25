import * as axios from 'axios';
import { API_URL } from './config';
import { addToCache, getCacheItem } from './cache';

const axiosInstance = axios.create({
  baseURL: API_URL,
});

axiosInstance.interceptors.request.use(async (request) => {
  console.log('request', request);
  const { url, method, params } = request;
  if (method === 'get' && (url.includes('products') || url.includes('order/'))) {
    console.log('IN GET CACHE')
    console.log('CACHE KEY REQUEST', url + JSON.stringify(params))
    const dataFromCache = await getCacheItem(url + JSON.stringify(params));
    console.log('dataFromCache', dataFromCache);
    if (dataFromCache) {
      return {
        data: dataFromCache,
      };
    }
  }
  return request;
});

axiosInstance.interceptors.response.use(async (response) => {
  console.log('response', response);
  const { url, method, params } = response.config;
  if (method === 'get' && (url.includes('products') || url.includes('order/'))) {
    const { data } = response;
    console.log('CACHE KEY RESPONSE', url + JSON.stringify(params))

    addToCache(url + JSON.stringify(params), data);
    console.log('CACHED');
  }
  return response;
});

export const createAuthorizationHeader = (token) => ({
  Authorization: `Bearer ${token}`,
});

export const { get } = axiosInstance;
export const { put } = axiosInstance;
export const { post } = axiosInstance;
export const del = axiosInstance.delete;
