import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { StyleSheet, View, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import FormButton from './LoginButton';
import { getTotalBasketProducts, getTotalBasketSum } from '../store/basket/selectors';
import { formatPrice } from '../utils/helpers';

function BasketSummarySection({ sum, itemsCount }) {
  if (itemsCount === 0) return null;

  const navigation = useNavigation();

  const buyProducts = () => {
    navigation.navigate('Payment');
  };

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
};

const mapStateToProps = createStructuredSelector({
  sum: getTotalBasketSum,
  itemsCount: getTotalBasketProducts,
});

export default connect(mapStateToProps)(BasketSummarySection);

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
