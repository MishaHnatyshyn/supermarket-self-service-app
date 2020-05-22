import * as React from 'react';
import AuthLayout from '../components/AuthLayout';
import LoginForm from '../components/LoginForm';

export default function LoginScreen() {
  return (
    <AuthLayout>
      <LoginForm />
    </AuthLayout>
  );
}
