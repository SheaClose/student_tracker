import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { NavigationMenu } from 'material-ui/svg-icons';
import { Toolbar, ToolbarGroup } from 'material-ui/Toolbar';
import Snackbar from 'material-ui/Snackbar';

import NavBar from './components/NavBar/NavBar';

import routes from './routes';
import './App.css';

import {
  getStudents,
  getUserInfo,
  verifyLogin,
  getOutliers,
  clearSnackbar
} from './ducks/actions';
import SelectCohort from './components/Utils/SelectCohort';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      open: false
    };
    this.toggleDrawer = this.toggleDrawer.bind(this);
  }
  componentDidMount() {
    if (!this.props.isAuthed) {
      this.props.verifyLogin();
    }
    this.props.getStudents();
    this.props.getUserInfo();
    this.props.getOutliers();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isAuthed !== this.props.isAuthed && !newProps.isAuthed) {
      window.location.href = `${
        process.env.REACT_APP_ROOT_PATH
      }/auth/devmtn?redirect=${this.props.location.pathname}`;
    }
  }

  toggleDrawer() {
    this.setState(state => ({ open: !state.open }));
  }

  render() {
    return (
      <div>
        <Toolbar>
          <ToolbarGroup>
            <NavigationMenu onClick={this.toggleDrawer} />
          </ToolbarGroup>
          <ToolbarGroup>
            <SelectCohort />
          </ToolbarGroup>
        </Toolbar>
        <NavBar open={this.state.open} toggleDrawer={this.toggleDrawer} />
        <Snackbar
          open={Boolean(this.props.snackbar)}
          message={this.props.snackbar}
          autoHideDuration={2000}
          onRequestClose={() => this.props.clearSnackbar()}
        />
        {this.props.isAuthed && routes}
      </div>
    );
  }
}

App.propTypes = {
  isAuthed: PropTypes.bool,
  getStudents: PropTypes.func.isRequired,
  getUserInfo: PropTypes.func.isRequired,
  verifyLogin: PropTypes.func.isRequired,
  getOutliers: PropTypes.func.isRequired,
  clearSnackbar: PropTypes.func,
  snackbar: PropTypes.string,
  location: PropTypes.object.isRequired
};

function mapStateToProps({ mainReducer }) {
  return { isAuthed: mainReducer.isAuthed, snackbar: mainReducer.snackbar };
}

export default withRouter(
  connect(mapStateToProps, {
    getStudents,
    getUserInfo,
    verifyLogin,
    getOutliers,
    clearSnackbar
  })(App)
);
