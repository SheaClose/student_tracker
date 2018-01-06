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
      pages: ['Today', 'Weekly', 'Aggregate'],
      check: ''
    };
    this.pageCheck = this.pageCheck.bind(this);
    this.pageChange = this.pageChange.bind(this);
  }
  // create function to render component that's a switch that checks which page is on the state and returns whichever component is selected
  componentDidMount() {
    if (this.props.students.length === 0) {
      this.props.getStudents();
    }
  }

  pageCheck(check) {
    this.setState({ check });
  }

  pageChange(check) {
    const { students } = this.props;
    switch (check) {
    case 'Today':
      return <AttendanceTracker students={students} />;
    case 'Weekly':
      return <WeeklyView students={students} />;
    case 'Aggregate':
      return <AggregateView students={students} />;
    default:
      return <AttendanceTracker students={students} />;
    }
  }

  render() {
    const buttons = this.state.pages.map((page, i) => (
      <button
        key={i}
        onClick={() => {
          this.pageCheck(page);
        }}
      >
        {page}
      </button>
    ));
    const childPage = this.pageChange(this.state.check);
    console.log(buttons);
    return (
      <div className="attendance-main-container">
        <h1>
          Add dropdown with choices + ability to view different cohorts based on
          auth level + only view your cohorts
        </h1>
        <div className="attendance-content">
          <div className="attendance-student-tracker">
            {buttons} {childPage}
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

function mapStateToProps({ students }) {
  return { students };
}

export default connect(mapStateToProps, { getStudents })(Attendance);
