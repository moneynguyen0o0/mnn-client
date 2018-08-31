import request from './request';
import { getAuthHeader } from './auth';

const login = (email, password) => request({ method: 'post', url: '/auth/login', data: { email, password } });
const fetchUsers = () => request({ url: '/users', headers: getAuthHeader() });
const findUser = (id) => request({ url: `/users/${id}` });

export {
  fetchUsers,
  findUser,
  login
};
