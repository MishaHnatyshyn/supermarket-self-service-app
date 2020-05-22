import {
  StyleSheet, View, Text, TouchableOpacity, Image,
} from 'react-native';
import React, { useCallback } from 'react';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { FontAwesome } from '@expo/vector-icons';
import { getScannedProduct } from '../store/barcode/selectors';
import { removeScannedProduct } from '../store/barcode/actions';
import { $gray } from '../constants/Colors';
import { DEFAULT_PHOTO_URI } from '../constants/Defaults';
import { formatPrice } from '../utils/helpers';
import SmallLoader from './SmallLoader';
import FormButton from './LoginButton';
import Counter from './Counter';
import { addToBasket as addToBasketAction, changeBasketItemQuantity } from '../store/basket/asyncActions';

function ScannedProductCard({
  scannedProduct, addToBasket, updateQuantity, removeProduct,
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

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => removeProduct(scannedProduct.id)}>
        <FontAwesome name="remove" size={24} color={$gray} style={styles.removeIcon} />
      </TouchableOpacity>
      <Image
        source={{ uri: scannedProduct.photo || DEFAULT_PHOTO_URI }}
        style={styles.image}
        resizeMode="contain"
      />
      <View>
        <View style={styles.productInfo}>
          <Text numberOfLines={1} style={styles.productName}>
            {scannedProduct.name}
          </Text>
          <Text style={styles.price}>
            {formatPrice(scannedProduct.price, scannedProduct.currency)}
          </Text>
        </View>
        <View style={styles.basketButtonContainer}>
          {isLoading && !basketData && <SmallLoader isVisible />}
          {!isLoading && !basketData && (
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
            quantity={basketData.quantity}
            isLoading={isLoading}
            changeQuantity={updateProductQuantity}
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
};

const mapStateToProps = createStructuredSelector({
  scannedProduct: getScannedProduct,
});

const mapDispatchToProps = (dispatch) => ({
  removeProduct: (productId) => {
    dispatch(removeScannedProduct(productId));
  },
  addToBasket: (productId) => {
    dispatch(addToBasketAction(productId));
  },
  updateQuantity: (lineItemId, productId, quantity) => {
    dispatch(changeBasketItemQuantity(lineItemId, productId, quantity));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ScannedProductCard);


const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    flexDirection: 'row',
  },
  removeIcon: {
    position: 'absolute',
    top: 15,
    right: 15,
  },
});
