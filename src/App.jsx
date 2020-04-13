import React from "react";
import {
  HashRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import { Provider } from "react-redux";

import { store } from "@/store";
import { AppContainer } from "@/containers";
import { Playing, Home } from "@/routes";

const App = () => (
  <Provider store={store}>
    <AppContainer>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/playing" />
          </Route>
          <Route path="/playing" component={Playing} />
          <Route path="/home" component={Home} />
        </Switch>
      </Router>
    </AppContainer>
  </Provider>
);

export default App;
