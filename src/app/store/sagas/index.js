import { all, fork } from 'redux-saga/effects';

import { watchers as sessionSagaWatchers } from './session';
import { workers as userSagaWorkers, watchers as userSagaWatchers } from './user';

export {
  userSagaWorkers
};

export default function* rootSaga() {
  yield all([
    fork(sessionSagaWatchers.watchRequestUserLogin),
    fork(sessionSagaWatchers.watchRequestUserLogout),
    fork(userSagaWatchers.watchRequestUsers),
    fork(userSagaWatchers.watchRequestUser)
  ]);
}
