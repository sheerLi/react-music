import React from 'react';
import { Modal } from 'antd';
import AppService from '@/services/global';

class AppContainer extends React.Component {
  audioRef = React.createRef();

  state = {
    error: '',
    isReady: false,
  };

  componentDidMount() {
    this.initResponseHandle();
  }

  initResponseHandle = () => {
    AppService.addErrorHandle((error) => {
      this.setState({
        error,
      });
    });
    this.setState({
      isReady: true,
    });
  };

  render() {
    const { error, isReady } = this.state;
    const { children } = this.props;
    return (
      <>
        {isReady && children}
        {error && Modal.confirm(error)}
      </>
    );
  }
}

export default AppContainer;
