import React, { useCallback } from 'react';
import {
  TouchableOpacity, StyleSheet, View, Text, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { Entypo } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { $black, $gray, $realWhite } from '../constants/Colors';
import Layout from '../constants/Layout';
import Counter from './Counter';
import { DEFAULT_PHOTO_URI } from '../constants/Defaults';

const { width } = Layout.window;

export default function BasketProductCard({
  displayCounter,
  updateQuantity,
  deleteItem,
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
  const navigation = useNavigation();

  const onOpen = useCallback(() => {
    navigation.navigate('Product', {
      id: product,
    });
  }, [navigation]);

  const updateProductQuantity = React.useCallback((newQuantity) => {
    updateQuantity(id, product, newQuantity);
  }, [product, updateQuantity]);

  const onDelete = useCallback(() => {
    deleteItem(id, product);
  }, [id, product, deleteItem]);

  return (
    <View style={styles.card}>
      <TouchableOpacity onPress={onDelete} style={styles.closeIcon} disabled={isLoading}>
        <Entypo name="cross" size={30} color={$gray} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.infoContainer} onPress={onOpen}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{
              uri: photo || DEFAULT_PHOTO_URI,
              cache: 'force-cache',
            }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>{name}</Text>
          <Text style={styles.descriptionText} numberOfLines={2}>
            {description}
          </Text>
        </View>
      </TouchableOpacity>
      <Counter
        displayCounter={displayCounter}
        changeQuantity={updateProductQuantity}
        displayPrices
        price={price}
        sum={sum}
        quantity={quantity}
        isLoading={isLoading}
      />
    </View>
  );
}

BasketProductCard.defaultProps = {
  displayCounter: true,
};

BasketProductCard.propTypes = {
  displayCounter: PropTypes.bool,
  updateQuantity: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  product: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  quantity: PropTypes.number.isRequired,
  sum: PropTypes.number.isRequired,
  photo: PropTypes.string.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  card: {
    width: width - 14,
    margin: 7,
    padding: 10,
    justifyContent: 'space-between',
    position: 'relative',
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
    paddingRight: 30,
  },
  closeIcon: {
    position: 'absolute',
    right: 5,
    top: 5,
    zIndex: 1,
  },
});
