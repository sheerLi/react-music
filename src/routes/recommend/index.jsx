import React, { Component } from "react";
import { Tag } from "antd";
import { connect } from "react-redux";

import { getRecommendPlaylistRequest, getCatListRequest } from "@/redux/actions";
import styles from "./style.less";

class Recommend extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.fetchCatList();
    // this.fetchRecommendList();
  }

  fetchCatList = () => {
    const { getCatListRequest } = this.props;
    getCatListRequest();
  }

  fetchRecommendList = () => {
    const { getRecommendPlaylistRequest } = this.props;
    getRecommendPlaylistRequest();
  };

  render() {
    return (
      <div className={styles.swiper}>
        
      </div>
    );
  }
}

const mapDispatch = (dispatch) => {
  return {
    getCatListRequest: () => {
      dispatch(getCatListRequest());
    },
    getRecommendPlaylistRequest: (payload) => {
      dispatch(getRecommendPlaylistRequest(payload));
    },
  };
};

export default connect(null, mapDispatch)(Recommend);
