import React, { useState, useEffect } from 'react';
import {
  View, TouchableOpacity, StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import PropTypes from 'prop-types';
import QRCode from 'react-native-qrcode-svg';
import * as Brightness from 'expo-brightness';
import { getOrderId } from '../store/receiptDetails/selectors';
import Layout from '../constants/Layout';
import { createOrderQrLink } from '../utils/helpers';


function ReceiptQRCodeSection({ id }) {
  const [fullScreenMode, setFullScreenMode] = useState(false);
  const [defaultBrightness, setDefaultBrightness] = useState(null);
  const toggleFullscreen = () => {
    setFullScreenMode(!fullScreenMode);
  };
  useEffect(() => {
    if (fullScreenMode) {
      Brightness.setBrightnessAsync(1);
    } else {
      Brightness.setBrightnessAsync(defaultBrightness);
    }
    return () => Brightness.setBrightnessAsync(defaultBrightness);
  }, [fullScreenMode, defaultBrightness]);

  useEffect(() => {
    const getBrightness = async () => {
      const value = await Brightness.getSystemBrightnessAsync();
      setDefaultBrightness(value);
    };
    getBrightness();
  }, []);

  return (
    <View style={[styles.container, fullScreenMode ? styles.fullScreenContainer : {}]}>
      <TouchableOpacity activeOpacity={1} onPress={toggleFullscreen}>
        <QRCode value={createOrderQrLink(id)} size={fullScreenMode ? 300 : 150} />
      </TouchableOpacity>
    </View>
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

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
  },
  fullScreenContainer: {
    zIndex: 10,
    position: 'absolute',
    height: Layout.window.height,
    justifyContent: 'center',
    backgroundColor: 'rgba(52,52,52,0.76)',
  },
});
