import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { getOrderBasketData } from '../store/receiptDetails/selectors';
import Layout from '../constants/Layout';
import { $black, $creamWhite, $gray } from '../constants/Colors';
import { formatPrice } from '../utils/helpers';

function ReceiptProductList({ basket }) {
  if (!basket) return null;
  const { data, totals: { total, items } } = basket;
  return (
    <View style={styles.container}>
      <View style={styles.productRow}>
        <Text style={styles.productName}>Name</Text>
        <Text style={styles.productQuantity}>Quant.</Text>
        <Text style={[styles.productSum, { textAlign: 'center' }]}>Sum</Text>
      </View>
      <View style={styles.list}>
        {data.map(({ name, quantity, sum }) => (
          <View style={styles.productRow}>
            <Text style={styles.productName} numberOfLines={2}>
              {name}
            </Text>
            <Text style={styles.productQuantity}>{quantity}</Text>
            <Text style={styles.productSum}>{formatPrice(sum)}</Text>
          </View>
        ))}
      </View>
      <View style={styles.productRow}>
        <Text style={[styles.productName, styles.totalsRowText]} numberOfLines={2}>Totals:</Text>
        <Text style={[styles.productQuantity, styles.totalsRowText]}>{items}</Text>
        <Text style={[styles.productSum, styles.totalsRowText]}>{formatPrice(total)}</Text>
      </View>
    </View>
  );
}

ReceiptProductList.defaultProps = {
  basket: null,
};

ReceiptProductList.propTypes = {
  basket: PropTypes.shape({
    data: PropTypes.arrayOf(PropTypes.shape({})),
    totals: PropTypes.shape({
      total: PropTypes.number,
      items: PropTypes.number,
    }),
  }),
};

const mapStateToProps = createStructuredSelector({
  basket: getOrderBasketData,
});

export default connect(mapStateToProps)(ReceiptProductList);

const styles = StyleSheet.create({
  paymentDetailsContainer: {
    marginTop: 0,
  },
  container: {
    width: Layout.window.width - 38,
    margin: 19,
    marginTop: 0,
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
  productRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  productName: {
    width: '60%',
    fontSize: 16,
  },
  productQuantity: {
    width: '20%',
    textAlign: 'center',
    fontSize: 16,

  },
  productSum: {
    width: '20%',
    textAlign: 'right',
    fontSize: 16,

  },
  list: {
    borderRadius: 1,
    borderStyle: 'solid',
    paddingVertical: 5,
    marginVertical: 5,
    borderTopWidth: 1,
    borderTopColor: $gray,
    borderBottomWidth: 1,
    borderBottomColor: $gray,
  },
  totalsRowText: {
    fontWeight: '500',
    fontSize: 16,
  },
});
