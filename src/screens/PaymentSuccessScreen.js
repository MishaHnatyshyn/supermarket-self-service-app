import * as React from 'react';
import {
  View, Text, Image, StyleSheet,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { useCallback } from 'react';
import PropTypes from 'prop-types';
import FormButton from '../components/LoginButton';
import { getNewOrder } from '../store/checkout/selectors';
import { resetCheckout } from '../store/checkout/actions';


function PaymentSuccessScreen({ order, deleteNewOrder }) {
  const navigation = useNavigation();

  const openReceipt = useCallback(() => {
    navigation.reset({
      index: 1,
      routes: [{ name: 'Root', screen: 'History' }, { name: 'Receipt', params: { id: order.id } }],
    });
    deleteNewOrder();
  }, [navigation, order]);

  const openSearchPage = useCallback(() => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Root' }],
    });
    deleteNewOrder();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Thanks for shopping!</Text>
      <Image source={require('../assets/images/bread.png')} style={styles.picture} />
      <View style={styles.homeButton}>
        <FormButton onClick={openSearchPage}>Go home</FormButton>
      </View>
      <FormButton onClick={openReceipt}>Open receipt</FormButton>
    </View>
  );
}

PaymentSuccessScreen.propTypes = {
  order: PropTypes.shape.isRequired,
  deleteNewOrder: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  order: getNewOrder,
});

const mapDispatchToProps = (dispatch) => ({
  deleteNewOrder: () => dispatch(resetCheckout()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PaymentSuccessScreen);

const styles = StyleSheet.create({
  picture: {
    width: 150,
    height: 150,
    marginBottom: 40,
    marginTop: 40,
  },
  container: {
    height: '100%',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  homeButton: {
    marginBottom: 15,
  },
  text: {
    fontSize: 30,
  },
});
