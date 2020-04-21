import React from 'react';
import { HashRouter as Router, Switch, Route } from 'react-router-dom';
import { Provider } from 'react-redux';

import { store } from '@/store';
import { AppContainer } from '@/containers';
import BasicLayout from '@/layouts/BasicLayout';
import Playing from '@/routes/playing';

const App = () => (
  <Provider store={store}>
    <AppContainer>
      <Router>
        <Switch>
          <Route path="/playing" component={Playing} />
          <Route path="/" component={BasicLayout} />
        </Switch>
      </Router>
    </AppContainer>
  </Provider>
);

export default App;
