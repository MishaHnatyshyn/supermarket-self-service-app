import * as React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import PropTypes from 'prop-types';
import { Image } from 'react-native';
import BottomNavigationMenu from '../components/BottomNavigationMenu';
import ReceiptsListScreen from '../screens/ReceiptsListScreen';
import SearchScreen from '../screens/SearchScreen';
import BasketScreen from '../screens/BasketScreen';
import AccountScreen from '../screens/AccountScreen';

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Search';

function LogoTitle() {
  return (
    <Image
      style={{ height: 25, width: 160 }}
      source={require('../assets/images/1.png')}
    />
  );
}

export default function BottomTabNavigator({ navigation }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html

  navigation.setOptions({ headerTitle: (props) => <LogoTitle {...props} /> });

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
    </BottomTab.Navigator>
  );
}

BottomTabNavigator.propTypes = {
  navigation: PropTypes.shape.isRequired,
};
