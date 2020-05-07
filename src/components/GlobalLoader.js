import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import { getIsLoaderVisible } from '../store/ui/selectors';
import Loader from './Loader';

const mapStateToProps = createStructuredSelector({
  isVisible: getIsLoaderVisible,
});

export default connect(mapStateToProps)(Loader);
