import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../AttendanceTracker.css';

export default class AttendanceButtonInput extends Component {
  constructor(props) {
    super(props);

    this.state = {
      submit: false,
      time: '',
      minutes: 0
    };

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(t) {
    if (this.state.time) {
      this.setState({ time: '', submit: false });
    } else {
      this.setState({ time: t, submit: true });
    }
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
    return (
      <div className="attendance-tracker-container">
        <div>
          {this.props.student.first_name} {this.props.student.last_name}
        </div>
        <div className="attendance-button-container">
          <button
            onClick={() => {
              this.handleChange('Morning', this.props.student.dmId);
            }}
          >
            {!this.state.submit && !this.state.time
              ? 'Morning'
              : this.state.submit && this.state.time === 'Morning'
                ? 'Submit'
                : 'Morning'}
          </button>
          {this.state.submit &&
            this.state.time === 'Morning' && (
              <input
                placeholder="Minutes"
                onChange={e => {
                  this.setState({ minutes: e.target.value });
                }}
              />
            )}
          <button
            onClick={() => {
              this.handleChange('Break', this.props.student.dmId);
            }}
          >
            {!this.state.submit && !this.state.time
              ? 'Break'
              : this.state.submit && this.state.time === 'Break'
                ? 'Submit'
                : 'Break'}
          </button>
          {this.state.submit &&
            this.state.time === 'Break' && (
              <input
                placeholder="Minutes"
                onChange={e => {
                  this.setState({ minutes: e.target.value });
                }}
              />
            )}
          <button
            onClick={() => {
              this.handleChange('Lunch', this.props.student.dmId);
            }}
          >
            {!this.state.submit && !this.state.time
              ? 'Lunch'
              : this.state.submit && this.state.time === 'Lunch'
                ? 'Submit'
                : 'Lunch'}
          </button>
          {this.state.submit && this.state.time === 'Lunch' && input}
          <button
            onClick={() => {
              this.handleChange('Left Early', this.props.student.dmId);
            }}
          >
            {!this.state.submit && !this.state.time
              ? 'Left Early'
              : this.state.submit && this.state.time === 'Left Early'
                ? 'Submit'
                : 'Left Early'}
          </button>
          {this.state.submit && this.state.time === 'Left Early' && input}
        </div>
      </div>
    );
  }
}

AttendanceButtonInput.propTypes = {
  student: PropTypes.object.isRequired
};
