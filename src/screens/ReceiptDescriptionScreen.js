import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import BasketProductCard from '../components/BasketProductCard';
import FormButton from '../components/LoginButton';

export default function ReceiptDescriptionScreen() {
  return (
    <>
      <ScrollView>
        <BasketProductCard displayCounter={false} />
        <BasketProductCard displayCounter={false} />
        <BasketProductCard displayCounter={false} />
        <BasketProductCard displayCounter={false} />
        <View style={styles.confirmButtonPlaceholder} />
      </ScrollView>
      <View style={styles.confirmButtonContainer}>
        <FormButton onClick={() => {}}>Generate QR-code</FormButton>
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
