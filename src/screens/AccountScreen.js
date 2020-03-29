import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import UnauthorizedUserAccount from '../components/UnauthorizedUserAccount';

export default function AccountScreen({ navigation }) {
  return (
    <View>
      <UnauthorizedUserAccount navigation={navigation} />
    </View>
  );
}

AccountScreen.propTypes = {
  navigation: PropTypes.shape.isRequired,
};
