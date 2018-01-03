import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
        <input
          placeholder="Minutes"
          onChange={e => {
            this.setState({ minutes: e.target.value });
          }}
        />
      );
    }
    return null;
  }

  render() {
    const input = (
      <input
        placeholder="Minutes"
        onChange={e => {
          this.setState({ minutes: e.target.value });
        }}
      />
    );
    const buttons = this.state.timePeriods.map((period, i) => (
      <span key={i}>
        <button
          onClick={() => {
            this.handleSubmitToggle(period, this.props.student.dmId);
          }}
        >
          {this.renderButtonText(period)}
        </button>
        {this.renderInputField(period)}
      </span>
    ));
    return (
      <div className="attendance-tracker-container">
        <div>
          {this.props.student.first_name} {this.props.student.last_name}
        </div>
        <div className="attendance-button-container">{buttons}</div>
      </div>
    );
  }
}

AttendanceButtonInput.propTypes = {
  student: PropTypes.object.isRequired
};
