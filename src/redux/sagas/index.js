import { fork, all } from "redux-saga/effects";
import {
  watchGetTopList,
  watchGetLyric,
  watchGetRecommendPlaylist,
  watchCatList,
} from "./recommend";

export default function* rootSaga() {
  yield all([
    fork(watchGetTopList),
    fork(watchGetLyric),
    fork(watchGetRecommendPlaylist),
    fork(watchCatList),
  ]);
}
