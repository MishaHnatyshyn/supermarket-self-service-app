import { Image, TouchableOpacity, StyleSheet } from 'react-native';
import * as React from 'react';
import { useNavigation } from '@react-navigation/native';

export default function HeaderBackButton() {
  const navigation = useNavigation();
  const handleBack = () => {
    navigation.goBack();
  };
  return (
    <TouchableOpacity onPress={handleBack} style={styles.container}>
      <Image source={require('../assets/images/back.png')} style={styles.image} />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    width: 50,
    paddingLeft: 10,
  },
  image: {
    width: 20,
    height: 20,
  },
});
