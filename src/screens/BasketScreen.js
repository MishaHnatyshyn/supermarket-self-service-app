import React from 'react';
import {
  View, ScrollView, StyleSheet,
} from 'react-native';
import BasketProductCard from '../components/BasketProductCard';
import FormButton from '../components/LoginButton';

export default function BasketScreen() {
  return (
    <>
      <ScrollView>
        <BasketProductCard />
        <BasketProductCard />
        <BasketProductCard />
        <BasketProductCard />
        <View style={styles.confirmButtonPlaceholder} />
      </ScrollView>
      <View style={styles.confirmButtonContainer}>
        <FormButton onClick={() => {}}>Buy products</FormButton>
      </View>
      <View />

    </>
  );
}

const styles = StyleSheet.create({
  confirmButtonContainer: {
    position: 'absolute',
    bottom: 0,
    width: '100%',
    paddingTop: 15,
    paddingBottom: 15,
    alignItems: 'center',
  },
  confirmButtonPlaceholder: {
    height: 70,
  },
});
