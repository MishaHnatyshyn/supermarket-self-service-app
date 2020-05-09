import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { $gray } from '../constants/Colors';

export default function EmptyStateMessage({ message }) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        {message}
      </Text>
    </View>
  );
}

EmptyStateMessage.propTypes = {
  message: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    width: '100%',
  },
  message: {
    fontSize: 18,
    color: $gray,
    textAlign: 'center',
    padding: 10,
  },
});
