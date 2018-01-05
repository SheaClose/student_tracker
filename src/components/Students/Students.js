import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import { Tabs, Tab } from 'material-ui/Tabs';
import { getStudents } from '../../ducks/actions';
import './Students.css';

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      indexOfDefaultCohort: 0
    };
  }
  componentDidMount() {
    if (!this.props.students.length) {
      this.props.getStudents();
    }
  }

  render() {
    const { students } = this.props;
    const { indexOfDefaultCohort } = this.state;
    const cohorts = [...students].map((c, i) => (
      <Tab value={indexOfDefaultCohort} label={c.name} key={c.name}>
        <div className="cohort_card">
          <h2 style={{ textAlign: 'center' }}>{c.name}</h2>
          <Table>
            <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
              <TableRow>
                <TableHeaderColumn>First Name</TableHeaderColumn>
                <TableHeaderColumn>Last Name</TableHeaderColumn>
                <TableHeaderColumn>Email</TableHeaderColumn>
                <TableHeaderColumn>Status</TableHeaderColumn>
              </TableRow>
            </TableHeader>
            <TableBody displayRowCheckbox={false} stripedRows={true}>
              {c.classSession.map((cur, i) => (
                <TableRow selectable={true} striped={true} key={i}>
                  <TableRowColumn>
                    <Link to={`/student/${cur.dmId}`}>{cur.first_name}</Link>
                  </TableRowColumn>
                  <TableRowColumn>
                    <Link to={`/student/${cur.dmId}`}>{cur.last_name}</Link>
                  </TableRowColumn>
                  <TableRowColumn>
                    <Link to={`/student/${cur.dmId}`}>{cur.email}</Link>
                  </TableRowColumn>
                  <TableRowColumn>
                    <Link to={`/student/${cur.dmId}`}>{cur.status}</Link>
                  </TableRowColumn>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </Tab>
    ));
    return (
      <Tabs value={this.props.defaultCohort} className="students">
        {cohorts}
      </Tabs>
    );
  }
}

Students.propTypes = {
  getStudents: PropTypes.func.isRequired,
  students: PropTypes.array.isRequired,
  defaultCohort: PropTypes.string.isRequired
};

export default connect(
  state => ({
    students: state.students,
    defaultCohort: state.defaultCohort
  }),
  { getStudents }
)(Students);
