import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import FormButton from '../components/LoginButton';
import SearchForm from '../components/SearchForm';
import SearchResultBlock from '../components/SearchResultBlock';

export default function SearchScreen({navigation}) {
  return (
    <View>
      <SearchForm />
      <FormButton onClick={() => navigation.navigate('Categories')}>Categories</FormButton>

      <SearchResultBlock />
    </View>
  );
}

SearchScreen.propTypes = {
  navigation: PropTypes.shape.isRequired,
};