import React, { Component } from 'react';

import './Attendance.css';
import AttendanceTracker from './AttendanceTracker/AttendanceTracker';
// import { getStudents, getUserInfo } from './ducks/actions';

export default class Attendance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
      today: true,
      aggregate: false,
      weekly: false
    };
  }

  render() {
    return (
      <div className="attendance-main-container">
        <div className="attendance-navbar">
          <button>Today</button>
          <button>Weekly</button>
          <button>Aggregate</button>
        </div>
        <div className="attendance-content">
          <div className="attendance-student-tracker">
            {this.state.today && <AttendanceTracker />}
          </div>
        </div>
      </div>
    );
  }
}
