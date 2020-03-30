import { fork, all } from 'redux-saga/effects';
import { watchGetTopList } from './recommend';

export default function* rootSaga() {
  yield all([fork(watchGetTopList)]);
}
