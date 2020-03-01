import { all, call } from 'redux-saga/effects';
import { init } from './store/sagas';

export default function* initialSaga() {
  yield all([
    call(init),
  ]);
}
