import React from 'react';
import { StyleSheet, View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import {
  getIsLoading,
  getProductsForDisplay,
  getWasSearchPerformed,
  isLoadMoreEnabled,
} from '../store/search/selectors';
import SearchResultItem from './SearchResultItem';
import Loader from './Loader';
import EmptySearchResultsMessage from './EmptySearchResultsMessage';
import SearchLoadMoreSection from './SearchLoadMoreSection';
import { addToBasket as addToBasketAction, changeBasketItemQuantity } from '../store/basket/asyncActions';

function SearchResultBlock({
  products,
  isLoading,
  wasSearchPerformed,
  displayLoadMore,
  addToBasket,
  updateQuantity,
}) {
  const displayProducts = !isLoading;
  const displayEmptySearchMessage = !isLoading && products.length === 0;
  const displayLoadMoreSection = !isLoading && displayLoadMore;
  return (
    <ScrollView style={styles.scrollContainer}>
      <View style={styles.container}>
        <Loader isVisible={isLoading} />
        {displayProducts
          && products.map((product) => (
            <SearchResultItem
              {...product}
              addToBasket={addToBasket}
              updateQuantity={updateQuantity}
            />
          ))}
        {displayEmptySearchMessage && (
          <EmptySearchResultsMessage wasSearchPerformed={wasSearchPerformed} />
        )}
        {displayLoadMoreSection && <SearchLoadMoreSection />}
      </View>
    </ScrollView>
  );
}

SearchResultBlock.propTypes = {
  products: PropTypes.arrayOf(PropTypes.shape).isRequired,
  isLoading: PropTypes.bool.isRequired,
  wasSearchPerformed: PropTypes.bool.isRequired,
  displayLoadMore: PropTypes.bool.isRequired,
  updateQuantity: PropTypes.func.isRequired,
  addToBasket: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  products: getProductsForDisplay,
  isLoading: getIsLoading,
  wasSearchPerformed: getWasSearchPerformed,
  displayLoadMore: isLoadMoreEnabled,
});

const mapDispatchToProps = (dispatch) => ({
  addToBasket: (productId) => {
    dispatch(addToBasketAction(productId));
  },
  updateQuantity: (lineItemId, productId, quantity) => {
    dispatch(changeBasketItemQuantity(lineItemId, productId, quantity));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchResultBlock);

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
