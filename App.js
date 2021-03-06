import React, { useState, useRef, useEffect } from 'react';
import {
  Platform, StatusBar, StyleSheet, View,
} from 'react-native';
import { SplashScreen } from 'expo';
import * as Font from 'expo-font';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { Provider } from 'react-redux';
import PropTypes from 'prop-types';
import store from './src/store/reducer';

import BottomTabNavigator from './src/navigation/BottomTabNavigator';
import useLinking from './src/navigation/useLinking';
import LoginScreen from './src/screens/LoginScreen';
import RegistrationScreen from './src/screens/RegistrationScreen';
import BarcodeScannerScreen from './src/screens/BarcodeScannerScreen';
import HeaderBackButton from './src/components/HeaderBackButton';
import GlobalLoader from './src/components/GlobalLoader';
import ReceiptDescriptionScreen from './src/screens/ReceiptDescriptionScreen';
import CategoriesScreen from './src/screens/CategoriesScreen';
import ProductScreen from './src/screens/ProductScreen';
import PaymentScreen from './src/screens/PaymentScreen';
import AddingPaymentMethodScreen from './src/screens/AddingPaymentMethodScreen';
import ToastNotification from './src/components/ToastNotification';
import PaymentSuccessScreen from './src/screens/PaymentSuccessScreen';

const Stack = createStackNavigator();

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
});

export default function App({ skipLoadingScreen }) {
  const [isLoadingComplete, setLoadingComplete] = useState(false);
  const [initialNavigationState, setInitialNavigationState] = useState();
  const containerRef = useRef();
  const { getInitialState } = useLinking(containerRef);

  // Load any resources or data that we need prior to rendering the app
  useEffect(() => {
    async function loadResourcesAndDataAsync() {
      try {
        SplashScreen.preventAutoHide();

        // Load our initial navigation state
        setInitialNavigationState(await getInitialState());

        // Load fonts
        await Font.loadAsync({
          'space-mono': require('./src/assets/fonts/SpaceMono-Regular.ttf'),
        });
      } catch (e) {
        // We might want to provide this error information to an error reporting service
        console.warn(e);
      } finally {
        setLoadingComplete(true);
        SplashScreen.hide();
      }
    }

    loadResourcesAndDataAsync();
  }, []);

  if (!isLoadingComplete && !skipLoadingScreen) {
    return null;
  }

  return (
    <Provider store={store}>
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="dark-content" /> }
        <NavigationContainer ref={containerRef} initialState={initialNavigationState}>
          <Stack.Navigator>
            <Stack.Screen name="Root" component={BottomTabNavigator} />
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="Registration"
              component={RegistrationScreen}
              options={{
                headerShown: false,
              }}
            />
            <Stack.Screen
              name="BarcodeScanner"
              component={BarcodeScannerScreen}
              options={{
                headerTitle: 'Barcode scanner',
                headerTitleStyle: { fontSize: 20 },
                headerLeft: (props) => <HeaderBackButton {...props} />,
              }}
            />
            <Stack.Screen
              name="Receipt"
              component={ReceiptDescriptionScreen}
              options={{
                title: 'Receipt',
                headerTitleStyle: { fontSize: 20 },
                headerLeft: (props) => <HeaderBackButton {...props} />,
              }}
            />
            <Stack.Screen
              name="Categories"
              component={CategoriesScreen}
              options={{
                title: 'Categories',
                headerTitleStyle: { fontSize: 20 },
                headerLeft: (props) => <HeaderBackButton {...props} />,
              }}
            />
            <Stack.Screen
              name="Product"
              component={ProductScreen}
              options={{
                title: 'Product',
                headerTitleStyle: { fontSize: 20 },
                headerLeft: (props) => <HeaderBackButton {...props} />,
              }}
            />
            <Stack.Screen
              name="Payment"
              component={PaymentScreen}
              options={{
                title: 'Payment',
                headerTitleStyle: { fontSize: 20 },
                headerLeft: (props) => <HeaderBackButton {...props} />,
              }}
            />
            <Stack.Screen
              name="PaymentMethod"
              component={AddingPaymentMethodScreen}
              options={{
                title: 'New payment method',
                headerTitleStyle: { fontSize: 20 },
                headerLeft: (props) => <HeaderBackButton {...props} />,
              }}
            />
            <Stack.Screen
              name="PaymentSuccess"
              component={PaymentSuccessScreen}
              options={{
                title: 'Payment success',
                headerTitleStyle: { fontSize: 20 },
                headerLeft: null,
                gesturesEnabled: false,
                swipeEnabled: false,
              }}
            />
          </Stack.Navigator>
        </NavigationContainer>
        <GlobalLoader />
        <ToastNotification />
      </View>
    </Provider>
  );
}

App.defaultProps = {
  skipLoadingScreen: false,
};

App.propTypes = {
  skipLoadingScreen: PropTypes.bool,
};
