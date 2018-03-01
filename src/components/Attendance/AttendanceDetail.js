import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

import { updateAttendance } from '../../ducks/actions';

class AttendanceDetail extends Component {
  render() {
    const { dm_id, first_name, last_name, date, attendance = {} } = this.props;
    return (
      <TableRow key={dm_id}>
        <TableRowColumn>{`${first_name} ${last_name}`}</TableRowColumn>
        <TableRowColumn>
          <Checkbox
            checked={Boolean(attendance.absent)}
            onCheck={(e, checked) =>
              this.props.updateAttendance('absent', date, checked, dm_id)
            }
          />
        </TableRowColumn>
        <TableRowColumn>
          <TextField
            hintText="Not Marked"
            onChange={e =>
              this.props.updateAttendance(
                'morning',
                date,
                e.target.value,
                dm_id
              )
            }
            value={
              /* This can be:
              - undefined if there's no attendance data in the
                db for this student on this day
              - null if there's attendance data in the db for
              this student on this day, but not this timeframe
              But you can't just check for a falsy value, because
              it can also be 0 if they were on time.
              Also, TextField requires the value to be a string.
              */
              attendance.morning === null || attendance.morning === undefined
                ? ''
                : attendance.morning.toString()
            }
          />
        </TableRowColumn>
        <TableRowColumn>
          <TextField
            hintText="Not Marked"
            onChange={e =>
              this.props.updateAttendance('break', date, e.target.value, dm_id)
            }
            value={
              attendance.break === null || attendance.break === undefined
                ? ''
                : attendance.break.toString()
            }
          />
        </TableRowColumn>
        <TableRowColumn>
          <TextField
            hintText="Not Marked"
            onChange={e =>
              this.props.updateAttendance('lunch', date, e.target.value, dm_id)
            }
            value={
              attendance.lunch === null || attendance.lunch === undefined
                ? ''
                : attendance.lunch.toString()
            }
          />
        </TableRowColumn>
        <TableRowColumn>
          <TextField
            hintText="Not Marked"
            onChange={e =>
              this.props.updateAttendance(
                'afternoon',
                date,
                e.target.value,
                dm_id
              )
            }
            value={
              attendance.afternoon === null ||
              attendance.afternoon === undefined
                ? ''
                : attendance.afternoon.toString()
            }
          />
        </TableRowColumn>
      </TableRow>
    );
  }
}

AttendanceDetail.propTypes = {
  // attendance is from props, not redux
  attendance: PropTypes.object,
  dm_id: PropTypes.number,
  first_name: PropTypes.string,
  last_name: PropTypes.string,
  updateAttendance: PropTypes.func,
  date: PropTypes.object
};

const mapStateToProps = ({ mainReducer }) => {
  const { updatedAttendance = [] } = mainReducer;
  return {
    updatedAttendance
  };
};

export default connect(mapStateToProps, { updateAttendance })(AttendanceDetail);
