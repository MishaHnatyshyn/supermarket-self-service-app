import React, { useEffect } from 'react';
import {
  StyleSheet, View, Image, Text, ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import Layout from '../constants/Layout';
import { $gray, $green, $realWhite } from '../constants/Colors';
import { DEFAULT_PHOTO_URI } from '../constants/Defaults';
import { fetchProductData } from '../store/product/asyncActions';
import { getProductData, getProductLoadingStatus } from '../store/product/selectors';
import { formatPrice } from '../utils/helpers';
import { clearProductData } from '../store/product/actions';
import ProductCharacteristicsTable from './ProductCharacteristicsTable';

const { width } = Layout.window;

function ProductScreen({
  id,
  fetchProduct,
  product,
  isLoading,
}) {
  const {
    name, price, description, photos, category, producer, characteristics,
  } = product;

  useEffect(() => {
    if (!product || product.id !== id) {
      fetchProduct(id);
    }
  }, []);

  if (!product.id || product.id !== id || isLoading) return null;

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Image style={styles.image} source={{ uri: photos[0]?.url || DEFAULT_PHOTO_URI }} resizeMode="contain" />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{name}</Text>
          <Text style={styles.price}>{formatPrice(price)}</Text>
        </View>
        { category && (
          <View style={styles.additionalInfo}>
            <Text style={styles.infoLabel}>Category: </Text>
            <Text style={styles.infoValue}>{category.name}</Text>
          </View>
        )}
        { producer && (
          <View style={styles.additionalInfo}>
            <Text style={styles.infoLabel}>Producer: </Text>
            <Text style={styles.infoValue}>{producer.name}</Text>
          </View>
        )}
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{description}</Text>
        </View>
        { characteristics.length > 0 && (
          <ProductCharacteristicsTable characteristics={characteristics} />
        )}
      </View>
    </ScrollView>
  );
}

const mapDispatchToProps = (dispatch) => ({
  fetchProduct: (id) => {
    dispatch(clearProductData());
    dispatch(fetchProductData(id));
  },
});

const mapStateToProps = createStructuredSelector({
  product: getProductData,
  isLoading: getProductLoadingStatus,
});

export default connect(mapStateToProps, mapDispatchToProps)(ProductScreen);

ProductScreen.propTypes = {
  id: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  fetchProduct: PropTypes.func.isRequired,
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    description: PropTypes.string.isRequired,
    photos: PropTypes.shape({}),
    category: PropTypes.shape({
      name: PropTypes.string,
    }),
    producer: PropTypes.shape({
      name: PropTypes.string,
    }),
    characteristics: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: $realWhite,
    height: '100%',
  },
  container: {
    height: '100%',
    alignItems: 'center',
    paddingBottom: 75,
    paddingTop: 25,
  },
  productInfo: {
    width,
    padding: 15,
  },
  additionalInfo: {
    width: '100%',
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'baseline',
  },
  infoValue: {
    fontSize: 20,
    fontWeight: '600',
  },
  infoLabel: {
    fontSize: 18,
  },
  productName: {
    fontSize: 25,
    fontWeight: 'bold',
  },
  price: {
    color: $green,
    fontSize: 35,
  },
  description: {
    fontSize: 18,
    color: $gray,
  },
  descriptionContainer: {
    marginTop: 15,
    width: width - 30,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  image: {
    height: 300,
    width,
    backgroundColor: $realWhite,
  },
});
