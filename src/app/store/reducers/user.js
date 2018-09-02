import { createSelector } from 'reselect';

// TYPES

export const types = {
  USERS_REQUEST: 'USERS_REQUEST',
  USERS_RECEIVE: 'USERS_RECEIVE',

  USER_REQUEST: 'USER_REQUEST',
  USER_REQUESTING: 'USER_REQUESTING',
  USER_RECEIVE_SUCCESS: 'USER_RECEIVE_SUCCESS',
  USER_RECEIVE_ERROR: 'USER_RECEIVE_ERROR'
};

// ACTIONS

const requestUsers = auth => ({ type: types.USERS_REQUEST, auth });
const receiveUsers = payload => ({ type: types.USERS_RECEIVE, payload });

const requestUser = (id, auth) => ({ type: types.USER_REQUEST, id, auth });
const requestingUser = () => ({ type: types.USER_REQUESTING });
const receiveUserSuccess = payload => ({ type: types.USER_RECEIVE_SUCCESS, payload });
const receiveUserError = payload => ({ type: types.USER_RECEIVE_ERROR, payload });

export const actions = {
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
  users => users.map(({ _id, fullname, email, roles }) => ({ id: _id, fullname, email, roles }))
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

const initialUserState = {
  data: null,
  isWaiting: false,
  error: null
};

const handleUer = (state = initialUserState, action = {}) => {
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
  handleUer as user
};
