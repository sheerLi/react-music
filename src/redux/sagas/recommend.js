import { call, put, take, fork } from 'redux-saga/effects';
import { getTopList, getLyric } from '@/services/recommend';
import { fetchRequest, fetchSuccess,  fetchFailed, setPlayingList, setLyric } from '@/redux/actions';
import { GET_TOP_LIST_REQUEST, GET_LYRIC_REQUEST } from '@/constants/actionTypes';

function* fetchTopListWorker(payload) {
  try {
    yield put(fetchRequest())
    const res = yield call(getTopList, payload);
    yield put(setPlayingList(res));
    yield put(fetchSuccess())
  } catch (error) {
    yield put(fetchFailed())
  }
}

function* fetchLyric(payload) {
  try {
    const res = yield call(getLyric, payload);
    yield put(setLyric(res));
  } catch (error) {
    yield put(fetchFailed())
  }
}

export function* watchGetTopList() {
  while(true) {
    const { payload } = yield take(GET_TOP_LIST_REQUEST)
    yield fork(fetchTopListWorker, payload);
  }  
}

export function* watchGetLyric() {
  while(true) {
    const { payload } = yield take(GET_LYRIC_REQUEST);
    yield fork(fetchLyric, payload);
  }
}
