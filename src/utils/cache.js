import { AsyncStorage } from 'react-native';

export const createCacheWithTtl = (key, value) => {
  const ttl = Date.now() + 24 * 60 * 60 * 1000; // 1 day
  const cahceItem = { data: value, ttl };
  return AsyncStorage.setItem(key, JSON.stringify(cahceItem));
};

export const getFromCacheWithTtl = async (key) => {
  const cacheItem = await AsyncStorage.getItem(key);
  if (!cacheItem) return null;
  const parsedItem = JSON.parse(cacheItem);
  if (Date.now() - parsedItem.ttl > 0) {
    return null;
  }
  return parsedItem.data;
};
