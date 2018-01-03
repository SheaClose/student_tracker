import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getStudents } from '../../ducks/actions';

import './Attendance.css';
import AttendanceTracker from './AttendanceTracker/AttendanceTracker';
import WeeklyView from './WeeklyView/WeeklyView';
import AggregateView from './AggregateView/AggregateView';

class Attendance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      today: true,
      aggregate: false,
      weekly: false
    };
  }
  // create function to render component that's a switch that checks which page is on the state and returns whichever component is selected
  componentDidMount() {
    if (this.props.students.length === 0) {
      this.props.getStudents();
    }
  }

  render() {
    const { students } = this.props;
    console.log(this.props);
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
        <h1>
          Add dropdown with choices + ability to view different cohorts based on
          auth level + only view your cohorts
        </h1>
        <div className="attendance-content">
          <div className="attendance-student-tracker">
            {this.state.today && <AttendanceTracker students={students} />}
            {this.state.weekly && <WeeklyView students={students} />}
            {this.state.aggregate && <AggregateView students={students} />}
          </div>
        </div>
      </div>
    );
  }
}

Attendance.propTypes = {
  getStudents: PropTypes.func.isRequired,
  students: PropTypes.array.isRequired
};

export default connect(
  state => ({
    students: state.students
  }),
  { getStudents }
)(Attendance);
