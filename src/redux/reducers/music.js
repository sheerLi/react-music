import { SET_PLAYING_LIST, SET_CURRENT_SONG, SET_AUDIO_ELEMENT, SET_PLAYING } from "@/constants/actionTypes";

const initMusicState = {
  audioEle: null, // 播放器元素
  playList: [], // 播放列表
  currentSong: {}, // 当前播放歌曲信息
  playing: false // 播放状态
};

export function musicReducer(state = initMusicState, action) {
  switch (action.type) {
    case SET_PLAYING_LIST:
      return {
        ...state,
        playList: action.payload
      };
    case SET_CURRENT_SONG:
      return {
        ...state,
        currentSong: action.payload
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
