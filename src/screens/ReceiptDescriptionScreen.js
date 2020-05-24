import React, { useCallback, useEffect } from 'react';
import { StyleSheet, ScrollView, RefreshControl } from 'react-native';
import PropTypes from 'prop-types';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import ReceiptMainInfo from '../components/ReceiptMainInfo';
import ReceiptProductList from '../components/ReceiptProductList';
import ReceiptQRCodeSection from '../components/ReceiptQRCodeSection';
import {
  getOrderId,
  isReceiptLoading,
} from '../store/receiptDetails/selectors';
import { fetchReceiptData } from '../store/receiptDetails/asyncActions';

function ReceiptDescriptionScreen({
  route, fetchReceipt, isLoading, currentOrderId,
}) {
  const {
    id,
  } = route.params;
  const parsedId = parseInt(id, 10);
  const fetchReceiptDetails = useCallback(() => {
    fetchReceipt(parsedId);
  }, [parsedId]);
  useEffect(() => fetchReceiptDetails(), []);
  if (parsedId !== currentOrderId) return null;
  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={isLoading} onRefresh={fetchReceiptDetails} />
      }
    >
      <ReceiptMainInfo />
      <ReceiptProductList />
      <ReceiptQRCodeSection />
    </ScrollView>
  );
}

const mapStateToProps = createStructuredSelector({
  isLoading: isReceiptLoading,
  currentOrderId: getOrderId,
});

const mapDispatchToProps = (dispatch) => ({
  fetchReceipt: (id) => dispatch(fetchReceiptData(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReceiptDescriptionScreen);

ReceiptDescriptionScreen.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }).isRequired,
  fetchReceipt: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  currentOrderId: PropTypes.number.isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
