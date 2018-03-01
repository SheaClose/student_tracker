import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import DatePicker from 'material-ui/DatePicker';

import Table, {
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

import {
  getAttendance,
  updateAttendance,
  submitAttendance,
  clearAttendance
} from '../../ducks/actions';

import AttendanceDetail from './AttendanceDetail';

class Attendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      updatedAttendance: [],
      selected: {},
      date: new Date()
    };
  }

  componentDidMount() {
    const date = this.state.date.toDateString();
    this.props.getAttendance(
      this.props.selectedCohort || this.props.defaultCohort,
      date
    );
  }

  componentWillReceiveProps(nextProps) {
    /* Get attendance for the selectedCohort if it changes */
    const date = this.state.date.toDateString();
    if (nextProps.selectedCohort !== this.props.selectedCohort) {
      this.setState({ updatedAttendance: [] });
      nextProps.getAttendance(nextProps.selectedCohort, date);
      nextProps.clearAttendance();
    } else if (nextProps.defaultCohort !== this.props.defaultCohort) {
      /* defaultCohort isn't guaranteed to have returned from the server on
      componentDidMount, so update to get the defaultCohort data
      if it changes */
      this.setState({ updatedAttendance: [] });
      nextProps.getAttendance(nextProps.defaultCohort, date);
      nextProps.clearAttendance();
    }
  }

  render() {
    const { updatedAttendance = [], attendance = [] } = this.props;
    /* TODO: There's gotta be a better way.
    If we've made any updates to attendance, display those updates.
    If not, display the original attendance from the db.
    */
    const displayedAttendance = updatedAttendance.length
      ? updatedAttendance
      : attendance;

    return (
      <div>
        <DatePicker
          hintText="Choose Date"
          container="inline"
          value={this.state.date}
          onChange={(e, date) => {
            this.setState({ date });
            this.props.getAttendance(
              this.props.selectedCohort || this.props.defaultCohort,
              date
            );
          }}
        />
        <Table selectable={false}>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Student</TableHeaderColumn>
              <TableHeaderColumn>Absent?</TableHeaderColumn>
              <TableHeaderColumn>Morning</TableHeaderColumn>
              <TableHeaderColumn>Break</TableHeaderColumn>
              <TableHeaderColumn>Lunch</TableHeaderColumn>
              <TableHeaderColumn>Afternoon</TableHeaderColumn>
            </TableRow>
            <TableRow>
              <TableHeaderColumn />
              <TableHeaderColumn />
              <TableHeaderColumn>
                <span
                  onClick={() =>
                    this.props.updateAttendance('morning', this.state.date)
                  }
                >
                  Mark All On Time
                </span>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <span
                  onClick={() =>
                    this.props.updateAttendance('break', this.state.date)
                  }
                >
                  Mark All On Time
                </span>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <span
                  onClick={() =>
                    this.props.updateAttendance('lunch', this.state.date)
                  }
                >
                  Mark All On Time
                </span>
              </TableHeaderColumn>
              <TableHeaderColumn>
                <span
                  onClick={() =>
                    this.props.updateAttendance('afternoon', this.state.date)
                  }
                >
                  Mark All On Time
                </span>
              </TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {displayedAttendance.map(student => (
              <AttendanceDetail
                key={student.dm_id}
                date={this.state.date}
                {...student}
              />
            ))}
            {this.props.updatedAttendance.length && (
              <TableRow>
                <TableRowColumn colSpan="5" style={{ textAlign: 'center' }}>
                  <FlatButton onClick={() => this.props.clearAttendance()}>
                    Cancel
                  </FlatButton>
                  <FlatButton
                    onClick={() =>
                      this.props.submitAttendance(
                        this.props.updatedAttendance,
                        this.state.date,
                        this.props.selectedCohort || this.props.defaultCohort
                      )
                    }
                  >
                    Submit
                  </FlatButton>
                </TableRowColumn>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    );
  }
}

Attendance.propTypes = {
  selectedCohort: PropTypes.string,
  defaultCohort: PropTypes.string,
  updatedAttendance: PropTypes.array,
  attendance: PropTypes.array,
  clearAttendance: PropTypes.func,
  getAttendance: PropTypes.func,
  updateAttendance: PropTypes.func,
  submitAttendance: PropTypes.func,
  userInfo: PropTypes.object
};

const mapStateToProps = ({ mainReducer }) => {
  const {
    selectedCohort,
    defaultCohort,
    attendance,
    updatedAttendance,
    userInfo
  } = mainReducer;
  return {
    selectedCohort,
    defaultCohort,
    updatedAttendance,
    attendance,
    userInfo
  };
};

export default connect(mapStateToProps, {
  getAttendance,
  updateAttendance,
  submitAttendance,
  clearAttendance
})(Attendance);
