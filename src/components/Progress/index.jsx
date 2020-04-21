import React, { Component } from 'react';
import classnames from 'classnames';
import styles from './style.less';

class Progress extends Component {
  constructor(props) {
    super(props);
    this.playerProgress = React.createRef();
    this.innerProgress = React.createRef();
    this.slider = React.createRef();
    this.state = {
      move: {
        startX: 0,
        left: 0,
        canMove: false,
      },
    };
  }

  componentDidMount() {
    this.bindEvents();
  }

  componentDidUpdate(newProps) {
    const { percent } = newProps;
    const {
      move: { canMove },
    } = this.state;
    if (!canMove) {
      const offsetWidth = this.playerProgress.current.clientWidth * percent;
      this.moveSlider(offsetWidth);
    }
  }

  componentWillUnmount() {
    this.removeEvents();
  }

  bindEvents = () => {
    this.slider.current.addEventListener('mousedown', this.mouseDown);
    document.addEventListener('mousemove', this.mouseMove);
    document.addEventListener('mouseup', this.mouseUp);
  };

  removeEvents = () => {
    this.slider.current.removeEventListener('mousedown', this.mouseDown);
    document.removeEventListener('mousemove', this.mouseMove);
    document.removeEventListener('mouseup', this.mouseUp);
  };

  // 点击事件
  handleProgressClick = (e) => {
    let rect = this.playerProgress.current.getBoundingClientRect();
    let offsetWidth = Math.min(
      this.playerProgress.current.clientWidth,
      Math.max(0, e.clientX - rect.left)
    );
    this.moveSlider(offsetWidth);
    this.commitPercent();
  };

  mouseDown = (e) => {
    this.setState({
      move: {
        startX: e.clientX,
        left: this.innerProgress.current.clientWidth,
        canMove: true,
      },
    });
  };

  mouseMove = (e) => {
    const {
      move: { startX, canMove, left },
    } = this.state;
    if (!canMove) {
      return;
    }
    e.preventDefault();
    const endX = e.clientX;

    const dist = endX - startX;
    // 最长滑动距离;
    const maxLength = this.playerProgress.current.clientWidth;
    const offsetWidth = Math.min(maxLength, Math.max(0, left + dist));
    this.moveSlider(offsetWidth);
    this.commitPercent();
  };

  mouseUp = (e) => {
    this.setState({
      move: {
        startX: e.clientX,
        canMove: false,
      },
    });
  };

  moveSlider = (offsetWidth) => {
    this.innerProgress.current.style.width = `${offsetWidth}px`;
  };

  commitPercent = () => {
    const { onChange } = this.props;
    const playerProgressWidth = this.playerProgress.current.clientWidth;
    const percent = this.innerProgress.current.clientWidth / playerProgressWidth;
    onChange(percent);
  };

  render() {
    return (
      <div
        className={styles.playerProgress}
        ref={this.playerProgress}
        onClick={this.handleProgressClick}
      >
        <div className={styles.playerProgressInner} ref={this.percentProgress}></div>
        <div className={styles.currentLoad} ref={this.innerProgress}>
          <i className={classnames(styles.iconBtn, styles.iconDot)} ref={this.slider}></i>
        </div>
      </div>
    );
  }
}

export default Progress;
