import { Axios } from "@/helpers";
import { createTopList } from "@/utils/song";
import { TOP_LIST, RECOMMEND_LIST } from "@/constants/api";

export function getTopList(payload) {
  return Axios.get(TOP_LIST, payload).then(res =>
    _formatTopList(
      res.playlist
        ? res.playlist.tracks.slice(0, 100)
        : res.data.playlist.tracks.slice(0, 100)
    )
  );
}

export function getPersonlized() {
  return Axios.get(RECOMMEND_LIST);
}

const _formatTopList = list => {
  let ret = [];
  list.forEach(item => {
    const musicData = item;
    if (musicData.id) {
      ret.push(createTopList(musicData));
    }
  });
  return ret;
};
