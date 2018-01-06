import React, { Component } from 'react';
import {
  Table,
  TableBody,
  TableFooter,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import TextField from 'material-ui/TextField';
import Toggle from 'material-ui/Toggle';
import { connect } from 'react-redux';

const Overview = props => (
  <Table>
    <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
      <TableRow>
        <TableHeaderColumn>Student</TableHeaderColumn>
        <TableHeaderColumn>Projects</TableHeaderColumn>
        <TableHeaderColumn>Attendance</TableHeaderColumn>
        <TableHeaderColumn>One-on-Ones</TableHeaderColumn>
      </TableRow>
    </TableHeader>
    <TableBody displayRowCheckbox={false}>
      {props.students.map(student => (
        <TableRow key={student.dmId}>
          <TableRowColumn>
            {student.first_name} {student.last_name}
          </TableRowColumn>
        </TableRow>
      ))}
    </TableBody>
  </Table>
);

// export default connect(state => state)(Overview);
export default Overview;
