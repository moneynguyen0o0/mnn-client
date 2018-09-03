// TYPES

export const types = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_REQUESTING: 'LOGIN_REQUESTING',
  LOGIN_RECEIVE_SUCCESS: 'LOGIN_RECEIVE_SUCCESS',
  LOGIN_RECEIVE_ERROR: 'LOGIN_RECEIVE_ERROR',

  LOGOUT_REQUEST: 'LOGOUT_REQUEST',
  LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
};

// ACTIONS

const requestLogin = (user, callback) => ({ type: types.LOGIN_REQUEST, user, callback });
const requestingLogin = () => ({ type: types.LOGIN_REQUESTING });
const receiveLoginSuccess = payload => ({ type: types.LOGIN_RECEIVE_SUCCESS, payload });
const receiveLoginError = payload => ({ type: types.LOGIN_RECEIVE_ERROR, payload });

const requestLogout = callback => ({ type: types.LOGOUT_REQUEST, callback });
const logoutSuccess = () => ({ type: types.LOGOUT_SUCCESS });

export const actions = {
  requestLogin,
  requestLogout,
  logoutSuccess,
  requestingLogin,
  receiveLoginSuccess,
  receiveLoginError
};

// SELECTORS

// REDUCERS

const initialSessionState = {
  data: null,
  authenticated: false,
  isWaiting: false,
  error: null
};

const handleSession = (state = initialSessionState, action = {}) => {
  switch (action.type) {
  case types.LOGIN_REQUESTING:
    return {
      ...initialSessionState,
      isWaiting: true
    };
  case types.LOGIN_RECEIVE_SUCCESS:
    return {
      ...initialSessionState,
      authenticated: true,
      data: action.payload
    };
  case types.LOGIN_RECEIVE_ERROR:
    return {
      ...initialSessionState,
      error: action.payload
    };

  case types.LOGOUT_SUCCESS:
    return initialSessionState;

  default:
    return state;
  }
};

export {
  handleSession as session
};
