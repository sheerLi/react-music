import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILED,
  GET_TOP_LIST_REQUEST,
  GET_TOP_LIST_SUCCESS,
  GET_LYRIC_REQUEST,
  GET_LYRIC_SUCCESS,
  SET_PLAYING_LIST,
  SET_CURRENT_INDEX,
  SET_AUDIO_ELEMENT,
  SET_PLAYING,
  SET_LYRIC,
} from '@/constants/actionTypes';

export const fetchRequest = function() {
  return { type: FETCH_REQUEST };
};

export const fetchSuccess = function() {
  return { type: FETCH_SUCCESS };
};

export const fetchFailed = function() {
  return { type: FETCH_FAILED };
};

export function getTopListRequest(payload) {
  return {
    type: GET_TOP_LIST_REQUEST,
    payload,
  };
}

export function getTopListSuccess(list) {
  return {
    type: GET_TOP_LIST_SUCCESS,
    payload: list
  };
}

export function getLyricRequest(payload) {
  return {
    type: GET_LYRIC_REQUEST,
    payload,
  };
}

export function getLyricSuccess(lyric) {
  return {
    type: GET_LYRIC_SUCCESS,
    payload: lyric
  };
}

export function setPlayingList(list) {
  return {
    type: SET_PLAYING_LIST,
    payload: list
  }
}

export function setCurrentIndex(index) {
  return {
    type: SET_CURRENT_INDEX,
    payload: index,
  }
}

export function setPlaying(playing) {
  return {
    type: SET_PLAYING,
    payload: playing,
  }
}

export function setAudioElement(ele) {
  return {
    type: SET_AUDIO_ELEMENT,
    payload: ele
  }
}

export function setLyric(lyric) {
  return {
    type: SET_LYRIC,
    payload: lyric,
  }
}
