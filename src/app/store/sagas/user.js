import { takeLatest, call, put, select } from 'redux-saga/effects';

import { actions, selectors, types } from '../reducers/user';
import { saveUserToLocalStorage, removeUserToLocalStorage } from 'app/utils/auth';
import * as Api from 'app/utils/api';

// WORKERS

function* requestUserLogin({ user }) {
  yield put(actions.requestingUser());

  try {
    const { email, password } = user;
    const data = yield call(Api.login, email, password);

    yield put(actions.receiveUserSuccess(data));

    saveUserToLocalStorage(data);
  } catch (error) {
    yield put(actions.receiveUserError(error));
  }
}

function* requestUserLogout({ callback }) {
  yield put(actions.logoutSuccess());

  removeUserToLocalStorage();
  callback();
}

function* requestUsers() {
  const cachedUsers = yield select(selectors.getUsers);

  if (!cachedUsers || !cachedUsers.length) {
    try {
      const data = yield call(Api.fetchUsers);
      yield put(actions.receiveUsers(data));
    } catch (err) {
      console.log('Users request failed', err);
    }
  }
}

function* requestUser(id) {
  try {
    const data = yield call(Api.findUser, id);
    yield put(actions.receiveUserSuccess(data));
  } catch (err) {
    yield put(actions.receiveUserError(err));
  }
}

export const workers = {
  requestUsers,
  requestUser
};

// WATCHERS

function* watchRequestUserLogin() {
  yield takeLatest(types.USER_LOGIN_REQUEST, requestUserLogin);
}

function* watchRequestUserLogout() {
  yield takeLatest(types.USER_LOGOUT_REQUEST, requestUserLogout);
}

function* watchRequestUsers() {
  yield takeLatest(types.USERS_REQUEST, requestUsers);
}

function* watchRequestUser() {
  yield takeLatest(types.USER_REQUEST, requestUser);
}

export const watchers = {
  watchRequestUserLogin,
  watchRequestUserLogout,
  watchRequestUsers,
  watchRequestUser
};
