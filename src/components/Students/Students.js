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
      selectedCohortIndex: props.students.findIndex(
        c => c.name === this.props.defaultCohort
      )
    };
  }
  componentDidMount() {
    console.log(this.props);
    this.props.getStudents(
      this.props.selectedCohort || this.props.defaultCohort
    );
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedCohort !== this.props.selectedCohort) {
      this.props.getStudents(nextProps.selectedCohort);
    } else if (nextProps.defaultCohort !== this.props.defaultCohort) {
      this.props.getStudents(nextProps.defaultCohort);
    }
  }

  render() {
    const { students } = this.props;
    const { selectedCohortIndex } = this.state;
    const cohorts = students.map((c, i) => (
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
            <TableRow selectable={true} striped={true} key={i}>
              <TableRowColumn>
                <Link to={`/student/${c.dmId}`}>{c.first_name}</Link>
              </TableRowColumn>
              <TableRowColumn>
                <Link to={`/student/${c.dmId}`}>{c.last_name}</Link>
              </TableRowColumn>
              <TableRowColumn>
                <Link to={`/student/${c.dmId}`}>{c.email}</Link>
              </TableRowColumn>
              <TableRowColumn>
                <Link to={`/student/${c.dmId}`}>{c.status}</Link>
              </TableRowColumn>
            </TableRow>
          </TableBody>
        </Table>
      </div>
    ));
    return cohorts;
  }
}

Students.propTypes = {
  students: PropTypes.array.isRequired,
  defaultCohort: PropTypes.string.isRequired
};

function mapStateToProps({ mainReducer }) {
  return {
    students: mainReducer.students,
    defaultCohort: mainReducer.defaultCohort
  };
}

export default connect(mapStateToProps, { getStudents })(Students);
