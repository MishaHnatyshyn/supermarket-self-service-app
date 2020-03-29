import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import UnauthorizedUserAccount from '../components/UnauthorizedUserAccount';
// import UserAccount from '../components/UserAccount';

export default function AccountScreen({ navigation }) {
  return (
    <View>
      {/* <UserAccount /> */}
      <UnauthorizedUserAccount navigation={navigation} />
    </View>
  );
}

AccountScreen.propTypes = {
  navigation: PropTypes.shape.isRequired,
};
