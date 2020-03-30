
import React from 'react';
import styles from './style.less';

export default () => (
  <div className={styles.loadingWrap}>
    <div className={styles.loadingContent}>
      <svg className={styles.circular} viewBox="25 25 50 50">
        <circle className={styles.path} cx="50" cy="50" r="20" fill="none" />
      </svg>
    </div>
  </div>
);
