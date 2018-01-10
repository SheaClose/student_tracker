import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Paper from 'material-ui/Paper';
import DefaultCohortButton from '../Utils/DefaultCohortButton';
import './User.css';

const button_style = {
  display: 'block',
  margin: '5vh'
};

class User extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  handleClick(event) {
    // This prevents ghost click.
    event.preventDefault();
  }
  render() {
    return (
      <div className="user_container">
        <div className="user_card_container">
          <Paper className="paper">
            <DefaultCohortButton className="user_button" />
            <RaisedButton
              style={button_style}
              className="user_button"
              onClick={this.handleClick}
              label={'Drop Student'}
            />
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
