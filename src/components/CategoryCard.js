import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  $creamWhite, $lightGray,
} from '../constants/Colors';

const mainCategoriesIcon = {
  2: require('../assets/images/food-and-restaurant.png'),
  3: require('../assets/images/detergent.png'),
  4: require('../assets/images/education.png'),
};

export default function CategoryCard({
  id, name, isSelected, onClick,
}) {
  return (
    <TouchableOpacity onPress={() => onClick(id)}>
      <View style={[styles.container, isSelected ? styles.selectedContainer : '']}>
        <Image source={mainCategoriesIcon[id]} style={styles.icon} />

        <Text style={styles.categoryName}>{name}</Text>
      </View>
    </TouchableOpacity>

  );
}

CategoryCard.defaultProps = {
  isSelected: false,
};

CategoryCard.propTypes = {
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: $lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  categoryIcon: {

  },
  categoryName: {
    textAlign: 'center',
    fontSize: 15,
  },
  selectedContainer: {
    backgroundColor: $creamWhite,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  icon: {
    width: 38,
    height: 38,
    marginBottom: 5,
  },
});
