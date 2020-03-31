import { call, put, take, fork } from 'redux-saga/effects';
import { getTopList } from '@/services/recommend';
import { fetchRequest, fetchSuccess, fetchFailed, getTopListSuccess } from '@/redux/actions';
import { GET_TOP_LIST_REQUEST } from '@/constants/actionTypes';

function* fetchTopListWorker(payload) {
  try {
    yield put(fetchRequest())
    const res = yield call(getTopList, payload);
    yield put(getTopListSuccess(res));
    yield put(fetchSuccess())
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
