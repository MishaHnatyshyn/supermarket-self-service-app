import {
  StyleSheet, View, Alert, Text, Button,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Camera } from 'expo-camera';

const FlashMode = {
  ON: 3,
  OFF: 0,
};

export default function BarcodeScannerScreen({ navigation }) {
  const onBarCodeRead = (e) => {
    Alert.alert(`Barcode value is${e.data}`, `Barcode type is${e.type}`);
  };


  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    Alert.alert(`Bar code with type ${type} and data ${data} has been scanned!`);
  };

  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [flashMode, setFlashMode] = useState(FlashMode.OFF);

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
      <Camera
        onBarCodeScanned={handleBarCodeScanned}
        style={styles.camera}
        flashMode={flashMode}
      />
      <Button onPress={() => setFlashMode(FlashMode.ON)} title="Turn flash on" />
      <Button onPress={() => setFlashMode(FlashMode.OFF)} title="Turn flash off" />
    </View>
  );
}

BarcodeScannerScreen.propTypes = {};

const styles = StyleSheet.create({
  container: {
    height: '100%',
    width: '100%',
  },
  camera: {
    height: '60%',
    width: '100%',
  },
});
