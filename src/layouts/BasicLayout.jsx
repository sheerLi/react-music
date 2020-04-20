import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import { Layout } from "antd";

import { getRouterData } from "@/config/router";
import { getMenuData } from "@/config/menu";
import { getRoutes } from '@/utils/util';
import { SiderMenu } from "./components";

const { Content } = Layout;

class BasicLayout extends Component {
  state = {
    collapsed: false,
  };

  render() {
    const { location, match } = this.props;
    const routerData = getRouterData();
    return (
      <Layout>
        <SiderMenu menuData={getMenuData()} location={location} />
        <Layout>
          <Content style={{ margin: "24px 24px 0", height: "100%" }}>
            <Switch>
              {getRoutes(match.path, routerData).map((route, i) => {
                return (
                  <Route
                    key={route.key}
                    path={route.path}
                    render={(props) => (
                      <route.component {...props} routes={route.routes} />
                    )}
                  />
                );
              })}
              <Route exact path="/">
                <Redirect to="/music-hall/recommend" />
              </Route>
            </Switch>
          </Content>
        </Layout>
      </Layout>
    );
  }
}

export default BasicLayout;
