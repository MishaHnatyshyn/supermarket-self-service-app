import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { ScrollView, StyleSheet, View } from 'react-native';
import { getBasketItems } from '../store/basket/selectors';
import { changeBasketItemQuantity } from '../store/basket/asyncActions';
import BasketProductCard from './BasketProductCard';
import EmptyStateMessage from './EmptyStateMessage';

const EMPTY_BASKET_MESSAGE = 'Your basket is empty!';

function BasketItemsList({
  items, updateQuantity, navigation, isLoading,
}) {
  const displayEmptyMessage = items.length === 0 && !isLoading;
  return (
    <ScrollView>
      {displayEmptyMessage && <EmptyStateMessage message={EMPTY_BASKET_MESSAGE} />}
      {items.map((item) => (
        <BasketProductCard
          navigation={navigation}
          updateQuantity={updateQuantity}
          {...item}
        />
      ))}
      <View style={styles.confirmButtonPlaceholder} />
    </ScrollView>
  );
}

const mapStateToProps = createStructuredSelector({
  items: getBasketItems,
});

const mapDispatchToProps = (dispatch) => ({
  updateQuantity: (lineItemId, productId, quantity) => {
    dispatch(changeBasketItemQuantity(lineItemId, productId, quantity));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BasketItemsList);

const styles = StyleSheet.create({
  confirmButtonPlaceholder: {
    height: 70,
  },
});
