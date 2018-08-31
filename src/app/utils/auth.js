import store from 'store';
import { EXPIRED_USER } from 'app/config/app';

const KEY = '_user';

const isUserAuthenticated = (user) => {
  return user && user.expires > Date.now();
};

const saveUserToLocalStorage = (user) => {
  store.set(KEY, user);
};

const getUserFromLocalStorage = () => {
  return store.get(KEY);
};

const removeUserToLocalStorage = () => {
  store.remove(KEY);
};

const getAuthHeader = () => {
  const user = getUserFromLocalStorage();

  if (!user) return {};

  return { 'Authorization': 'Bearer ' + user.token };
};

export {
  getAuthHeader,
  isUserAuthenticated,
  saveUserToLocalStorage,
  getUserFromLocalStorage,
  removeUserToLocalStorage
};
