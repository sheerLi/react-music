import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";

import { Loading, Button, AlbumInfo, MusicList, Lyric } from "@/components";
import { getTopListRequest, setCurrentSong, setPlaying } from "@/redux/actions";
import { silencePromise } from '@/utils/util.js';
import styles from "./style.less";

const Buttons = [{ key: "playing", text: "正在播放", path: "/playing" }];

class Playing extends React.Component {
  state = {};

  componentDidMount() {
    const { getTopList } = this.props;
    getTopList({ idx: 1 });
  }

  handlePlay = song => {
    const { setCurrentSong, setPlaying, audioEle, currentSong, playing } = this.props;
    if(song.id === currentSong.id) {
      console.log(playing)
      setPlaying(!playing);   
      if(playing) {
        audioEle.current.pause();
        return;
      }
      silencePromise(audioEle.current.play());
      return;
    }
    setCurrentSong(song);
    setPlaying(true);   
    audioEle.current.src = song.url;
    silencePromise(audioEle.current.play());
  };

  render() {
    const { isFetching, playList, currentSong, playing } = this.props;
    const { name, duration, image } = currentSong;
    return (
      <>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.left}>
              <div className={styles.btnGroup}>
                {Buttons.map(item => (
                  <Button
                    key={item.key}
                    className={styles.btn}
                    text={item.text}
                  />
                ))}
              </div>
              <div className={styles.main}>
                <MusicList list={playList} onPlay={this.handlePlay} currentSong={currentSong} playing={playing} />
                {isFetching && <Loading />}
              </div>
            </div>
            <div className={styles.right}>
              <AlbumInfo currentMusic={currentSong} />
              <Lyric />
            </div>
          </div>
          <div className={styles.controls} disabled={!currentSong.id}>
            <div className={classnames(styles.iconBtn, styles.iconPre)} />
            <div className={classnames(styles.iconBtn, styles.iconPlay, { [styles.on]: playing })} />
            <div className={classnames(styles.iconBtn, styles.iconNext)} />
            <div className={styles.progressWrap}>
                <div className={styles.musicInfo__name}>{name}</div>
                <div className={styles.musicInfo__time}>{duration}</div>
              <div className={styles.playerProgress}>
                <div className={styles.playerProgressInner}></div>
                <div className={styles.currentLoad}>
                  <i className={classnames(styles.iconBtn, styles.iconDot)}></i>
                </div>
              </div>
            </div>
            <div className={classnames(styles.iconBtn, styles.iconRandom)} />
          </div>
        </div>
        {/* 遮罩层 */}
        <div className={styles.playerBg} style={{ backgroundImage: `url(${image}?param=300y300)`, transition: 'all 0.8s' }}></div>
        <div className={styles.playerMask}></div>
      </>
    );
  }
}

const mapState = state => ({
  isFetching: state.app.isFetching,
  playList: state.music.playList,
  currentSong: state.music.currentSong,
  playing: state.music.playing,
  audioEle: state.music.audioEle,
});

const mapDispatch = dispatch => {
  return {
    getTopList: payload => {
      dispatch(getTopListRequest(payload));
    },
    setCurrentSong: song => {
      dispatch(setCurrentSong(song));
    },
    setPlaying: playing => {
      dispatch(setPlaying(playing));
    }
  };
};

export default connect(mapState, mapDispatch)(Playing);
