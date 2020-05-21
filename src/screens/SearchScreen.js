import React from 'react';
import { View } from 'react-native';
import SearchForm from '../components/SearchForm';
import SearchResultBlock from '../components/SearchResultBlock';

export default function SearchScreen() {
  return (
    <View>
      <SearchForm />
      <SearchResultBlock />
    </View>
  );
}
