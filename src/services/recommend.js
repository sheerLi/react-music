import { Axios } from '@/helpers';
import { createTopList } from '@/utils/song';
import { parseLyric } from '@/utils/util';
import { TOP_LIST, RECOMMEND_LIST, LYRIC, CAT_LIST } from '@/constants/api';

export function getCatList() {
  return Axios.get(CAT_LIST).then((res) => {
    return res.sub.filter((item) => item.hot);
  });
}

export function getTopList(payload) {
  return Axios.get(TOP_LIST, payload).then((res) =>
    _formatTopList(res.playlist.tracks.slice(0, 100))
  );
}

export async function getLyric(payload) {
  return Axios.get(LYRIC, payload).then((res) => {
    if (res.nolyric) {
      return null;
    }
    return parseLyric(res.lrc.lyric);
  });
}

export function getRecommendPlaylist(payload) {
  return Axios.get(RECOMMEND_LIST, payload);
}

const _formatTopList = (list) => {
  let ret = [];
  list.forEach((item) => {
    const musicData = item;
    if (musicData.id) {
      ret.push(createTopList(musicData));
    }
  });
  return ret;
};
