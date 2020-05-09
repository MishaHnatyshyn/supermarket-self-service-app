import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import FormButton from '../components/LoginButton';
import BasketItemsList from '../components/BasketItemsList';

export default function BasketScreen({ navigation }) {
  return (
    <>
      <BasketItemsList navigation={navigation} />
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
});
