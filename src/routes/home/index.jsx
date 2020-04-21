import React, { Component } from 'react';
import { Layout, Menu, Carousel } from 'antd';
import { UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';

import styles from './style.less';

const { Sider, Content } = Layout;

class Home extends Component {
  state = {
    collapsed: false,
  };

  toggle = () => {
    this.setState({
      collapsed: !this.state.collapsed,
    });
  };

  render() {
    return (
      <Layout style={{ height: '100vh' }}>
        <Sider trigger={null} collapsible collapsed={this.state.collapsed}>
          <div className="logo" />
          <Menu theme="dark" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1">
              <UserOutlined />
              <span>nav 1</span>
            </Menu.Item>
            <Menu.Item key="2">
              <VideoCameraOutlined />
              <span>nav 2</span>
            </Menu.Item>
            <Menu.Item key="3">
              <UploadOutlined />
              <span>nav 3</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout className="site-layout">
          <Content className="site-layout-background">
            <div className={styles.carouselWrap}>
              <Carousel>
                {[1, 2, 3].map((item, i) => (
                  <div className={styles.wrap}>
                    <h3>{item}</h3>
                  </div>
                ))}
              </Carousel>
            </div>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default Home;
