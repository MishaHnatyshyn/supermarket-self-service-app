import * as React from 'react';
import AuthLayout from '../components/AuthLayout';
import RegistrationForm from '../components/RegistrationForm';

export default function RegistrationScreen() {
  return (
    <AuthLayout isRegistration>
      <RegistrationForm />
    </AuthLayout>
  );
}
