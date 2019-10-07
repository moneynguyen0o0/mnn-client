const isUserAuthenticated = auth => {
  return auth && auth.expires > Date.now();
};

const getAuthHeader = auth => {
  if (!auth) return {};
  return { 'Authorization': 'Bearer ' + auth.token };
};

export {
  getAuthHeader,
  isUserAuthenticated
};
