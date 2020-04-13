import React, { Component } from 'react';
import { Button } from "antd";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <div>
        <Button type="primary">和卡好卡</Button>
      </div>
    );
  }
}

export default Home;
