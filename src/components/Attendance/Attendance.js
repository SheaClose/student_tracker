import React, { Component } from 'react';

// import { getStudents, getUserInfo } from './ducks/actions';

export class Attendance extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [],
      aggregate: false,
      weekly: false
    };
  }

  render() {
    return (
      <div className="attendance-main-container">
        <div className="attendance-navbar">Top Button Bar</div>
        <div className="attendance-content">
          <div>Left Student List</div>
          <div>Right attendance view</div>
        </div>
      </div>
    );
  }
}
