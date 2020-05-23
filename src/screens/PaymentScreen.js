import React, { useState } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import PaymentMethodForm from '../components/PaymentMethodForm';
import FormButton from '../components/LoginButton';

export default function PaymentScreen() {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDateYear, setExpirationDateYear] = useState('');
  const [expirationDateMonth, setExpirationDateMonth] = useState('');
  const [cvv, setCvv] = useState('');

  return (
    <View style={styles.container}>
      <PaymentMethodForm
        cardNumber={cardNumber}
        setCardNumber={setCardNumber}
        expirationDateMonth={expirationDateMonth}
        setExpirationDateMonth={setExpirationDateMonth}
        expirationDateYear={expirationDateYear}
        setExpirationDateYear={setExpirationDateYear}
        cvv={cvv}
        setCvv={setCvv}
      />
      <FormButton onClick={() => {}}>Buy</FormButton>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
