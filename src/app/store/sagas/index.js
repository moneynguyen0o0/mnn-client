import { all, fork } from 'redux-saga/effects';

import { workers as userSagaWorkers, watchers as userSagaWatchers } from './user';

export {
  userSagaWorkers
};

export default function* rootSaga() {
  yield all([
    fork(userSagaWatchers.watchRequestUserLogin),
    fork(userSagaWatchers.watchRequestUserLogout),
    fork(userSagaWatchers.watchRequestUsers),
    fork(userSagaWatchers.watchRequestUser)
  ]);
}
