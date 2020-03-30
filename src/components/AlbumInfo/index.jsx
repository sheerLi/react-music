import React from 'react';
import defaultCoverPic from '@/assets/player_cover.png';
import styles from './style.less';

export default () => (
  <div className={styles.albumWrap}>
    <dl>
      <dt>
        <img src={defaultCoverPic} alt="" />
      </dt>
      <dd>React 在线音乐播放器</dd>
    </dl>
  </div>
);
