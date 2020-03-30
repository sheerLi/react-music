
import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from '@/redux/reducers';
import rootSaga from '@/sagas';


const RootReducers = combineReducers(rootReducer);
const sagaMiddleware = createSagaMiddleware();

const enhancers = compose(
  applyMiddleware(sagaMiddleware),
  // window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__'] && window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']()
  //DevTools.instrument(),
)

const store = createStore(RootReducers, {}, enhancers);
sagaMiddleware.run(rootSaga);

export { store } 




