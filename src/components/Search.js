import {
  StyleSheet, View,
} from 'react-native';
import * as React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { $gray } from '../constants/Colors';
import Input from './Input';

export default function Search() {
  return (
    <View>
      <Input placeholder="Search...">
        <Ionicons name="ios-search" size={25} color={$gray} style={styles.searchIcon} />
      </Input>
    </View>

  );
}

const styles = StyleSheet.create({
  searchIcon: {
    position: 'absolute',
    right: 13,
    top: 12,
  },
});
