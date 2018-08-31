import {
  Home,
  Login,
  Logout,
  UserList,
  UserDetail,
  NotFound
} from 'app/containers';
import {
  userSagaWorkers
} from 'app/store/sagas';

export default [
  {
    path: '/',
    exact: true,
    component: Home
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/logout',
    component: Logout,
    requiresAuth: true
  },
  {
    path: '/users',
    component: UserList,
    exact: true,
    loadData: () => [
      [userSagaWorkers.requestUsers]
    ],
    requiresAuth: true
  },
  {
    path: '/users/:id',
    component: UserDetail,
    exact: true,
    loadData: ({ params }) => [
      [userSagaWorkers.requestUser, params.id]
    ],
    requiresAuth: true
  },
  {
    component: NotFound
  }
];
