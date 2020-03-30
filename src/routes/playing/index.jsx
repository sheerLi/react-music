import React from "react";
import { connect } from "react-redux";

import { Loading, Button, AlbumInfo, MusicList } from "@/components";
import { getTopListRequest } from "@/redux/actions";

import styles from "./style.less";

const Buttons = [{ key: "playing", text: "正在播放", path: "/playing" }];

class Playing extends React.Component {
  state = {};

  componentDidMount() {
    const { getTopList } = this.props;
    getTopList({ idx: 1 });
  }

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
                <MusicList list={topList} />
                {isFetching && <Loading />}
              </div>
            </div>
            <div className={styles.right}>
              <AlbumInfo />
            </div>
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
