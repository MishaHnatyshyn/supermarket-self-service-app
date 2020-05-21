import React from 'react';
import { StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';

export default function SmallLoader({ isVisible, imageStyles }) {
  if (!isVisible) return null;
  return (
    <Animatable.View style={styles.container} animation="fadeIn">
      <Animatable.Image
        source={require('../assets/images/donut.png')}
        style={[styles.image, imageStyles]}
        animation="rotate"
        useNativeDriver
      />
    </Animatable.View>
  );
}

SmallLoader.defaultProps = {
  imageStyles: {},
};

SmallLoader.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  imageStyles: PropTypes.shape({}),
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    // backgroundColor: 'rgba(255,255,255,0.76)',
  },
  image: {
    width: 25,
    height: 25,
  },
});
