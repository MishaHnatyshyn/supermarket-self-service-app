import {
  StyleSheet, Text, TouchableOpacity,
} from 'react-native';
import * as React from 'react';
import PropTypes from 'prop-types';
import Layout from '../constants/Layout';
import { $green, $white } from '../constants/Colors';

const { width } = Layout.window;

export default function FormButton({ children, onClick }) {
  return (
    <TouchableOpacity onPress={onClick} style={styles.button}>
      <Text style={styles.buttonText}>{children}</Text>
    </TouchableOpacity>
  );
}

FormButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  button: {
    padding: 13,
    width: width - 60,
    backgroundColor: $green,
    borderRadius: 10,
  },
  buttonText: {
    textAlign: 'center',
    color: $white,
    textTransform: 'uppercase',
    fontSize: 20,
  },
});
