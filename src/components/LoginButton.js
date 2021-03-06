import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import * as React from 'react';
import PropTypes from 'prop-types';
import Layout from '../constants/Layout';
import { $gray, $green, $white } from '../constants/Colors';

const { width } = Layout.window;

export default function FormButton({
  children, onClick, buttonStyles, textStyles, disabled,
}) {
  return (
    <TouchableOpacity
      onPress={onClick}
      style={[styles.button, buttonStyles, disabled ? styles.disabled : {}]}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, textStyles]}>{children}</Text>
    </TouchableOpacity>
  );
}

FormButton.defaultProps = {
  buttonStyles: {},
  textStyles: {},
  disabled: false,
};

FormButton.propTypes = {
  children: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  buttonStyles: PropTypes.shape({}),
  textStyles: PropTypes.shape({}),
  disabled: PropTypes.bool,
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
  disabled: {
    backgroundColor: $gray,
  },
});
