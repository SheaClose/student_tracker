import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { TableRow, TableRowColumn } from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';

import { updateAttendance } from '../../ducks/actions';

class AttendanceDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      student: {}
    };
  }
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
              attendance.morning === null ? '' : attendance.morning.toString()
            }
          />
        </TableRowColumn>
        <TableRowColumn>
          <TextField
            hintText="Not Marked"
            onChange={e =>
              this.props.updateAttendance('break', date, e.target.value, dm_id)
            }
            value={attendance.break === null ? '' : attendance.break.toString()}
          />
        </TableRowColumn>
        <TableRowColumn>
          <TextField
            hintText="Not Marked"
            onChange={e =>
              this.props.updateAttendance('lunch', date, e.target.value, dm_id)
            }
            value={attendance.lunch === null ? '' : attendance.lunch.toString()}
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
              attendance.afternoon === null
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
