import {
  StyleSheet, View, Text,
} from 'react-native';
import * as React from 'react';
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import FormButton from '../components/LoginButton';
import { $gray } from '../constants/Colors';
import Input from '../components/Input';
import AuthLayout from '../components/AuthLayout';

export default function LoginScreen() {
  return (
    <AuthLayout>
      <Text style={styles.title}>Sign in to continue</Text>
      <View style={styles.info}>

        <Input label="Email" keyboardType="email-address" placeholder="Your email">
          <MaterialIcon name="email-outline" size={25} color={$gray} style={styles.inputIcon} />
        </Input>

        <Input label="Password" placeholder="Your password" secureTextEntry>
          <SimpleLineIcons name="lock" size={25} color={$gray} style={styles.inputIcon} />
        </Input>

        <View style={styles.signUpBlock}>
          <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
        </View>
      </View>
      <FormButton onClick={() => {}}>SIGN IN</FormButton>
    </AuthLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    textTransform: 'uppercase',
    fontSize: 20,
  },
  info: {
    marginBottom: 45,
  },
  signUpBlock: {
    alignItems: 'flex-end',
    marginTop: 7,
  },
  signUpText: {
    fontSize: 16,
  },
  inputIcon: {
    position: 'absolute',
    right: 13,
    top: 12,
  },
});
