import { fork, all } from 'redux-saga/effects';

export default (sagas) => function* genTasks() {
  const tasks = sagas.map(([saga, ...params]) => fork(saga, ...params));

  if (tasks.length) {
    yield all(tasks);
  }
};
