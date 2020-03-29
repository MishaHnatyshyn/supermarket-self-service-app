import {
  StyleSheet, Text, TextInput, TouchableOpacity, View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Icon from '@expo/vector-icons/SimpleLineIcons';
import PropTypes from 'prop-types';
import React from 'react';
import { $gray } from '../constants/Colors';

export default function Counter({ displayCounter }) {
  const [amount, setAmount] = React.useState('1');

  return (
    <View style={styles.amountContainer}>
      <Text style={styles.priceText}>123.00</Text>
      { !displayCounter
        ? (<Text style={styles.priceText}>1</Text>)
        : (

          <View style={styles.counter}>
            <TouchableOpacity onPress={() => setAmount(`${amount - 1}`)}>
              <Ionicons name="ios-remove-circle-outline" size={30} color={$gray} />
            </TouchableOpacity>
            <TextInput keyboardType="decimal-pad" value={amount} onChangeText={setAmount} style={styles.counterInput} />
            <TouchableOpacity onPress={() => setAmount(`${+amount + 1}`)}>
              <Icon name="plus" color={$gray} size={25} />
            </TouchableOpacity>
          </View>
        )}

      <Text style={styles.priceText}>123.00</Text>
    </View>
  );
}

Counter.propTypes = {
  displayCounter: PropTypes.bool.isRequired,
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
