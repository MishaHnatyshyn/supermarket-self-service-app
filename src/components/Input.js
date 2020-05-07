import {
  StyleSheet, Text, TextInput, View,
} from 'react-native';
import * as React from 'react';
import PropTypes from 'prop-types';
import { $gray, $red } from '../constants/Colors';
import Layout from '../constants/Layout';

const { width } = Layout.window;

export default function Input({
  children,
  placeholder,
  keyboardType,
  label,
  secureTextEntry,
  value,
  onChange,
  isError,
  padding,
}) {
  return (
    <>
      {label && <Text style={styles.label}>{label}</Text>}
      <View>
        <TextInput
          style={[styles.field, isError && styles.error, { padding }]}
          placeholder={placeholder}
          placeholderTextColor={$gray}
          keyboardType={keyboardType}
          secureTextEntry={secureTextEntry}
          onChangeText={onChange}
          value={value}
        />
        {children}
      </View>
    </>
  );
}

Input.defaultProps = {
  children: null,
  keyboardType: 'default',
  label: null,
  secureTextEntry: false,
  isError: false,
  value: '',
  padding: 13,
};

Input.propTypes = {
  children: PropTypes.node,
  placeholder: PropTypes.string.isRequired,
  keyboardType: PropTypes.string,
  label: PropTypes.string,
  secureTextEntry: PropTypes.bool,
  isError: PropTypes.bool,
  value: PropTypes.string,
  padding: PropTypes.number,
  onChange: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  field: {
    width: width - 60,
    borderRadius: 10,
    borderWidth: 1.5,
    borderColor: $gray,
    fontSize: 20,
    padding: 13,
    paddingRight: 45,
  },
  error: {
    borderColor: $red,
  },
  label: {
    fontSize: 20,
    marginTop: 10,
    marginBottom: 5,
  },
});
