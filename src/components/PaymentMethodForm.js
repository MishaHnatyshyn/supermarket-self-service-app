import React from 'react';
import {
  StyleSheet, View, Text, TextInput, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { $gray, $lightGray } from '../constants/Colors';

export default function PaymentMethodForm({
  cardNumber,
  setCardNumber,
  expirationDateYear,
  setExpirationDateYear,
  expirationDateMonth,
  setExpirationDateMonth,
  cvv,
  setCvv,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.cardPhotos}>
        <Image
          style={styles.paymentTypeIcon}
          source={require('../assets/images/visa.png')}
        />
        <Image
          style={styles.paymentTypeIcon}
          source={require('../assets/images/mastercard.png')}
        />
      </View>
      <View>
        <Text style={styles.label}>Card number</Text>
        <TextInput
          style={styles.input}
          keyboardType="numeric"
          maxLength={16}
          returnKeyType="done"
          placeholder={'*'.repeat(16)}
          value={cardNumber}
          onChangeText={setCardNumber}
        />
      </View>
      <View style={styles.bottomBlock}>
        <View>
          <Text style={styles.label}>Expiration date</Text>
          <View style={styles.expirationDateBlock}>
            <TextInput
              style={[styles.input, styles.expirationDateLeft]}
              keyboardType="numeric"
              maxLength={2}
              returnKeyType="done"
              placeholder="01"
              value={expirationDateMonth}
              onChangeText={setExpirationDateMonth}
            />
            <Text style={styles.slash}>/</Text>
            <TextInput
              style={[styles.input, styles.expirationDateRight]}
              keyboardType="numeric"
              maxLength={2}
              returnKeyType="done"
              placeholder="21"
              value={expirationDateYear}
              onChangeText={setExpirationDateYear}
            />
          </View>
        </View>
        <View>
          <Text style={styles.label}>CVV</Text>
          <TextInput
            style={[styles.input, styles.cvvInput]}
            keyboardType="numeric"
            maxLength={3}
            returnKeyType="done"
            placeholder={'*'.repeat(3)}
            secureTextEntry
            value={cvv}
            onChangeText={setCvv}
          />
        </View>
      </View>
    </View>
  );
}

PaymentMethodForm.propTypes = {
  cardNumber: PropTypes.string.isRequired,
  setCardNumber: PropTypes.func.isRequired,
  expirationDateYear: PropTypes.string.isRequired,
  setExpirationDateYear: PropTypes.func.isRequired,
  expirationDateMonth: PropTypes.string.isRequired,
  setExpirationDateMonth: PropTypes.func.isRequired,
  cvv: PropTypes.string.isRequired,
  setCvv: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 230,
    position: 'relative',
    justifyContent: 'space-around',
    borderRadius: 15,
    padding: 20,
    backgroundColor: $lightGray,
    marginBottom: 70,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.29,
    shadowRadius: 4.65,

    elevation: 7,
  },
  input: {
    borderBottomWidth: 1.5,
    borderBottomColor: $gray,
    fontSize: 20,
    padding: 8,
    justifyContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    letterSpacing: 4,
  },
  label: {
    fontSize: 15,
  },
  bottomBlock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  expirationDateBlock: {
    padding: 0,
    borderBottomWidth: 1.5,
    borderBottomColor: $gray,
    flexDirection: 'row',
    alignItems: 'center',
  },
  expirationDateLeft: {
    borderBottomWidth: 0,
    paddingRight: 0,
  },
  expirationDateRight: {
    borderBottomWidth: 0,
    paddingLeft: 4,
  },
  slash: {
    paddingTop: 7,
    paddingBottom: 8,
    fontSize: 20,
  },
  cvvInput: {
    width: 80,
  },
  cardPhotos: {
    position: 'absolute',
    flexDirection: 'row',
    right: 5,
    top: 5,
  },
  paymentTypeIcon: {
    width: 40,
    height: 35,
    marginRight: 10,
  },
});
