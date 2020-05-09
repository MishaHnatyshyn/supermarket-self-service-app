import {
  StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/SimpleLineIcons';
import PropTypes from 'prop-types';
import React, { useState, useEffect } from 'react';
import { $gray } from '../constants/Colors';
import { formatPrice } from '../utils/helpers';

export default function Counter({
  displayCounter, quantity, isLoading, changeQuantity, displayPrices, price, sum,
}) {
  const [localQuantity, setLocalQuantity] = useState('1');
  const updateLocalQuantity = (newValue) => {
    setLocalQuantity(String(newValue));
  };
  useEffect(() => {
    updateLocalQuantity(quantity);
  }, [quantity]);

  const increment = React.useCallback(() => {
    changeQuantity(quantity + 1);
    updateLocalQuantity(quantity + 1);
  }, [quantity, changeQuantity]);

  const decrement = React.useCallback(() => {
    changeQuantity(quantity - 1);
    updateLocalQuantity(quantity - 1);
  }, [quantity, changeQuantity]);

  const customQuantityChange = React.useCallback((newQuantity) => {
    const parsedQuantity = parseFloat(newQuantity);
    changeQuantity(parsedQuantity);
    updateLocalQuantity(parsedQuantity);
  }, [changeQuantity]);

  return (
    <View style={styles.amountContainer}>
      {displayPrices && <Text style={styles.priceText}>{formatPrice(price)}</Text>}
      {!displayCounter ? (
        <Text style={styles.priceText}>{quantity}</Text>
      ) : (
        <View style={styles.counter}>
          <TouchableOpacity onPress={decrement} disabled={isLoading}>
            <Ionicons name="ios-remove-circle-outline" size={30} color={$gray} />
          </TouchableOpacity>
          {
            isLoading
              ? <Text>Load...</Text>
              : (
                <TextInput
                  keyboardType="decimal-pad"
                  value={localQuantity}
                  onChangeText={customQuantityChange}
                  style={styles.counterInput}
                />
              )
          }
          <TouchableOpacity onPress={increment} disabled={isLoading}>
            <Icon name="plus" color={$gray} size={25} />
          </TouchableOpacity>
        </View>
      )}

      {displayPrices && <Text style={styles.priceText}>{formatPrice(sum)}</Text>}
    </View>
  );
}

Counter.defaultProps = {
  changeQuantity: () => {},
  price: null,
  sum: null,
};

Counter.propTypes = {
  displayCounter: PropTypes.bool.isRequired,
  quantity: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  changeQuantity: PropTypes.func,
  displayPrices: PropTypes.bool.isRequired,
  price: PropTypes.number,
  sum: PropTypes.number,
};

const styles = StyleSheet.create({
  amountContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: 30,
  },
  counter: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priceText: {
    fontSize: 16,
  },
  counterInput: {
    borderWidth: 1,
    padding: 5,
    borderColor: $gray,
    borderRadius: 10,
    width: 50,
    marginLeft: 10,
    marginRight: 10,
    textAlign: 'center',
  },
});
