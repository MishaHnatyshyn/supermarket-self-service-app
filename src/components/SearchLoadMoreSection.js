import React from 'react';
import { StyleSheet, View } from 'react-native';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Loader from './Loader';
import FormButton from './LoginButton';
import { fetchNextPage } from '../store/search/asyncActions';
import { getIsLoadMoreLoading } from '../store/search/selectors';

function LoadMore({ loadMore, isLoading }) {
  return (
    <View style={styles.loadMoreButtonContainer}>
      {isLoading ? (
        <Loader
          isVisible={isLoading}
          imageStyles={styles.loadMoreLoaderImage}
          textStyles={styles.loadMoreLoaderText}
        />
      ) : (
        <FormButton
          buttonStyles={styles.loadMoreButton}
          textStyles={styles.loadMoreButtonText}
          onClick={loadMore}
        >
          Load more...
        </FormButton>
      )}
    </View>
  );
}

LoadMore.propTypes = {
  loadMore: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  loadMore: () => dispatch(fetchNextPage()),
});

const mapStateToProps = createStructuredSelector({
  isLoading: getIsLoadMoreLoading,
});

export default connect(mapStateToProps, mapDispatchToProps)(LoadMore);

const styles = StyleSheet.create({
  loadMoreButtonContainer: {
    width: '100%',
    marginTop: 10,
    alignItems: 'center',
    position: 'relative',
  },
  loadMoreButton: {
    width: '70%',
  },
  loadMoreButtonText: {
    fontSize: 16,
    textTransform: 'none',
  },
  loadMoreLoaderImage: {
    width: 80,
    height: 80,
  },
  loadMoreLoaderText: {
    fontSize: 12,
    marginTop: -25,
  },
});
