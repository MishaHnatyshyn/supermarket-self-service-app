import { AsyncStorage } from 'react-native';

const SAVE_RECEIPTS_STORAGE_KEY = 'SAVE_RECEIPTS';

const getInfoForAllUsers = async () => {
  const data = await AsyncStorage.getItem(SAVE_RECEIPTS_STORAGE_KEY);
  return data ? JSON.parse(data) : {};
};

const setValueInStorage = (value) => (
  AsyncStorage.setItem(SAVE_RECEIPTS_STORAGE_KEY, JSON.stringify(value))
);

export const getReceiptSavingValue = async (id) => {
  const data = await getInfoForAllUsers();
  const value = data[id];
  return value ?? true;
};

export const setReceiptSavingValue = async (id, value) => {
  const data = await getInfoForAllUsers();
  data[id] = value;
  setValueInStorage(data);
};
