import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ScrollView, StyleSheet, View } from 'react-native';
import PropTypes from 'prop-types';
import { getBasketItemsForDisplay } from '../store/basket/selectors';
import { changeBasketItemQuantity, removeBasketItem } from '../store/basket/asyncActions';
import BasketProductCard from './BasketProductCard';
import EmptyStateMessage from './EmptyStateMessage';

const EMPTY_BASKET_MESSAGE = 'Your basket is empty!';

function BasketItemsList({
  items, updateQuantity, isLoading, deleteItem,
}) {
  const displayEmptyMessage = items.length === 0 && !isLoading;
  return (
    <ScrollView>
      {displayEmptyMessage && <EmptyStateMessage message={EMPTY_BASKET_MESSAGE} />}
      {items.map((item) => (
        <BasketProductCard
          key={item.id}
          updateQuantity={updateQuantity}
          deleteItem={deleteItem}
          {...item}
        />
      ))}
      <View style={styles.confirmButtonPlaceholder} />
    </ScrollView>
  );
}

const mapStateToProps = createStructuredSelector({
  items: getBasketItemsForDisplay,
});

const mapDispatchToProps = (dispatch) => ({
  updateQuantity: (lineItemId, productId, quantity) => {
    dispatch(changeBasketItemQuantity(lineItemId, productId, quantity));
  },
  deleteItem: (lineItemId, productId) => {
    dispatch(removeBasketItem(lineItemId, productId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BasketItemsList);

BasketItemsList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  updateQuantity: PropTypes.func.isRequired,
  deleteItem: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const styles = StyleSheet.create({
  confirmButtonPlaceholder: {
    height: 70,
  },
});
