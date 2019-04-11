import React from 'react';
import { Provider } from 'react-redux';
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import ReactDOM from 'react-dom';
import Routes from './routes';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './libs/fontAwesomeLib';

import mozartReducer from './reducers';
import networkStatzReducer from './widgets/NetworkInterfacesWidget/reducers';
import cpuSystemLoadAvgReducer from './widgets/SystemLoadAverageWidget/reducers';
import memoryStatzReducer from './widgets/MemoryStatzWidget/reducers';

const rootReducer = combineReducers({
  global: mozartReducer,
  networkStatz: networkStatzReducer,
  cpuSystemLoadAvg: cpuSystemLoadAvgReducer,
  memoryStatz: memoryStatzReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

ReactDOM.render(
  <Provider store={store}>
    <Routes />
  </Provider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
