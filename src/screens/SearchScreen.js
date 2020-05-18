import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import SearchForm from '../components/SearchForm';
import SearchResultBlock from '../components/SearchResultBlock';

export default function SearchScreen({ navigation }) {
  return (
    <View>
      <SearchForm navigation={navigation} />
      <SearchResultBlock />
    </View>
  );
}

SearchScreen.propTypes = {
  navigation: PropTypes.shape.isRequired,
};
