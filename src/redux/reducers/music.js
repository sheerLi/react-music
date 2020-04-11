import { SET_PLAYING_LIST, SET_CURRENT_INDEX, SET_AUDIO_ELEMENT, SET_PLAYING } from "@/constants/actionTypes";

const initMusicState = {
  audioEle: null, // 播放器元素
  playList: [], // 播放列表
  currentIndex: -1, // 当前播放歌曲索引
  playing: false // 播放状态
};

export function musicReducer(state = initMusicState, action) {
  switch (action.type) {
    case SET_PLAYING_LIST:
      return {
        ...state,
        playList: action.payload
      };
    case SET_CURRENT_INDEX:
      return {
        ...state,
        currentIndex: action.payload
      };
    case SET_AUDIO_ELEMENT:
      return {
        ...state,
        audioEle: action.payload
      };
    case SET_PLAYING:
      return {
        ...state,
        playing: action.payload,
      }
    default:
      return state;
  }
}
