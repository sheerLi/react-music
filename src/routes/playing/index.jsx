import React from "react";
import { connect } from "react-redux";
import classnames from "classnames";

import { Loading, Button, AlbumInfo, MusicList, Lyric } from "@/components";
import { getTopListRequest } from "@/redux/actions";

import styles from "./style.less";

const Buttons = [{ key: "playing", text: "正在播放", path: "/playing" }];

class Playing extends React.Component {
  state = {};

  componentDidMount() {
    const { getTopList } = this.props;
    getTopList({ idx: 1 });
  }

  handleSelect = song => {
    console.log(song);
  };

  render() {
    const { isFetching, topList } = this.props;
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
                <MusicList list={topList} onClick={this.handleSelect} />
                {isFetching && <Loading />}
              </div>
            </div>
            <div className={styles.right}>
              <AlbumInfo />
              <Lyric />
            </div>
          </div>
          <div className={styles.controls}>
            <div className={classnames(styles.iconBtn, styles.iconPre)} />
            <div className={classnames(styles.iconBtn, styles.iconPlay)} />
            <div className={classnames(styles.iconBtn, styles.iconNext)} />
            <div className={styles.progressWrap}>
              <div className={styles.musicInfo__name}>fhkahkhk</div>
              <div className={styles.musicInfo__time}>1:00/3:00</div>
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
        <div className={styles.playerBg}></div>
        <div className={styles.playerMask}></div>
      </>
    );
  }
}

const mapState = state => ({
  isFetching: state.app.isFetching,
  topList: state.recommend.topList
});

const mapDispatch = dispatch => {
  return {
    getTopList: payload => {
      dispatch(getTopListRequest(payload));
    }
  };
};

export default connect(mapState, mapDispatch)(Playing);
