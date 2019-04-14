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
import networkStatzPollingReducer from './widgets/NetworkInterfacesWidgetPolling/reducers';
import networkStatzWSStreamingReducer from './widgets/NetworkInterfacesWidgetWSStreaming/reducers';
import cpuSystemLoadAvgPollingReducer from './widgets/SystemLoadAverageWidgetPolling/reducers';
import cpuSystemLoadAvgWSStreamingReducer from './widgets/SystemLoadAverageWidgetWSStreaming/reducers';
import memoryStatzPollingReducer from './widgets/MemoryStatzWidgetPolling/reducers';
import memoryStatzWSStreamingReducer from './widgets/MemoryStatzWidgetWSStreaming/reducers';

const rootReducer = combineReducers({
  global: mozartReducer,
  networkStatzPolling: networkStatzPollingReducer,
  networkStatzWSStreaming: networkStatzWSStreamingReducer,
  cpuSystemLoadAvgPolling: cpuSystemLoadAvgPollingReducer,
  cpuSystemLoadAvgWSStreaming: cpuSystemLoadAvgWSStreamingReducer,
  memoryStatzPolling: memoryStatzPollingReducer,
  memoryStatzWSStreaming: memoryStatzWSStreamingReducer,
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
