import { appReducer } from './app';
import { recommendReducer } from './recommend';
import { musicReducer } from './music';

export default {
  app: appReducer,
  recommend: recommendReducer,
  music: musicReducer,
};
