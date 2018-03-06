import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';

import DefaultCohortButton from '../Utils/DefaultCohortButton';
import DropStudent from './DropStudent/DropStudent';

import './User.css';

const button_style = {
  display: 'block',
  margin: '5vh'
};

class User extends Component {
  render() {
    return (
      <div className="user_container">
        <div className="user_card_container">
          <Paper className="paper">
            <DefaultCohortButton className="user_button" />
            {/* DropStudent doesn't work anymore, not sure why */}
            <DropStudent className="user_button" />
            <RaisedButton
              style={button_style}
              className="user_button"
              onClick={this.handleClick}
              label={'Defer Student'}
            />
            <RaisedButton
              style={button_style}
              className="user_button"
              onClick={this.handleClick}
              label={'Deactivate Class'}
            />
            <RaisedButton
              style={button_style}
              className="user_button"
              onClick={this.handleClick}
              label={'Shuffle Seating'}
            />
          </Paper>
        </div>
      </div>
    );
  }
}

export default User;
