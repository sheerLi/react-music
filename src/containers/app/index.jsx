import React from "react";

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
      </>
    );
  }
}

export default AppContainer;
