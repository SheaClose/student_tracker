import React, { Component } from 'react';
import PropTypes from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

import '../AttendanceTracker.css';

export default class AttendanceButtonInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submit: false,
      time: '',
      minutes: 0,
      timePeriods: ['Morning', 'Break', 'Lunch', 'Left Early']
    };

    this.handleSubmitToggle = this.handleSubmitToggle.bind(this);
    this.renderButtonText = this.renderButtonText.bind(this);
  }

  handleSubmitToggle(time) {
    if (this.state.time) {
      this.setState({ time: '', submit: false });
    } else {
      this.setState({ time, submit: true });
    }
  }

  renderButtonText(str) {
    if (this.state.submit && this.state.time === str) return 'Submit';
    return str;
  }

  renderInputField(str) {
    const { time, submit } = this.state;
    if (submit && time === str) {
      return (
        <TextField
          style={{ height: 33, width: 80 }}
          hintText="Minutes"
          onChange={e => {
            this.setState({ minutes: e.target.value });
          }}
        />
      );
    }
    return null;
  }

  render() {
    const buttons = this.state.timePeriods.map((period, i) => (
      <span key={i}>
        <FlatButton
          secondary={true}
          onClick={() => {
            this.handleSubmitToggle(period, this.props.student.dmId);
          }}
        >
          {this.renderButtonText(period)}
        </FlatButton>
        {this.renderInputField(period)}
      </span>
    ));
    return (
      <div className="attendance-tracker-container">
        <div>
          {this.props.student.first_name} {this.props.student.last_name}
        </div>
        <div className="attendance-button-container">
          {buttons}
          <FlatButton secondary={true}>ABSENT</FlatButton>
          <FlatButton primary={true}>Excused </FlatButton>
        </div>
      </div>
    );
  }
}

AttendanceButtonInput.propTypes = {
  student: PropTypes.object.isRequired
};
