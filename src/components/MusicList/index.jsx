import React from "react";
import classnames from "classnames";
import styles from "./style.less";

export default ({ list }) => (
  <div className={styles.listWrap}>
    <div className={classnames(styles.listHeader, styles.listItem)}>
      <div className={styles.listItem__name}>歌曲</div>
      <div className={styles.listItem__singer}>歌手</div>
      <div className={styles.listItem__time}>时长</div>
    </div>
    <div className={styles.listContent}>
      {list.map((item, index) => (
        <div className={styles.listItem} key={item.id}>
          <div className={styles.listItem__num}>{index + 1}</div>
          <div className={styles.listItem__name}>{item.name}</div>
          <div className={styles.listItem__singer}>{item.singer}</div>
          <div className={styles.listItem__time}>{item.duration}</div>
        </div>
      ))}
    </div>
  </div>
);
