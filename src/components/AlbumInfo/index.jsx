import React from "react";
import defaultCoverPic from "@/assets/player_cover.png";
import styles from "./style.less";

export default ({ currentMusic }) => (
  <div className={styles.albumWrap}>
    <dl>
      <dt>
        <img src={currentMusic.image || defaultCoverPic} alt="" />
      </dt>
      {!currentMusic.id && <dd>React 在线音乐播放器</dd>}
      {currentMusic.id && (
        <>
          <dd>歌曲名：{currentMusic.name}</dd>
          <dd>歌手名：{currentMusic.singer}</dd>
          <dd>专辑名：{currentMusic.album}</dd>
        </>
      )}
    </dl>
  </div>
);
