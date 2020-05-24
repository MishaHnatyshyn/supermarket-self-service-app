import {
  Image, StyleSheet, Text, View,
} from 'react-native';
import React from 'react';
import PropTypes from 'prop-types';

export default function PaymentRecord({ number, type }) {
  return (
    <View style={styles.paymentRecord}>
      <View style={styles.paymentRecordTitle}>
        {type === 'visa' ? (
          <Image
            style={styles.paymentTypeIcon}
            source={require('../assets/images/visa.png')}
          />
        ) : (
          <Image
            style={styles.paymentTypeIcon}
            source={require('../assets/images/mastercard.png')}
          />
        )}
        <Text style={styles.cardNumberText}>{number}</Text>
      </View>
    </View>
  );
}

PaymentRecord.propTypes = {
  number: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  paymentTypeIcon: {
    width: 35,
    height: 22,
    marginRight: 10,
  },
  paymentRecord: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentRecordTitle: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  cardNumberText: {
    fontSize: 18,
  },
});
