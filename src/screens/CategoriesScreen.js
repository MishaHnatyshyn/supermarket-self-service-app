import React from 'react';
import {
  ScrollView, View, StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import Layout from '../constants/Layout';
import CategoryCard from '../components/CategoryCard';
import {
  $creamWhite, $lightGray, $semiDarkGray,
} from '../constants/Colors';
import {
  getMainCategories,
  getSelectedMainCategoryId,
  getSelectedMainCategorySubcategories,
} from '../store/categories/selectors';
import { setMainCategory } from '../store/categories/actions';

const { width, height } = Layout.window;

function CategoriesScreen({
  navigation, mainCategories, subcategories, selectMainCategory, currentCategory,
}) {
  return (
    <View style={styles.container}>
      <View style={styles.leftBlock}>
        <ScrollView>
          {
            mainCategories.map((category) => (
              <CategoryCard
                isSelected={currentCategory === category.id}
                onClick={selectMainCategory}
                name={category.name}
                id={category.id}
              >
                <MaterialCommunityIcons
                  name={category.icon}
                  size={35}
                  color={$semiDarkGray}
                  style={styles.searchIcon}
                />
              </CategoryCard>
            ))
          }
        </ScrollView>

      </View>
      <View style={styles.rightBlock}>
        {subcategories && subcategories.map((subcategory) => (

          <TouchableOpacity onPress={() => {}}>
            <View style={styles.subcategory}>
              <Text>{subcategory.name}</Text>
            </View>
          </TouchableOpacity>

        ))}
      </View>
    </View>
  );
}

CategoriesScreen.propTypes = {
  navigation: PropTypes.shape.isRequired,
  mainCategories: PropTypes.arrayOf(PropTypes.shape).isRequired,
  subcategories: PropTypes.arrayOf(PropTypes.shape).isRequired,
  selectMainCategory: PropTypes.func.isRequired,
  currentCategory: PropTypes.shape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  mainCategories: getMainCategories,
  subcategories: getSelectedMainCategorySubcategories,
  currentCategory: getSelectedMainCategoryId,
});

const mapDispatchToProps = (dispatch) => ({
  selectMainCategory: (id) => dispatch(setMainCategory(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(CategoriesScreen);


const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
  },
  leftBlock: {
    height,
    width: width * 0.25,
    backgroundColor: $lightGray,
  },
  rightBlock: {
    height,
    width: width * 0.75,
    backgroundColor: $creamWhite,
  },
  subcategory: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: $lightGray,
  },
});
