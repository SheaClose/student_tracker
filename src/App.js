import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
// import axios from 'axios';
import { connect } from 'react-redux';
import CircularProgress from 'material-ui/CircularProgress';
import { getStudents, getUserInfo } from './ducks/actions';

import './App.css';
import NavBar from './components/NavBar/NavBar';
// import routes from "./routes";

class App extends Component {
  // constructor(props) {
  //   super(props);

  // }
  shouldComponentUpdate(nextProps) {
    return nextProps.isAuthed !== this.props.isAuthed;
  }
  componentDidUpdate() {
    if (this.props.isAuthed) {
<<<<<<< HEAD
      this.props.getStudents();
      this.props.getUserInfo();
      console.log(this.props);
      // const promises = [axios.get('/api/students/'), axios.get('/api/user/')];
      // axios
      //   .all(promises)
      //   .then(
      //     axios.spread((students, user) => {
      //       console.log({
      //         students: students.data,
      //         user: user.data,
      //         userRoles: user.data.roles
      //       });
      //     })
      //   )
      //   .catch(console.log);
=======
      const promises = [
        axios.get('/api/students/'),
        axios.get('/api/user/'),
        axios.get('/api/repos')
      ];
      axios
        .all(promises)
        .then(
          axios.spread((students, user, repos) => {
            console.log({
              students: students.data,
              user: user.data,
              userRoles: user.data.roles,
              repos: repos.data
            });
          })
        )
        .catch(console.log);
>>>>>>> master
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <p>
          To get started, edit <code>src/App.js</code> and save to reload.
          {/* routes */}
          {this.props.pendingAuth && (
            <CircularProgress size={80} thickness={5} />
          )}
        </p>
      </div>
    );
  }
}

App.propTypes = {
  isAuthed: PropTypes.bool,
  pendingAuth: PropTypes.bool.isRequired,
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
