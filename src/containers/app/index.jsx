import React from 'react';
import AppService from '@/services/global';

class AppContainer extends React.Component {
  state = {
    error: '',
  };

  componentDidMount() {
    this.initResponseHandle();
  }

  initResponseHandle = () => {
    AppService.addErrorHandle(error => {
      this.setState({
        error,
      });
    });
  };

  render() {
    const { children } = this.props;
    return <>{children}</>;
  }
}

export default AppContainer;
