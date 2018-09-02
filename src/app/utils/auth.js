import store from 'store';

const isUserAuthenticated = auth => {
  return auth && user.expires > Date.now();
};

const getAuthHeader = auth => {
  if (!auth) return {};
  return { 'Authorization': 'Bearer ' + auth.token };
};

export {
  getAuthHeader,
  isUserAuthenticated
};
