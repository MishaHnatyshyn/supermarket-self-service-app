import React from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import BasketProductCard from '../components/BasketProductCard';
import FormButton from '../components/LoginButton';

export default function ReceiptDescriptionScreen({ navigation }) {
  return (
    <>
      <ScrollView>
        <BasketProductCard displayCounter={false} navigation={navigation} />
        <BasketProductCard displayCounter={false} navigation={navigation} />
        <BasketProductCard displayCounter={false} navigation={navigation} />
        <BasketProductCard displayCounter={false} navigation={navigation} />
        <View style={styles.confirmButtonPlaceholder} />
      </ScrollView>
      <View style={styles.confirmButtonContainer}>
        <FormButton onClick={() => {}}>Generate QR-code</FormButton>
      </View>
      <View />

    </>
  );
}

ReceiptDescriptionScreen.propTypes = {
  navigation: PropTypes.shape.isRequired,
};

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
