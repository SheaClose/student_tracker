import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
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
      open: false
    };
    this.toggleDialog = this.toggleDialog.bind(this);
    this.actions = [
      <FlatButton label="Cancel" primary={true} onClick={this.toggleDialog} />
    ];
  }

  toggleDialog() {
    this.setState(prev => ({
      open: !prev.open
    }));
  }

  render() {
    const students = this.props.students.find(
      session =>
        session.name === (this.props.selectedCohort || this.props.defaultCohort)
    ) || { classSession: [] };
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
            {students.classSession.map(student => (
              <TableRow key={student.dmId}>
                <TableRowColumn>
                  <IconButton onClick={this.toggleDialog}>
                    <AddCircleOutline />
                  </IconButton>
                  {student.first_name}
                </TableRowColumn>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <Dialog
          title="Add One on One"
          open={this.state.open}
          actions={this.actions}
        >
          <AddOneOnOne />
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

const mapStateToProps = ({ mainReducer }) => ({
  students: mainReducer.students,
  defaultCohort: mainReducer.defaultCohort,
  selectedCohort: mainReducer.selectedCohort
});

export default connect(mapStateToProps, { getOneOnOnes })(OneOnOnes);
