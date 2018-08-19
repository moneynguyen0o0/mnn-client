import { takeLatest, call, put, select } from 'redux-saga/effects';

import { actions, selectors, types } from '../reducers/user';
import * as Api from 'app/utils/api';

// WORKERS

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
    yield put(actions.receiveUser(data));
  } catch (err) {
    console.log('User request failed', err);
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
