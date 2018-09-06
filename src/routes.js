import {
  Home,
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
    path: '/users',
    component: UserList,
    exact: true,
    loadData: () => [
      [userSagaWorkers.requestUsers]
    ]
  },
  {
    path: '/users/:id',
    component: UserDetail,
    exact: true,
    loadData: ({ params }) => [
      [userSagaWorkers.requestUser, { id: params.id }]
    ]
  },
  {
    component: NotFound
  }
];
