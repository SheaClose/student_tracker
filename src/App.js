import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import NavBar from './components/NavBar/NavBar';
<<<<<<< HEAD
import routes from './routes';
=======

// import routes from "./routes";
import { rootPath } from './resources/resources';
import './App.css';
>>>>>>> master

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
<<<<<<< HEAD
        <p>
          To get started, edit <code>src/App.js</code> and save to reload.
          {this.props.pendingAuth && (
            <CircularProgress size={80} thickness={5} />
          )}
        </p>
        {routes}
=======
        {/* routes */}
        {this.props.pendingAuth && <CircularProgress size={80} thickness={5} />}
>>>>>>> master
      </div>
    );
  }
}

App.propTypes = {
  isAuthed: PropTypes.bool,
  pendingAuth: PropTypes.bool
};

export default withRouter(
  connect(({ isAuthed, pendingAuth }) => ({
    isAuthed,
    pendingAuth
  }))(App)
);
