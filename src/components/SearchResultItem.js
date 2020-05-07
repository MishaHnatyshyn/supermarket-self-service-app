import React from 'react';
import {
  View, Image, Text, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import { $green } from '../constants/Colors';
import Layout from '../constants/Layout';
import FormButton from './LoginButton';
import { formatPrice } from '../utils/helpers';

const { width } = Layout.window;

const DEFAULT_PHOTO_URI = 'https://www.samsung.com/etc/designs/smg/global/imgs/support/cont/NO_IMG_600x600.png';

export default function SearchResultItem({
  name, price, currency, photo = DEFAULT_PHOTO_URI,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image source={{ uri: photo || DEFAULT_PHOTO_URI }} style={styles.image} resizeMode="contain" />
        <View style={styles.productInfo}>
          <Text numberOfLines={1} style={styles.productName}>{name}</Text>
          <Text style={styles.price}>{formatPrice(price, currency)}</Text>
        </View>
        <View style={styles.basketButtonContainer}>
          <FormButton
            buttonStyles={styles.basketButton}
            textStyles={styles.basketButtonText}
            onClick={() => {}}
          >
            Add to basket
          </FormButton>
        </View>
      </View>
    </View>
  );
}

SearchResultItem.propTypes = {
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  photo: PropTypes.string.isRequired,
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
    backgroundColor: 'white',
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
    backgroundColor: 'white',
  },
  basketButtonContainer: {
    marginTop: 10,
    width: '100%',
    alignItems: 'center',
  },
  basketButton: {
    width: '100%',
  },
  basketButtonText: {
    fontSize: 16,
  },

});
