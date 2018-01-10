import React, { Component } from 'react';
import { connect } from 'react-redux';
import DropDownMenu from 'material-ui/DropDownMenu';
import MenuItem from 'material-ui/MenuItem';
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
      check: '',
      cohort: 0,
      default: true
    };
    this.pageCheck = this.pageCheck.bind(this);
    this.pageChange = this.pageChange.bind(this);
    this.cohortChange = this.cohortChange.bind(this);
  }

  pageCheck(check) {
    this.setState({ check });
  }

  pageChange(check) {
    if (!this.props.students[0]) {
      return null;
    }
    const { students } = this.props;
    let cohort = this.state.cohort;
    if (this.props.defaultCohort && this.state.default) {
      this.setState({ default: false });
      for (let i = 0; i < students.length; i++) {
        if (students[i].name === this.props.defaultCohort) {
          cohort = i;
        }
      }
    }
    switch (check) {
    case 'Weekly':
      return <WeeklyView students={students[cohort].classSession} />;
    case 'Aggregate':
      return <AggregateView students={students[cohort].classSession} />;
    default:
      return <AttendanceTracker students={students[cohort].classSession} />;
    }
  }

  cohortChange(cohort) {
    this.setState({ cohort: parseInt(cohort, 10) });
  }

  render() {
    const buttons = (
      <div className="attendance-page-buttons">
        {this.state.pages.map((page, i) => (
          <button
            key={i}
            onClick={() => {
              this.pageCheck(page);
            }}
          >
            {page}
          </button>
        ))}
      </div>
    );
    const childPage = this.pageChange(this.state.check);
    return (
      <div className="attendance-main-container">
        <h1>
          Add dropdown with choices + ability to view different cohorts based on
          auth level + only view your cohorts
        </h1>
        <DropDownMenu value={this.state.cohort}>
          {this.props.students.map((cohort, i) => (
            <MenuItem
              key={i}
              value={i}
              primaryText={cohort.name}
              onClick={() => {
                this.cohortChange(i);
              }}
            />
          ))}
        </DropDownMenu>
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
  students: PropTypes.array.isRequired,
  defaultCohort: PropTypes.string.isRequired
};

function mapStateToProps({ mainReducer }) {
  return {
    students: mainReducer.students,
    defaultCohort: mainReducer.defaultCohort
  };
}

export default connect(mapStateToProps, { getStudents })(Attendance);
