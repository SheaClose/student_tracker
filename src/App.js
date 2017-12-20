import React, { Component } from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar';
// import routes from "./routes";

class App extends Component {
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

export default App;
