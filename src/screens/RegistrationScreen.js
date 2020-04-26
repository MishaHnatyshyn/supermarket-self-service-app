import * as React from 'react';
import PropTypes from 'prop-types';
import AuthLayout from '../components/AuthLayout';
import RegistrationForm from '../components/RegistrationForm';

export default function RegistrationScreen({ navigation }) {
  return (
    <AuthLayout isRegistration>
      <RegistrationForm navigation={navigation} />
    </AuthLayout>
  );
}

RegistrationScreen.propTypes = {
  navigation: PropTypes.shape.isRequired,
};
