import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import PropTypes from 'prop-types';
import Layout from '../constants/Layout';

const CENTRAL_BUTTON_WIDTH = 60;
const $white = '#f9f9f7';

export default function NavigationTabButton({
  route, navigate, children, isActive,
}) {
  const onNavigate = React.useCallback(() => {
    if (!isActive) {
      navigate(route);
    }
  }, [route, navigate, isActive]);
  return (
    <View>
      <TouchableOpacity style={style.ordinaryTabButton} onPress={onNavigate}>
        {children}
      </TouchableOpacity>
    </View>
  );
}

NavigationTabButton.propTypes = {
  route: PropTypes.string.isRequired,
  navigate: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  isActive: PropTypes.bool.isRequired,
};

const style = StyleSheet.create({
  ordinaryTabButton: {
    height: 50,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: $white,
    justifyContent: 'center',
    width: (Layout.window.width - CENTRAL_BUTTON_WIDTH) * 0.25,
  },
});
