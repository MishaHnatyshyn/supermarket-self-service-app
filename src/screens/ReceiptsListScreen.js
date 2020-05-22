import React, { useCallback } from 'react';
import {
  StyleSheet, View, Text, ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import ReceiptCard from '../components/ReceiptCard';
import { $black, $creamWhite } from '../constants/Colors';


const data = [{
  id: 1,
  status: 'paid',
  timestamp: '2020-05-20T06:35:26.808Z',
  sum: 27,
  store: 'store1',
  street: 'проспект Перемоги',
  building: '26',
}];

export default function ReceiptsListScreen({ receipts = data }) {
  const onOpen = () => {};
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.monthDivision}>
          <Text style={styles.monthName}>December</Text>
        </View>
        {receipts.map((receipt) => <ReceiptCard {...receipt} onOpen={onOpen} />)}
        <View style={styles.monthDivision}>
          <Text style={styles.monthName}>January</Text>
        </View>
      </View>
    </ScrollView>
  );
}

ReceiptsListScreen.propTypes = {
  navigation: PropTypes.shape.isRequired,
};

const styles = StyleSheet.create({
  monthDivision: {
    backgroundColor: $creamWhite,
    borderRadius: 65,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 7,
    paddingBottom: 7,
    marginBottom: 10,
    marginTop: 10,
    width: 130,
    shadowColor: $black,
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
  monthName: {
    color: $black,
    fontSize: 16,
  },
  container: {
    alignItems: 'center',
  },
});
