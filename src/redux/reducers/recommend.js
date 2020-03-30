import { GET_TOP_LIST_REQUEST, GET_TOP_LIST_SUCCESS } from '@/constants/actionTypes';

const initRecommendState = {
  topList: [],
};

export function recommendReducer(state = initRecommendState, action) {
  switch (action.type) {
    case GET_TOP_LIST_REQUEST:
      return {
        ...state,
      }
    case GET_TOP_LIST_SUCCESS:
      return {
        ...state,
        topList: [...state.topList, ...action.payload],
      };
    default:
      return state;
  }
}
