import React, { Component } from "react";
import styles from "./style.less";

class Lyric extends Component {
  state = {};

  renderLyricItems = () => {
    const { currentMusic, lyric, nolyric, lyricIndex } = this.props;
    if (!currentMusic || !currentMusic.id) {
      return <p>还没有播放音乐哦！</p>;
    }

    if (nolyric) {
      return <p>暂无歌词！</p>;
    }

    if (Array.isArray(lyric) && lyric.length > 0) {
      return lyric.map((item, index) => (
        <p
          className={lyricIndex === index ? styles.active : null}
          key={item.time}
        >
          {item.text}
        </p>
      ));
    }

    return <p>歌词加载失败！</p>;
  };

  render() {
    return (
      <div ref="musicLyric" class={styles.musicLyric}>
        <div class={styles.musicLyricItems}>{this.renderLyricItems()}</div>
      </div>
    );
  }
}

export default Lyric;
