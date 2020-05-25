import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import React, { useCallback, useEffect } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import {
  getAddToBasketData, getScannedProduct, isBasketUpdatePending,
} from '../store/barcode/selectors';
import { removeScannedProduct } from '../store/barcode/actions';
import {
  $gray, $green, $realWhite,
} from '../constants/Colors';
import { formatPrice } from '../utils/helpers';
import SmallLoader from './SmallLoader';
import FormButton from './LoginButton';
import Counter from './Counter';
import { addToBasket as addToBasketAction, changeBasketItemQuantity } from '../store/basket/asyncActions';

import Layout from '../constants/Layout';
import CachableImage from './CachableImage';

const { width } = Layout.window;

function ScannedProductCard({
  scannedProduct, addToBasket, updateQuantity, removeProduct, isBasketUpdating, basketData,
}) {
  const addProductToBasket = useCallback(() => {
    addToBasket(scannedProduct.id);
  }, [scannedProduct.id, addToBasket]);

  const updateProductQuantity = useCallback(
    (quantity) => {
      updateQuantity(basketData.lineItemId, scannedProduct.id, quantity);
    },
    [scannedProduct.id, updateQuantity, basketData],
  );

  useEffect(() => removeProduct, []);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => removeProduct(scannedProduct.id)} style={styles.removeIcon}>
        <FontAwesome name="remove" size={26} color={$gray} />
      </TouchableOpacity>
      <CachableImage
        source={scannedProduct.photo}
        style={styles.image}
        resizeMode="contain"
      />
      <View style={styles.productInformation}>
        <View style={styles.productInfo}>
          <Text numberOfLines={1} style={styles.productName}>
            {scannedProduct.name}
          </Text>
          <Text style={styles.price}>
            {formatPrice(scannedProduct.price, scannedProduct.currency)}
          </Text>
        </View>
        <View style={styles.basketButtonContainer}>
          {isBasketUpdating && !basketData && <SmallLoader isVisible />}
          {!isBasketUpdating && !basketData && (
          <FormButton
            buttonStyles={styles.basketButton}
            textStyles={styles.basketButtonText}
            onClick={addProductToBasket}
          >
            Add to basket
          </FormButton>
          )}
          {basketData && (
          <Counter
            displayPrices={false}
            displayCounter
            price={scannedProduct.price}
            sum={basketData.sum}
            quantity={basketData.quantity}
            isLoading={isBasketUpdating}
            changeQuantity={updateProductQuantity}
            counterStyles={styles.counterStyles}
          />
          )}
        </View>
      </View>

    </View>
  );
}

ScannedProductCard.propTypes = {
  scannedProduct: PropTypes.shape({
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    currency: PropTypes.string.isRequired,
    photo: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
  }).isRequired,
  addToBasket: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  removeProduct: PropTypes.func.isRequired,
  isBasketUpdating: PropTypes.bool.isRequired,
  basketData: PropTypes.shape({
    sum: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    lineItemId: PropTypes.number.isRequired,
  }).isRequired,
};

const mapStateToProps = createStructuredSelector({
  scannedProduct: getScannedProduct,
  basketData: getAddToBasketData,
  isBasketUpdating: isBasketUpdatePending,
});

const mapDispatchToProps = (dispatch) => ({
  removeProduct: (productId) => {
    dispatch(removeScannedProduct(productId));
  },
  addToBasket: (id) => dispatch(addToBasketAction(id)),
  updateQuantity: (lineItemId, productId, quantity) => {
    dispatch(changeBasketItemQuantity(lineItemId, productId, quantity));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ScannedProductCard);


const styles = StyleSheet.create({
  container: {
    height: '100%',
    width,
    flexDirection: 'row',
    alignItems: 'center',
    position: 'relative',
    padding: 15,
  },
  removeIcon: {
    position: 'absolute',
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    top: 0,
    right: 0,
  },
  counterStyles: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 0,
  },
  productInfo: {
    marginTop: 10,

    width: '100%',
    flexDirection: 'column',
  },
  productName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  price: {
    color: $green,
    fontSize: 24,
  },
  description: {
    fontSize: 18,
  },
  image: {
    height: '100%',
    width: '46%',
    backgroundColor: $realWhite,
    marginRight: '4%',
  },
  productInformation: {
    height: '100%',
    width: '50%',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  basketButtonContainer: {
    height: 44,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  basketButton: {
    width: '100%',
  },
});
