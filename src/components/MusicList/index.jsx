import React from "react";
import classnames from "classnames";
import { format } from '@/utils/util';

import styles from "./style.less";

export default ({ list, onPlay, currentSong, playing }) => (
  <div className={styles.listWrap}>
    <div className={classnames(styles.listHeader, styles.listItem)}>
      <div className={styles.listItem__name}>歌曲</div>
      <div className={styles.listItem__singer}>歌手</div>
      <div className={styles.listItem__time}>时长</div>
    </div>
    <div className={styles.listContent}>
      {list.map((item, index) => (
        <div className={classnames(styles.listItem, { [styles.on]: item.id === currentSong.id && playing })} key={item.id}>
          <div className={styles.listItem__num}>{index + 1}</div>
          <div className={styles.listItem__name}>
            {item.name}
            <div className={styles.listItem_menu}>
              <i
                className={classnames(styles.icon, styles.iconPlay)}
                onClick={() => onPlay(item, index)}
              ></i>
            </div>
          </div>
          <div className={styles.listItem__singer}>{item.singer}</div>
          <div className={styles.listItem__time}>
            <div className={styles.listItem_menu}>
              <i className={classnames(styles.icon, styles.iconDelete)}></i>
            </div>
            {format(item.duration)}
          </div>
        </div>
      ))}
    </div>
  </div>
);
