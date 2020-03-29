import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as React from 'react';
import PropTypes from 'prop-types';

export default function HeaderBackButton({ onPress }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={styles.container}
    >
      <Image source={require('../assets/images/back.png')} style={styles.image} />
    </TouchableOpacity>
  );
}

HeaderBackButton.propTypes = {
  onPress: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: 50,
    paddingLeft: 10,
  },
  image: {
    width: 20,
    height: 20,
  },
});
