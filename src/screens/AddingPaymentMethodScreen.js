import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
} from 'react-native';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { useNavigation } from '@react-navigation/native';
import PaymentMethodForm from '../components/PaymentMethodForm';
import FormButton from '../components/LoginButton';
import { addNewPaymentMethod } from '../store/user/asyncActions';
import { getIsPaymentMethodAdded, getIsPaymentMethodLoading } from '../store/user/selectors';
import SmallLoader from '../components/SmallLoader';

function AddingPaymentMethodScreen({ addPaymentMethod, isLoading, isAdded }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDateYear, setExpirationDateYear] = useState('');
  const [expirationDateMonth, setExpirationDateMonth] = useState('');
  const [cvv, setCvv] = useState('');
  const [isFormValid, setFormValid] = useState(false);

  const navigation = useNavigation();

  useEffect(() => {
    if (isAdded) {
      navigation.navigate('Account');
    }
  }, [isAdded]);

  useEffect(() => {
    if (cardNumber.length !== 16) {
      return setFormValid(false);
    }
    if (expirationDateMonth.length !== 2 || expirationDateMonth < 1 || expirationDateMonth > 12) {
      return setFormValid(false);
    }

    if (expirationDateYear.length !== 2 || (expirationDateYear < 20)) {
      return setFormValid(false);
    }

    if (cvv.length !== 3) {
      return setFormValid(false);
    }

    return setFormValid(true);
  }, [cardNumber, expirationDateMonth, expirationDateYear, cvv]);

  const submitForm = () => {
    addPaymentMethod(cardNumber, expirationDateMonth, expirationDateYear, cvv);
  };

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
      <View style={styles.buttonBlock}>
        {isLoading && <SmallLoader isVisible />}
        {!isLoading && <FormButton onClick={submitForm} disabled={!isFormValid}>Save</FormButton>}
      </View>

    </View>
  );
}

AddingPaymentMethodScreen.propTypes = {
  addPaymentMethod: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  isAdded: PropTypes.bool.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isLoading: getIsPaymentMethodLoading,
  isAdded: getIsPaymentMethodAdded,
});

const mapDispatchToProps = (dispatch) => ({
  addPaymentMethod: (cardNumber, expirationDateMonth, expirationDateYear, cvv) => dispatch(
    addNewPaymentMethod(cardNumber, expirationDateMonth, expirationDateYear, cvv),
  ),
});

export default connect(mapStateToProps, mapDispatchToProps)(AddingPaymentMethodScreen);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonBlock: {
    height: 100,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});
