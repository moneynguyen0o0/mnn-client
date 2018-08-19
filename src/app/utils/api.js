import request from './request';

const fetchUsers = () => request({ url: '/users' });
const findUser = (id) => request({ url: `/users/${id}` });

export {
  fetchUsers,
  findUser
};
