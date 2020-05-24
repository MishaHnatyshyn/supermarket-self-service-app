import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import {
  getOrderCreationTime,
  getOrderPaymentDetails,
  getOrderStatus,
  getOrderStoreData,
  getOrderSum,
} from '../store/receiptDetails/selectors';
import { formatPrice, getFormattedTime, getOrderStatusName } from '../utils/helpers';
import {
  $black, $creamWhite, $gray, $green, $red, $yellow,
} from '../constants/Colors';
import Layout from '../constants/Layout';
import PaymentRecord from './PaymentRecord';

const createStoreAddressString = ({
  street, building, city, country,
}) => `${country}, ${city}, ${street}, ${building}`;

function ReceiptMainInfo({
  paymentDetails, storeData, sum, timestamp, status = 'in progress',
}) {
  if (!timestamp) return null;
  const statusName = getOrderStatusName(status);
  const {
    card_type, card_number, transaction_id, timestamp: transactionTime,
  } = paymentDetails;
  const paymentMethod = card_number ? 'Card' : 'Cash';
  return (
    <>
      <View style={[styles.container, styles.orderStatusContainer]}>
        <Text style={[styles.statusText, styles[`order-status-${statusName}`]]}>{status}</Text>
      </View>
      <View style={styles.container}>
        <View style={styles.receiptsInfo}>
          <Text style={styles.storeName}>{storeData.name}</Text>
          <Text style={styles.address}>{createStoreAddressString(storeData)}</Text>
          <Text style={styles.timeInfo}>{new Date(timestamp).toLocaleString('en-gb')}</Text>
        </View>
        <View style={styles.paymentDetailsContainer}>
          <View style={styles.paymentDetailsRow}>
            <Text>Total sum:</Text>
            <Text>{formatPrice(sum)}</Text>
          </View>
          <View style={styles.paymentDetailsRow}>
            <Text>Transaction ID:</Text>
            <Text>{transaction_id}</Text>
          </View>
          <View style={styles.paymentDetailsRow}>
            <Text>Payment method:</Text>
            <Text>{paymentMethod}</Text>
          </View>
          <View style={styles.paymentDetailsRow}>
            <Text>Card number:</Text>
            <PaymentRecord number={card_number} type={card_type} />
          </View>
          <View style={styles.paymentDetailsRow}>
            <Text>Transaction time:</Text>
            <Text>{getFormattedTime(transactionTime)}</Text>
          </View>
        </View>
      </View>
    </>
  );
}

const mapStateToProps = createStructuredSelector({
  paymentDetails: getOrderPaymentDetails,
  storeData: getOrderStoreData,
  sum: getOrderSum,
  timestamp: getOrderCreationTime,
  status: getOrderStatus,
});

export default connect(mapStateToProps)(ReceiptMainInfo);

ReceiptMainInfo.defaultProps = {
  paymentDetails: null,
  storeData: null,
  sum: null,
  timestamp: null,
  status: null,
};

ReceiptMainInfo.propTypes = {
  paymentDetails: PropTypes.shape({
    card_type: PropTypes.string,
    card_number: PropTypes.string,
    transaction_id: PropTypes.number,
    timestamp: PropTypes.string,
  }),
  storeData: PropTypes.shape({
    name: PropTypes.string,
  }),
  sum: PropTypes.number,
  timestamp: PropTypes.string,
  status: PropTypes.string,
};

const styles = StyleSheet.create({
  paymentDetailsContainer: {
    marginTop: 10,
  },
  container: {
    width: Layout.window.width - 14,
    margin: 7,
    marginBottom: 0,
    zIndex: 1,
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
  },
  'order-status-Progress': {
    color: $yellow,
  },
  'order-status-Error': {
    color: $red,
  },
  statusText: {
    fontSize: 22,
    textTransform: 'uppercase',
  },
  orderStatusContainer: {
    alignItems: 'center',
  },
  paymentDetailsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
