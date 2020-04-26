import React, { useCallback } from 'react';
import {
  StyleSheet, View, Text, ScrollView,
} from 'react-native';
import PropTypes from 'prop-types';
import ReceiptCard from '../components/ReceiptCard';
import { $black, $creamWhite } from '../constants/Colors';

export default function ReceiptsListScreen({ navigation }) {
  const onOpen = useCallback(() => {
    navigation.navigate('Receipt');
  }, [navigation]);
  return (
    <ScrollView>
      <View style={styles.container}>
        <View style={styles.monthDivision}>
          <Text style={styles.monthName}>December</Text>
        </View>
        <ReceiptCard
          storeName="Grocee Polytekh"
          address="Polytekhnicha 8, street"
          time="10:36"
          date="13.12.2019"
          price={326.06}
          onOpen={onOpen}
        />
        <ReceiptCard
          storeName="Grocee Petrivka"
          address="Bandery 12A, street"
          time="10:47"
          date="16.12.2019"
          price={14.95}
          onOpen={onOpen}
        />
        <View style={styles.monthDivision}>
          <Text style={styles.monthName}>January</Text>
        </View>
        <ReceiptCard
          storeName="Grocee Petrivka"
          address="Bandery 12A, street"
          time="16:10"
          date="08.01.2020"
          price={115}
          onOpen={onOpen}
        />
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
