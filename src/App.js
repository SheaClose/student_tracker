import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import NavBar from './components/NavBar/NavBar';
// import routes from "./routes";

class App extends Component {
  componentDidMount() {
    if (
      this.props.location.search
        .substring(1)
        .split('=')
        .pop() === 'true'
    ) {
      const promises = [axios.get('/api/students/'), axios.get('/api/user/')];
      axios
        .all(promises)
        .then(
          axios.spread((students, user) => {
            console.log({
              students: students.data,
              user: user.data,
              userRoles: user.data.roles
            });
          })
        )
        .catch(console.log);
    }
  }

  render() {
    return (
      <div>
        <NavBar />
        <p>
          To get started, edit <code>src/App.js</code> and save to reload.
          {/* routes */}
        </p>
      </div>
    );
  }
}

export default withRouter(App);
