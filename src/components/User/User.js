import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover/Popover';
import { Menu, MenuItem } from 'material-ui/Menu';
import Snackbar from 'material-ui/Snackbar';

import DefaultCohortButton from '../Utils/DefaultCohortButton';
import './User.css';

class User extends Component {
  handleClick(event) {
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  }
  render() {
    return (
      <div className="user_container">
        <div className="user_card_container">
          <div>
            <DefaultCohortButton className="user_button" />
            <RaisedButton
              className="user_button"
              onClick={this.handleClick}
              label={'Select default cohort'}
            />
            <RaisedButton
              className="user_button"
              onClick={this.handleClick}
              label={'Select default cohort'}
            />
            <RaisedButton
              className="user_button"
              onClick={this.handleClick}
              label={'Select default cohort'}
            />
          </div>
        </div>
      </div>
    );
  }
}
export default User;
