import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';

import { getStudents, getUserInfo } from './ducks/actions';
import NavBar from './components/NavBar/NavBar';

// import routes from "./routes";
import { rootPath } from './resources/resources';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    if (this.props.isAuthed) {
      props.getStudents();
      props.getUserInfo();
    }
  }

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
        {/* routes */}
        {this.props.pendingAuth && <CircularProgress size={80} thickness={5} />}
      </div>
    );
  }
}

App.propTypes = {
  isAuthed: PropTypes.bool,
  pendingAuth: PropTypes.bool,
  getStudents: PropTypes.func,
  getUserInfo: PropTypes.func
};

export default withRouter(
  connect(
    ({ isAuthed, pendingAuth, students, userInfo }) => ({
      isAuthed,
      pendingAuth,
      students,
      userInfo
    }),
    { getStudents, getUserInfo }
  )(App)
);
