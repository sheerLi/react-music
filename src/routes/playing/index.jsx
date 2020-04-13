import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";

import {
  Loading,
  Button,
  AlbumInfo,
  MusicList,
  Lyric,
  Progress,
} from "@/components";
import {
  getTopListRequest,
  setCurrentIndex,
  setPlaying,
} from "@/redux/actions";
import { silencePromise, format } from "@/utils/util.js";
import styles from "./style.less";
import { getLyricRequest } from "../../redux/actions";

const Buttons = [{ key: "playing", text: "正在播放", path: "/playing" }];

class Playing extends React.Component {
  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.state = {
      lyricIndex: 0,
    };
  }

  componentDidMount() {
    const { getTopList } = this.props;
    getTopList({ idx: 1 });
  }

  handleAudioEnded = () => {
    this.next();
  };

  handleAudioError = () => {
    this.next();
  };

  handleTogglePlay = () => {
    const { setPlaying, playing } = this.props;
    setPlaying(!playing);
    if (playing) {
      this.audioRef.current.pause();
    } else {
      silencePromise(this.audioRef.current.play());
    }
  };

  handlePlay = (song, index) => {
    const { setPlaying, currentIndex, playing } = this.props;
    if (index === currentIndex) {
      setPlaying(!playing);
      if (playing) {
        this.audioRef.current.pause();
        return;
      }

      silencePromise(this.audioRef.current.play());
      return;
    }
    setPlaying(true);
    this.watchCurrentMusicChange(index);
  };

  next = () => {
    const { currentIndex, playList } = this.props;
    let index = currentIndex;
    if (currentIndex === playList.length - 1) {
      index = 0;
    } else {
      index = currentIndex + 1;
    }
    this.watchCurrentMusicChange(index)
  };

  prev = () => {
    const { currentIndex, playList } = this.props;
    let index = currentIndex;
    if (currentIndex === 0) {
      index = playList.length - 1;
    } else {
      index = currentIndex - 1;
    }
    this.watchCurrentMusicChange(index);
  };

  // 修改音乐进度
  handleProgressChange = percent => {
    const { currentIndex, playList } = this.props;
    if (playList[currentIndex]) {
      this.audioRef.current.currentTime =
        playList[currentIndex].duration * percent;
    }
  };

  // 监听audio时间更新
  handleTimeUpdate = () => {
    const { playList, currentIndex } = this.props;
    const duration = playList[currentIndex].duration;
    const currentTime = this.audioRef.current.currentTime;
    this.changeLyricIndex(currentTime);
    this.setState({
      percent: currentTime && duration ? currentTime / duration : 0
    })   
  }

  changeLyricIndex = (currentTime) => {
    const { lyric } = this.props;
    if(!Array.isArray(lyric)) {
      return;
    }
    lyric.forEach((item, i) => {
      if(currentTime > item.time) {
        this.setState({
          lyricIndex: i,
        })
      }
    })
  }

  // 监听歌曲变化
  watchCurrentMusicChange = index => {
    const { setCurrentIndex, playList, getLyric } = this.props;
    this.setState({
      lyricIndex: 0
    })
    setCurrentIndex(index);
    this.audioRef.current.src = playList[index].url;
    silencePromise(this.audioRef.current.play());
    getLyric({ id: playList[index].id });
  }

  render() {
    const { percent, lyricIndex } = this.state;
    const { isFetching, playList, currentIndex, playing, lyric } = this.props;
    let currentSong = playList[currentIndex] || {};
    const { name, duration, image } = currentSong;
    return (
      <>
        <div className={styles.container}>
          <div className={styles.content}>
            <div className={styles.left}>
              <div className={styles.btnGroup}>
                {Buttons.map((item) => (
                  <Button
                    key={item.key}
                    className={styles.btn}
                    text={item.text}
                  />
                ))}
              </div>
              <div className={styles.main}>
                <MusicList
                  list={playList}
                  onPlay={this.handlePlay}
                  currentSong={currentSong}
                  playing={playing}
                />
                {isFetching && <Loading />}
              </div>
            </div>
            <div className={styles.right}>
              <AlbumInfo currentMusic={currentSong} />
              <Lyric lyric={lyric} currentMusic={currentSong} lyricIndex={lyricIndex} />
            </div>
          </div>
          <div className={styles.controls} disabled={!currentSong.id}>
            <div
              className={classnames(styles.iconBtn, styles.iconPre)}
              onClick={this.prev}
            />
            <div
              className={classnames(styles.iconBtn, styles.iconPlay, {
                [styles.on]: playing,
              })}
              onClick={this.handleTogglePlay}
            />
            <div
              className={classnames(styles.iconBtn, styles.iconNext)}
              onClick={this.next}
            />
            <div className={styles.progressWrap}>
              <div className={styles.musicInfo__name}>{name}</div>
              <div className={styles.musicInfo__time}>{duration && format(duration)}</div>
              <Progress onChange={this.handleProgressChange} percent={percent} />
            </div>
            <div className={classnames(styles.iconBtn, styles.iconRandom)} />
          </div>
        </div>
        {/* 遮罩层 */}
        <div
          className={styles.playerBg}
          style={{
            backgroundImage: `url(${image}?param=300y300)`,
            transition: "all 0.8s",
          }}
        ></div>
        <div className={styles.playerMask}></div>
        {/* 播放器 */}
        <audio
          ref={this.audioRef}
          onTimeUpdate={this.handleTimeUpdate}
          onEnded={this.handleAudioEnded}
          onError={this.handleAudioError}
        ></audio>
      </>
    );
  }
}

const mapState = (state) => ({
  isFetching: state.app.isFetching,
  playList: state.music.playList,
  currentIndex: state.music.currentIndex,
  playing: state.music.playing,
  audioEle: state.music.audioEle,
  lyric: state.music.lyric,
});

const mapDispatch = (dispatch) => {
  return {
    getTopList: (payload) => {
      dispatch(getTopListRequest(payload));
    },
    getLyric: (payload) => {
      dispatch(getLyricRequest(payload));
    },
    setCurrentIndex: (index) => {
      dispatch(setCurrentIndex(index));
    },
    setPlaying: (playing) => {
      dispatch(setPlaying(playing));
    },
  };
};

export default connect(mapState, mapDispatch)(Playing);
