import React from 'react';
import {
  View, Text, StyleSheet, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';
import {
  $creamWhite, $lightGray,
} from '../constants/Colors';


export default function CategoryCard({
  children, id, name, isSelected, onClick,
}) {
  return (
    <TouchableOpacity onPress={() => onClick(id)}>
      <View style={[styles.container, isSelected ? styles.selectedContainer : '']}>
        {children}
        <Text style={styles.categoryName}>{name}</Text>
      </View>
    </TouchableOpacity>

  );
}

CategoryCard.defaultProps = {
  isSelected: false,
};

CategoryCard.propTypes = {
  children: PropTypes.node.isRequired,
  isSelected: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    height: 100,
    backgroundColor: $lightGray,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 5,
  },
  categoryIcon: {

  },
  categoryName: {
    textAlign: 'center',
    fontSize: 15,
  },
  selectedContainer: {
    backgroundColor: $creamWhite,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
});
