import React from 'react';
import { HashRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';

import { AppContainer, DevTools } from '@/containers';
import Playing from '@/routes/playing';
import configureStore from '@/store';
import rootSaga from '@/redux/sagas';

const store = configureStore(window.__INITIAL_STATE__);
store.runSaga(rootSaga);

const App = () => (
  <Provider store={store}>
    <AppContainer>
      <Router>
        <Switch>
          <Route exact path="/">
            <Redirect to="/playing" />
          </Route>
          <Route path="/playing" component={Playing} />
        </Switch>
      </Router>
      {process.env.NODE_ENV === 'development' && <DevTools />}
    </AppContainer>
  </Provider>
);

export default App;
