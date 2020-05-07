import React from 'react';
import {
  StyleSheet, View, ScrollView,
} from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import {
  getIsLoading,
  getProducts,
  getWasSearchPerformed,
  isLoadMoreEnabled,
} from '../store/search/selectors';
import SearchResultItem from './SearchResultItem';
import Loader from './Loader';
import EmptySearchResultsMessage from './EmptySearchResultsMessage';
import SearchLoadMoreSection from './SearchLoadMoreSection';

function SearchResultBlock({
  products, isLoading, wasSearchPerformed, displayLoadMore,
}) {
  const displayProducts = !isLoading;
  const displayEmptySearchMessage = !isLoading && products.length === 0;
  const displayLoadMoreSection = !isLoading && displayLoadMore;
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Loader isVisible={isLoading} />
        {displayProducts && products.map((product) => <SearchResultItem {...product} />)}
        {displayEmptySearchMessage && (
          <EmptySearchResultsMessage wasSearchPerformed={wasSearchPerformed} />
        )}
        {displayLoadMoreSection && <SearchLoadMoreSection />}
      </View>
    </ScrollView>
  );
}

SearchResultBlock.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape,
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  wasSearchPerformed: PropTypes.bool.isRequired,
  displayLoadMore: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  scrollContainer: {
    height: '100%',
  },
  container: {
    paddingTop: 10,
    paddingRight: 5,
    paddingLeft: 5,
    paddingBottom: 80,
    flexDirection: 'row',
    flexWrap: 'wrap',
    width: '100%',
    minHeight: '100%',
    position: 'relative',
  },
});

const mapStateToProps = createStructuredSelector({
  products: getProducts,
  isLoading: getIsLoading,
  wasSearchPerformed: getWasSearchPerformed,
  displayLoadMore: isLoadMoreEnabled,
});

export default connect(mapStateToProps)(SearchResultBlock);
