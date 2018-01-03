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

  /**
   * SCU was created to enforce logini not authed, but appears to be resolved now with CWRP.
   * Leaving temporarily to ensure no conflicts. Will remove if no issues are created.
   */
  // shouldComponentUpdate(nextProps) {
  //   const { isAuthed, location } = this.props;
  //   return (
  //     nextProps.isAuthed !== isAuthed ||
  //     location.pathname !== nextProps.location.pathname
  //   );
  // }

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
  isAuthed: PropTypes.bool
};

export default withRouter(
  connect(({ isAuthed, pendingAuth }) => ({
    isAuthed,
    pendingAuth
  }))(App)
);
