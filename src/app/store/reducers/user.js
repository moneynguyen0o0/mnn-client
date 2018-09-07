import { createSelector } from 'reselect';

// TYPES

export const types = {
  USERS_REQUEST: 'USERS_REQUEST',
  USERS_REQUESTING: 'USERS_REQUESTING',
  USERS_RECEIVE_SUCCESS: 'USERS_RECEIVE_SUCCESS',
  USERS_RECEIVE_ERROR: 'USERS_RECEIVE_ERROR',

  USER_REQUEST: 'USER_REQUEST',
  USER_REQUESTING: 'USER_REQUESTING',
  USER_RECEIVE_SUCCESS: 'USER_RECEIVE_SUCCESS',
  USER_RECEIVE_ERROR: 'USER_RECEIVE_ERROR'
};

// ACTIONS

const requestUsers = auth => ({ type: types.USERS_REQUEST, auth });
const requestingUsers = () => ({ type: types.USERS_REQUESTING });
const receiveUsersSuccess = payload => ({ type: types.USERS_RECEIVE_SUCCESS, payload });
const receiveUsersError = payload => ({ type: types.USERS_RECEIVE_ERROR, payload });

const requestUser = (id, auth) => ({ type: types.USER_REQUEST, id, auth });
const requestingUser = () => ({ type: types.USER_REQUESTING });
const receiveUserSuccess = payload => ({ type: types.USER_RECEIVE_SUCCESS, payload });
const receiveUserError = payload => ({ type: types.USER_RECEIVE_ERROR, payload });

export const actions = {
  requestUsers,
  requestingUsers,
  receiveUsersSuccess,
  receiveUsersError,

  requestUser,
  requestingUser,
  receiveUserSuccess,
  receiveUserError
};

// SELECTORS

const getUsers = state => state.users.data;

const getFilteredUsers = createSelector(
  [getUsers],
  users => users.map(({ _id, fullname, email, roles }) => ({ id: _id, fullname, email, roles }))
);

export const selectors = {
  getUsers,
  getFilteredUsers
};

// REDUCERS

const initialUsersState = {
  data: [],
  isWaiting: false,
  error: null
};

const handleUsers = (state = initialUsersState, action = {}) => {
  switch (action.type) {
  case types.USERS_REQUESTING:
    return {
      ...initialUsersState,
      isWaiting: true
    };
  case types.USERS_RECEIVE_SUCCESS:
    return {
      ...initialUsersState,
      data: action.payload
    };
  case types.USERS_RECEIVE_ERROR:
    return {
      ...initialUsersState,
      error: action.payload
    };

  default:
    return state;
  }
};

const initialUserState = {
  data: {},
  isWaiting: false,
  error: null
};

const handleUser = (state = initialUserState, action = {}) => {
  switch (action.type) {
  case types.USER_REQUESTING:
    return {
      ...initialUserState,
      isWaiting: true
    };
  case types.USER_RECEIVE_SUCCESS:
    return {
      ...initialUserState,
      data: action.payload
    };
  case types.USER_RECEIVE_ERROR:
    return {
      ...initialUserState,
      error: action.payload
    };

  default:
    return state;
  }
};

export {
  handleUsers as users,
  handleUser as user
};
