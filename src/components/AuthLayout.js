import React from 'react';
import {
  Image, StyleSheet, View,
} from 'react-native';
import PropTypes from 'prop-types';
import { $white } from '../constants/Colors';
import Layout from '../constants/Layout';

const { width } = Layout.window;

export default function AuthLayout({ children, isRegistration }) {
  return (
    <View style={{ ...styles.container, padding: isRegistration ? '10% 3%' : '25% 3%' }}>
      <Image source={{ uri: 'https://i.pinimg.com/564x/f5/d0/51/f5d051306fcdce6da21ece1d903e49a1.jpg' }} style={styles.background} />
      <View style={styles.block}>
        <View style={styles.logo}>
          <Image source={require('../assets/images/logo.png')} style={styles.picture} />
        </View>
        <View style={styles.form}>
          {children}
        </View>
      </View>
    </View>
  );
}

AuthLayout.defaultProps = {
  isRegistration: false,
};

AuthLayout.propTypes = {
  children: PropTypes.node.isRequired,
  isRegistration: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#fff',
  },
  background: {
    position: 'absolute',
    bottom: 0,
    top: 0,
    right: 0,
    left: 0,
    opacity: 0.75,
    zIndex: -1,
  },
  logo: {
    width: 90,
    height: 85,
    backgroundColor: $white,
    borderRadius: 20,
    zIndex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,

    elevation: 10,
  },
  picture: {
    width: 65,
    height: 55,
  },
  scrollContainer: {
    width: '100%',
  },
  block: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  form: {
    width: width - 30,
    backgroundColor: $white,
    borderRadius: 40,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 15,
  },
});
