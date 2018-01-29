import React, { Component } from 'react';
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import Snackbar from 'material-ui/Snackbar';
import Popover from 'material-ui/Popover/Popover';
import { Menu, MenuItem } from 'material-ui/Menu';
import ArrowDropRight from 'material-ui/svg-icons/navigation-arrow-drop-right';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getStudents } from '../../../ducks/actions';

const button_style = {
  display: 'block',
  margin: '5vh'
};

class DropStudent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openSnackBar: false,
      snackBarMsg: '',
      open: false,
      anchorOrigin: {
        horizontal: 'left',
        vertical: 'bottom'
      },
      targetOrigin: {
        horizontal: 'left',
        vertical: 'top'
      },
      snackBarStyle: {}
    };
    this.handleSnackBarRequestClose = this.handleSnackBarRequestClose.bind(
      this
    );
    this.handleClick = this.handleClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleMenuSelection = this.handleMenuSelection.bind(this);
    this.handleOpenSnackBar = this.handleOpenSnackBar.bind(this);
  }

  handleRequestClose() {
    this.setState({
      open: false
    });
  }

  handleOpenSnackBar(snackBarMsg, snackBarStyle) {
    this.setState({
      openSnackBar: true,
      snackBarMsg,
      snackBarStyle
    });
  }

  handleMenuSelection(event, student) {
    event.preventDefault();
    axios.put(`/api/students/drop/${student.dmId}`).then(res => {
      this.props.getStudents();
      if (res.status === 200) {
        this.handleOpenSnackBar(
          `Successfully dropped ${student.first_name} ${student.last_name}`,
          { backgroundColor: 'green' }
        );
      } else {
        this.handleOpenSnackBar(
          `Unable to drop ${student.first_name} ${student.last_name}`,
          { backgroundColor: 'red' }
        );
      }
      this.handleRequestClose();
    });
  }

  handleClick(event) {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  }

  handleSnackBarRequestClose() {
    this.setState({
      openSnackBar: false,
      snackBarMsg: '',
      snackBarStyle: {}
    });
  }

  render() {
    const cohorts = this.props.cohorts.filter(c => c.inSession).map(c => {
      const students = c.classSession.map(student => (
        <MenuItem
          onClick={e => this.handleMenuSelection(e, student)}
          primaryText={`${student.first_name} ${student.last_name}`}
        />
      ));
      return (
        <MenuItem
          key={c.id}
          primaryText={c.name}
          rightIcon={<ArrowDropRight />}
          menuItems={students}
        />
      );
    });
    return (
      <RaisedButton
        onClick={this.handleClick}
        style={button_style}
        className="user_button"
        label={'Drop Student'}
      >
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={this.state.anchorOrigin}
          targetOrigin={this.state.targetOrigin}
          onRequestClose={this.handleRequestClose}
        >
          <Menu>{cohorts}</Menu>
        </Popover>
        <Snackbar
          bodyStyle={this.state.snackBarStyle}
          open={this.state.openSnackBar}
          message={this.state.snackBarMsg}
          autoHideDuration={3005}
          onRequestClose={this.handleSnackBarRequestClose}
        />
      </RaisedButton>
    );
  }
}

DropStudent.propTypes = {
  cohorts: PropTypes.array.isRequired,
  getStudents: PropTypes.func.isRequired
};

function mapStateToProps({ mainReducer }) {
  const { students: cohorts, defaultCohort } = mainReducer;
  return { cohorts, defaultCohort };
}

export default connect(mapStateToProps, { getStudents })(DropStudent);
