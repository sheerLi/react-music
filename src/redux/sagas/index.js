import { fork, all } from 'redux-saga/effects';
import { watchGetTopList, watchGetLyric } from './recommend';

export default function* rootSaga() {
  yield all([fork(watchGetTopList), fork(watchGetLyric)]);
}
