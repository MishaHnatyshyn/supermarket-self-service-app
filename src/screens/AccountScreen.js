import React from 'react';
import { View } from 'react-native';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import UnauthorizedUserAccount from '../components/UnauthorizedUserAccount';
import { isAuthorized as isAuthorizedSelector } from '../store/auth/selectors';
import UserAccount from '../components/UserAccount';

function AccountScreen({ navigation, isAuthorized }) {
  return (
    <View>
      {isAuthorized ? <UserAccount /> : <UnauthorizedUserAccount navigation={navigation} />}
    </View>
  );
}

const mapStateToProps = createStructuredSelector({
  isAuthorized: isAuthorizedSelector,
});

export default connect(mapStateToProps)(AccountScreen);

AccountScreen.propTypes = {
  navigation: PropTypes.shape.isRequired,
  isAuthorized: PropTypes.bool.isRequired,
};
