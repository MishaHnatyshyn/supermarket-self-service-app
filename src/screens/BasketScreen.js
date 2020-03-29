import React from 'react';
import {
  View, ScrollView, StyleSheet,
} from 'react-native';
import PropTypes from 'prop-types';
import BasketProductCard from '../components/BasketProductCard';
import FormButton from '../components/LoginButton';

export default function BasketScreen({ navigation }) {
  return (
    <>
      <ScrollView>
        <BasketProductCard navigation={navigation} />
        <BasketProductCard navigation={navigation} />
        <BasketProductCard navigation={navigation} />
        <BasketProductCard navigation={navigation} />
        <View style={styles.confirmButtonPlaceholder} />
      </ScrollView>
      <View style={styles.confirmButtonContainer}>
        <FormButton onClick={() => {}}>Buy products</FormButton>
      </View>
      <View />

    </>
  );
}

BasketScreen.propTypes = {
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
