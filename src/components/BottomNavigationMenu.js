import React from 'react';
import {
  View, StyleSheet, TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import IconAntDesign from '@expo/vector-icons/AntDesign';
import PropTypes from 'prop-types';
import Layout from '../constants/Layout';
import NavigationTabButton from './NavigationTabButton';
import { $black, $creamWhite, $green } from '../constants/Colors';

const CENTRAL_BUTTON_WIDTH = 60;


export default function BottomNavigationMenu({ state, navigation }) {
  const goToBarcodeScanner = () => {
    navigation.navigate('BarcodeScanner');
  };
  return (
    <View style={style.container}>
      <NavigationTabButton route="Search" navigate={navigation.navigate} isActive={state.index === 0}>
        <Ionicons
          name="ios-search"
          size={30}
          color={state.index === 0 ? $green : $black}
        />
      </NavigationTabButton>
      <NavigationTabButton route="History" navigate={navigation.navigate} isActive={state.index === 1}>
        <Icon
          name="file-document-outline"
          size={30}
          color={state.index === 1 ? $green : $black}
        />
      </NavigationTabButton>
      <View style={style.centralTabButtonPlaceholder}>
        <View style={style.centralTabButtonContainer}>
          <TouchableOpacity style={style.centralTabButton} onPress={goToBarcodeScanner}>
            <Icon
              name="barcode-scan"
              size={30}
            />
          </TouchableOpacity>
        </View>
      </View>
      <NavigationTabButton route="Basket" navigate={navigation.navigate} isActive={state.index === 2}>
        <Ionicons
          name="ios-cart"
          color={state.index === 2 ? $green : $black}
          size={30}
        />
      </NavigationTabButton>
      <NavigationTabButton route="Account" navigate={navigation.navigate} isActive={state.index === 3}>
        <IconAntDesign
          name="user"
          color={state.index === 3 ? $green : $black}
          size={30}
        />
      </NavigationTabButton>
    </View>
  );
}

BottomNavigationMenu.propTypes = {
  state: PropTypes.shape({
    index: PropTypes.number,
  }).isRequired,
  navigation: PropTypes.shape.isRequired,
};

const style = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    height: 50,
    backgroundColor: $creamWhite,
    shadowOffset: {
      width: 0,
      height: 7,
    },
    shadowOpacity: 0.43,
    shadowRadius: 9.51,
    elevation: 15,
  },
  ordinaryTabButton: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: $creamWhite,
    justifyContent: 'center',
    width: (Layout.window.width - CENTRAL_BUTTON_WIDTH) * 0.25,
  },
  centralTabButton: {
    borderRadius: CENTRAL_BUTTON_WIDTH / 2,
    borderWidth: 2,
    width: CENTRAL_BUTTON_WIDTH,
    borderColor: $green,
    padding: 12,
    height: CENTRAL_BUTTON_WIDTH,
    backgroundColor: $creamWhite,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,

  },
  centralTabButtonPlaceholder: {
    position: 'relative',
    width: CENTRAL_BUTTON_WIDTH,
    height: 50,
  },
  centralTabButtonContainer: {
    position: 'absolute',
    borderRadius: CENTRAL_BUTTON_WIDTH / 2,
    width: CENTRAL_BUTTON_WIDTH,
    padding: 12,
    height: CENTRAL_BUTTON_WIDTH,
    backgroundColor: $creamWhite,
    justifyContent: 'center',
    alignItems: 'center',
    bottom: 0,
  },
});
