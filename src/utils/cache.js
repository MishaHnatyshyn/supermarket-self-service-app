import { AsyncStorage } from 'react-native';

const CACHE_KEY = 'CACHE_KEY';

const getCache = async () => {
  const cache = await AsyncStorage.getItem(CACHE_KEY);
  return cache || {};
}
const updateCache = async (data) => {
  try {
    await AsyncStorage.setItem(CACHE_KEY, JSON.stringify(data));
  } catch (e) {
    console.log(e);
  }
}


export const getCacheItem = async (url) => {
  const cache = await getCache();
  const item = cache[url];
  if (!item) return null;
  if (Date.now() - item.ttl < 0) return null;
  return item.response;
};

export const addToCache = async (url, response) => {
  const cache = await getCache();
  cache[url] = { response: response.data, ttl: Date.now() + 24 * 60 * 60 * 1000 };
  updateCache(cache);
};
