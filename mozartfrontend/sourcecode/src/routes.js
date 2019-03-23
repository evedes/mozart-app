import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StatzGrid from './views/StatzGrid';
import NoMatch from './views/NoMatch';
import MozartHeader from './components/MozartHeader';

const Routes = () => (
  <>
    <MozartHeader />
    <Router>
      <Switch>
        <Route exact path="/" component={StatzGrid} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  </>
);

export default Routes;
