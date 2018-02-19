import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import List, { ListItem } from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Table, {
  TableHeader,
  TableHeaderColumn,
  TableBody,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import Divider from 'material-ui/Divider';

import { getAttendance } from '../../ducks/actions';

import { MasterDetail, Master, Detail } from '../Utils/MasterDetail';

class Attendance extends Component {
  constructor(props) {
    super(props);
    this.state = {
      attendance: [],
      selected: {}
    };
  }

  componentDidMount() {
    this.props.getAttendance(
      this.props.selectedCohort || this.props.defaultCohort
    );
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedCohort !== this.props.selectedCohort) {
      nextProps.getAttendance(nextProps.selectedCohort);
    } else if (nextProps.defaultCohort !== this.props.defaultCohort) {
      nextProps.getAttendance(nextProps.defaultCohort);
    }
  }

  allOnTime(timeframe) {
    this.setState({ [timeframe]: true });
  }

  render() {
    const { selected } = this.state;
    const cohortName = this.props.selectedCohort || this.props.defaultCohort;
    const overview = {
      cohort_id: cohortName,
      first_name: cohortName,
      last_name: '',
      overview: 'Overview'
    };
    const list = [overview, ...this.props.attendance];
    const style = {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center'
    };
    const renderStudents = student => (
      <React.Fragment key={student.dm_id || student.cohort_id}>
        <ListItem
          onClick={() => this.setState({ selected: student })}
          primaryText={`${student.first_name} ${student.last_name}`}
          secondaryText={student.overview}
        />
        <Divider />
      </React.Fragment>
    );

    return (
      <MasterDetail>
        <Master list={list} renderMethod={renderStudents} />
        <Detail title={selected.name}>
          <Table>
            <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
              <TableRow>
                <TableHeaderColumn>Student</TableHeaderColumn>
                <TableHeaderColumn>Morning</TableHeaderColumn>
                <TableHeaderColumn>Break</TableHeaderColumn>
                <TableHeaderColumn>Lunch</TableHeaderColumn>
                <TableHeaderColumn>Afternoon</TableHeaderColumn>
              </TableRow>
              <TableRow>
                <TableHeaderColumn />
                <TableHeaderColumn>
                  <span onClick={() => this.allOnTime('morning')}>
                    Mark All On Time
                  </span>
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <span onClick={() => this.allOnTime('break')}>
                    Mark All On Time
                  </span>
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <span onClick={() => this.allOnTime('lunch')}>
                    Mark All On Time
                  </span>
                </TableHeaderColumn>
                <TableHeaderColumn>
                  <span onClick={() => this.allOnTime('afternoon')}>
                    Mark All On Time
                  </span>
                </TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false}>
              {this.props.attendance.map(student => (
                <TableRow>
                  <TableRowColumn>
                    {`${student.first_name} ${student.last_name}`}
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      style={{ maxWidth: '25px' }}
                      hintText="Not Marked"
                      value={
                        this.state.morning
                          ? 0
                          : student.attendance.length
                            ? student.attendance[0].morning
                            : null
                      }
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Not Marked"
                      value={
                        this.state.break
                          ? 0
                          : student.attendance.length
                            ? student.attendance[0].break
                            : null
                      }
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Not Marked"
                      value={
                        this.state.lunch
                          ? 0
                          : student.attendance.length
                            ? student.attendance[0].lunch
                            : null
                      }
                    />
                  </TableRowColumn>
                  <TableRowColumn>
                    <TextField
                      hintText="Not Marked"
                      value={
                        this.state.afternoon
                          ? 0
                          : student.attendance.length
                            ? student.attendance[0].afternoon
                            : null
                      }
                    />
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* this.state.attendance.map(student => (
            <div
              key={student.dm_id}
              style={{
                display: 'flex',
                flexDirection: 'row'
              }}
            >
              <div style={{ width: '30%' }}>{student.name}</div>
              {student.attendance.map(stamp => (
                <div key={stamp.id} style={{ width: '30%' }}>
                  {stamp.timeframe + stamp.minutes}
                </div>
              ))}
            </div>
          )) */}
        </Detail>
      </MasterDetail>
    );
  }
}

Attendance.propTypes = {
  selectedCohort: PropTypes.string,
  defaultCohort: PropTypes.string,
  attendance: PropTypes.array,
  getAttendance: PropTypes.func
};

const mapStateToProps = ({ mainReducer }) => {
  const { selectedCohort, defaultCohort, attendance } = mainReducer;
  return {
    selectedCohort,
    defaultCohort,
    attendance
  };
};

export default connect(mapStateToProps, { getAttendance })(Attendance);
