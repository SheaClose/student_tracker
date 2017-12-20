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
      const students = axios.get('/api/students/');
      const mentor = axios.get('/api/mentor/');
      const mentorRoles = axios.get('/api/mentor_roles');
      axios
        .all([students, mentor, mentorRoles])
        .then(res => console.log(res.map(c => c.data)))
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
