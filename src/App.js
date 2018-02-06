import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavBar from './components/NavBar/NavBar';

import routes from './routes';
import './App.css';

import {
  getStudents,
  getUserInfo,
  verifyLogin,
  getOutliers
} from './ducks/actions';
import { Toolbar } from 'material-ui/Toolbar';
import { ToolbarGroup } from 'material-ui';
import { NavigationMenu } from 'material-ui/svg-icons';
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
    this.setState(prev => ({ open: !prev.open }));
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
  location: PropTypes.object.isRequired
};

function mapStateToProps({ mainReducer }) {
  return { isAuthed: mainReducer.isAuthed };
}

export default withRouter(
  connect(mapStateToProps, {
    getStudents,
    getUserInfo,
    verifyLogin,
    getOutliers
  })(App)
);
