import React, { useCallback } from 'react';
import {
  TouchableOpacity, StyleSheet, View, Text, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { $black, $gray, $realWhite } from '../constants/Colors';
import Layout from '../constants/Layout';
import Counter from './Counter';
import { DEFAULT_PHOTO_URI } from '../constants/Defaults';

const { width } = Layout.window;

export default function BasketProductCard({
  displayCounter,
  navigation,
  updateQuantity,
  id,
  product,
  name,
  description,
  price,
  quantity,
  sum,
  photo,
  isLoading,
}) {
  const onOpen = useCallback(() => {
    navigation.navigate('Product', {
      id: product,
    });
  }, [navigation]);

  const updateProductQuantity = React.useCallback((newQuantity) => {
    updateQuantity(id, product, newQuantity);
  }, [product, updateQuantity]);

  return (
    <TouchableOpacity style={styles.card} onPress={onOpen}>
      <View style={styles.infoContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: photo || DEFAULT_PHOTO_URI }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>{name}</Text>
          <Text style={styles.descriptionText} numberOfLines={2}>
            {description}
          </Text>
        </View>
      </View>
      <Counter
        displayCounter={displayCounter}
        changeQuantity={updateProductQuantity}
        displayPrices
        price={price}
        sum={sum}
        quantity={quantity}
        isLoading={isLoading}
      />
    </TouchableOpacity>
  );
}

BasketProductCard.defaultProps = {
  displayCounter: true,
};

BasketProductCard.propTypes = {
  displayCounter: PropTypes.bool,
  navigation: PropTypes.shape.isRequired,
};

const styles = StyleSheet.create({
  card: {
    width: width - 14,
    margin: 7,
    padding: 10,
    justifyContent: 'space-between',
    backgroundColor: $realWhite,
    shadowColor: $black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,

    elevation: 3,
  },
  infoContainer: {
    flexDirection: 'row',
    height: 100,
  },
  imageContainer: {
    width: '30%',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  descriptionContainer: {
    width: '70%',
  },
  descriptionText: {
    color: $gray,
  },
  descriptionTitle: {
    fontWeight: 'bold',
    fontSize: 20,
    marginBottom: 5,
  },
});
