import React from 'react';
import { View } from 'react-native';
import BasketItemsList from '../components/BasketItemsList';
import BasketSummarySection from '../components/BasketSummarySection';

export default function BasketScreen() {
  return (
    <>
      <BasketItemsList />
      <BasketSummarySection />
      <View />
    </>
  );
}
