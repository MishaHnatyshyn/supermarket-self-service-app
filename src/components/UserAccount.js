import React from 'react';
import {
  View, StyleSheet, Image, Text, TouchableOpacity, FlatList,
} from 'react-native';
import Icon from '@expo/vector-icons/SimpleLineIcons';
import { Ionicons } from '@expo/vector-icons';
import {
  $gray, $green, $red, $semiDarkGray,
} from '../constants/Colors';

const paymentDataMock = [{ data: '1234********0422', type: 'visa' }, { data: '1234********0443', type: 'mastercard ' }];

export default function UserAccount() {
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
          <Text style={styles.sectionText}>vladagmyrka@gmail.com</Text>
        </View>
      </View>

      <View style={styles.section}>
        <View style={styles.sectionTitleContainer}>
          <Text style={styles.sectionTitleText}>Payment cards</Text>
          <TouchableOpacity>
            <Icon name="plus" color={$green} size={25} />
          </TouchableOpacity>
        </View>
        <FlatList
          data={paymentDataMock}
          renderItem={({ item }) => (
            <View style={styles.paymentRecord}>
              <View style={styles.paymentRecordTitle}>
                {item.type === 'visa' ? (
                  <Image style={styles.paymentTypeIcon} source={require('../assets/images/visa.png')} />
                ) : (
                  <Image style={styles.paymentTypeIcon} source={require('../assets/images/mastercard.png')} />

                )}
                <Text>{item.data}</Text>
              </View>
              <TouchableOpacity>
                <Ionicons name="ios-remove-circle-outline" size={30} color={$red} />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={(item) => item.data + new Date()}
        />
      </View>
      <View>
        <TouchableOpacity style={styles.signOutButton}>
          <Text style={styles.signOutButtonText}>
            SIGN OUT
          </Text>
          <Ionicons name="ios-log-out" size={30} color={$gray} />

        </TouchableOpacity>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
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
    fontSize: 16,
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
    width: 30,
    height: 20,
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
    flexDirection: 'row',
  },
  sectionText: {
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
    fontSize: 16,
  },
});
