import React, { Component } from 'react';
import axios from 'axios';

import './Attendance.css';
import AttendanceTracker from './AttendanceTracker/AttendanceTracker';
import WeeklyView from './WeeklyView/WeeklyView';
import AggregateView from './AggregateView/AggregateView';

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

  componentDidMount() {
    axios.get('/api/students/').then(response => {
      this.setState({ students: response.data[0].classSession });
    });
  }

  render() {
    return (
      <div className="attendance-main-container">
        <div className="attendance-navbar">
          <button
            onClick={() =>
              this.setState({ today: true, aggregate: false, weekly: false })
            }
          >
            Today
          </button>
          <button
            onClick={() =>
              this.setState({ today: false, aggregate: false, weekly: true })
            }
          >
            Weekly
          </button>
          <button
            onClick={() =>
              this.setState({ today: false, aggregate: true, weekly: false })
            }
          >
            Aggregate
          </button>
        </div>
        <div className="attendance-content">
          <div className="attendance-student-tracker">
            {this.state.today && <AttendanceTracker students={this.state.students} />}
            {this.state.weekly && <WeeklyView students={this.state.students} />}
            {this.state.aggregate && <AggregateView students={this.state.students} />}
          </div>
        </div>
      </div>
    );
  }
}
