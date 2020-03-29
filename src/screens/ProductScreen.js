import React from 'react';
import {
  StyleSheet,
  View,
  Image,
  Text,
  ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import Layout from '../constants/Layout';
import { $green } from '../constants/Colors';
import FormButton from '../components/LoginButton';

const { width } = Layout.window;

export default function ProductScreen({
  route,
}) {
  const {
    image, productName, price, description, displayCounter,
  } = route.params;

  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Image
          style={styles.image}
          source={{ uri: image }}
          resizeMode="contain"
        />
        <View style={styles.productInfo}>
          <Text style={styles.productName}>{productName}</Text>
          <Text style={styles.price}>{price}</Text>
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.description}>{description}</Text>
        </View>

        {displayCounter && (
          <View style={styles.basketButton}>
            <FormButton onClick={() => {}}>Add to basket</FormButton>
          </View>
        )}
      </View>
    </ScrollView>
  );
}

ProductScreen.defaultProps = {
  displayCounter: false,
};

ProductScreen.propTypes = {
  route: PropTypes.shape.isRequired,
  displayCounter: PropTypes.bool,
};

const styles = StyleSheet.create({
  scrollContainer: {
    backgroundColor: 'white',
  },
  container: {
    height: '100%',
    alignItems: 'center',
    paddingBottom: 50,
  },
  productInfo: {
    width,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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
  },
  descriptionContainer: {
    width: width - 30,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  image: {
    height: 300,
    width,
    backgroundColor: 'white',
  },
  basketButton: {
    marginTop: 35,
  },
});
