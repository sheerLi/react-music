import {
  GET_TOP_LIST_REQUEST,
  GET_TOP_LIST_SUCCESS,
  GET_CAT_LIST_REQUEST,
  GET_CAT_LIST_SUCCESS,
  GET_RECOMMEND_PLAYLIST_REQUEST,
  GET_RECOMMEND_PLAYLIST_SUCCESS,
} from '@/constants/actionTypes';

const initRecommendState = {
  topList: [],
  recommendPlaylist: [],
  catList: [],
};

export function recommendReducer(state = initRecommendState, action) {
  switch (action.type) {
    case GET_CAT_LIST_REQUEST:
      return {
        ...state,
      };
    case GET_CAT_LIST_SUCCESS:
      return {
        ...state,
        catList: [...state.catList, ...action.payload],
      };
    case GET_TOP_LIST_REQUEST:
      return {
        ...state,
      };
    case GET_TOP_LIST_SUCCESS:
      return {
        ...state,
        topList: [...state.topList, ...action.payload],
      };
    case GET_RECOMMEND_PLAYLIST_REQUEST:
      return {
        ...state,
      };
    case GET_RECOMMEND_PLAYLIST_SUCCESS:
      return {
        ...state,
        recommendPlaylist: [...state.recommendPlaylist, ...action.payload],
      };
    default:
      return state;
  }
}
