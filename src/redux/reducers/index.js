import { combineReducers } from 'redux';
import { appReducer } from './app';
import { recommendReducer } from './recommend';
import { musicReducer } from './music';

export default combineReducers({
  app: appReducer,
  recommend: recommendReducer,
  music: musicReducer,
});
