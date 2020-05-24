import React from 'react';
import {
  View, StyleSheet, Image, Text, TouchableOpacity, FlatList,
} from 'react-native';
import Icon from '@expo/vector-icons/SimpleLineIcons';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  $gray, $green, $red, $semiDarkGray,
} from '../constants/Colors';
import { logout } from '../store/auth/asyncActions';
import { getUserData } from '../store/user/selectors';
import { deletePaymentMethod } from '../store/user/asyncActions';
import { refreshPaymentState } from '../store/user/actions';
import PaymentRecord from './PaymentRecord';

function UserAccount({
  onLogout,
  email,
  paymentMethods,
  isLoading,
  deletePayment,
  refreshAddingNewPaymentState,
}) {
  const navigation = useNavigation();

  const openNewPaymentMethodForm = () => {
    navigation.navigate('PaymentMethod');
    refreshAddingNewPaymentState();
  };

  if (isLoading) return null;
  return (
    <View style={styles.container}>
      <View style={styles.avatarContainer}>
        <Image source={require('../assets/images/user.png')} style={styles.avatar} />
      </View>
      <View style={styles.section}>
        <View>
          <Text style={styles.sectionTitleText}>Email</Text>
        </View>
        <View>
          <Text style={styles.sectionText}>{email}</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitleText}>Payment cards</Text>
          <TouchableOpacity onPress={openNewPaymentMethodForm}>
            <Icon name="plus" color={$green} size={25} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={paymentMethods}
          renderItem={({ item }) => (
            <View style={styles.paymentItem}>
              <PaymentRecord number={item.card_number} type={item.card_type} />
              <TouchableOpacity onPress={() => deletePayment(item.id)}>
                <Ionicons name="ios-remove-circle-outline" size={30} color={$red} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
      <View style={styles.signOutBlock}>
        <TouchableOpacity style={styles.signOutButton} onPress={onLogout}>
          <Text style={styles.signOutButtonText}>SIGN OUT</Text>
          <Ionicons name="ios-log-out" size={30} color={$gray} />
        </TouchableOpacity>
      </View>
    </View>
  );
}

UserAccount.propTypes = {
  onLogout: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  paymentMethods: PropTypes.arrayOf().isRequired,
  isLoading: PropTypes.bool.isRequired,
  deletePayment: PropTypes.func.isRequired,
  refreshAddingNewPaymentState: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => getUserData(state);

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => { dispatch(logout()); },
  deletePayment: (id) => dispatch(deletePaymentMethod(id)),
  refreshAddingNewPaymentState: () => dispatch(refreshPaymentState()),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);

const styles = StyleSheet.create({
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    width: '100%',
    paddingLeft: 10,
    paddingRight: 10,
  },
  avatarContainer: {
    height: 200,
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatar: {
    width: 126,
    height: 126,
  },
  section: {
    paddingTop: 10,
    paddingBottom: 10,
    width: '100%',
    borderBottomColor: $gray,
    borderBottomWidth: 1,
  },
  sectionTitleText: {
    fontSize: 19,
    fontWeight: 'bold',
    color: $semiDarkGray,
    marginBottom: 5,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  addPaymentIcon: {
    color: $green,
    width: 20,
  },
  paymentTypeIcon: {
    width: 35,
    height: 22,
    marginRight: 10,
  },
  paymentRecord: {
    flexDirection: 'row',
    paddingLeft: 5,
    paddingTop: 5,
    paddingBottom: 5,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentRecordTitle: {
    alignItems: 'center',
    flexDirection: 'row',
  },
  sectionText: {
    fontSize: 18,
    paddingLeft: 5,
  },
  signOutButton: {
    paddingTop: 5,
    paddingLeft: 5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  signOutButtonText: {
    fontWeight: 'bold',
    color: $semiDarkGray,
    fontSize: 19,
  },
  signOutBlock: {
    marginTop: 30,
  },
  cardNumberText: {
    fontSize: 18,
  },
});
