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
      name: '',
      dm_id: ''
    };
    this.toggleDialog = this.toggleDialog.bind(this);
    this.actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.toggleDialog} />
    ];
  }

  componentDidMount() {
    this.props.getOneOnOnes(
      this.props.selectedCohort || this.props.defaultCohort
    );
  }

  toggleDialog(dm_id, name) {
    this.setState(prev => ({
      open: !prev.open,
      dm_id,
      name
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
        <Table onCellClick={console.log}>
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
                  <IconButton
                    onClick={() =>
                      this.toggleDialog(student.dm_id, student.first_name)
                    }
                  >
                    <AddCircleOutline />
                  </IconButton>
                  <Link to={`/student/${student.dm_id}`}>
                    {student.first_name}
                  </Link>
                </TableRowColumn>
                <TableRowColumn>
                  {new Date(student.date).toDateString()}
                </TableRowColumn>
                <TableRowColumn>{student.skill}</TableRowColumn>
                <TableRowColumn>{student.confidence_skill}</TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog
          title={`Add One on One for ${this.state.name}`}
          open={this.state.open}
          actions={this.actions}
        >
          <AddOneOnOne student={this.state.dm_id} />
        </Dialog>
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
