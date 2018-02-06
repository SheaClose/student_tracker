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
import { Card, CardHeader, CardText, CardTitle } from 'material-ui/Card';
import { RadioButton, RadioButtonGroup } from 'material-ui/RadioButton';
import Paper from 'material-ui/Paper';
import RatingBar from '../Utils/RatingBar';
import Rating from '../Utils/Rating';
import OneOnOneDetail from './OneOnOneDetail';

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
    this.setState(state => ({
      open: !state.open,
      addStudent
    }));
  }

  render() {
    const { oneOnOnes = [] } = this.props;
    const viewStudent = this.state.viewStudent.dm_id
      ? this.state.viewStudent
      : oneOnOnes[0] || {};
    const renderOneOnOnes = student => (
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
            student.date ? new Date(student.date).toDateString() : 'No Data'
          })`}
          secondaryText={<p>{student.notes}</p>}
          secondaryTextLines={2}
        />
        <Divider />
      </React.Fragment>
    );
    return (
      <div style={{ display: 'flex', flexDirection: 'row' }}>
        <List
          style={{
            height: 'calc(100vh - 56px)',
            overflowY: 'auto',
            flexBasis: '30%'
          }}
        >
          {oneOnOnes.map(renderOneOnOnes)}
          {oneOnOnes.map(renderOneOnOnes)}
          {oneOnOnes.map(renderOneOnOnes)}
          {oneOnOnes.map(renderOneOnOnes)}
        </List>
        <Card style={{ flexBasis: '70%' }}>
          <CardTitle
            title={`${viewStudent.first_name} ${viewStudent.last_name}`}
            subtitle={<p onClick={console.log}>Add new +</p>}
          />
          <CardText>
            <List>
              {this.state.open && (
                <AddOneOnOne
                  toggleDialog={this.toggleDialog}
                  cohort={this.props.selectedCohort || this.props.defaultCohort}
                  student={this.state.addStudent}
                />
              )}
              <OneOnOneDetail detail={viewStudent} />
              <Divider />
              <div style={{ textAlign: 'center' }}>
                {/* Eventually this button will load previous one on ones for the same student */}
                <FlatButton secondary={true}>Load Previous...</FlatButton>
              </div>
            </List>
          </CardText>
        </Card>
      </div>
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
