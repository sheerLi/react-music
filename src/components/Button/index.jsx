import React from 'react';
import classnames from 'classnames';

import styles from './style.less';

export default ({ text, className }) => (
  <div className={classnames(styles.btnWrap, className)}>{text}</div>
);
