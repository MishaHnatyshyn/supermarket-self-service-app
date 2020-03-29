import {
  StyleSheet, View, Text, TouchableOpacity, Alert,
} from 'react-native';
import * as React from 'react';
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons';
import SimpleLineIcons from '@expo/vector-icons/SimpleLineIcons';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import FormButton from './LoginButton';
import { $gray } from '../constants/Colors';
import Input from './Input';
import { getIsAuthError, getIsAuthLoading, getUserId } from '../store/auth/selectors';
import { clearAuthErrors, register } from '../store/auth/actions';

function RegistrationForm({
  navigation, isError, isAuthorized, startRegister, clearErrors,
}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [passwordRepeat, setPasswordRepeat] = React.useState('');
  const navigateToLogin = React.useCallback(() => {
    navigation.navigate('Login');
  }, [navigation]);

  React.useEffect(() => clearErrors, []);

  React.useEffect(() => {
    if (isAuthorized) {
      navigation.navigate('Account');
    }
  }, [isAuthorized]);

  const submitForm = React.useCallback(() => {
    if (passwordRepeat !== password) {
      return Alert.alert('Password repeat does not match password.');
    }
    return startRegister(email, password);
  }, [email, password, startRegister, passwordRepeat]);

  return (
    <>
      <Text style={styles.title}>Sign in to continue</Text>
      <View style={styles.info}>
        <Input label="Email" keyboardType="email-address" placeholder="Your email" value={email} onChange={setEmail}>
          <MaterialIcon name="email-outline" size={25} color={$gray} style={styles.inputIcon} />
        </Input>

        <Input label="Password" placeholder="Your password" secureTextEntry value={password} onChange={setPassword}>
          <SimpleLineIcons name="lock" size={25} color={$gray} style={styles.inputIcon} />
        </Input>

        <Input label="Repeat password" placeholder="Repeat your password" secureTextEntry value={passwordRepeat} onChange={setPasswordRepeat}>
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
        <Text style={styles.errorText}>
          Wrong credentials! Try again.
        </Text>
      </View>
      <FormButton onClick={submitForm}>SIGN IN</FormButton>
    </>
  );
}
const mapStateToProps = createStructuredSelector({
  isLoading: getIsAuthLoading,
  isError: getIsAuthError,
  isAuthorized: getUserId,
});

const mapDispatchToProps = (dispatch) => ({
  register: (email, password) => { dispatch(register(email, password)); },
  clearErrors: clearAuthErrors,
});

export default connect(mapStateToProps, mapDispatchToProps)(RegistrationForm);

RegistrationForm.propTypes = {
  navigation: PropTypes.shape.isRequired,
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
