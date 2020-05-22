import {
  StyleSheet, View, Text, TouchableOpacity,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import MaterialIcon from '@expo/vector-icons/MaterialCommunityIcons';
import { Camera } from 'expo-camera';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { $gray } from '../constants/Colors';
import { getScannedProduct } from '../store/barcode/selectors';
import { removeScannedProduct } from '../store/barcode/actions';
import { fetchScannedProduct } from '../store/barcode/asyncActions';


const FlashMode = {
  ON: 3,
  OFF: 0,
};

function BarcodeScannerScreen({ fetchProduct, removeProduct, scannedProduct }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [flashMode, setFlashMode] = useState(FlashMode.OFF);

  const handleBarCodeScanned = ({ data }) => {
    if (scanned) {
      return;
    }
    setScanned(true);
    fetchProduct(data);
    // Alert.alert(`Bar code with type ${type} and data ${data} has been scanned!`);
    setTimeout(() => setScanned(false), 2000);
  };

  const handleFlashMode = () => {
    setFlashMode(flashMode === FlashMode.ON ? FlashMode.OFF : FlashMode.ON);
  };

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <Camera onBarCodeScanned={handleBarCodeScanned} style={styles.camera} flashMode={flashMode} />
      <View style={styles.flashContainer}>
        <TouchableOpacity onPress={() => handleFlashMode()}>
          <MaterialIcon
            name={flashMode === FlashMode.ON ? 'flashlight-off' : 'flashlight'}
            size={30}
            color="black"
            style={styles.flashIcon}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.productContainer}>
        {!scannedProduct
          ? <Text style={styles.scanText}>Please scan a barcode of a product</Text>
          : <Text>{scannedProduct.name}</Text>}
      </View>
    </View>
  );
}

BarcodeScannerScreen.propTypes = {
  scannedProduct: PropTypes.shape.isRequired,
  fetchProduct: PropTypes.func.isRequired,
  removeProduct: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  scannedProduct: getScannedProduct,
});

const mapDispatchToProps = (dispatch) => ({
  fetchProduct: (barcode) => {
    dispatch(fetchScannedProduct(barcode));
  },
  removeProduct: (productId) => {
    dispatch(removeScannedProduct(productId));
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BarcodeScannerScreen);

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  camera: {
    height: '60%',
    width: '100%',
  },
  flashContainer: {
    position: 'absolute',
    top: '5%',
    right: 30,
    justifyContent: 'center',
    alignItems: 'center',
    width: 50,
    height: 50,
    borderRadius: 30,
    backgroundColor: $gray,
    opacity: 0.7,
  },
  flashIcon: {
    transform: [{ rotate: '30deg' }],
  },
  productContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scanText: {
    fontSize: 20,
  },
});
