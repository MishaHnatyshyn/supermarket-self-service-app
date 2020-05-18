import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import BottomNavigationMenu from '../components/BottomNavigationMenu';
import ReceiptsListScreen from '../screens/ReceiptsListScreen';
import SearchScreen from '../screens/SearchScreen';
import BasketScreen from '../screens/BasketScreen';
import AccountScreen from '../screens/AccountScreen';
import ProductScreen from '../screens/ProductScreen';
import HeaderBackButton from '../components/HeaderBackButton';
import ReceiptDescriptionScreen from '../screens/ReceiptDescriptionScreen';
import CategoriesScreen from '../screens/CategoriesScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Search';

function LogoTitle() {
  return <Image style={{ height: 25, width: 160 }} source={require('../assets/images/1.png')} />;
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Search':
      return (props) => <LogoTitle {...props} />;
    case 'History':
      return 'Receipts';
    case 'Basket':
      return 'Basket';
    case 'Account':
      return 'My Account';
    case 'Product':
      return (props) => <LogoTitle {...props} />;
    default:
      return (props) => <LogoTitle {...props} />;
  }
}

export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html

  navigation.setOptions({ headerTitle: getHeaderTitle(route) });
  // navigation.setOptions({ headerTitle: (props) => <LogoTitle {...props} /> });

  return (
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME} tabBar={BottomNavigationMenu}>
      <BottomTab.Screen
        name="Search"
        component={SearchScreen}
        options={{ headerTitle: (props) => <LogoTitle {...props} /> }}
      />
      <BottomTab.Screen
        name="History"
        component={ReceiptsListScreen}
        options={{
          title: 'History',
        }}
      />
      <BottomTab.Screen
        name="Basket"
        component={BasketScreen}
        options={{
          title: 'Basket',
        }}
      />
      <BottomTab.Screen
        name="Account"
        component={AccountScreen}
        options={{
          title: 'My Account',
        }}
      />
      <BottomTab.Screen
        name="Receipt"
        component={ReceiptDescriptionScreen}
        options={{
          title: 'Receipt',
        }}
      />
      <BottomTab.Screen
        name="Categories"
        component={CategoriesScreen}
        options={{
          title: 'Categories',
        }}
      />
      <BottomTab.Screen
        name="Product"
        component={ProductScreen}
        options={{
          title: 'Product',
          headerTitleStyle: { fontSize: 20 },
          headerLeft: (props) => <HeaderBackButton {...props} />,
        }}
      />
    </BottomTab.Navigator>
  );
}

BottomTabNavigator.propTypes = {
  navigation: PropTypes.shape.isRequired,
  route: PropTypes.shape.isRequired,
};
