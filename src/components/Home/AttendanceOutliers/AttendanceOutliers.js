import React from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

const AttendanceOutliers = props => {
  const { outliers = { attendance: [] } } = props;
  const { attendance } = outliers;

  return (
    <Table>
      <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
        <TableRow>
          <TableHeaderColumn colSpan="3" style={{ textAlign: 'center' }}>
            Attendance
          </TableHeaderColumn>
        </TableRow>
        <TableRow>
          <TableHeaderColumn>Student</TableHeaderColumn>
          <TableHeaderColumn>Tardies</TableHeaderColumn>
          <TableHeaderColumn>Absences</TableHeaderColumn>
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {attendance.map(student => (
          <TableRow key={student.name}>
            <TableRowColumn>{student.name}</TableRowColumn>
            <TableRowColumn>
              <div>
                {student.tardies.length} (
                {student.tardies.reduce(
                  (acc, tardy) => +acc + +tardy.minutes,
                  0
                )}
                min total)
              </div>
              <div>
                {student.tardies.map(
                  tardy => `${new Date(tardy.date).toDateString()}, `
                )}
              </div>
            </TableRowColumn>
            <TableRowColumn>
              <div>{student.absences.length}</div>
              {student.absences.map(
                absence => `${new Date(absence.date).toDateString()}, `
              )}
            </TableRowColumn>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

AttendanceOutliers.propTypes = {
  outliers: PropTypes.object
};

const mapStateToProps = state => ({
  outliers: state.outliers
});

export default connect(mapStateToProps)(AttendanceOutliers);
