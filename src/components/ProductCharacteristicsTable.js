import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import { $semiDarkGray } from '../constants/Colors';
import TableRow from './ProductCharacteristicsTableRow';

export default function ProductCharacteristicsTable({ characteristics }) {
  const formattedData = characteristics.map((characteristic) => ({
    name: characteristic.type.name,
    value: characteristic.value,
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Characteristics</Text>
      <View style={styles.table}>
        {formattedData.map(({ name, value }) => (
          <TableRow key={name + value} value={value} name={name} />
        ))}
      </View>
    </View>
  );
}

ProductCharacteristicsTable.propTypes = {
  characteristics: PropTypes.arrayOf(
    PropTypes.shape({
      type: PropTypes.shape({
        name: PropTypes.string,
      }),
      value: PropTypes.string,
    }),
  ).isRequired,
};

const styles = StyleSheet.create({
  title: {
    fontWeight: '600',
    fontSize: 17,
    marginBottom: 10,
  },
  container: {
    paddingHorizontal: 15,
    paddingTop: 15,
    width: '100%',
  },
  table: {
    width: '100%',
    borderWidth: 0.5,
    borderStyle: 'solid',
    borderColor: $semiDarkGray,
  },
});
