import { FETCH_REQUEST, FETCH_SUCCESS, FETCH_FAILED } from '@/constants/actionTypes';

const initAppState = {
  isFetching: false,
};

export function appReducer(state = initAppState, action) {
  switch (action.type) {
    case FETCH_REQUEST:
      return {
        ...state,
        isFetching: true,
      };
    case FETCH_SUCCESS:
      return {
        ...state,
        isFetching: false,
      };
    case FETCH_FAILED:
      return {
        ...state,
        isFetching: false,
      };
    default:
      return state;
  }
}
