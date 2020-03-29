import React from 'react';
import {
  TouchableOpacity, StyleSheet, View, Text, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  $black, $gray, $realWhite,
} from '../constants/Colors';
import Layout from '../constants/Layout';
import Counter from './Counter';

const { width } = Layout.window;

export default function BasketProductCard({ displayCounter }) {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.infoContainer}>
        <View style={styles.imageContainer}>
          <Image
            style={styles.image}
            source={{ uri: 'https://i5.walmartimages.ca/images/Enlarge/094/514/6000200094514.jpg' }}
            resizeMode="contain"
          />
        </View>
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionTitle}>Apple</Text>
          <Text
            style={styles.descriptionText}
            numberOfLines={2}
          >
            Very very nice apple lorem ipsum sdf asdf asf sadf sdf sadf s f
          </Text>
        </View>
      </View>
      { displayCounter && <Counter />}

    </TouchableOpacity>
  );
}

BasketProductCard.defaultProps = {
  displayCounter: true,
};

BasketProductCard.propTypes = {
  displayCounter: PropTypes.bool,
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
