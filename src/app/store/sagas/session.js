import { takeLatest, call, put } from 'redux-saga/effects';

import { actions, types } from '../reducers/session';
import * as Api from 'app/utils/api';

// WORKERS

function* requestUserLogin({ user, callback }) {
  yield put(actions.requestingLogin());

  try {
    const { email, password } = user;
    const data = yield call(Api.login, email, password);

    yield put(actions.receiveLoginSuccess(data));

    callback(data);
  } catch (error) {
    yield put(actions.receiveLoginError(error));
  }
}

function* requestUserLogout({ callback }) {
  yield put(actions.logoutSuccess());

  callback();
}

export const workers = {
  requestUserLogin,
  requestUserLogout
};

// WATCHERS

function* watchRequestUserLogin() {
  yield takeLatest(types.LOGIN_REQUEST, requestUserLogin);
}

function* watchRequestUserLogout() {
  yield takeLatest(types.LOGOUT_REQUEST, requestUserLogout);
}

export const watchers = {
  watchRequestUserLogin,
  watchRequestUserLogout
};
