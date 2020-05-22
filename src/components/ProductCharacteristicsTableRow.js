import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import PropTypes from 'prop-types';
import { $semiDarkGray } from '../constants/Colors';

export default function TableRow({ name, value }) {
  return (
    <View style={styles.row}>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{name}</Text>
      </View>
      <View style={styles.cell}>
        <Text style={styles.cellText}>{value}</Text>
      </View>
    </View>
  );
}

TableRow.propTypes = {
  name: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    width: '100%',
  },
  cell: {
    width: '50%',
    padding: 8,
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: $semiDarkGray,
  },
  cellText: {
    fontSize: 16,
  },
});
