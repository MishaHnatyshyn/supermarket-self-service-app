import * as React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

export default function MonoText(props) {
  const { style } = props;
  return <Text {...props} style={[style, { fontFamily: 'space-mono' }]} />;
}

MonoText.propTypes = {
  style: PropTypes.shape({}).isRequired,
};
