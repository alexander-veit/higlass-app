import React from 'react';

import { Switch, Route } from 'react-router-dom';
import { withRouter } from 'react-router';

// Views
import About from '../../views/About/About';
import Home from '../../views/Home/Home';
import NotFound from '../../views/NotFound/NotFound';

// Components
import ScrollToTop from '../ScrollToTop/ScrollToTop';

const Main = () => (
  <ScrollToTop>
    <Switch>
      <Route exact path='/' component={Home} />
      <Route exact path='/about' component={About} />
      <Route component={NotFound}/>
    </Switch>
  </ScrollToTop>
);

export default withRouter(Main);