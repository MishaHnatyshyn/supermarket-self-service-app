import React from 'react';
import {
  View, StyleSheet, Image, Text, TouchableOpacity, FlatList, ScrollView, Switch,
} from 'react-native';
import Icon from '@expo/vector-icons/SimpleLineIcons';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import {
  $gray, $green, $lightGray, $red, $semiDarkGray,
} from '../constants/Colors';
import { logout } from '../store/auth/asyncActions';
import { getUserData } from '../store/user/selectors';
import { deletePaymentMethod, updateReceiptSavingToggle } from '../store/user/asyncActions';
import { refreshPaymentState } from '../store/user/actions';
import PaymentRecord from './PaymentRecord';
import { openConfirmationAlert } from '../utils/helpers';

function UserAccount({
  onLogout,
  email,
  paymentMethods,
  isLoading,
  deletePayment,
  refreshAddingNewPaymentState,
  saveReceiptsLocally,
  updateReceiptSavingSetting,
}) {
  const navigation = useNavigation();

  const openNewPaymentMethodForm = () => {
    navigation.navigate('PaymentMethod');
    refreshAddingNewPaymentState();
  };

  const onSwitchChange = (value) => {
    if (value) return updateReceiptSavingSetting(true);
    openConfirmationAlert(
      'This will delete all you receipts from local storage and you will not be able to open them without internet connection.',
      () => updateReceiptSavingSetting(false),
    );
  };

  const onPaymentMethodDelete = (id) => {
    openConfirmationAlert(
      'Are you sure you want to delete this payment method?',
      () => deletePayment(id),
    );
  };

  if (isLoading) return null;
  return (
    <ScrollView style={styles.container}>
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
              <TouchableOpacity onPress={() => onPaymentMethodDelete(item.id)}>
                <Ionicons name="ios-remove-circle-outline" size={30} color={$red} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>

      <View style={styles.section}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitleText}>Save receipts locally</Text>
          <Switch
            trackColor={{ false: $green, true: $green }}
            thumbColor={saveReceiptsLocally ? 'white' : 'white'}
            ios_backgroundColor={$lightGray}
            onValueChange={onSwitchChange}
            value={saveReceiptsLocally}
          />
        </View>
      </View>

      <View style={styles.signOutBlock}>
        <TouchableOpacity style={styles.signOutButton} onPress={onLogout}>
          <Text style={styles.signOutButtonText}>SIGN OUT</Text>
          <Ionicons name="ios-log-out" size={30} color={$gray} />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

UserAccount.propTypes = {
  onLogout: PropTypes.func.isRequired,
  email: PropTypes.string.isRequired,
  paymentMethods: PropTypes.arrayOf().isRequired,
  isLoading: PropTypes.bool.isRequired,
  saveReceiptsLocally: PropTypes.bool.isRequired,
  deletePayment: PropTypes.func.isRequired,
  refreshAddingNewPaymentState: PropTypes.func.isRequired,
  updateReceiptSavingSetting: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => getUserData(state);

const mapDispatchToProps = (dispatch) => ({
  onLogout: () => { dispatch(logout()); },
  deletePayment: (id) => dispatch(deletePaymentMethod(id)),
  refreshAddingNewPaymentState: () => dispatch(refreshPaymentState()),
  updateReceiptSavingSetting: (value) => dispatch(updateReceiptSavingToggle(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(UserAccount);

const styles = StyleSheet.create({
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  container: {
    width: '100%',
    height: '100%',
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
});
