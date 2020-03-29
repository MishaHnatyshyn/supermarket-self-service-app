import React from 'react';
import {
  StyleSheet, Text, View, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import LoginButton from './LoginButton';
import { $green } from '../constants/Colors';

export default function UnauthorizedUserAccount({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.profileText}>Your profile</Text>
      <Text style={styles.signInText}>
        To gain the full experience of using Grocee please sign in of create an Grocee account
      </Text>
      <LoginButton onClick={() => navigation.navigate('Login')}>Sign in to your account</LoginButton>
      <TouchableOpacity onPress={() => navigation.navigate('Registration')}>
        <Text style={styles.signUpButton}>Sign up for Grocee</Text>
      </TouchableOpacity>
    </View>
  );
}

UnauthorizedUserAccount.propTypes = {
  navigation: PropTypes.shape.isRequired,
};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileText: {
    fontSize: 30,
    marginBottom: 25,
  },
  signInText: {
    fontSize: 20,
    textAlign: 'center',
    marginLeft: '5%',
    marginRight: '5%',
    marginBottom: 25,

  },
  signUpButton: {
    color: $green,
    fontSize: 20,
    marginTop: 25,

  },
});
