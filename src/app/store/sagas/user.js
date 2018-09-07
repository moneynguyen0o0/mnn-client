import { takeLatest, call, put, select } from 'redux-saga/effects';

import { actions, selectors, types } from '../reducers/user';
import * as Api from 'app/utils/api';

// WORKERS

function* requestUsers({ auth }) {
  const cachedUsers = yield select(selectors.getUsers);

  if (!cachedUsers || !cachedUsers.length) {
    yield put(actions.requestingUsers());

    try {
      const data = yield call(Api.fetchUsers, auth);
      yield put(actions.receiveUsersSuccess(data));
    } catch (err) {
      yield put(actions.receiveUsersError(err));
    }
  }
}

function* requestUser({ id, auth }) {
  yield put(actions.requestingUser());

  try {
    const data = yield call(Api.findUser, id, auth);
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

function* watchRequestUsers() {
  yield takeLatest(types.USERS_REQUEST, requestUsers);
}

function* watchRequestUser() {
  yield takeLatest(types.USER_REQUEST, requestUser);
}

export const watchers = {
  watchRequestUsers,
  watchRequestUser
};
