import React, { Component } from 'react';
import Paper from 'material-ui/Paper';

import DefaultCohortButton from '../Utils/DefaultCohortButton';
import './User.css';

class User extends Component {
  render() {
    return (
      <div className="user_container">
        <Paper className="user_card_container" zDepth={1}>
          <div>
            <DefaultCohortButton />
            <DefaultCohortButton />
            <DefaultCohortButton />
            <DefaultCohortButton />
            <DefaultCohortButton />
          </div>
        </Paper>
      </div>
    );
  }
}
export default User;
