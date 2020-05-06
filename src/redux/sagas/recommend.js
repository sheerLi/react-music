import { call, put, take, fork } from 'redux-saga/effects';
import { getTopList, getLyric, getRecommendPlaylist, getCatList } from '@/services/recommend';
import {
  fetchRequest,
  fetchSuccess,
  fetchFailed,
  setPlayingList,
  setLyric,
  getCatListSuccess,
  getRecommendPlaylistSuccess,
} from '@/redux/actions';
import {
  GET_TOP_LIST_REQUEST,
  GET_LYRIC_REQUEST,
  GET_CAT_LIST_REQUEST,
  GET_RECOMMEND_PLAYLIST_REQUEST,
} from '@/constants/actionTypes';

function* fetchTopListWorker(payload) {
  try {
    yield put(fetchRequest());
    const res = yield call(getTopList, payload);
    yield put(setPlayingList(res));
    yield put(fetchSuccess());
  } catch (error) {
    yield put(fetchFailed());
  }
}

function* fetchRecommendPlaylistWorker(payload) {
  const res = yield call(getRecommendPlaylist, payload);
  yield put(getRecommendPlaylistSuccess(res));
}

function* fetchLyric(payload) {
  try {
    const res = yield call(getLyric, payload);
    yield put(setLyric(res));
  } catch (error) {
    yield put(fetchFailed());
  }
}

function* fetchCatListWorker() {
  try {
    const res = yield call(getCatList);
    console.log(res);
    yield put(getCatListSuccess(res));
  } catch (error) {
    yield put(fetchFailed());
  }
}

export function* watchCatList() {
  while (true) {
    yield take(GET_CAT_LIST_REQUEST);
    yield fork(fetchCatListWorker);
  }
}

export function* watchGetTopList() {
  while (true) {
    const { payload } = yield take(GET_TOP_LIST_REQUEST);
    yield fork(fetchTopListWorker, payload);
  }
}

export function* watchGetRecommendPlaylist() {
  while (true) {
    const { payload } = yield take(GET_RECOMMEND_PLAYLIST_REQUEST);
    yield fork(fetchRecommendPlaylistWorker, payload);
  }
}

export function* watchGetLyric() {
  while (true) {
    const { payload } = yield take(GET_LYRIC_REQUEST);
    yield fork(fetchLyric, payload);
  }
}
