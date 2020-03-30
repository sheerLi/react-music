import React from "react";
import classnames from "classnames";
import styles from "./style.less";

export default ({ list }) => (
  <div className={styles.listWrap}>
    <div className={classnames(styles.listHeader, styles.listItem)}>
      <span className={styles.listItem__name}>歌曲</span>
      <span className={styles.listItem__singer}>歌手</span>
      <span className={styles.listItem__time}>时常</span>
      <span className={styles.listItem__album}>专辑</span>
    </div>
    <div className={styles.listContent}>
      {list.map((item, index) => (
        <div className={styles.listItem} key={item.id}>
          <span className={styles.listItem__num}>{index + 1}</span>
          <span className={styles.listItem__name}>{item.name}</span>
          <span className={styles.listItem__singer}>{item.singer}</span>
          <span className={styles.listItem__time}>{item.duration}</span>
          <span className={styles.listItem__album}>{item.album}</span>
        </div>
      ))}
    </div>
  </div>
);
