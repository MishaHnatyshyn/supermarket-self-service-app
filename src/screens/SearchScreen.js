import React from 'react';
import { StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import FormButton from '../components/LoginButton';
import Search from '../components/Search';

export default function SearchScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <Search />
      </View>

      <FormButton onClick={() => navigation.navigate('Categories')}>Categories</FormButton>
    </View>
  );
}

SearchScreen.propTypes = {
  navigation: PropTypes.shape.isRequired,
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 15,
  },
  searchContainer: {
    marginBottom: 15,
  },
});
