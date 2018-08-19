import { createSelector } from 'reselect';

// TYPES

export const types = {
  USERS_REQUEST: 'USERS_REQUEST',
  USERS_RECEIVE: 'USERS_RECEIVE',
  USER_REQUEST: 'USER_REQUEST',
  USER_RECEIVE: 'USER_RECEIVE'
};

// ACTIONS

const requestUsers = () => ({ type: types.USERS_REQUEST });
const receiveUsers = payload => ({ type: types.USERS_RECEIVE, payload });

const requestUser = (id) => ({ type: types.USER_REQUEST, id });
const receiveUser = payload => ({ type: types.USER_RECEIVE, payload });

export const actions = {
  requestUsers,
  receiveUsers,
  requestUser,
  receiveUser
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

export const initialState = {
  users: [],
  user: {},
  isLoading: false,
  error: null
};

const users = (state = [], action = {}) => {
  switch (action.type) {
  case types.USERS_RECEIVE:
    return action.payload;

  default:
    return state;
  }
};

const user = (state = {}, action = {}) => {
  switch (action.type) {
  case types.USER_RECEIVE:
    return action.payload;

  default:
    return state;
  }
};

export {
  users,
  user
};
