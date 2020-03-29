import { all, call } from 'redux-saga/effects';
import { startWatchSearchActions } from './search/sagas';
import { init as rootStoreSaga } from './store/sagas';
import { init as rootAuthSaga } from './auth/sagas';
import { startWatchActions } from './ui/sagas';

export default function* initialSaga() {
  yield all([
    call(startWatchSearchActions),
    call(rootStoreSaga),
    call(rootAuthSaga),
    call(startWatchActions),
  ]);
}
