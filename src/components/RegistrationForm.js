import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import React, { useState, useCallback, useEffect } from 'react';
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import FormButton from './LoginButton';
import { $gray } from '../constants/Colors';
import Input from './Input';
import { getIsAuthError, getIsAuthLoading, getUserId } from '../store/auth/selectors';
import { clearAuthErrors } from '../store/auth/actions';
import { register } from '../store/auth/asyncActions';

const emailRegExp = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

function RegistrationForm({
  isError, isAuthorized, startRegister, clearErrors,
}) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordRepeat, setPasswordRepeat] = useState('');
  const [isEmailError, setEmailError] = useState(false);
  const [isPasswordError, setPasswordError] = useState(false);
  const navigation = useNavigation();

  const navigateToLogin = useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  useEffect(() => {
    clearErrors();
  }, []);
  useEffect(() => {
    if (isAuthorized) {
      navigation.navigate('Account');
    }
  }, [isAuthorized]);

  const onPasswordRepeatChange = (text) => {
    setPasswordError(false);
    setPasswordRepeat(text);
  };

  const onEmailChange = (text) => {
    setEmailError(false);
    setEmail(text);
  };

  const onPasswordChange = (text) => {
    setPasswordError(false);
    setPassword(text);
  };

  const submitForm = useCallback(() => {
    if (!emailRegExp.test(email)) {
      return setEmailError(true);
    }
    if (passwordRepeat !== password || password === '' || passwordRepeat === '') {
      return setPasswordError(true);
    }
    return startRegister(email, password);
  }, [email, password, startRegister, passwordRepeat]);

  return (
    <>
      <Text style={styles.title}>Sign up to continue</Text>
      <View style={styles.info}>
        <Input
          label="Email"
          keyboardType="email-address"
          placeholder="Your email"
          value={email}
          onChange={onEmailChange}
          isError={isEmailError}
        >
          <MaterialIcon name="email-outline" size={25} color={$gray} style={styles.inputIcon} />
        </Input>

        <Input
          label="Password"
          placeholder="Your password"
          secureTextEntry
          value={password}
          onChange={onPasswordChange}
        >
          <SimpleLineIcons name="lock" size={25} color={$gray} style={styles.inputIcon} />
        </Input>

        <Input
          label="Repeat password"
          placeholder="Repeat your password"
          secureTextEntry
          value={passwordRepeat}
          onChange={onPasswordRepeatChange}
          isError={isPasswordError}
        >
          <SimpleLineIcons name="lock" size={25} color={$gray} style={styles.inputIcon} />
        </Input>

        <View style={styles.signUpBlock}>
          <TouchableOpacity style={styles.signUpButton} onPress={navigateToLogin}>
            <Text style={styles.signUpText}>Already have an account?</Text>
            <Text style={[styles.signUpLink, styles.signUpText]}> Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.errorBox, { opacity: isError ? 1 : 0 }]}>
        <Text style={styles.errorText}>Wrong credentials! Try again.</Text>
      </View>
      <FormButton onClick={submitForm}>SIGN UP</FormButton>
    </>
  );
}
const mapStateToProps = createStructuredSelector({
  isLoading: getIsAuthLoading,
  isError: getIsAuthError,
  isAuthorized: getUserId,
});

const mapDispatchToProps = (dispatch) => ({
  startRegister: (email, password) => {
    dispatch(register(email, password));
  },
  clearErrors: () => {
    dispatch(clearAuthErrors());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);

RegistrationForm.propTypes = {
  isError: PropTypes.bool.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  startRegister: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  title: {
    textTransform: 'uppercase',
    fontSize: 20,
  },
  info: {
    marginBottom: 25,
  },
  signUpBlock: {
    alignItems: 'flex-end',
    marginTop: 7,
  },
  signUpText: {
    fontSize: 16,
  },
  signUpLink: {
    color: 'blue',
    textDecorationLine: 'underline',
  },
  inputIcon: {
    position: 'absolute',
    right: 13,
    top: 12,
  },
  signUpButton: {
    flexDirection: 'row',
  },
  errorBox: {
    paddingBottom: 20,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
  },
});
