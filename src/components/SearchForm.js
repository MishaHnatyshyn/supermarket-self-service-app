import React, { useEffect } from 'react';
import { StyleSheet, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Ionicons, Feather } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import Input from './Input';
import { getSearchInputValue } from '../store/search/selectors';
import { performSearch } from '../store/search/asyncActions';
import { $gray, $realWhite } from '../constants/Colors';
import { changeSearchInput } from '../store/search/actions';
import { getAccessToken } from '../store/auth/selectors';

function SearchForm({
  searchInput, updateSearchInput, search, userId,
}) {
  const navigation = useNavigation();
  useEffect(() => {
    updateSearchInput('');
    search();
  }, [userId]);

  return (
    <View style={styles.container}>
      <Input
        onChange={updateSearchInput}
        placeholder="Search..."
        value={searchInput}
        padding={7}
        returnKeyType="search"
        onSubmitEditing={search}
      >
        <Ionicons name="ios-search" size={30} color={$gray} style={styles.inputIcon} />
      </Input>
      <TouchableOpacity style={styles.filterButton} onPress={() => navigation.navigate('Categories')}>
        <Feather name="filter" size={24} color={$gray} />
      </TouchableOpacity>
    </View>
  );
}

SearchForm.propTypes = {
  searchInput: PropTypes.string.isRequired,
  updateSearchInput: PropTypes.func.isRequired,
  search: PropTypes.func.isRequired,
  userId: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: $realWhite,
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
  userId: getAccessToken,
});

const mapDispatchToProps = (dispatch) => ({
  search: () => dispatch(performSearch()),
  updateSearchInput: (value) => dispatch(changeSearchInput(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchForm);
