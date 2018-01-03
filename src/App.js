import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import NavBar from './components/NavBar/NavBar';

import routes from './routes';
import { rootPath } from './resources/resources';
import './App.css';

class App extends Component {
  componentWillReceiveProps(newProps) {
    if (newProps.isAuthed !== this.props.isAuthed && !newProps.isAuthed) {
      window.location.href = `${rootPath}/auth/devmtn`;
    }
  }

  shouldComponentUpdate(nextProps) {
    return nextProps.isAuthed !== this.props.isAuthed;
  }

  render() {
    return (
      <div>
        <NavBar />
        {routes}
      </div>
    );
  }
}

App.propTypes = {
  isAuthed: PropTypes.bool
};

export default withRouter(
  connect(({ isAuthed, pendingAuth }) => ({
    isAuthed,
    pendingAuth
  }))(App)
);
