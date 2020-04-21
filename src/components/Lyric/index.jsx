import React, { Component } from 'react';
import styles from './style.less';

class Lyric extends Component {
  constructor(props) {
    super(props);
    this.musicLyricRef = React.createRef();
    this.state = {
      top: 0,
    };
  }

  componentDidMount() {
    this.calcTop();
  }

  // 计算歌词居中的 top值
  calcTop = () => {
    const dom = this.musicLyricRef.current;
    const { display = '' } = window.getComputedStyle(dom);
    if (display === 'none') {
      return;
    }
    const height = dom.offsetHeight;
    this.setState({
      top: Math.floor(height / 34 / 2),
    });
  };

  renderLyricItems = () => {
    const { currentMusic, lyric, lyricIndex } = this.props;
    if (!currentMusic || !currentMusic.id) {
      return <p>还没有播放音乐哦！</p>;
    }

    if (!Array.isArray(lyric) || lyric.length === 0) {
      return <p>暂无歌词！</p>;
    }

    return lyric.map((item, index) => (
      <p className={lyricIndex === index ? styles.active : null} key={item.time}>
        {item.text}
      </p>
    ));
  };

  render() {
    const { lyricIndex } = this.props;
    const { top } = this.state;
    return (
      <div ref={this.musicLyricRef} className={styles.musicLyric}>
        <div
          className={styles.musicLyricItems}
          style={{
            transform: `translate3d(0, ${-34 * (lyricIndex - top)}px, 0)`,
          }}
        >
          {this.renderLyricItems()}
        </div>
      </div>
    );
  }
}

export default Lyric;
