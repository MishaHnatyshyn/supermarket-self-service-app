import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { StyleSheet, View, Text } from 'react-native';
import FormButton from './LoginButton';
import { getTotalBasketProducts, getTotalBasketSum } from '../store/basket/selectors';
import { formatPrice } from '../utils/helpers';

function BasketSummarySection({ sum, itemsCount, buyProducts }) {
  if (itemsCount === 0) return null;
  return (
    <View style={styles.confirmButtonContainer}>
      <View>
        <Text style={styles.totalPriceLabel}>
          Total:
        </Text>
        <Text style={styles.totalPrice}>
          {formatPrice(sum)}
        </Text>
      </View>
      <FormButton onClick={buyProducts} buttonStyles={styles.buttonStyles}>Buy products</FormButton>
    </View>
  );
}

BasketSummarySection.propTypes = {
  sum: PropTypes.number.isRequired,
  itemsCount: PropTypes.number.isRequired,
  buyProducts: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  sum: getTotalBasketSum,
  itemsCount: getTotalBasketProducts,
});

const mapDispatchToProps = () => ({
  buyProducts: () => {},
});

export default connect(mapStateToProps, mapDispatchToProps)(BasketSummarySection);

const styles = StyleSheet.create({
  confirmButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 15,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',

  },
  buttonStyles: {
    width: 'auto',
  },
  totalPriceLabel: {
    fontSize: 16,
  },
  totalPrice: {
    fontWeight: 'bold',
    fontSize: 23,
  },
});
