import request from './request';
import { getAuthHeader } from './auth';

const login = (email, password) => request({ method: 'post', url: '/auth/login', data: { email, password } });
const fetchUsers = (auth) => request({ url: '/users', headers: getAuthHeader(auth) });
const findUser = (id, auth) => request({ url: `/users/${id}`, headers: getAuthHeader(auth) });

export {
  fetchUsers,
  findUser,
  login
};
