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
import { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { Tabs, Tab } from 'material-ui/Tabs';
import { getStudents } from '../../ducks/actions';
import './Students.css';
import { MasterDetail, Master, Detail } from '../Utils/MasterDetail';

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

    const renderStudents = student => (
      <React.Fragment key={student.dm_id}>
        <ListItem
          onClick={() => this.setState({ selectedStudent: student })}
          primaryText={`${student.first_name} ${student.last_name}`}
          secondaryText={<p>{student.email}</p>}
        />
        <Divider />
      </React.Fragment>
    );

    return (
      <MasterDetail>
        <Master list={students} renderMethod={renderStudents} />
      </MasterDetail>
    );
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
