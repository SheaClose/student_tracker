import React from 'react';
import { Switch, Route } from 'react-router-dom';

export default (
  <Switch>
    <Route exact path="/" component={() => null} />
    <Route path="/examplepath" component={() => null} />
  </Switch>
);
