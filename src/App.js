import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavBar from './components/NavBar/NavBar';

import routes from './routes';
import { rootPath } from './resources/resources';
import './App.css';
import { getStudents, getUserInfo, verifyLogin } from './ducks/actions';

class App extends Component {
  componentWillMount() {
    if (!this.props.isAuthed) {
      this.props.verifyLogin();
    }
    this.props.getStudents();
    this.props.getUserInfo();
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
  verifyLogin: PropTypes.func.isRequired
};

function mapStateToProps({ isAuthed }) {
  return { isAuthed };
}

export default withRouter(
  connect(mapStateToProps, {
    getStudents,
    getUserInfo,
    verifyLogin
  })(App)
);
