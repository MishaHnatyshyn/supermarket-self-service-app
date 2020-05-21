import { useLinking } from '@react-navigation/native';
import { Linking } from 'expo';

export default function (containerRef) {
  return useLinking(containerRef, {
    prefixes: [Linking.makeUrl('/')],
    config: {
      Root: {
        path: 'root',
        screens: {
          Search: 'search',
          History: 'history',
          Basket: 'basket',
          Account: 'account',
          BarcodeScanner: 'scanner',
          Receipt: 'receipt',
          Product: 'product',
        },
      },
      Auth: {
        path: 'auth',
        screens: {
          Login: 'login',
          Register: 'register',
        },
      },
    },
  });
}
