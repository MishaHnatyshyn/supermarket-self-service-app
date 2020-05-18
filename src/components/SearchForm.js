import React from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Ionicons, Feather } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import Input from './Input';
import { getSearchInputValue } from '../store/search/selectors';
import { updateSearch } from '../store/search/asyncActions';
import { $gray } from '../constants/Colors';

function SearchForm({ searchInput, updateSearchInput, navigation }) {
  return (
    <View style={styles.container}>
      <Input onChange={updateSearchInput} placeholder="Search..." value={searchInput} padding={7}>
        <Ionicons name="ios-search" size={30} color={$gray} style={styles.inputIcon} />
      </Input>
      <TouchableOpacity style={styles.filterButton} onPress={() => navigation.navigate('Categories')}>
        <Feather name="filter" size={24} color={$gray} />
      </TouchableOpacity>
    </View>
  );
}

SearchForm.propTypes = {
  navigation: PropTypes.shape.isRequired,
  searchInput: PropTypes.string.isRequired,
  updateSearchInput: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
  },
  inputIcon: {
    position: 'absolute',
    right: 13,
    top: 5,
  },
  filterButton: {
    marginRight: 12,
  },
});


const mapStateToProps = createStructuredSelector({
  searchInput: getSearchInputValue,
});

const mapDispatchToProps = (dispatch) => ({
  updateSearchInput: (value) => dispatch(updateSearch(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
