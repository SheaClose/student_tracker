import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Attendance from './components/Attendance/Attendance';
import Home from './components/Home/Home';
import Projects from './components/Projects/Projects';
import Students from './components/Students/Students';
import Student from './components/Students/Student/Student';
import OneOnOnes from './components/OneOnOnes/OneOnOnes';

import User from './components/User/User';

export default (
  <Switch>
    <Route exact path="/" component={Home} />
    <Route path="/attendance" component={Attendance} />
    <Route path="/projects" component={Projects} />
    <Route path="/students" component={Students} />
    <Route path="/student/:id" component={Student} />
    <Route path="/user" component={User} />
    <Route path="/oneonones" component={OneOnOnes} />
    <Route path="*" component={() => <div> Error 404: Page not found! </div>} />
  </Switch>
);
