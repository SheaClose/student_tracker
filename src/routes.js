import React from 'react';
import { Switch, Route } from 'react-router-dom';
import AddOneOnOne from './components/OneOnOnes/AddOneOnOne';

export default (
  <Switch>
    <Route exact path="/" component={() => null} />
    <Route path="/examplepath" component={() => null} />
    <Route path="/oneonones" component={AddOneOnOne} />
  </Switch>
);
