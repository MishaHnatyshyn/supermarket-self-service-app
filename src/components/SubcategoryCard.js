import React, { useState } from 'react';
import {
  Text, TouchableOpacity, View, StyleSheet, Image,
} from 'react-native';
import PropTypes from 'prop-types';
import { Ionicons } from '@expo/vector-icons';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { $black } from '../constants/Colors';
import {
  getSelectedMainCategorySubcategories,
} from '../store/categories/selectors';
import Layout from '../constants/Layout';
import { DEFAULT_PHOTO_URI } from '../constants/Defaults';
import { performSearch } from '../store/search/asyncActions';
import { changeSearchInput } from '../store/search/actions';

const categoriesIcon = {
  25: require('../assets/images/milk.png'),
  26: require('../assets/images/chocolate.png'),
  30: require('../assets/images/carrot.png'),
  31: require('../assets/images/vegetarian.png'),
  32: require('../assets/images/healthy-food.png'),
  33: require('../assets/images/canister.png'),
  28: require('../assets/images/handmade.png'),
  27: require('../assets/images/bar.png'),
  29: require('../assets/images/drink.png'),
  34: require('../assets/images/miscellaneous.png'),
  35: require('../assets/images/washing.png'),
  36: require('../assets/images/business.png'),
  37: require('../assets/images/office.png'),
};

const { width } = Layout.window;

function SubcategoryCard({
  id, name, subcategories, navigation, setSearch,
}) {
  const [isSelected, setSelected] = useState(false);
  const handleSubcategoryClick = (text) => {
    navigation.navigate('Search');
    setSearch(text);
  };

  return (
    <>
      <TouchableOpacity onPress={() => setSelected(!isSelected)}>
        <View style={styles.subcategory}>
          <Text style={styles.subcategoryName}>{name}</Text>
          <Ionicons name="ios-arrow-down" size={20} color="black" style={[styles.arrowDown, isSelected ? styles.arrowDownSelected : {}]} />
        </View>
      </TouchableOpacity>
      <View style={styles.subsubcategory}>
        {isSelected && subcategories.find(
          (subcategory) => subcategory.id === id,
        ).subcategories.map((subsubcategory) => {
          const icon = subsubcategory.id in categoriesIcon
            ? categoriesIcon[subsubcategory.id]
            : { uri: DEFAULT_PHOTO_URI };

          return (
            <TouchableOpacity
              style={styles.subsubcategoryCard}
              onPress={() => handleSubcategoryClick(subsubcategory.name)}
            >
              <Image
                source={icon}
                style={styles.icon}
              />
              <Text style={styles.subsubcategoryText}>{subsubcategory.name}</Text>
            </TouchableOpacity>
          );
        })}
      </View>

    </>
  );
}

SubcategoryCard.propTypes = {
  subcategories: PropTypes.shape.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  navigation: PropTypes.shape.isRequired,
  setSearch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  subcategories: getSelectedMainCategorySubcategories,
});

const mapDispatchToProps = (dispatch) => ({
  setSearch: (text) => {
    dispatch(changeSearchInput(text));
    dispatch(performSearch());
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SubcategoryCard);


const styles = StyleSheet.create({
  subcategory: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 10,
    paddingLeft: 10,
    paddingBottom: 15,
    paddingTop: 16,

    shadowColor: $black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.18,
    shadowRadius: 1.00,

    elevation: 1,
  },
  subcategoryName: {
    fontSize: 17,
  },
  arrowDown: {
    opacity: 0.9,
  },
  arrowDownSelected: {
    transform: [{ rotate: '180deg' }],
  },
  subsubcategory: {
    flexDirection: 'row',

    paddingRight: 10,
    paddingLeft: 10,
  },
  subsubcategoryCard: {
    justifyContent: 'space-between',
    alignItems: 'center',

    width: width * 0.75 * 0.5 - 20,
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 12,
    paddingTop: 12,

    backgroundColor: '#f5f5f5',
    margin: 5,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.20,
    shadowRadius: 1.41,

    elevation: 2,
  },
  icon: {
    width: (width * 0.75 * 0.5 - 20) * 0.7,
    height: (width * 0.75 * 0.5 - 20) * 0.7,
    marginBottom: 15,
  },
  subsubcategoryText: {
    fontSize: 17,
  },
});
