import React, { Component } from 'react';
import { connect } from 'react-redux';
import { PropTypes } from 'prop-types';
import FlatButton from 'material-ui/FlatButton';
import { List, ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import AddCircleOutline from 'material-ui/svg-icons/content/add-circle-outline';
import { Card, CardText, CardTitle } from 'material-ui/Card';
import TextField from 'material-ui/TextField';

import { getOneOnOnes } from '../../ducks/actions';

import AddOneOnOne from '../Utils/AddOneOnOne';
import OneOnOneDetail from './OneOnOneDetail';
import { MasterDetail, Master, Detail } from '../Utils/MasterDetail';

class OneOnOnes extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false,
      selectedStudent: {},
      filter: ''
    };
    this.showAdd = this.showAdd.bind(this);
    this.hideAdd = this.hideAdd.bind(this);
  }

  componentDidMount() {
    this.props.getOneOnOnes(
      this.props.selectedCohort || this.props.defaultCohort
    );
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.selectedCohort !== this.props.selectedCohort) {
      nextProps.getOneOnOnes(nextProps.selectedCohort);
    } else if (nextProps.defaultCohort !== this.props.defaultCohort) {
      nextProps.getOneOnOnes(nextProps.defaultCohort);
    }
  }

  showAdd(selectedStudent) {
    this.setState({
      open: true,
      selectedStudent
    });
  }
  hideAdd(selectedStudent) {
    this.setState({ open: false, selectedStudent });
  }

  render() {
    const { oneOnOnes = [] } = this.props;
    const selectedStudent = this.state.selectedStudent.dm_id
      ? this.state.selectedStudent
      : oneOnOnes[0] || {};
    const filterOneOnOnes = oneOnOne =>
      oneOnOne.first_name.toLowerCase().includes(this.state.filter);
    const renderOneOnOnes = student => (
      <React.Fragment key={student.dm_id}>
        <ListItem
          rightIcon={
            <AddCircleOutline
              onClick={e => {
                e.stopPropagation();
                this.showAdd(student);
              }}
            />
          }
          onClick={() =>
            this.setState({ selectedStudent: student, open: false })
          }
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
      <MasterDetail>
        <Master list={oneOnOnes} renderMethod={renderOneOnOnes} />
        <Detail
          title={`${selectedStudent.first_name} ${selectedStudent.last_name}`}
          subtitle={
            <span onClick={() => this.showAdd(selectedStudent)}>Add new +</span>
          }
        >
          <List>
            {this.state.open && (
              <AddOneOnOne
                hideAdd={this.hideAdd}
                cohort={this.props.selectedCohort || this.props.defaultCohort}
                student={this.state.selectedStudent}
              />
            )}
            <OneOnOneDetail detail={selectedStudent} />
            <Divider />
            <div style={{ textAlign: 'center' }}>
              {/* Eventually this button will load previous one on ones for the same student */}
              <FlatButton secondary={true}>Load Previous...</FlatButton>
            </div>
          </List>
        </Detail>
      </MasterDetail>
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
