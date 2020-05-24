import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import * as Animatable from 'react-native-animatable';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import PropTypes from 'prop-types';
import { getToastNotificationText, isToastNotificationVisible } from '../store/ui/selectors';
import { $lightGray } from '../constants/Colors';
import { hideNotification } from '../store/ui/actions';
import { DEFAULT_NOTIFICATION_TEXT } from '../constants/Defaults';

const slideInUp = {
  0: {
    translateY: 50,
  },
  1: {
    translateY: -40,
  },
};

const slideInDown = {
  0: {
    translateY: -40,
  },
  1: {
    translateY: 50,
  },
};

function ToastNotification({ hide, isVisible, text }) {
  const [animation, setAnimation] = React.useState(slideInUp);
  let disappearTimer = null;
  const hideToastNotification = () => {
    clearTimeout(disappearTimer);
    setAnimation(slideInDown);
    setTimeout(() => {
      hide();
      setAnimation(slideInUp);
    }, 600);
  };
  React.useEffect(() => {
    if (isVisible) {
      disappearTimer = setTimeout(hideToastNotification, 2000);
    }
  }, [isVisible]);

  if (!isVisible) return null;
  return (
    <Animatable.View
      easing="ease-in-out"
      animation={animation}
      style={styles.container}
      duration={300}
      useNativeDriver
    >
      <TouchableOpacity
        onPress={hideToastNotification}
        style={styles.notification}
        activeOpacity={1}
      >
        <Text style={styles.text}>{text || DEFAULT_NOTIFICATION_TEXT}</Text>
      </TouchableOpacity>
    </Animatable.View>
  );
}

const mapStateToProps = createStructuredSelector({
  isVisible: isToastNotificationVisible,
  text: getToastNotificationText,
});

const mapDispatchToProps = (dispatch) => ({
  hide: () => dispatch(hideNotification()),
});

export default connect(mapStateToProps, mapDispatchToProps)(ToastNotification);

ToastNotification.propTypes = {
  hide: PropTypes.string.isRequired,
  isVisible: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
};

const styles = StyleSheet.create({
  container: {
    width: '100%',
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 0,
  },
  notification: {
    width: '85%',
    borderRadius: 15,
    padding: 15,
    alignItems: 'center',
    backgroundColor: 'rgb(42,42,42)',
  },
  text: {
    color: $lightGray,
  },
});
