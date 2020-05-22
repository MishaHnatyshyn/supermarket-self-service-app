import React, { useCallback } from 'react';
import { StyleSheet, View } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import SmallLoader from './SmallLoader';
import FormButton from './LoginButton';
import Counter from './Counter';
import {
  getAddToBasketData,
  getProductId,
  getProductLoadingStatus,
  getProductPrice,
  isBasketUpdatePending,
} from '../store/product/selectors';
import {
  addToBasket as addToBasketAction,
  changeBasketItemQuantity,
} from '../store/basket/asyncActions';
import { $black, $realWhite } from '../constants/Colors';

function ProductAddToBasketSection({
  isLoading,
  basketData,
  addToBasket,
  isBasketUpdating,
  updateQuantity,
  productId,
  price,
  idFromParams,
}) {
  const addProductToBasket = useCallback(() => {
    addToBasket(productId);
  }, [productId, addToBasket]);

  const updateProductQuantity = useCallback(
    (quantity) => {
      updateQuantity(basketData?.lineItemId, productId, quantity);
    },
    [productId, updateQuantity, basketData],
  );

  if (!productId || isLoading || idFromParams !== productId) return null;

  return (
    <View style={styles.addToBasketSection}>
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
          displayPrices
          displayCounter
          price={price}
          sum={basketData.sum}
          quantity={basketData.quantity}
          isLoading={isBasketUpdating}
          changeQuantity={updateProductQuantity}
          counterStyles={styles.counterStyles}
        />
      )}
    </View>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: getProductLoadingStatus,
  basketData: getAddToBasketData,
  isBasketUpdating: isBasketUpdatePending,
  productId: getProductId,
  price: getProductPrice,
});

const mapDispatchToProps = (dispatch) => ({
  addToBasket: (id) => dispatch(addToBasketAction(id)),
  updateQuantity: (lineItemId, productId, quantity) => {
    dispatch(changeBasketItemQuantity(lineItemId, productId, quantity));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductAddToBasketSection);

ProductAddToBasketSection.propTypes = {
  productId: PropTypes.number.isRequired,
  idFromParams: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  addToBasket: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  isBasketUpdating: PropTypes.bool.isRequired,
  basketData: PropTypes.shape({
    sum: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    lineItemId: PropTypes.number.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  counterStyles: {
    width: '100%',
    marginTop: 0,
  },
  addToBasketSection: {
    position: 'absolute',
    bottom: 0,
    flexDirection: 'row',
    height: 70,
    left: 0,
    width: '100%',
    padding: 15,
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: $realWhite,

    shadowColor: $black,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});
