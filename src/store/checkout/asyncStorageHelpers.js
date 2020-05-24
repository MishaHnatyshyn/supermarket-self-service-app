import { AsyncStorage } from 'react-native';

const ORDERS_STORAGE_KEY = 'SAVED_ORDERS';

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
  return orders[userId] ? Object.keys(orders[userId]).map((id) => parseInt(id, 10)) : [];
};

export const addOrderToStorage = (userId = 'common') => async (order) => {
  const orders = await getOrdersFromStorage();
  if (!orders[userId]) {
    orders[userId] = {};
  }
  console.log('orders', order);
  orders[userId][order.id] = order;
  return setOrdersToStorage(orders);
};

export const removeOrderIdFromStorage = async (orderIdToDelete, userId = 'common') => {
  const orders = await getOrdersFromStorage();
  orders[userId][orderIdToDelete] = null;
  return setOrdersToStorage(orders);
};

export const removeAllOrdersFromStorage = async (userId) => {
  const orders = await getOrdersFromStorage();
  orders[userId] = null;
  return setOrdersToStorage(orders);
};
