import React from 'react';
import {
  ScrollView, View, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import Layout from '../constants/Layout';
import CategoryCard from '../components/CategoryCard';
import {
  $creamWhite, $lightGray,
} from '../constants/Colors';
import {
  getMainCategories,
  getSelectedMainCategoryId,
  getSelectedMainCategorySubcategories,
} from '../store/categories/selectors';
import { setMainCategory } from '../store/categories/actions';
import SubcategoryCard from '../components/SubcategoryCard';

const { width, height } = Layout.window;

function CategoriesScreen({
  mainCategories, subcategories, selectMainCategory, currentCategory, navigation,
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
                icon={category.icon}
              />
            ))
          }
        </ScrollView>

      </View>

      <View style={styles.rightBlock}>
        <ScrollView style={styles.rightScroll}>
          {subcategories && subcategories.map((subcategory) => (
            <SubcategoryCard
              name={subcategory.name}
              id={subcategory.id}
              key={subcategory.id}
              navigation={navigation}
            />
          ))}
        </ScrollView>
      </View>


    </View>
  );
}

CategoriesScreen.propTypes = {
  mainCategories: PropTypes.arrayOf(PropTypes.shape).isRequired,
  subcategories: PropTypes.arrayOf(PropTypes.shape).isRequired,
  selectMainCategory: PropTypes.func.isRequired,
  currentCategory: PropTypes.shape.isRequired,
  navigation: PropTypes.shape.isRequired,
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
    width: width * 0.75,
    backgroundColor: $creamWhite,
  },
  categoryIcon: {
    width: 25,
    height: 25,
  },
  rightScroll: {
    marginBottom: 120,
  },
});
