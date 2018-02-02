import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import { IconButton } from 'material-ui';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import SelectCohort from '../Utils/SelectCohort';
import AddOneOnOne from '../Utils/AddOneOnOne';
import { getOneOnOnes } from '../../ducks/actions';

class OneOnOnes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      student: {}
    };
    this.toggleDialog = this.toggleDialog.bind(this);
    this.actions = [
      <FlatButton label="Cancel" primary={false} onClick={this.toggleDialog} />,
      <FlatButton label="Submit" primary={true} onClick={this.handleSubmit} />
    ];
  }

  componentDidMount() {
    this.props.getOneOnOnes(
      this.props.selectedCohort || this.props.defaultCohort
    );
  }

  toggleDialog(student = {}) {
    this.setState(prev => ({
      open: !prev.open,
      student
    }));
  }

  render() {
    const { oneOnOnes = [] } = this.props;

    // const students = this.props.students.find(
    //   session =>
    //     session.name === (this.props.selectedCohort || this.props.defaultCohort)
    // ) || { classSession: [] };
    console.log(oneOnOnes);
    return (
      <div>
        <SelectCohort update={this.props.getOneOnOnes} />
        <Table>
          <TableHeader adjustForCheckbox={false} displaySelectAll={false}>
            <TableRow>
              <TableHeaderColumn>Name</TableHeaderColumn>
              <TableHeaderColumn>Latest One-on-One</TableHeaderColumn>
              <TableHeaderColumn>Skill</TableHeaderColumn>
              <TableHeaderColumn>Confidence</TableHeaderColumn>
            </TableRow>
          </TableHeader>
          <TableBody displayRowCheckbox={false}>
            {oneOnOnes.map(student => (
              <TableRow rowNumber={student.dm_id} key={student.dm_id}>
                <TableRowColumn>
                  <IconButton onClick={() => this.toggleDialog(student)}>
                    <AddCircleOutline />
                  </IconButton>
                  <Link to={`/student/${student.dm_id}`}>
                    {student.first_name}
                  </Link>
                </TableRowColumn>
                <TableRowColumn>
                  {student.date
                    ? new Date(student.date).toDateString()
                    : 'No Data Found'}
                </TableRowColumn>
                <TableRowColumn>{student.skill}</TableRowColumn>
                <TableRowColumn>{student.confidence_skill}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {/* <Dialog
          title={`Add One on One for ${this.state.name}`}
          open={this.state.open}
          actions={this.actions}
        > */}
        <AddOneOnOne
          toggleDialog={this.toggleDialog}
          open={this.state.open}
          student={this.state.student}
        />
        {/* </Dialog> */}
      </div>
    );
  }
}

OneOnOnes.propTypes = {
  students: PropTypes.array,
  selectedCohort: PropTypes.string,
  defaultCohort: PropTypes.string
};

const mapStateToProps = ({ mainReducer }) => {
  const { students, defaultCohort, selectedCohort, oneOnOnes } = mainReducer;
  return {
    students,
    defaultCohort,
    selectedCohort,
    oneOnOnes
  };
};

export default connect(mapStateToProps, { getOneOnOnes })(OneOnOnes);
