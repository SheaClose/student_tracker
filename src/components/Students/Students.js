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
import './Students.css';

class Students extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedCohortIndex: props.students.findIndex(
        cohort => cohort.name === this.props.defaultCohort
      )
    };
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.students.length !== this.props.students.length) {
      const selectedCohortIndex = nextProps.students.findIndex(
        c => c.name === this.props.defaultCohort
      );
      this.setState({ selectedCohortIndex });
    }
    if (nextProps.selectedCohort) {
      this.setState({
        selectedCohortIndex: nextProps.students.findIndex(
          cohort => cohort.name === nextProps.selectedCohort
        )
      });
    }
  }

  render() {
    const { students } = this.props;
    const cohort = students[this.state.selectedCohortIndex];
    const selectedCohort = cohort && (
      <div className="cohort_card">
        <h2 style={{ textAlign: 'center' }}>{cohort.name}</h2>
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
            {cohort.classSession.map((cur, i) => (
              <TableRow selectable={true} striped={true} key={i}>
                <TableRowColumn>
                  <Link to={`/student/${cur.dmId}`}>{cur.first_name}</Link>
                </TableRowColumn>
                <TableRowColumn>
                  <Link to={`/student/${cur.dmId}`}>{cur.last_name}</Link>
                </TableRowColumn>
                <TableRowColumn>
                  <a href={`mailto:${cur.email}`}>{cur.email}</a>
                </TableRowColumn>
                <TableRowColumn>
                  <Link to={`/student/${cur.dmId}`}>{cur.status}</Link>
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
    return <div className="">{selectedCohort}</div>;
  }
}

Students.propTypes = {
  students: PropTypes.array.isRequired,
  defaultCohort: PropTypes.string.isRequired,
  selectedCohort: PropTypes.string
};

function mapStateToProps({ mainReducer }) {
  return {
    students: mainReducer.students,
    defaultCohort: mainReducer.defaultCohort,
    selectedCohort: mainReducer.selectedCohort
  };
}

export default connect(mapStateToProps)(Students);
