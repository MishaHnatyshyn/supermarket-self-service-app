import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  Switch, TouchableOpacity, FlatList,
} from 'react-native';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { FontAwesome, AntDesign } from '@expo/vector-icons';

import { useNavigation } from '@react-navigation/native';
import PaymentMethodForm from '../components/PaymentMethodForm';
import FormButton from '../components/LoginButton';
import { getTotalBasketSum } from '../store/basket/selectors';
import { formatPrice } from '../utils/helpers';
import {
  $green, $lightGray, $semiDarkGray,
} from '../constants/Colors';
import { isAuthorized } from '../store/auth/selectors';
import { getPaymentMethods } from '../store/user/selectors';
import PaymentRecord from '../components/PaymentRecord';
import { createOrder } from '../store/checkout/asyncActions';
import SmallLoader from '../components/SmallLoader';
import { getIsLoading, getNewOrder } from '../store/checkout/selectors';

function PaymentScreen({
  totalSum, isUserAuthorized, paymentMethods, buyProducts, isLoading, newOrder,
}) {
  const [cardNumber, setCardNumber] = useState('');
  const [expirationDateYear, setExpirationDateYear] = useState('');
  const [expirationDateMonth, setExpirationDateMonth] = useState('');
  const [cvv, setCvv] = useState('');
  const [isSavingCard, setSavingCard] = useState(false);
  const [fillNewCard, setFillNewCard] = useState(false);
  const [savedSelectedId, setSavedSelectedId] = useState('');
  const [isFormValid, setFormValid] = useState(false);

  const navigation = useNavigation();

  const handleFillingNewCard = () => {
    setFillNewCard(true);
    setSavedSelectedId('');
  };

  const submitForm = () => {
    buyProducts({
      paymentMethodId: savedSelectedId,
      newPaymentData: {
        cardNumber,
        dueDate: `${expirationDateMonth}/${expirationDateYear}`,
        cvvCode: cvv,
      },
      savePaymentMethod: isSavingCard,
    });
  };


  useEffect(() => {
    if (newOrder.id) {
      navigation.reset({
        index: 0,
        routes: [{ name: 'PaymentSuccess' }],
      });
    }
  }, [newOrder]);

  useEffect(() => {
    if (paymentMethods.length === 0 || fillNewCard === true) {
      if (cardNumber.length !== 16) {
        return setFormValid(false);
      }
      if (expirationDateMonth.length !== 2 || expirationDateMonth < 1 || expirationDateMonth > 12) {
        return setFormValid(false);
      }

      if (expirationDateYear.length !== 2 || (expirationDateYear < 20)) {
        return setFormValid(false);
      }

      if (cvv.length !== 3) {
        return setFormValid(false);
      }

      return setFormValid(true);
    }
    if (isUserAuthorized && fillNewCard === false && savedSelectedId) {
      return setFormValid(true);
    }

    return setFormValid(false);
  }, [cardNumber, expirationDateMonth, expirationDateYear, cvv, savedSelectedId, fillNewCard]);

  return (
    <View style={styles.container}>
      <View style={styles.totalSumContainer}>
        <Text style={styles.totalSumText}>
          Total sum:
        </Text>
        <Text style={styles.totalSum}>
          {' '}
          { formatPrice(totalSum)}
        </Text>
      </View>

      {!isAuthorized && (
        <PaymentMethodForm
          cardNumber={cardNumber}
          setCardNumber={setCardNumber}
          expirationDateMonth={expirationDateMonth}
          setExpirationDateMonth={setExpirationDateMonth}
          expirationDateYear={expirationDateYear}
          setExpirationDateYear={setExpirationDateYear}
          cvv={cvv}
          setCvv={setCvv}
        />
      )}

      {isUserAuthorized && paymentMethods.length !== 0 && (
      <View style={styles.cardButtons}>
        <TouchableOpacity onPress={() => setFillNewCard(false)} style={styles.cardButton}>
          <AntDesign name="user" size={22} color={fillNewCard === true ? $semiDarkGray : 'black'} style={styles.cardButtonIcon} />
          <Text style={[styles.cardButtonsText, fillNewCard === true
            ? styles.unselectedCardButton
            : {}]}
          >
            Saved
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={handleFillingNewCard} style={styles.cardButton}>
          <FontAwesome name="credit-card" size={22} color={fillNewCard === false ? $semiDarkGray : 'black'} style={styles.cardButtonIcon} />
          <Text style={[styles.cardButtonsText, fillNewCard === false
            ? styles.unselectedCardButton
            : {}]}
          >
            New card
          </Text>
        </TouchableOpacity>
      </View>
      )}

      {isUserAuthorized && (paymentMethods.length === 0 || fillNewCard === true) && (
        <View style={styles.cardBlock}>
          <PaymentMethodForm
            cardNumber={cardNumber}
            setCardNumber={setCardNumber}
            expirationDateMonth={expirationDateMonth}
            setExpirationDateMonth={setExpirationDateMonth}
            expirationDateYear={expirationDateYear}
            setExpirationDateYear={setExpirationDateYear}
            cvv={cvv}
            setCvv={setCvv}
          />
          <View style={styles.switchSavingCard}>
            <Text style={styles.saveCardText}>Save card</Text>
            <Switch
              trackColor={{ false: $green, true: $green }}
              thumbColor={isSavingCard ? 'white' : 'white'}
              ios_backgroundColor={$lightGray}
              onValueChange={setSavingCard}
              value={isSavingCard}
            />
          </View>
        </View>
      )}

      {
        isUserAuthorized && paymentMethods.length > 0 && fillNewCard === false && (
          <View style={styles.savedCardSection}>
            <FlatList
              data={paymentMethods}
              renderItem={({ item }) => (
                <View style={styles.paymentItem}>
                  <TouchableOpacity
                    style={styles.paymentItemBlock}
                    onPress={() => setSavedSelectedId(item.id)}
                  >
                    <PaymentRecord number={item.card_number} type={item.card_type} />
                    <View style={styles.radioButton}>
                      <View style={savedSelectedId === item.id ? styles.selectedRadioButton : {}} />
                    </View>
                  </TouchableOpacity>
                </View>
              )}
              keyExtractor={(item) => item.id}
            />
          </View>

        )
      }
      <View style={styles.buttonBlock}>
        {isLoading && <SmallLoader isVisible />}
        {!isLoading && <FormButton onClick={submitForm} disabled={!isFormValid}>Buy</FormButton>}
      </View>
    </View>
  );
}

PaymentScreen.propTypes = {
  totalSum: PropTypes.string.isRequired,
  isUserAuthorized: PropTypes.bool.isRequired,
  paymentMethods: PropTypes.arrayOf(PropTypes.shape).isRequired,
  buyProducts: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  newOrder: PropTypes.shape.isRequired,
};

const mapStateToProps = createStructuredSelector({
  totalSum: getTotalBasketSum,
  isUserAuthorized: isAuthorized,
  paymentMethods: getPaymentMethods,
  isLoading: getIsLoading,
  newOrder: getNewOrder,
});

const mapDispatchToProps = (dispatch) => ({
  buyProducts: (data) => dispatch(createOrder(data)),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentScreen);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  totalSumText: {
    fontSize: 27,
  },
  totalSum: {
    color: $green,
    fontSize: 30,
    fontWeight: 'bold',
  },
  totalSumContainer: {
    flexDirection: 'row',
    marginBottom: 40,
    marginTop: -55,
  },
  cardBlock: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  switchSavingCard: {
    position: 'absolute',
    bottom: 30,
    right: '5%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  saveCardText: {
    marginRight: 5,
    fontSize: 17,
    color: $semiDarkGray,
  },
  paymentItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 7,
  },
  savedCardSection: {
    width: '90%',
    height: 230,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 70,
  },
  cardButtons: {
    flexDirection: 'row',
    width: '90%',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  cardButtonsText: {
    fontSize: 18,
  },
  cardButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  unselectedCardButton: {
    color: $semiDarkGray,
  },
  cardButtonIcon: {
    marginRight: 5,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: $green,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedRadioButton: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: $green,
  },
  paymentItemBlock: {
    width: '95%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
