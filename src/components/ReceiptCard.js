import React, { useCallback } from 'react';
import {
  View, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import {
  $black, $creamWhite, $gray, $green, $red, $yellow,
} from '../constants/Colors';
import Layout from '../constants/Layout';
import { formatPrice, getFormattedTime, getOrderStatusName } from '../utils/helpers';

const { width } = Layout.window;


export default function ReceiptCard({
  id, status, timestamp, sum, store, street, building,
}) {
  const statusDisplayName = getOrderStatusName(status);
  const navigation = useNavigation();

  const onOpen = useCallback(() => {
    navigation.navigate('Receipt', {
      id,
    });
  }, [navigation]);
  return (
    <TouchableOpacity style={styles.container} onPress={onOpen}>
      <View style={styles.receiptsInfo}>
        <Text style={styles.storeName}>{store}</Text>
        <Text style={styles.address}>{`${street}, ${building}`}</Text>
        <Text style={styles.timeInfo}>{getFormattedTime(timestamp)}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>{formatPrice(sum)}</Text>
        <Text style={styles[`order-status-${statusDisplayName}`]}>{statusDisplayName}</Text>
      </View>
    </TouchableOpacity>
  );
}

ReceiptCard.propTypes = {
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  timestamp: PropTypes.string.isRequired,
  sum: PropTypes.number.isRequired,
  store: PropTypes.string.isRequired,
  street: PropTypes.string.isRequired,
  building: PropTypes.string.isRequired,
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
    fontSize: 22,
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
  'order-status-Paid': {
    color: $green,
    fontSize: 22,
  },
  'order-status-Progress': {
    color: $yellow,
    fontSize: 22,
  },
  'order-status-Error': {
    color: $red,
    fontSize: 22,
  },
});
