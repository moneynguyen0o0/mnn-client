import { createSelector } from 'reselect';

// TYPES

export const types = {
  USER_LOGIN_REQUEST: 'USER_LOGIN_REQUEST',
  USER_LOGOUT_REQUEST: 'USER_LOGOUT_REQUEST',
  USER_LOGOUT_SUCCESS: 'USER_LOGOUT_SUCCESS',

  USERS_REQUEST: 'USERS_REQUEST',
  USERS_RECEIVE: 'USERS_RECEIVE',

  USER_REQUEST: 'USER_REQUEST',
  USER_REQUESTING: 'USER_REQUESTING',
  USER_RECEIVE_SUCCESS: 'USER_RECEIVE_SUCCESS',
  USER_RECEIVE_ERROR: 'USER_RECEIVE_ERROR'
};

// ACTIONS

const requestLogin = user => ({ type: types.USER_LOGIN_REQUEST, user });
const requestLogout = callback => ({ type: types.USER_LOGOUT_REQUEST, callback });
const logoutSuccess = () => ({ type: types.USER_LOGOUT_SUCCESS });

const requestUsers = () => ({ type: types.USERS_REQUEST });
const receiveUsers = payload => ({ type: types.USERS_RECEIVE, payload });

const requestUser = id => ({ type: types.USER_REQUEST, id });
const requestingUser = () => ({ type: types.USER_REQUESTING });
const receiveUserSuccess = payload => ({ type: types.USER_RECEIVE_SUCCESS, payload });
const receiveUserError = payload => ({ type: types.USER_RECEIVE_ERROR, payload });

export const actions = {
  requestLogin,
  requestLogout,
  logoutSuccess,
  requestUsers,
  receiveUsers,
  requestUser,
  requestingUser,
  receiveUserSuccess,
  receiveUserError
};

// SELECTORS

const getUsers = state => state.users;

const getFilteredUsers = createSelector(
  [getUsers],
  users => users.map(({ fullname, email, roles }) => ({ fullname, email, roles }))
);

export const selectors = {
  getUsers,
  getFilteredUsers
};

// REDUCERS

const handleUsers = (state = [], action = {}) => {
  switch (action.type) {
    case types.USERS_RECEIVE:
      return action.payload;

    default:
      return state;
  }
};

const initialSessionState = {
  data: null,
  authenticated: false,
  isWaiting: false,
  error: null
};

const handleSession = (state = initialSessionState, action = {}) => {
  switch (action.type) {
    case types.USER_REQUESTING:
      return {
        ...initialSessionState,
        isWaiting: true
      };
    case types.USER_RECEIVE_SUCCESS:
      return {
        ...initialSessionState,
        authenticated: true,
        data: action.payload
      };
    case types.USER_RECEIVE_ERROR:
      return {
        ...initialSessionState,
        error: action.payload
      };

    case types.USER_LOGOUT_SUCCESS:
      return initialSessionState;

    default:
      return state;
  }
};

export {
  handleUsers as users,
  handleSession as session
};
