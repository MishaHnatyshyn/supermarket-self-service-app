import {
  StyleSheet, View, Text, Image,
} from 'react-native';
import * as React from 'react';
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import Layout from '../constants/Layout';
import FormButton from '../components/LoginButton';
import { $gray, $white } from '../constants/Colors';
import Input from '../components/Input';

const { width } = Layout.window;

export default function LoginScreen() {
  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://i.pinimg.com/564x/f5/d0/51/f5d051306fcdce6da21ece1d903e49a1.jpg' }} style={styles.background} />
      <View style={styles.block}>
        <View style={styles.logo}>
          <Image source={require('../assets/images/logo.png')} style={styles.picture} />
        </View>
        <View style={styles.form}>
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
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    position: 'relative',
    backgroundColor: '#fff',
    padding: '25% 3%',
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
  block: {
    flexDirection: 'column',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  form: {
    height: '87%',
    width: width - 30,
    backgroundColor: $white,
    borderRadius: 40,
    marginTop: 25,
    alignItems: 'center',
    justifyContent: 'space-around',
    padding: 15,
  },
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
