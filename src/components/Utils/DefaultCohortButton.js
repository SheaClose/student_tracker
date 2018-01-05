import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover/Popover';
import { Menu, MenuItem } from 'material-ui/Menu';
import Snackbar from 'material-ui/Snackbar';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { updateDefaultCohort } from '../../ducks/actions';
// import './DefaultCohortButton.css';

class DefaultCohortButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cohorts: props.students.map(c => c.name),
      snackBarMsg: '',
      openSnackBar: false,
      open: false,
      anchorOrigin: {
        horizontal: 'left',
        vertical: 'bottom'
      },
      targetOrigin: {
        horizontal: 'left',
        vertical: 'top'
      }
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.setDefaultCohort = this.setDefaultCohort.bind(this);
    this.handleSnackBarRequestClose = this.handleSnackBarRequestClose.bind(
      this
    );
  }

  setDefaultCohort(_, __, index) {
    const cohortName = this.props.students[index].name;
    this.props.updateDefaultCohort(cohortName).then(cur => {
      this.setState({
        snackBarMsg: `UPDATE_DEFAULT_COHORT_FULFILLED: ${cur.value}`,
        openSnackBar: true
      });
    });
    this.setState({ open: false });
  }

  handleClick(event) {
    // This prevents ghost click.
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget
    });
  }

  handleRequestClose() {
    this.setState({
      open: false
    });
  }

  handleSnackBarRequestClose() {
    this.setState({
      openSnackBar: false
    });
  }
  render() {
    const cohorts = this.state.cohorts.map(c => (
      <MenuItem key={c} primaryText={c} />
    ));
    const { defaultCohort } = this.props;
    return (
      <div className="">
        <h4>Select Default Cohort:</h4>
        <RaisedButton
          onClick={this.handleClick}
          label={defaultCohort || 'Default Cohort'}
        />
        <Popover
          open={this.state.open}
          anchorEl={this.state.anchorEl}
          anchorOrigin={this.state.anchorOrigin}
          targetOrigin={this.state.targetOrigin}
          onRequestClose={this.handleRequestClose}
        >
          <Menu onItemClick={this.setDefaultCohort}>{cohorts}</Menu>
        </Popover>
        <Snackbar
          open={this.state.openSnackBar}
          message={this.state.snackBarMsg}
          autoHideDuration={3005}
          onRequestClose={this.handleSnackBarRequestClose}
        />
      </div>
    );
  }
}

DefaultCohortButton.propTypes = {
  students: PropTypes.array.isRequired,
  updateDefaultCohort: PropTypes.func.isRequired,
  defaultCohort: PropTypes.string.isRequired
};

function mapStateToProps({ students, defaultCohort }) {
  return {
    students,
    defaultCohort
  };
}

export default connect(mapStateToProps, { updateDefaultCohort })(
  DefaultCohortButton
);
