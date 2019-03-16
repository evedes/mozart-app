import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Statz from './views/Statz';
import NoMatch from './views/NoMatch';
import MozartHeader from './components/MozartHeader';

const Routes = () => (
  <div>
    <MozartHeader />
    <Switch>
      <Route exact path="/" component={Statz} />
      <Route component={NoMatch} />
    </Switch>
  </div>
);

export default Routes;
