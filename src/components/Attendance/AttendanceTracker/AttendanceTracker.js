import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './AttendanceTracker.css';
import AttendanceButtonInput from './AttendanceButtonInput/AttendanceButtonInput';

export default class AttendanceTracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
    };
  }

  render() {
    let disabled = false;
    if (this.props.students.inSession) {
      disabled = true;
    }
    return (
      this.props.students &&
      this.props.students.map((student, i) => (
        <div key={i} className="attendance-tracker-container">
          <AttendanceButtonInput student={student} disabled={disabled} />
        </div>
      ))
    );
  }
}

AttendanceTracker.propTypes = {
  students: PropTypes.array.isRequired
};
