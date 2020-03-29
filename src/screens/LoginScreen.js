import * as React from 'react';
import PropTypes from 'prop-types';
import AuthLayout from '../components/AuthLayout';
import LoginForm from '../components/LoginForm';

export default function LoginScreen({ navigation }) {
  return (
    <AuthLayout>
      <LoginForm navigation={navigation} />
    </AuthLayout>
  );
}

LoginScreen.propTypes = {
  navigation: PropTypes.shape.isRequired,
};
