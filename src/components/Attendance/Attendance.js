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
      cohort: 0
    };
    this.pageCheck = this.pageCheck.bind(this);
    this.pageChange = this.pageChange.bind(this);
    this.cohortChange = this.cohortChange.bind(this);
  }
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
    case 'Weekly':
      return <WeeklyView students={students} cohort={this.state.cohort} />;
    case 'Aggregate':
      return <AggregateView students={students} cohort={this.state.cohort} />;
    default:
      return (
        <AttendanceTracker students={students} cohort={this.state.cohort} />
      );
    }
  }

  cohortChange(cohort) {
    this.setState({ cohort });
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
    return (
      <div className="attendance-main-container">
        <h1>
          Add dropdown with choices + ability to view different cohorts based on
          auth level + only view your cohorts
        </h1>
        <DropDownMenu
          value={this.state.cohort}
          onChange={e => {
            console.log('someone help mackenzie figure out dropdowns :-)');
            this.cohortChange(this.state.cohort);
          }}
        >
          {this.props.students.map((cohort, i) => (
            <MenuItem key={i} value={i} primaryText={cohort.name} />
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
  getStudents: PropTypes.func.isRequired,
  students: PropTypes.array.isRequired
};

export default connect(
  state => ({
    students: state.students
  }),
  { getStudents }
)(Attendance);
