import React from 'react';
import Statz from './views/Statz';
import NoMatch from './views/NoMatch';
import MozartHeader from './components/MozartHeader';
import { Switch, Route } from 'react-router-dom';

export const Routes = () => {
  return (
    <div>
      <MozartHeader />
      <Switch>
        <Route exact path="/" component={Statz} />
        <Route component={NoMatch} />
      </Switch>
    </div>
  )
}
