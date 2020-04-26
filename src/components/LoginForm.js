import {
  StyleSheet, View, Text, TouchableOpacity,
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
import { clearAuthErrors, login } from '../store/auth/actions';

function LoginForm({
  navigation, isError, isAuthorized, startLogin, clearErrors,
}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isEmailError, setEmailError] = React.useState(false);
  const [isPasswordError, setPasswordError] = React.useState(false);
  const navigateToRegistration = React.useCallback(() => {
    navigation.navigate('Registration');
  }, [navigation]);

  React.useEffect(() => {
    clearErrors();
  }, []);

  React.useEffect(() => {
    if (isAuthorized) {
      navigation.navigate('Account');
    }
  }, [isAuthorized]);

  const onEmailChange = (text) => {
    setEmailError(false);
    setEmail(text);
  };

  const onPasswordChange = (text) => {
    setPasswordError(false);
    setPassword(text);
  };

  const submitForm = React.useCallback(() => {
    if (email === '') {
      return setEmailError(true);
    }
    if (password === '') {
      return setPasswordError(true);
    }
    startLogin(email, password);
  }, [email, password, startLogin]);

  return (
    <>
      <Text style={styles.title}>Sign in to continue</Text>
      <View style={styles.info}>
        <Input
          label="Email"
          keyboardType="email-address"
          placeholder="Your email"
          onChange={onEmailChange}
          value={email}
          isError={isEmailError}
        >
          <MaterialIcon name="email-outline" size={25} color={$gray} style={styles.inputIcon} />
        </Input>

        <Input
          label="Password"
          placeholder="Your password"
          secureTextEntry
          onChange={onPasswordChange}
          value={password}
          isError={isPasswordError}
        >
          <SimpleLineIcons name="lock" size={25} color={$gray} style={styles.inputIcon} />
        </Input>

        <View style={styles.signUpBlock}>
          <TouchableOpacity style={styles.signUpButton} onPress={navigateToRegistration}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <Text style={[styles.signUpLink, styles.signUpText]}> Sign up</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={[styles.errorBox, { opacity: isError ? 1 : 0 }]}>
        <Text style={styles.errorText}>Wrong credentials! Try again.</Text>
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
  startLogin: (email, password) => {
    dispatch(login(email, password));
  },
  clearErrors: () => {
    dispatch(clearAuthErrors());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);

LoginForm.propTypes = {
  navigation: PropTypes.shape.isRequired,
  isError: PropTypes.bool.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
  startLogin: PropTypes.func.isRequired,
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
