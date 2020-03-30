import {
  FETCH_REQUEST,
  FETCH_SUCCESS,
  FETCH_FAILED,
  GET_TOP_LIST_REQUEST,
  GET_TOP_LIST_SUCCESS,
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
