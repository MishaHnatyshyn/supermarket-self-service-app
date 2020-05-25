import React, { useEffect, useState } from 'react';
import { Image, AsyncStorage } from 'react-native';
import base64 from 'base64-js';
import PropTypes from 'prop-types';
import { getFullImage } from '../utils/helpers';
import { DEFAULT_PHOTO_URI } from '../constants/Defaults';

export default function CachableImage({ source, ...props }) {
  const [imageString, setImage] = useState(DEFAULT_PHOTO_URI);
  const effectHandler = async () => {
    try {
      const cache = await AsyncStorage.getItem(source);
      if (cache) {
        return setImage(cache);
      }
      const response = await getFullImage(source);
      const imageStringBase64 = `data:image/jpg;base64,${base64.fromByteArray(
        new Uint8Array(response.data),
      )}`;
      setImage(imageStringBase64);
      await AsyncStorage.setItem(source, imageStringBase64);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    effectHandler();
  }, []);

  return <Image source={{ uri: imageString }} {...props} />;
}

CachableImage.propTypes = {
  source: PropTypes.string.isRequired,
};
