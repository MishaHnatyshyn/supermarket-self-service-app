import React from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  $black, $creamWhite, $gray, $green,
} from '../constants/Colors';
import Layout from '../constants/Layout';

const { width } = Layout.window;

export default function ReceiptCard({
  storeName, address, time, date, price, onOpen,
}) {
  return (
    <TouchableOpacity style={styles.container} onPress={onOpen}>
      <View style={styles.receiptsInfo}>
        <Text style={styles.storeName}>{storeName}</Text>
        <Text style={styles.address}>{address}</Text>
        <Text style={styles.timeInfo}>{`${time}, ${date}`}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{price}</Text>
      </View>
    </TouchableOpacity>
  );
}

ReceiptCard.propTypes = {
  storeName: PropTypes.string.isRequired,
  address: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  onOpen: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: width - 14,
    height: 100,
    flexDirection: 'row',
    margin: 7,
    padding: 10,
    justifyContent: 'space-between',
    backgroundColor: $creamWhite,
    shadowColor: $black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  receiptsInfo: {
    justifyContent: 'space-around',
  },
  priceContainer: {
    justifyContent: 'center',
  },
  price: {
    color: $green,
    fontSize: 35,
  },
  storeName: {
    fontSize: 23,
  },
  address: {
    color: $gray,
    fontSize: 18,
  },
  timeInfo: {
    fontSize: 18,
  },
});
