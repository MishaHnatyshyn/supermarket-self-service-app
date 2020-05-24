import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Switch,
} from 'react-native';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PaymentMethodForm from '../components/PaymentMethodForm';
import FormButton from '../components/LoginButton';
import { getTotalBasketSum } from '../store/basket/selectors';
import { formatPrice } from '../utils/helpers';
import {
  $gray, $green, $lightGray, $semiDarkGray,
} from '../constants/Colors';
import { isAuthorized } from '../store/auth/selectors';
import { getPaymentMethods } from '../store/user/selectors';

function PaymentScreen({ totalSum, isUserAuthorized, paymentMethods }) {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDateYear, setExpirationDateYear] = useState('');
  const [expirationDateMonth, setExpirationDateMonth] = useState('');
  const [cvv, setCvv] = useState('');
  const [isSavingCard, setSavingCard] = useState(false);
  const [fillNewCard, setFillNewCard] = useState(false);

  const PaymentForm = () => (
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
  );

  return (
    <View style={styles.container}>
      <View style={styles.totalSumContainer}>
        <Text style={styles.totalSumText}>
          Total sum:
        </Text>
        <Text style={styles.totalSum}>
          {' '}
          { formatPrice(totalSum)}
        </Text>
      </View>

      {!isAuthorized && (
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
      )}

      {isUserAuthorized && (paymentMethods.length === 0 || fillNewCard === true) && (
        <View style={styles.cardBlock}>
          <PaymentForm />
          <View style={styles.switchSavingCard}>
            <Text style={styles.saveCardText}>Save card</Text>
            <Switch
              trackColor={{ false: $green, true: $green }}
              thumbColor={isSavingCard ? 'white' : 'white'}
              ios_backgroundColor={$lightGray}
              onValueChange={setSavingCard}
              value={isSavingCard}
            />

          </View>

        </View>
      )}

      {
        isUserAuthorized && paymentMethods.length > 0 && fillNewCard === false && (
          <View />
        )
      }
      <FormButton onClick={() => {}}>Buy</FormButton>
    </View>
  );
}

PaymentScreen.propTypes = {
  totalSum: PropTypes.string.isRequired,
  isUserAuthorized: PropTypes.bool.isRequired,
  paymentMethods: PropTypes.arrayOf(PropTypes.shape).isRequired,
};

const mapStateToProps = createStructuredSelector({
  totalSum: getTotalBasketSum,
  isUserAuthorized: isAuthorized,
  paymentMethods: getPaymentMethods,
});


export default connect(mapStateToProps)(PaymentScreen);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalSumText: {
    fontSize: 27,
  },
  totalSum: {
    color: $green,
    fontSize: 30,
    fontWeight: 'bold',
  },
  totalSumContainer: {
    flexDirection: 'row',
    marginBottom: 60,
  },
  cardBlock: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  switchSavingCard: {
    position: 'absolute',
    bottom: 30,
    right: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveCardText: {
    marginRight: 5,
    fontSize: 17,
    color: $semiDarkGray,
  },
});
