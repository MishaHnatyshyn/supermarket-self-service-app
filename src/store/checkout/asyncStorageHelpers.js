import { AsyncStorage } from 'react-native';

const ORDERS_STORAGE_KEY = 'ORDERS';

export const getOrdersFromStorage = async () => {
  const orders = await AsyncStorage.getItem(ORDERS_STORAGE_KEY);
  if (!orders) return { common: {} };
  return JSON.parse(orders);
};

export const setOrdersToStorage = (orders) => (
  AsyncStorage.setItem(ORDERS_STORAGE_KEY, JSON.stringify(orders))
);

export const getOrdersListFromStorage = async (userId = 'common') => {
  const orders = await getOrdersFromStorage();
  const userOrders = orders[userId] || {};
  return Object.keys(userOrders).map((orderId) => {
    const {
      id,
      status,
      timestamp,
      products: {
        totals: {
          total: sum,
        },
      },
      store: {
        name: store,
        street,
        building,
      },
    } = userOrders[orderId];
    return {
      id, status, timestamp, sum, store, street, building,
    };
  });
};

export const getOrderDetailsFromStorage = async (id, userId = 'common') => {
  const orders = await getOrdersFromStorage();
  return orders[userId] && orders[userId][id];
};

export const getSavedReceipts = async (userId) => {
  const orders = await getOrdersFromStorage();
  return orders[userId] ? Object.keys(orders[userId]) : [];
};

export const addOrderToStorage = (userId = 'common') => async (order) => {
  const orders = await getOrdersFromStorage();
  if (!orders[userId]) {
    orders[userId] = {};
  }
  orders[orders[userId]][order.id] = orders;
  return setOrdersToStorage(orders);
};

export const removeOrderIdFromStorage = async (orderIdToDelete, userId = 'common') => {
  const orders = await getOrdersFromStorage();
  orders[userId][orderIdToDelete] = null;
  return setOrdersToStorage(orders);
};

export const removeAllOrdersFromStorage = async (userId) => {
  const orders = await getOrderDetailsFromStorage();
  orders[userId] = null;
  return setOrdersToStorage(orders);
};
