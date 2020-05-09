import React from 'react';
import PropTypes from 'prop-types';
import EmptyStateMessage from './EmptyStateMessage';

const EMPTY_SEARCH_RESULT_MESSAGE = 'Sorry, we can\'t find anything by your request (';
const INITIAL_MESSAGE = 'Type something in search input!';

export default function EmptySearchResultsMessage({ wasSearchPerformed }) {
  const message = wasSearchPerformed
    ? EMPTY_SEARCH_RESULT_MESSAGE
    : INITIAL_MESSAGE;
  return (
    <EmptyStateMessage message={message} />
  );
}

EmptySearchResultsMessage.propTypes = {
  wasSearchPerformed: PropTypes.bool.isRequired,
};
