import React, { Component } from 'react';
import PropTypes from 'prop-types';

import './AttendanceTracker.css';
import AttendanceButtonInput from './AttendanceButtonInput/AttendanceButtonInput';

export default class AttendanceTracker extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    console.log(this.state);
    return this.props.students.map(student => (
      <div key={student.dmId} className="attendance-tracker-container">
        <AttendanceButtonInput student={student} />
      </div>
    ));
  }
}

AttendanceTracker.propTypes = {
  students: PropTypes.array.isRequired
};
