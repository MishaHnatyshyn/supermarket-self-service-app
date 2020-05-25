import React, { useCallback } from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import { $green, $realWhite } from '../constants/Colors';
import Layout from '../constants/Layout';
import FormButton from './LoginButton';
import { formatPrice } from '../utils/helpers';
import Counter from './Counter';
import SmallLoader from './SmallLoader';
import CachableImage from './CachableImage';

const { width } = Layout.window;

export default function SearchResultItem({
  id,
  name,
  price,
  currency,
  photo,
  basketData,
  isLoading,
  addToBasket,
  updateQuantity,
}) {
  const addProductToBasket = useCallback(() => {
    addToBasket(id);
  }, [id, addToBasket]);

  const updateProductQuantity = useCallback(
    (quantity) => {
      updateQuantity(basketData.lineItemId, id, quantity);
    },
    [id, updateQuantity, basketData],
  );

  const navigation = useNavigation();

  const openProduct = useCallback(() => {
    navigation.navigate('Product', {
      id,
    });
  }, [navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <TouchableOpacity onPress={openProduct} style={styles.infoContainer}>
          <CachableImage
            source={photo}
            style={styles.image}
            resizeMode="contain"
          />
          <View style={styles.productInfo}>
            <Text numberOfLines={1} style={styles.productName}>
              {name}
            </Text>
            <Text style={styles.price}>{formatPrice(price, currency)}</Text>
          </View>
        </TouchableOpacity>
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

SearchResultItem.defaultProps = {
  basketData: null,
  photo: null,
};

SearchResultItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  photo: PropTypes.string,
  id: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  addToBasket: PropTypes.func.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  basketData: PropTypes.shape({
    lineItemId: PropTypes.number.isRequired,
    quantity: PropTypes.number.isRequired,
    sum: PropTypes.number,
    price: PropTypes.number,
  }),
};

const styles = StyleSheet.create({
  container: {
    width: '50%',
    padding: 1,
  },
  card: {
    width: '100%',
    alignItems: 'center',
    padding: 8,
    backgroundColor: $realWhite,
  },
  productInfo: {
    marginTop: 10,
    width: '100%',
    flexDirection: 'column',
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  price: {
    color: $green,
    fontSize: 20,
  },
  description: {
    fontSize: 18,
  },
  descriptionContainer: {
    width: width - 30,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  image: {
    height: width / 2.5,
    width: '80%',
    backgroundColor: $realWhite,
  },
  basketButtonContainer: {
    height: 44,
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
    position: 'relative',
  },
  basketButton: {
    width: '100%',
  },
  basketButtonText: {
    fontSize: 16,
  },
  infoContainer: {
    width: '100%',
    alignItems: 'center',
  },
});
