import { all, call } from 'redux-saga/effects';
import { startWatchSearchActions } from './search/sagas';
import { init } from './store/sagas';

export default function* initialSaga() {
  yield all([
    call(startWatchSearchActions),
    call(init),
  ]);
}
