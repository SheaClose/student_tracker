import React, { Component } from 'react';
import RepoDropDown from '../Utils/RepoDropDown';

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    console.log('componentDidMount');
  }

  render() {
    return (
      <div className="">
        <RepoDropDown />
      </div>
    );
  }
}
export default Projects;
