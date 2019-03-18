import React from 'react';
import { Switch, Route } from 'react-router-dom';
import StatzGrid from './views/StatzGrid';
import NoMatch from './views/NoMatch';
import MozartHeader from './components/MozartHeader';

const Routes = () => (
  <div>
    <MozartHeader />
    <Switch>
      <Route exact path="/" component={StatzGrid} />
      <Route component={NoMatch} />
    </Switch>
  </div>
);

export default Routes;
