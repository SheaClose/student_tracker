import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavBar from './components/NavBar/NavBar';

import routes from './routes';
import { rootPath } from './resources/resources';
import './App.css';

import { getStudents, getUserInfo, verifyLogin, getOutliers } from './ducks/actions';

class App extends Component {
  componentWillMount() {
    console.log(rootPath);
    if (!this.props.isAuthed) {
      this.props.verifyLogin();
    }
    this.props.getStudents();
    this.props.getUserInfo();
    this.props.getOutliers();
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isAuthed !== this.props.isAuthed && !newProps.isAuthed) {
      window.location.href = `${rootPath}/auth/devmtn`;
    }
  }

  render() {
    return (
      <div>
        <NavBar />
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
  getOutliers: PropTypes.func.isRequired
};

function mapStateToProps({ isAuthed }) {
  return { isAuthed };
}

export default withRouter(
  connect(mapStateToProps, {
    getStudents,
    getUserInfo,
    verifyLogin,
    getOutliers
  })(App)
);
