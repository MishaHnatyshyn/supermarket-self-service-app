import { AsyncStorage } from 'react-native';

const ORDERS_STORAGE_KEY = 'ORDERS';

export const getOrdersFromStorage = async () => {
  const orders = await AsyncStorage.getItem(ORDERS_STORAGE_KEY);
  if (!orders) return [];
  return JSON.parse(orders);
};

export const setOrdersToStorage = (orders) => (
  AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))
);

export const addOrderIdToStorage = async (orderId) => {
  const orders = await getOrdersFromStorage();
  const newOrders = [...orders, orderId];
  return setOrdersToStorage(newOrders);
};

export const removeOrderIdFromStorage = async (orderIdToDelete) => {
  const orders = await getOrdersFromStorage();
  const newOrders = orders.filter((orderId) => orderId !== orderIdToDelete);
  return setOrdersToStorage(newOrders);
};

export const removeAllOrdersFromStorage = () => (
  AsyncStorage.removeItem(ORDERS_STORAGE_KEY)
);
