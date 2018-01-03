import React, { Component } from 'react';

import './AttendanceTracker.css';

export default class AttendanceTracker extends Component {
  constructor(props) {
    super(props);

    this.state = {
      students: [
        {
          name: 'Mackenzie Clark',
          id: 0
        },
        {
          name: 'Jonathan May',
          id: 1
        },
        {
          name: 'Shea Close',
          id: 2
        }
      ]
    };
  }
  render() {
    return this.state.students.map(student => (
      <div key={student.id} className="attendance-tracker-container">
        <div>{student.name}</div>
        <div className="attendance-button-container">
          <button> Morning</button>
          <button> Break</button>
          <button> Lunch</button>
          <button> Left Early</button>
        </div>
      </div>
    ));
  }
}
