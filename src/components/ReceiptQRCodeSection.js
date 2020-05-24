import React from 'react';
import { View } from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import { getOrderId } from '../store/receiptDetails/selectors';

// eslint-disable-next-line no-unused-vars
function ReceiptQRCodeSection({ id }) {
  return (
    <View />
  );
}

const mapStateToProps = createStructuredSelector({
  id: getOrderId,
});

export default connect(mapStateToProps)(ReceiptQRCodeSection);

ReceiptQRCodeSection.defaultProps = {
  id: null,
};

ReceiptQRCodeSection.propTypes = {
  id: PropTypes.number,
};
