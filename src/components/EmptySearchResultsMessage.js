import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { $gray } from '../constants/Colors';

const EMPTY_SEARCH_RESULT_MESSAGE = 'Sorry, we can\'t find anything by your request (';
const INITIAL_MESSAGE = 'Type something in search input!';

export default function EmptySearchResultsMessage({ wasSearchPerformed }) {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>
        {wasSearchPerformed
          ? EMPTY_SEARCH_RESULT_MESSAGE
          : INITIAL_MESSAGE}
      </Text>
    </View>
  );
}

EmptySearchResultsMessage.propTypes = {
  wasSearchPerformed: PropTypes.bool.isRequired,
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
