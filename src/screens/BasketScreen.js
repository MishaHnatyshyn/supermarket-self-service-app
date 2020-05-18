import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import BasketItemsList from '../components/BasketItemsList';
import BasketSummarySection from '../components/BasketSummarySection';

export default function BasketScreen({ navigation }) {
  return (
    <>
      <BasketItemsList navigation={navigation} />
      <BasketSummarySection />
      <View />
    </>
  );
}

BasketScreen.propTypes = {
  navigation: PropTypes.shape.isRequired,
};
