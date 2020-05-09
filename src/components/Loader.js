import React from 'react';
import { StyleSheet, Text } from 'react-native';
import * as Animatable from 'react-native-animatable';
import PropTypes from 'prop-types';

const animation = {
  0: {
    scale: 0.9,
  },
  0.5: {
    scale: 1.1,
  },
  1: {
    scale: 0.9,
  },
};

export default function Loader({ isVisible, imageStyles, textStyles }) {
  if (!isVisible) return null;
  return (
    <Animatable.View style={styles.container} animation="fadeIn">
      <Animatable.Image
        source={require('../assets/images/logo2.png')}
        style={[styles.image, imageStyles]}
        animation={animation}
        easing="ease-in-out"
        iterationCount="infinite"
        useNativeDriver
      />
      <Text
        style={[styles.text, textStyles]}
      >
        Loading ...
      </Text>
    </Animatable.View>
  );
}

Loader.defaultProps = {
  imageStyles: {},
  textStyles: {},
};

Loader.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  imageStyles: PropTypes.shape,
  textStyles: PropTypes.shape,
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    backgroundColor: 'rgba(255,255,255,0.76)',
  },
  image: {
    width: 130,
    height: 130,
  },
  text: {
    marginTop: -35,
    fontSize: 18,
    width: '100%',
    textAlign: 'center',
  },
});
