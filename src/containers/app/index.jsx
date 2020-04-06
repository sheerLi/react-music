import React from "react";
import { connect } from "react-redux";

import { setAudioElement } from "@/redux/actions";
import AppService from "@/services/global";

class AppContainer extends React.Component {

  constructor(props) {
    super(props);
    this.audioRef = React.createRef();
    this.state = {
      error: ""
    };
  }
  
  componentDidMount() {
    this.initResponseHandle();
    this.initAudioElement();
  }

  componentDidUpdate() {
    console.log('---')
  }

  initAudioElement() {
    const { setAudioElement } = this.props;
    setAudioElement(this.audioRef);
  }

  initResponseHandle = () => {
    AppService.addErrorHandle(error => {
      this.setState({
        error
      });
    });
  };

  render() {
    const { children } = this.props;
    return (
      <>
        {children}
        {/* 播放器 */}
        <audio ref={this.audioRef}></audio>
      </>
    );
  }
}

const mapDispatch = dispatch => {
  return {
    setAudioElement: ele => {
      dispatch(setAudioElement(ele));
    }
  };
};

export default connect(null, mapDispatch)(AppContainer);
