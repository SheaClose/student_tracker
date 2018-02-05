import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import { Link } from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import { IconButton } from 'material-ui';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import SelectCohort from '../Utils/SelectCohort';
import AddOneOnOne from '../Utils/AddOneOnOne';
import { getOneOnOnes } from '../../ducks/actions';
import { Table, TableBody, TableRow, TableRowColumn } from 'material-ui/Table';
import { Card, CardHeader, CardText } from 'material-ui/Card';
import Paper from 'material-ui/Paper';

class OneOnOnes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      addStudent: {},
      viewStudent: {}
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

  toggleDialog(addStudent = {}) {
    this.setState(prev => ({
      open: !prev.open,
      addStudent
    }));
  }

  render() {
    const { oneOnOnes = [] } = this.props;
    return (
      <Paper>
        <div style={{ display: 'flex', flexDirection: 'row' }}>
          {/* <SelectCohort update={this.props.getOneOnOnes} /> */}

          <List>
            {/* <IconButton onClick={() => this.toggleDialog(student)}>
                    <AddCircleOutline />
                  </IconButton>
                  <Link to={`/student/${student.dm_id}`}>
                    {`${student.first_name} ${student.last_name}`}
                  </Link> */}
            {/* </TableRowColumn>
                <TableRowColumn>
                  {student.date
                    ? new Date(student.date).toDateString()
                    : 'No Data Found'}
                </TableRowColumn>
                <TableRowColumn>{student.skill}</TableRowColumn>
                <TableRowColumn>{student.confidence_skill}</TableRowColumn>
              </TableRow> */}
            {oneOnOnes.map(student => (
              <React.Fragment key={student.dm_id}>
                <ListItem
                  leftIcon={
                    <AddCircleOutline
                      onClick={e => {
                        e.stopPropagation();
                        this.toggleDialog(student);
                      }}
                    />
                  }
                  onClick={() => this.setState({ viewStudent: student })}
                  primaryText={`${student.first_name} ${student.last_name} (${
                    student.date
                      ? new Date(student.date).toDateString()
                      : 'No Data'
                  })`}
                  secondaryText={<p>{student.notes}</p>}
                />
                <Divider />
              </React.Fragment>
            ))}
            {/* </TableBody>
        </Table> */}
          </List>

          <div>
            <p>{this.state.viewStudent.first_name} </p>
            <p>{this.state.viewStudent.notes}</p>
          </div>
          <AddOneOnOne
            toggleDialog={this.toggleDialog}
            open={this.state.open}
            cohort={this.props.selectedCohort || this.props.defaultCohort}
            student={this.state.addStudent}
          />
        </div>
      </Paper>
    );
  }
}

OneOnOnes.propTypes = {
  selectedCohort: PropTypes.string,
  defaultCohort: PropTypes.string,
  getOneOnOnes: PropTypes.func,
  oneOnOnes: PropTypes.array
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
