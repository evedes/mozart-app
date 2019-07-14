import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import StatzGrid from './views/StatzGrid';
import About from './views/About';
import NoMatch from './views/NoMatch';
import MozartHeader from './components/MozartHeader';

const Routes = () => (
  <>
    <MozartHeader />
    <Router>
      <Switch>
        <Route exact path="/" component={StatzGrid} />
        <Route exact path="/about" component={About} />
        <Route component={NoMatch} />
      </Switch>
    </Router>
  </>
);

export default Routes;
